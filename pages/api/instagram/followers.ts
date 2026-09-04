import type { NextApiRequest, NextApiResponse } from 'next';

const CACHE_MS = 15 * 60 * 1000;
let cached: { followers: number; following: number; posts: number; username: string; expiresAt: number } | null = null;

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');

  if (cached && cached.expiresAt > Date.now()) {
    return res.status(200).json({ followers: cached.followers, following: cached.following, posts: cached.posts, username: cached.username, source: 'instagram_graph', cached: true });
  }

  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN;
  if (!accountId || !accessToken) {
    return res.status(503).json({ error: 'instagram_graph_not_configured' });
  }

  try {
    // O token da conta usa a API "Instagram Login". Ela não é intercambiável
    // com um token do Facebook Graph; por isso a origem correta é graph.instagram.com.
    const response = await fetch(`https://graph.instagram.com/v25.0/${encodeURIComponent(accountId)}?fields=followers_count,follows_count,media_count,username&access_token=${encodeURIComponent(accessToken)}`);
    if (!response.ok) throw new Error(`Instagram Graph returned ${response.status}`);
    const payload = await response.json() as { followers_count?: number; follows_count?: number; media_count?: number; username?: string };
    if (typeof payload.followers_count !== 'number') throw new Error('followers_count unavailable');

    cached = { followers: payload.followers_count, following: payload.follows_count || 0, posts: payload.media_count || 0, username: payload.username || 'sistemabritto', expiresAt: Date.now() + CACHE_MS };
    return res.status(200).json({ followers: cached.followers, following: cached.following, posts: cached.posts, username: cached.username, source: 'instagram_graph', cached: false });
  } catch {
    return res.status(502).json({ error: 'instagram_graph_collection_failed' });
  }
}
