// Server-only. Reuse existing contacts without changing their identity or sending messages.
export function crmPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length === 13 && Number(digits.slice(2, 4)) >= 31 && Number(digits[5]) >= 7) {
    digits = digits.slice(0, 4) + digits.slice(5);
  }
  return digits ? `+${digits}` : '';
}

export async function attachExistingCrmLead(options: {
  phone: string; email: string; pipeline: string; stage: string; fields: Record<string, string>;
}, token: string): Promise<'saved' | 'missing' | 'failed'> {
  const request = async (path: string, init?: RequestInit) => {
    const response = await fetch(`https://evoapi.workflowapi.com.br/api/v1${path}`, {
      ...init, signal: AbortSignal.timeout(8000),
      headers: { 'Content-Type': 'application/json', api_access_token: token },
    });
    return { ok: response.ok, body: await response.json() };
  };
  const phone = crmPhone(options.phone);
  const query = phone || options.email;
  const found = await request(`/contacts/search?q=${encodeURIComponent(query)}`);
  if (!found.ok || !Array.isArray(found.body?.data)) return 'failed';
  const contact = found.body.data.find((c: any) => phone
    ? crmPhone(c.phone_number || '') === phone
    : String(c.email || '').toLowerCase() === options.email.toLowerCase());
  if (!contact?.id) return 'missing';
  const path = `/pipelines/${options.pipeline}/pipeline_items`;
  const existing = async () => {
    const result = await request(path);
    if (!result.ok || !Array.isArray(result.body?.data)) throw new Error('CRM pipeline lookup failed');
    return result.body.data.some((item: any) => item.contact_id === contact.id && !item.completed_at);
  };
  if (await existing()) return 'saved';
  const created = await request(path, { method: 'POST', body: JSON.stringify({
    type: 'contact', item_id: contact.id, pipeline_stage_id: options.stage, custom_fields: options.fields,
  }) });
  if (created.ok && created.body?.data?.id) return 'saved';
  // A racing request may have created it. Never call a generic 422 success.
  return await existing() ? 'saved' : 'failed';
}
