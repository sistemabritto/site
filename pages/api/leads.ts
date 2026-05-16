import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { 
      name, 
      email, 
      whatsapp, 
      company, 
      source, 
      utm_source = '', 
      utm_medium = '', 
      utm_campaign = '',
      orderBump = false,
      qualification_answers = null
    } = req.body;

    // Inserir lead no Supabase
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: name || null,
        email: email || null,
        whatsapp: whatsapp || null,
        company: company || null,
        source: source || 'unknown',
        utm_source,
        utm_medium,
        utm_campaign,
        order_bump: orderBump,
        qualification_answers: qualification_answers ? JSON.stringify(qualification_answers) : null,
        status: 'new'
      })
      .select()
      .single();

    if (leadError) {
      console.error('[Supabase Lead Error]', leadError);
      // Mesmo se falhar o Supabase, continua (não bloqueia o usuário)
    }

    console.log('[Lead Saved]', lead?.id || 'FAILED');
    res.status(200).json({ success: true, leadId: lead?.id });
  } catch (error) {
    console.error('[Leads API Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
