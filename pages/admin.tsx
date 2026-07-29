import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  source: string;
  plan: string;
  order_bump: boolean;
  value: number;
  days_in_pipeline: number;
  created_at: string | null;
  entered_at: string | null;
}

interface StageCount {
  name: string;
  count: number;
}

interface AnalyticsData {
  totalPageviews: number;
  uniqueVisitors: number;
  onlineNow: number;
  totalCtaClicks: number;
  conversionRate: number;
  topPages: { path: string; views: number }[];
  trafficBySource: { source: string; views: number }[];
  dailyViews: { date: string; views: number }[];
  ctaClicks: { page: string; label: string; action: string; clicks: number }[];
  conversionByPage: { path: string; pageviews: number; clicks: number; rate: number }[];
  // Cruzamento página × origem: responde "essa URL, vinda dessa origem,
  // converte?" — o `conversionByPage` sozinho mistura todas as origens numa
  // URL só, e a `attribution` sozinha mistura todas as URLs numa origem só.
  conversionByPageAndSource: { path: string; source: string; campaign: string; pageviews: number; clicks: number; rate: number }[];
  // Atribuição: de onde veio quem clicou. A campanha é o slug do artigo, então
  // byCampaign responde "qual post converteu" — a única pergunta que justifica
  // publicar 21 artigos por semana.
  attribution?: {
    clicksAttributed: number;
    clicksUnattributed: number;
    bySource: { source: string; clicks: number; sessions: number; rate: number }[];
    byCampaign: { campaign: string; clicks: number }[];
  };
  range: string;
  days: number;
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminToken, setAdminToken] = useState('');

  // Dados
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<StageCount[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);

  // Config — now from Supabase, not localStorage
   const [pixelId, setPixelId] = useState('');
   const [pixelSaving, setPixelSaving] = useState(false);
   const [pixelSaved, setPixelSaved] = useState(false);
   const [gtmId, setGtmId] = useState('');
   const [gtmSaving, setGtmSaving] = useState(false);
   const [gtmSaved, setGtmSaved] = useState(false);
   const [siteName, setSiteName] = useState('');
   const [evoApiStatus, setEvoApiStatus] = useState<'checking' | 'ok' | 'error'>('checking');

   // Meta Conversions API — o access token nunca fica no estado depois de
   // salvo (só existe o preview mascarado que a API devolve).
   const [capiToken, setCapiToken] = useState('');
   const [capiStatus, setCapiStatus] = useState<{ pixel_id: string; configurado: boolean; token_preview: string | null } | null>(null);
   const [capiSaving, setCapiSaving] = useState(false);
   const [capiValidating, setCapiValidating] = useState(false);
   const [capiValidation, setCapiValidation] = useState<{ ok: boolean; detalhe: string } | null>(null);

  // Active tab
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'config' | 'capi'>('leads');

  // Analytics
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsRange, setAnalyticsRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Check existing session
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setAdminToken(token);
        setAuthenticated(true);
        loadLeads(token);
        loadConfig(token);
      } else {
        localStorage.removeItem('admin_token');
      }
    } catch {
      localStorage.removeItem('admin_token');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('admin_token', data.token);
        setAdminToken(data.token);
        setAuthenticated(true);
        loadLeads(data.token);
        loadConfig(data.token);
      } else {
        setLoginError('Senha incorreta');
      }
    } catch {
      setLoginError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = async (token: string) => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setStages(data.stages || []);
        setTotalLeads(data.total || 0);
        setEvoApiStatus('ok');
      } else {
        setEvoApiStatus('error');
      }
    } catch {
      setEvoApiStatus('error');
    } finally {
      setDataLoading(false);
    }
  };

  // Load config from Supabase via /api/admin/config
  const loadConfig = async (token: string) => {
    try {
      const res = await fetch('/api/admin/config', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setPixelId(data.config.meta_pixel_id || '');
          setGtmId(data.config.google_gtm_id || '');
          setSiteName(data.config.site_name || 'Sistema Britto');
        }
      }
    } catch {
      // silently fail — config is non-critical
    }
  };

  // Save pixel ID to Supabase (not localStorage)
  const savePixelId = async () => {
    setPixelSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ updates: { meta_pixel_id: pixelId } }),
      });
      if (res.ok) {
        setPixelSaved(true);
        setTimeout(() => setPixelSaved(false), 2000);
        if (pixelId) {
          localStorage.setItem('meta_pixel_id', pixelId);
        } else {
          localStorage.removeItem('meta_pixel_id');
        }
      }
    } catch {
      // silently fail
    } finally {
      setPixelSaving(false);
    }
  };

  // Load analytics from Supabase via /api/admin/analytics
  const loadAnalytics = async (token: string, range: string = '30d') => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      } else {
        setAnalytics(null);
      }
    } catch {
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthenticated(false);
    setLeads([]);
    setAdminToken('');
  };

  // Login screen
  if (!authenticated) {
    return (
      <>
        <Meta title="Admin | Sistema Britto" description="" path="/admin" noIndex={true} />
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
          <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔒</div>
              <h1 className="text-2xl font-bold text-white mb-2">Painel Admin</h1>
              <p className="text-gray-400 text-sm">Sistema Britto</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-semibold block mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                  autoFocus
                />
              </div>

              {loginError && (
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-primary-500 hover:bg-primary-600 text-black py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar →'}
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

  // Admin dashboard
  return (
    <>
      <Meta title="Painel Admin | Sistema Britto" description="" path="/admin" noIndex={true} />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        {/* Header */}
        <div className="bg-[#111111] border-b border-green-500/20 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-sm">SB</div>
              <h1 className="text-xl font-bold text-white">Painel Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-xs hidden sm:inline">sistemabritto.com.br</span>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'leads'
                  ? 'bg-green-500 text-black'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              📋 Leads
            </button>
            <button
              onClick={() => { setActiveTab('analytics'); if (!analytics) loadAnalytics(adminToken, analyticsRange); }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-green-500 text-black'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'config'
                  ? 'bg-green-500 text-black'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              ⚙️ Config
            </button>
            <button
              onClick={() => {
                setActiveTab('capi')
                if (!capiStatus) {
                  fetch('/api/admin/meta-capi', { headers: { Authorization: `Bearer ${adminToken}` } })
                    .then((r) => r.json())
                    .then((data) => setCapiStatus(data))
                    .catch(() => {})
                }
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'capi'
                  ? 'bg-green-500 text-black'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              🔌 Meta CAPI
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-8">
          {/* === LEADS TAB === */}
          {activeTab === 'leads' && (
            <>
              {/* Stats cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Leads</div>
                  <div className="text-3xl font-bold text-white">{totalLeads}</div>
                </div>
                {stages.map((stage) => (
                  <div key={stage.name} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{stage.name}</div>
                    <div className="text-3xl font-bold text-white">{stage.count}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Leads table */}
                <div className="lg:col-span-2">
                  <div className="bg-[#111111] rounded-2xl border border-green-500/20 overflow-hidden">
                    <div className="px-6 py-4 border-b border-green-500/20 flex items-center justify-between">
                      <h2 className="text-lg font-bold text-white">Leads Recentes</h2>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${evoApiStatus === 'ok' ? 'bg-green-500' : evoApiStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        <span className="text-gray-400 text-xs">
                          {evoApiStatus === 'ok' ? 'EvoCRM OK' : evoApiStatus === 'checking' ? 'Carregando...' : 'EvoCRM Offline'}
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      {dataLoading ? (
                        <div className="p-12 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-3" />
                          <p className="text-gray-400 text-sm">Carregando leads...</p>
                        </div>
                      ) : leads.length === 0 ? (
                        <div className="p-12 text-center">
                          <div className="text-4xl mb-3">📭</div>
                          <p className="text-gray-400">Nenhum lead ainda. Assim que alguém preencher um formulário no site, aparece aqui.</p>
                        </div>
                      ) : (
                        <table className="w-full text-sm text-left">
                          <thead className="text-gray-400 text-xs uppercase bg-black/30">
                            <tr>
                              <th className="px-6 py-3">Nome</th>
                              <th className="px-6 py-3">Contato</th>
                              <th className="px-6 py-3">Stage</th>
                              <th className="px-6 py-3">Origem</th>
                              <th className="px-6 py-3">Plano</th>
                              <th className="px-6 py-3">Data</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {leads.slice(0, 50).map((lead) => (
                              <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-3 font-medium text-white">{lead.name || 'n/d'}</td>
                                <td className="px-6 py-3">
                                  {lead.email && <div className="text-gray-200">{lead.email}</div>}
                                  {lead.phone && <div className="text-gray-500 text-xs">{lead.phone}</div>}
                                  {!lead.email && !lead.phone && <span className="text-gray-500">n/d</span>}
                                </td>
                                <td className="px-6 py-3">
                                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    lead.stage === 'Novo Lead' ? 'bg-blue-500/20 text-blue-300' :
                                    lead.stage === 'Contato' ? 'bg-purple-500/20 text-purple-300' :
                                    lead.stage === 'Qualificação' ? 'bg-yellow-500/20 text-yellow-300' :
                                    lead.stage === 'Proposta' ? 'bg-pink-500/20 text-pink-300' :
                                    lead.stage === 'Fechado' ? 'bg-green-500/20 text-green-300' :
                                    'bg-gray-500/20 text-gray-300'
                                  }`}>{lead.stage}</span>
                                </td>
                                <td className="px-6 py-3 text-gray-400">{lead.source || 'n/d'}</td>
                                <td className="px-6 py-3 text-gray-300">{lead.plan || 'n/d'}</td>
                                <td className="px-6 py-3 text-gray-500 text-xs">
                                  {lead.entered_at ? new Date(lead.entered_at).toLocaleDateString('pt-BR') : 'n/d'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-bold text-white mb-4">Ações Rápidas</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => loadLeads(adminToken)}
                        className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all text-left flex items-center gap-2"
                      >
                        🔄 Recarregar Leads
                      </button>
                      <a
                        href="https://crm.workflowapi.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all text-left flex items-center gap-2"
                      >
                        📊 Abrir EvoCRM →
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-bold text-white mb-4">Info</h3>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>Pipeline: <span className="text-green-400">Leads do Site</span></p>
                      <p>API: <span className={`${evoApiStatus === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
                        {evoApiStatus === 'ok' ? 'Conectada' : 'Verificando...'}
                      </span></p>
                      <p>Config: <span className="text-green-400">Supabase</span></p>
                      <p className="text-xs text-gray-500 mt-4">
                        Leads salvos no EvoCRM · Config salva no Supabase
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* === ANALYTICS TAB === */}
          {activeTab === 'analytics' && (
            <>
              {/* Range selector */}
              <div className="flex gap-2 mb-6">
                {(['7d', '30d', '90d'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => { setAnalyticsRange(r); loadAnalytics(adminToken, r); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      analyticsRange === r ? 'bg-green-500 text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {r === '7d' ? '7 dias' : r === '30d' ? '30 dias' : '90 dias'}
                  </button>
                ))}
              </div>

              {analyticsLoading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">Carregando analytics...</p>
                </div>
              ) : !analytics ? (
                <div className="bg-[#111111] rounded-2xl p-12 border border-green-500/20 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-gray-400">Nenhum dado de analytics ainda. Os pageviews começam a ser rastreados a partir do próximo deploy.</p>
                </div>
              ) : (
                <>
                  {/* KPI cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Pageviews</div>
                      <div className="text-3xl font-bold text-white">{analytics.totalPageviews.toLocaleString('pt-BR')}</div>
                    </div>
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Visitantes Únicos</div>
                      <div className="text-3xl font-bold text-white">{analytics.uniqueVisitors.toLocaleString('pt-BR')}</div>
                    </div>
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">🟢 Online Agora</div>
                      <div className="text-3xl font-bold text-green-400">{analytics.onlineNow}</div>
                    </div>
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Taxa de Conversão</div>
                      <div className="text-3xl font-bold text-purple-400">{analytics.conversionRate}%</div>
                      <div className="text-gray-500 text-xs mt-1">{analytics.totalCtaClicks} cliques CTA</div>
                    </div>
                  </div>

                  {/* ── FUNIL ────────────────────────────────────────────────
                      Números soltos não mostram gargalo. O funil mostra: cada
                      etapa vem com a queda percentual ao lado, e o maior número
                      vermelho é onde mexer muda o resultado.

                      É a mesma leitura que a rotina de domingo faz sozinha
                      (ADWs/routines/weekly_funnel_review.py no OmniNexus) para
                      abrir ticket com hipótese. Aqui é para o humano ver. */}
                  <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">🔻 Funil</h3>
                    <p className="text-gray-500 text-sm mb-5">
                      A maior queda é o gargalo. É por ela que se começa.
                    </p>
                    {(() => {
                      const etapas = [
                        { nome: 'Visitou o site', valor: analytics.uniqueVisitors },
                        { nome: 'Clicou num CTA', valor: analytics.totalCtaClicks },
                        { nome: 'Virou lead', valor: totalLeads },
                        { nome: 'Fechou', valor: stages.find(s => s.name.toLowerCase() === 'fechado')?.count ?? 0 },
                      ];
                      const base = etapas[0].valor || 1;
                      // A pior queda é destacada; sem ela o operador lê quatro
                      // números e não sabe qual atacar primeiro.
                      let piorIdx = -1, piorPerda = 0;
                      etapas.forEach((e, i) => {
                        if (i === 0) return;
                        const perda = etapas[i - 1].valor - e.valor;
                        if (etapas[i - 1].valor >= 20 && perda > piorPerda) { piorPerda = perda; piorIdx = i; }
                      });
                      return (
                        <div className="space-y-2">
                          {etapas.map((e, i) => {
                            const anterior = i > 0 ? etapas[i - 1].valor : null;
                            const queda = anterior && anterior > 0
                              ? Math.round(100 * (anterior - e.valor) / anterior) : null;
                            const largura = Math.max(4, Math.round(100 * e.valor / base));
                            const critica = i === piorIdx;
                            return (
                              <div key={e.nome}>
                                <div className="flex items-baseline justify-between gap-3 mb-1">
                                  <span className="text-gray-300 text-sm">{e.nome}</span>
                                  <span className="flex items-baseline gap-2">
                                    <span className="text-white font-bold tabular-nums">{e.valor.toLocaleString('pt-BR')}</span>
                                    {queda !== null && (
                                      <span className={`text-xs tabular-nums ${critica ? 'text-red-400 font-bold' : 'text-gray-500'}`}>
                                        −{queda}%
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${critica ? 'bg-red-500/70' : 'bg-green-500/60'}`}
                                    style={{ width: `${largura}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                          {piorIdx > 0 && (
                            <p className="text-red-400/90 text-sm pt-3">
                              Maior perda: <strong>{piorPerda.toLocaleString('pt-BR')} pessoas</strong> entre
                              {' '}&quot;{etapas[piorIdx - 1].nome}&quot; e &quot;{etapas[piorIdx].nome}&quot;.
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* ── ATRIBUIÇÃO ─────────────────────────────────────────── */}
                  {analytics.attribution && analytics.attribution.byCampaign.length > 0 && (
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 mb-6">
                      <h3 className="text-lg font-bold text-white mb-1">🎯 Qual conteúdo gerou clique</h3>
                      <p className="text-gray-500 text-sm mb-4">
                        A campanha da UTM é o slug do artigo, e é isto que separa
                        um post que converte de vinte que não convertem.
                      </p>
                      <div className="space-y-2">
                        {analytics.attribution.byCampaign.slice(0, 8).map(c => (
                          <div key={c.campaign} className="flex items-baseline justify-between gap-3 text-sm">
                            <span className="text-gray-300 truncate">{c.campaign}</span>
                            <span className="text-green-400 font-bold tabular-nums shrink-0">{c.clicks}</span>
                          </div>
                        ))}
                      </div>
                      {analytics.attribution.clicksUnattributed > 0 && (
                        <p className="text-gray-500 text-xs mt-4 pt-3 border-t border-white/[0.06]">
                          {analytics.attribution.clicksUnattributed} clique(s) sem origem identificada.
                          chegaram sem pageview na janela, ou sem UTM no link.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Daily views mini chart (CSS bars) */}
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                      <h3 className="text-lg font-bold text-white mb-4">📅 Visitas por Dia</h3>
                      {analytics.dailyViews.length === 0 ? (
                        <p className="text-gray-500 text-sm">Sem dados ainda</p>
                      ) : (
                        <div className="flex items-end gap-1 h-32">
                          {analytics.dailyViews.slice(-30).map((d) => {
                            const max = Math.max(...analytics.dailyViews.map(x => x.views), 1);
                            const h = Math.max((d.views / max) * 100, 2);
                            return (
                              <div key={d.date} className="flex-1 flex flex-col items-center gap-1" title={`${d.date}: ${d.views}`}>
                                <div
                                  className="w-full bg-green-500/80 rounded-t hover:bg-green-400 transition-colors"
                                  style={{ height: `${h}%` }}
                                />
                                {analytics.dailyViews.length <= 15 && (
                                  <span className="text-gray-500 text-[8px]">{d.date.slice(5)}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Traffic by source */}
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                      <h3 className="text-lg font-bold text-white mb-4">🔗 Tráfego por Origem</h3>
                      {analytics.trafficBySource.length === 0 ? (
                        <p className="text-gray-500 text-sm">Sem dados ainda</p>
                      ) : (
                        <div className="space-y-3">
                          {analytics.trafficBySource.map((s) => {
                            const maxViews = analytics.trafficBySource[0]?.views || 1;
                            const pct = (s.views / maxViews) * 100;
                            return (
                              <div key={s.source}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-200 font-medium">{s.source === 'direct' ? '🔍 Direto' : s.source}</span>
                                  <span className="text-gray-400">{s.views.toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2">
                                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 🎯 Conversion by page — THE KEY METRIC */}
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 lg:col-span-2">
                      <h3 className="text-lg font-bold text-white mb-2">🎯 Taxa de Conversão por Página</h3>
                      <p className="text-gray-500 text-xs mb-4">Pageviews → CTA cliques = onde intervir. Mínimo 3 pageviews pra aparecer.</p>
                      {analytics.conversionByPage.length === 0 ? (
                        <p className="text-gray-500 text-sm">Aguardando dados suficientes (pelo menos 3 pageviews por página com cliques).</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                                <th className="text-left py-2 pr-4">Página</th>
                                <th className="text-right py-2 px-3">Visitas</th>
                                <th className="text-right py-2 px-3">Cliques</th>
                                <th className="text-right py-2 pl-3">Conv. %</th>
                                <th className="text-right py-2 pl-3">Barra</th>
                              </tr>
                            </thead>
                            <tbody>
                              {analytics.conversionByPage.map((p) => (
                                <tr key={p.path} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                  <td className="py-2 pr-4 text-gray-200 font-mono text-xs">{p.path}</td>
                                  <td className="py-2 px-3 text-right text-white font-semibold">{p.pageviews}</td>
                                  <td className="py-2 px-3 text-right text-purple-300">{p.clicks}</td>
                                  <td className="py-2 pl-3 text-right">
                                    <span className={`font-bold ${p.rate >= 5 ? 'text-green-400' : p.rate >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                                      {p.rate}%
                                    </span>
                                  </td>
                                  <td className="py-2 pl-3">
                                    <div className="w-20 bg-white/5 rounded-full h-2 ml-auto">
                                      <div
                                        className={`h-2 rounded-full ${p.rate >= 5 ? 'bg-green-500' : p.rate >= 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                        style={{ width: `${Math.min(p.rate * 4, 100)}%` }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* 🎯 Conversion by page × source — a pergunta que a de cima não responde */}
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 lg:col-span-2">
                      <h3 className="text-lg font-bold text-white mb-2">🔀 Conversão por Página × Origem</h3>
                      <p className="text-gray-500 text-xs mb-4">Mesma URL, origens diferentes — pra saber se foi o Reel ou a busca orgânica que converteu. Mínimo 2 visitas por combinação.</p>
                      {analytics.conversionByPageAndSource.length === 0 ? (
                        <p className="text-gray-500 text-sm">Aguardando dados suficientes (pelo menos 2 visitas por combinação página + origem com cliques).</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                                <th className="text-left py-2 pr-4">Página</th>
                                <th className="text-left py-2 px-3">Origem</th>
                                <th className="text-left py-2 px-3">Campanha</th>
                                <th className="text-right py-2 px-3">Visitas</th>
                                <th className="text-right py-2 px-3">Cliques</th>
                                <th className="text-right py-2 pl-3">Conv. %</th>
                              </tr>
                            </thead>
                            <tbody>
                              {analytics.conversionByPageAndSource.map((p, i) => (
                                <tr key={`${p.path}-${p.source}-${i}`} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                  <td className="py-2 pr-4 text-gray-200 font-mono text-xs">{p.path}</td>
                                  <td className="py-2 px-3 text-gray-300">{p.source === 'direct' ? '🔍 Direto' : p.source}</td>
                                  <td className="py-2 px-3 text-gray-500 text-xs">{p.campaign || '—'}</td>
                                  <td className="py-2 px-3 text-right text-white font-semibold">{p.pageviews}</td>
                                  <td className="py-2 px-3 text-right text-purple-300">{p.clicks}</td>
                                  <td className="py-2 pl-3 text-right">
                                    <span className={`font-bold ${p.rate >= 5 ? 'text-green-400' : p.rate >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                                      {p.rate}%
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* CTA clicks */}
                    <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                      <h3 className="text-lg font-bold text-white mb-4">👆 Cliques em CTAs</h3>
                      {analytics.ctaClicks.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nenhum clique em CTA nesta janela. Os botões já registram. Se a página teve visitas e nenhum clique, é dado, não falta de instrumentação.</p>
                      ) : (
                        <div className="space-y-2">
                          {analytics.ctaClicks.map((c, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                              <span className="text-gray-500 w-5 text-right">{i + 1}.</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-gray-200 font-medium truncate">{c.label}</div>
                                <div className="text-gray-500 text-xs font-mono truncate">{c.page}</div>
                              </div>
                              <span className="text-purple-400 font-semibold">{c.clicks.toLocaleString('pt-BR')}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* === CONFIG TAB === */}
          {activeTab === 'config' && (
            <div className="max-w-2xl">
              {/* Meta Pixel */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">🎯</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Meta Pixel</h3>
                    <p className="text-gray-400 text-xs">Rastreamento de conversões do Facebook/Instagram Ads</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  placeholder="Ex: 1234567890123456"
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm mb-3"
                />
                <button
                  onClick={savePixelId}
                  disabled={pixelSaving}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-bold text-sm transition-all disabled:opacity-50"
                >
                  {pixelSaving ? 'Salvando...' : pixelSaved ? '✅ Salvo no Supabase!' : 'Salvar Pixel ID'}
                </button>
                <p className="text-gray-500 text-xs mt-3">
                  Salvo no Supabase, e persiste entre dispositivos e limpezas de cache. O pixel é injetado em todas as páginas automaticamente.
                </p>
              </div>

              {/* Google Tag Manager */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-xl">🏷️</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Google Tag Manager</h3>
                    <p className="text-gray-400 text-xs">Rastreamento de eventos, conversões e analytics avançado</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={gtmId}
                  onChange={(e) => setGtmId(e.target.value)}
                  placeholder="Ex: GTM-XXXXXXX"
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none text-sm mb-3"
                />
                <button
                  onClick={async () => {
                    setGtmSaving(true);
                    try {
                      const res = await fetch('/api/admin/config', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${adminToken}`,
                        },
                        body: JSON.stringify({ updates: { google_gtm_id: gtmId } }),
                      });
                      if (res.ok) {
                        setGtmSaved(true);
                        setTimeout(() => setGtmSaved(false), 2000);
                      }
                    } catch {
                      // silently fail
                    } finally {
                      setGtmSaving(false);
                    }
                  }}
                  disabled={gtmSaving}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-bold text-sm transition-all disabled:opacity-50"
                >
                  {gtmSaving ? 'Salvando...' : gtmSaved ? '✅ Salvo no Supabase!' : 'Salvar GTM ID'}
                </button>
                <p className="text-gray-500 text-xs mt-3">
                  Ao salvar, o GTM é injetado em todas as páginas automaticamente, e rastreia pageviews, cliques em CTAs e eventos customizados.
                </p>
              </div>

              {/* Site Name */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">🌐</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Nome do Site</h3>
                    <p className="text-gray-400 text-xs">Usado em SEO e meta tags</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Sistema Britto"
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none text-sm mb-3"
                />
                <button
                  onClick={async () => {
                    const res = await fetch('/api/admin/config', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${adminToken}`,
                      },
                      body: JSON.stringify({ updates: { site_name: siteName } }),
                    });
                    if (res.ok) {
                      setPixelSaved(true);
                      setTimeout(() => setPixelSaved(false), 2000);
                    }
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-bold text-sm transition-all"
                >
                  Salvar Nome
                </button>
              </div>

              {/* Supabase Status */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-lg font-bold text-white mb-4">Fonte de Dados</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Leads</span>
                    <span className="text-green-400 font-semibold">EvoCRM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Config (Pixel, etc)</span>
                    <span className="text-green-400 font-semibold">Supabase</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Auth (login admin)</span>
                    <span className="text-green-400 font-semibold">HMAC Token</span>
                  </div>
                  <hr className="border-white/10 my-2" />
                  <p className="text-gray-500 text-xs">
                    Config já NÃO usa localStorage: tudo persistido no Supabase.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* === META CAPI TAB === */}
          {activeTab === 'capi' && (
            <div className="max-w-2xl">
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">🔌</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Meta Conversions API</h3>
                    <p className="text-gray-400 text-xs">Eventos de servidor pro Meta — complementa o Pixel quando o navegador bloqueia</p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  Pixel ID usado: <span className="text-gray-300 font-mono">{capiStatus?.pixel_id || 'nenhum (configure na aba Config)'}</span>
                </div>

                <div className="text-xs text-gray-500 mb-1">
                  Token atual: {capiStatus?.configurado
                    ? <span className="text-green-400 font-mono">{capiStatus.token_preview}</span>
                    : <span className="text-red-400">nenhum salvo</span>}
                </div>

                <input
                  type="password"
                  value={capiToken}
                  onChange={(e) => setCapiToken(e.target.value)}
                  placeholder="Cole o access token do Conversions API"
                  autoComplete="off"
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm mb-3 mt-3"
                />

                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      if (!capiToken.trim()) return
                      setCapiSaving(true)
                      setCapiValidation(null)
                      try {
                        const res = await fetch('/api/admin/meta-capi', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
                          body: JSON.stringify({ access_token: capiToken.trim() }),
                        })
                        if (res.ok) {
                          setCapiToken('')
                          const statusRes = await fetch('/api/admin/meta-capi', { headers: { Authorization: `Bearer ${adminToken}` } })
                          setCapiStatus(await statusRes.json())
                        }
                      } finally {
                        setCapiSaving(false)
                      }
                    }}
                    disabled={capiSaving || !capiToken.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-bold text-sm transition-all disabled:opacity-50"
                  >
                    {capiSaving ? 'Salvando...' : 'Salvar Token'}
                  </button>
                  <button
                    onClick={async () => {
                      setCapiValidating(true)
                      setCapiValidation(null)
                      try {
                        const res = await fetch('/api/admin/meta-capi/validate', {
                          method: 'POST',
                          headers: { Authorization: `Bearer ${adminToken}` },
                        })
                        setCapiValidation(await res.json())
                      } catch {
                        setCapiValidation({ ok: false, detalhe: 'falha de rede ao validar' })
                      } finally {
                        setCapiValidating(false)
                      }
                    }}
                    disabled={capiValidating || !capiStatus?.configurado}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-bold text-sm transition-all disabled:opacity-50"
                  >
                    {capiValidating ? 'Validando...' : 'Validar'}
                  </button>
                </div>

                {capiValidation && (
                  <div className={`mt-3 text-sm rounded-xl px-4 py-3 border ${
                    capiValidation.ok
                      ? 'bg-green-500/10 border-green-500/30 text-green-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    {capiValidation.ok ? '✅ ' : '❌ '}{capiValidation.detalhe}
                  </div>
                )}

                <p className="text-gray-500 text-xs mt-3">
                  O token fica numa tabela separada no Supabase (`secret_config`), sem leitura pública —
                  diferente do Pixel ID, que é público de propósito. Validar manda um evento real de
                  teste pro Graph API; erro aqui é erro da própria Meta, não achismo nosso.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
