import React, { useState, useEffect } from 'react';
import {
  marketingApi,
  ConnectedAccount
} from '../../../services/marketingApi';
import { useApp } from '../../../context/AppContext';
import {
  Share2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Key,
  Lock,
  RefreshCw,
  Info,
  Globe,
  Settings
} from 'lucide-react';

interface AccountsTabProps {
  onRefreshOverview: () => void;
}

export const AccountsTab: React.FC<AccountsTabProps> = ({ onRefreshOverview }) => {
  const { addToast } = useApp();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null);

  // Modal configuration inputs
  const [inputClientId, setInputClientId] = useState('');
  const [inputClientSecret, setInputClientSecret] = useState('');
  const [inputAccessToken, setInputAccessToken] = useState('');
  const [inputAccountId, setInputAccountId] = useState('');
  const [inputAccountName, setInputAccountName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadAccounts = async () => {
    setIsLoading(true);
    try {
      const data = await marketingApi.getAccounts();
      setAccounts(data);
    } catch (err: any) {
      console.warn('Error fetching accounts:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleOpenConfig = (acc: ConnectedAccount) => {
    setEditingPlatform(acc.platform);
    setInputClientId('');
    setInputClientSecret('');
    setInputAccessToken('');
    setInputAccountId(acc.accountId || '');
    setInputAccountName(acc.accountName || '');
  };

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlatform) return;

    setIsSaving(true);
    try {
      await marketingApi.saveAccountCredentials(editingPlatform, {
        clientId: inputClientId || undefined,
        clientSecret: inputClientSecret || undefined,
        accessToken: inputAccessToken || undefined,
        accountId: inputAccountId || undefined,
        accountName: inputAccountName || undefined
      });
      addToast(
        'Account Updated',
        inputAccessToken
          ? `Connected official ${editingPlatform} credentials verified on server.`
          : `Saved configuration for ${editingPlatform}.`,
        'success'
      );
      setEditingPlatform(null);
      await loadAccounts();
      onRefreshOverview();
    } catch (err: any) {
      addToast('Credentials Save Failed', err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisconnect = async (platform: string) => {
    if (!confirm(`Are you sure you want to disconnect ${platform}? Automated publishing to this channel will pause.`)) {
      return;
    }
    try {
      await marketingApi.disconnectAccount(platform);
      addToast('Account Disconnected', `${platform} OAuth credentials cleared from server.`, 'warning');
      await loadAccounts();
      onRefreshOverview();
    } catch (err: any) {
      addToast('Disconnect Failed', err.message, 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Official Platform Authorization Desk</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Authorized Social Account Integrations
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Configure secure, official API connections for LinkedIn Pages, Facebook Pages, and Instagram Professional accounts. Tokens are stored strictly in server-side storage and never exposed to the frontend.
          </p>
        </div>

        <button
          onClick={loadAccounts}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Compliance Anti-Simulation Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs flex items-start gap-3 border border-slate-800">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <span className="font-bold text-white">Strict Anti-Simulation Compliance Policy:</span>
          <p className="text-slate-300">
            ORANEX adheres to official platform terms. The engine will NEVER simulate publishing or fabricate social impressions. When an account lacks valid OAuth credentials or permissions, posts remain safely held in the durable queue with status <code className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded font-mono">SCHEDULED (AWAITING_OAUTH)</code> until authorized.
          </p>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {accounts.map((acc) => {
          const isConnected = acc.connected;
          const isExpired = acc.status === 'EXPIRED';

          return (
            <div
              key={acc.platform}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                isConnected
                  ? 'bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-100'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="space-y-4">
                {/* Platform Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs ${
                        acc.platform === 'LinkedIn'
                          ? 'bg-[#0077B5]'
                          : acc.platform === 'Facebook'
                          ? 'bg-[#1877F2]'
                          : 'bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4]'
                      }`}
                    >
                      {acc.platform.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{acc.platform}</h3>
                      <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {acc.accountName || 'Not configured'}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isConnected
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : isExpired
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {isConnected ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    <span>{acc.status}</span>
                  </span>
                </div>

                {/* Account Details */}
                <div className="space-y-2 text-xs">
                  {acc.accountId && (
                    <div className="flex items-center justify-between text-slate-500 py-1 border-b border-slate-100">
                      <span>Account ID:</span>
                      <span className="font-mono text-slate-800 font-semibold">{acc.accountId}</span>
                    </div>
                  )}

                  {acc.tokenExpiresAt && isConnected && (
                    <div className="flex items-center justify-between text-slate-500 py-1 border-b border-slate-100">
                      <span>Token Expiry:</span>
                      <span className="font-mono text-emerald-700 font-semibold">
                        {new Date(acc.tokenExpiresAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {/* Permissions Summary */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 font-mono mb-1">
                      Required Scopes ({acc.setupInstructions.requiredScopes.length})
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {acc.setupInstructions.requiredScopes.map((scope) => {
                        const hasScope = acc.permissions.includes(scope);
                        return (
                          <span
                            key={scope}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                              hasScope
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-200/80 text-slate-600'
                            }`}
                          >
                            {scope}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Portal Reference */}
                  <div className="pt-1">
                    <a
                      href={acc.setupInstructions.portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Official {acc.platform} Developer Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenConfig(acc)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Key className="w-3 h-3" />
                  <span>{isConnected ? 'Update Tokens' : 'Connect Account'}</span>
                </button>

                {isConnected && (
                  <button
                    onClick={() => handleDisconnect(acc.platform)}
                    className="px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg font-semibold transition cursor-pointer"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      {editingPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Configure Official {editingPlatform} Credentials
                </h3>
              </div>
              <button
                onClick={() => setEditingPlatform(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Account Name / Page Handle *
                </label>
                <input
                  type="text"
                  required
                  value={inputAccountName}
                  onChange={(e) => setInputAccountName(e.target.value)}
                  placeholder="e.g. Oranex Trading One Member PLC"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organization / Page / Account ID
                </label>
                <input
                  type="text"
                  value={inputAccountId}
                  onChange={(e) => setInputAccountId(e.target.value)}
                  placeholder="e.g. urn:li:organization:123456 or 1092837465"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  OAuth Client ID / App ID
                </label>
                <input
                  type="text"
                  value={inputClientId}
                  onChange={(e) => setInputClientId(e.target.value)}
                  placeholder="Official developer app client ID"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  OAuth Client Secret
                </label>
                <input
                  type="password"
                  value={inputClientSecret}
                  onChange={(e) => setInputClientSecret(e.target.value)}
                  placeholder="Secured on server; never shared"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Server-Side Permanent / Long-Lived Access Token
                </label>
                <textarea
                  rows={3}
                  value={inputAccessToken}
                  onChange={(e) => setInputAccessToken(e.target.value)}
                  placeholder="Paste authorized OAuth 2.0 access token generated with required publishing scopes..."
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:border-blue-600"
                />
                <span className="text-[10px] text-slate-500">
                  Providing a valid token immediately transitions status to <code className="font-semibold text-emerald-700">CONNECTED</code>.
                </span>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
                <strong>OAuth Callback Redirect URL:</strong>
                <div className="font-mono bg-white p-1 rounded mt-1 select-all border border-blue-100">
                  https://oranex.com.et/api/marketing/auth/callback
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPlatform(null)}
                  className="px-3.5 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>Save Official Configuration</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
