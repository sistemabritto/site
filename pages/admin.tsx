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

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dados
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<StageCount[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);

  // Config
  const [pixelId, setPixelId] = useState('');
  const [pixelSaved, setPixelSaved] = useState(false);
  const [evoApiStatus, setEvoApiStatus] = useState<'checking' | 'ok' | 'error'>('checking');

  // Check local storage for existing token
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (token) {
      verifyToken(token);
    }
  }, []);

  // Load pixel ID from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPixel = localStorage.getItem('meta_pixel_id') || '';
      setPixelId(savedPixel);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setAuthenticated(true);
        loadLeads(token);
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
        setAuthenticated(true);
        loadLeads(data.token);
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

  const savePixelId = () => {
    localStorage.setItem('meta_pixel_id', pixelId);
    setPixelSaved(true);
    setTimeout(() => setPixelSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthenticated(false);
    setLeads([]);
  };

  // Login screen
  if (!authenticated) {
    return (
      <>
        <Meta title="Admin — Sistema Britto" description="" path="/admin" noIndex={true} />
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
      <Meta title="Painel Admin — Sistema Britto" description="" path="/admin" noIndex={true} />
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

        <div className="max-w-7xl mx-auto px-4 py-8">
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
                            <td className="px-6 py-3 font-medium text-white">{lead.name || '—'}</td>
                            <td className="px-6 py-3">
                              {lead.email && <div className="text-gray-200">{lead.email}</div>}
                              {lead.phone && <div className="text-gray-500 text-xs">{lead.phone}</div>}
                              {!lead.email && !lead.phone && <span className="text-gray-500">—</span>}
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
                            <td className="px-6 py-3 text-gray-400">{lead.source || '—'}</td>
                            <td className="px-6 py-3 text-gray-300">{lead.plan || '—'}</td>
                            <td className="px-6 py-3 text-gray-500 text-xs">
                              {lead.entered_at ? new Date(lead.entered_at).toLocaleDateString('pt-BR') : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar: Configurações */}
            <div className="space-y-6">
              {/* Meta Pixel */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-lg font-bold text-white mb-4">Meta Pixel</h3>
                <p className="text-gray-400 text-xs mb-3">
                  Cole o ID do seu Pixel do Meta Ads (Facebook/Instagram) para rastrear todas as páginas do site.
                </p>
                <input
                  type="text"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  placeholder="Ex: 1234567890123456"
                  className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm mb-3"
                />
                <button
                  onClick={savePixelId}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-bold text-sm transition-all"
                >
                  {pixelSaved ? '✅ Salvo!' : 'Salvar Pixel ID'}
                </button>
              </div>

              {/* Ações Rápidas */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-lg font-bold text-white mb-4">Ações Rápidas</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => loadLeads(localStorage.getItem('admin_token') || '')}
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

              {/* Info */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-lg font-bold text-white mb-4">Info</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Pipeline: <span className="text-green-400">Leads do Site</span></p>
                  <p>API: <span className={`${evoApiStatus === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
                    {evoApiStatus === 'ok' ? 'Conectada' : 'Verificando...'}
                  </span></p>
                  <p className="text-xs text-gray-500 mt-4">
                    Os leads são salvos automaticamente no EvoCRM. Este painel apenas consulta em tempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}