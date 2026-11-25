import React, { useState } from 'react';
import { X, Wind, Lock, Mail, User, ShieldCheck, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { name: string; email: string; role: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Family Guardian');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin({
      name: name || email.split('@')[0] || 'AirWise User',
      email,
      role,
    });
    onClose();
  };

  const handleDemoLogin = (demoName: string, demoEmail: string, demoRole: string) => {
    onLogin({
      name: demoName,
      email: demoEmail,
      role: demoRole,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e8f0] space-y-6 relative overflow-hidden">
        {/* Top atmospheric glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#334155] flex items-center justify-center text-white shadow-md">
              <Wind className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-space font-bold text-xl text-[#0f172a]">AirWise AI Account</h3>
              <p className="text-xs text-[#64748b]">100% Permanently Free • Zero Subscriptions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-[#64748b]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#f8fafc] p-1 rounded-xl border border-[#e2e8f0]">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
              isLogin ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
              !isLogin ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Alexander Vance"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm focus:outline-none focus:border-blue-600 text-[#0f172a]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@airwise.ai"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm focus:outline-none focus:border-blue-600 text-[#0f172a]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm focus:outline-none focus:border-blue-600 text-[#0f172a]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isLogin ? 'Sign In to AirWise AI' : 'Create Free Account'}</span>
          </button>
        </form>

        {/* Quick Demo Login */}
        <div className="pt-4 border-t border-[#e2e8f0] space-y-2">
          <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Instant Demo Access</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('Sarah Connor', 'sarah@airwise.ai', 'Family Guardian')}
              className="p-2.5 bg-[#f8fafc] hover:bg-[#f0f7ff] border border-[#e2e8f0] rounded-xl text-xs font-semibold text-[#0f172a] text-left transition-all cursor-pointer"
            >
              <p className="font-bold">Family Guardian</p>
              <p className="text-[10px] text-[#64748b]">sarah@airwise.ai</p>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('Dr. Marcus Thorne', 'marcus@airwise.ai', 'Environmental Researcher')}
              className="p-2.5 bg-[#f8fafc] hover:bg-[#f0f7ff] border border-[#e2e8f0] rounded-xl text-xs font-semibold text-[#0f172a] text-left transition-all cursor-pointer"
            >
              <p className="font-bold">Eco Researcher</p>
              <p className="text-[10px] text-[#64748b]">marcus@airwise.ai</p>
            </button>
          </div>
        </div>

        {/* Permanent Free Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>AirWise AI is 100% permanently free with no ads, trackers, or paywalls.</span>
        </div>
      </div>
    </div>
  );
};
