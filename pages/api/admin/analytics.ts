import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { verifyToken } from './auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

// GET /api/admin/analytics?range=7d|30d|90d
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth check
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Token invalido' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const range = (req.query.range as string) || '30d';

  // Parse range to days
  const daysMap: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };
  const days = daysMap[range] || 30;
  const since = new Date(Date.now() - days * 86400000).toISOString();

  try {
    // 1. Total pageviews in range
    const { count: totalPageviews } = await supabase
      .from('pageviews')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', since);

    // 2. Unique visitors (distinct session_ids)
    const { data: sessionData } = await supabase
      .from('pageviews')
      .select('session_id')
      .gte('created_at', since);

    const uniqueSessions = new Set(sessionData?.map(r => r.session_id) || []).size;

    // 3. Online now (sessions in last 5 min)
    const fiveMinAgo = new Date(Date.now() - 5 * 60000).toISOString();
    const { data: onlineData } = await supabase
      .from('pageviews')
      .select('session_id')
      .gte('created_at', fiveMinAgo);

    const onlineNow = new Set(onlineData?.map(r => r.session_id) || []).size;

    // 4. Pageviews per page (top 15)
    const { data: pageData } = await supabase
      .from('pageviews')
      .select('path')
      .gte('created_at', since);

    const pagesMap: Record<string, number> = {};
    for (const row of pageData || []) {
      pagesMap[row.path] = (pagesMap[row.path] || 0) + 1;
    }
    const topPages = Object.entries(pagesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([path, views]) => ({ path, views }));

    // 5. Traffic by source (utm_source)
    const { data: sourceData } = await supabase
      .from('pageviews')
      .select('utm_source')
      .gte('created_at', since);

    const sourcesMap: Record<string, number> = {};
    for (const row of sourceData || []) {
      const src = row.utm_source || 'direct';
      sourcesMap[src] = (sourcesMap[src] || 0) + 1;
    }
    const trafficBySource = Object.entries(sourcesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, views]) => ({ source, views }));

    // 6. Pageviews per day (for chart)
    const { data: dailyData } = await supabase
      .from('pageviews')
      .select('created_at')
      .gte('created_at', since);

    const dailyMap: Record<string, number> = {};
    for (const row of dailyData || []) {
      const day = row.created_at.slice(0, 10); // YYYY-MM-DD
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    }
    const dailyViews = Object.entries(dailyMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, views]) => ({ date, views }));

    // 7. CTA clicks per page
    const { data: ctaData } = await supabase
      .from('cta_clicks')
      .select('page, cta_label, cta_action')
      .gte('created_at', since);

    const ctaMap: Record<string, { label: string; action: string; clicks: number }> = {};
    for (const row of ctaData || []) {
      const key = `${row.page}|${row.cta_label}`;
      if (!ctaMap[key]) {
        ctaMap[key] = { label: row.cta_label, action: row.cta_action, clicks: 0 };
      }
      ctaMap[key].clicks++;
    }
    const ctaClicks = Object.entries(ctaMap)
      .sort((a, b) => b[1].clicks - a[1].clicks)
      .slice(0, 20)
      .map(([key, val]) => {
        const page = key.split('|')[0];
        return { page, ...val };
      });

    // 8. Total CTA clicks
    const totalCtaClicks = (ctaData || []).length;

    // 9. Conversion rate (CTA clicks / pageviews)
    const conversionRate = totalPageviews ? ((totalCtaClicks / totalPageviews) * 100).toFixed(2) : '0.00';

    // 10. Conversion rate per page: for each page, pageviews and CTA clicks
    const ctaByPage: Record<string, number> = {};
    for (const row of ctaData || []) {
      ctaByPage[row.page] = (ctaByPage[row.page] || 0) + 1;
    }
    const conversionByPage = Object.entries(pagesMap)
      .sort((a, b) => b[1] - a[1])
      .map(([path, pageviews]) => {
        const clicks = ctaByPage[path] || 0;
        const rate = pageviews > 0 ? parseFloat(((clicks / pageviews) * 100).toFixed(2)) : 0;
        return { path, pageviews, clicks, rate };
      })
      .filter(p => p.pageviews >= 3)
      .filter(p => p.rate > 0 || p.clicks > 0)
      .slice(0, 15);

    // 11. Quiz funnel analytics — stage completion rates
    let quizFunnel: any = null;
    try {
      const { data: quizData } = await supabase
        .from('quiz_funnel')
        .select('session_id, stage, quiz_source, created_at')
        .gte('created_at', since);

      if (quizData && quizData.length > 0) {
        // Get unique sessions that started the quiz
        const quizSessions = new Set(quizData.map((r: any) => r.session_id));
        const totalQuizStarts = quizSessions.size;

        // Count sessions that reached each stage
        const stageSessions: Record<string, Set<string>> = {};
        for (const row of quizData) {
          if (!stageSessions[row.stage]) stageSessions[row.stage] = new Set();
          stageSessions[row.stage].add(row.session_id);
        }

        // Define the funnel order
        const funnelStages = [
          'quiz-visited',
          'email-captured',
          'email-skipped',
          'answered-q1',
          'answered-q2',
          'answered-q3',
          'answered-q4',
          'quiz-completed',
        ];

        quizFunnel = funnelStages
          .filter(stage => stageSessions[stage])
          .map(stage => ({
            stage,
            sessions: stageSessions[stage].size,
            rate: totalQuizStarts > 0 ? parseFloat(((stageSessions[stage].size / totalQuizStarts) * 100).toFixed(1)) : 0,
          }));

        // Calculate drop-off between stages
        for (let i = 1; i < quizFunnel.length; i++) {
          const prev = quizFunnel[i - 1].sessions;
          const curr = quizFunnel[i].sessions;
          quizFunnel[i].dropoff = prev > 0 ? parseFloat((((prev - curr) / prev) * 100).toFixed(1)) : 0;
        }

        // Quiz completion by source
        const sourceSessions: Record<string, Set<string>> = {};
        const sourceCompleted: Record<string, Set<string>> = {};
        for (const row of quizData) {
          const src = row.quiz_source || 'organic';
          if (!sourceSessions[src]) sourceSessions[src] = new Set();
          sourceSessions[src].add(row.session_id);
          if (row.stage === 'quiz-completed') {
            if (!sourceCompleted[src]) sourceCompleted[src] = new Set();
            sourceCompleted[src].add(row.session_id);
          }
        }

        const quizBySource = Object.entries(sourceSessions).map(([source, sessions]) => ({
          source,
          starts: sessions.size,
          completed: sourceCompleted[source]?.size || 0,
          rate: sessions.size > 0 ? parseFloat((((sourceCompleted[source]?.size || 0) / sessions.size) * 100).toFixed(1)) : 0,
        }));

        quizFunnel = { stages: quizFunnel, bySource: quizBySource, totalStarts: totalQuizStarts };
      }
    } catch (err) {
      console.error('quiz funnel analytics error (table may not exist yet):', err);
    }

    return res.status(200).json({
    totalPageviews: totalPageviews || 0,
    uniqueVisitors: uniqueSessions,
    onlineNow,
    totalCtaClicks,
    conversionRate: parseFloat(conversionRate),
    topPages,
    trafficBySource,
    dailyViews,
    ctaClicks,
    conversionByPage,
    quizFunnel,
    range,
    days,
    });
  } catch (err) {
    console.error('analytics error:', err);
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}
