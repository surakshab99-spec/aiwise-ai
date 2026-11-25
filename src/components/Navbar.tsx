import React from 'react';
import { 
  Wind, 
  LayoutDashboard, 
  Activity, 
  Bot, 
  Home, 
  CheckSquare, 
  Leaf, 
  MapPin, 
  ShieldAlert, 
  Users, 
  Settings,
  Search,
  Navigation,
  User,
  LogOut,
  LogIn
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cityName: string;
  aqi: number;
  statusColor: string;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cityName,
  aqi,
  statusColor,
  onOpenSearch,
  onOpenSettings,
  user,
  onOpenAuth,
  onLogout
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'air-quality', label: 'Live AQI', icon: Activity },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, badge: 'GenAI' },
    { id: 'indoor', label: 'Indoor Spaces', icon: Home },
    { id: 'planner', label: 'Daily Planner', icon: CheckSquare },
    { id: 'impact', label: 'Impact Tracker', icon: Leaf },
    { id: 'map', label: 'Pollution Map', icon: MapPin },
    { id: 'family', label: 'Family Safety', icon: ShieldAlert },
    { id: 'community', label: 'Community Hub', icon: Users },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white/90 backdrop-blur-md border-r border-[#e2e8f0] flex flex-col shrink-0 lg:min-h-screen sticky top-0 z-40 shadow-sm">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#334155] flex items-center justify-center text-white shadow-md">
            <Wind className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h1 className="font-space font-bold text-xl text-[#0f172a] tracking-tight flex items-center gap-1.5">
              AirWise <span className="text-emerald-600 font-extrabold text-xs px-1.5 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">AI</span>
            </h1>
            <p className="text-xs text-[#64748b] font-medium">Breathe Smarter</p>
          </div>
        </div>
      </div>

      {/* Location Bar & Quick Status */}
      <div className="p-4 mx-3 my-3 bg-[#f0f7ff] rounded-xl border border-[#dce9ff] flex items-center justify-between">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0 text-blue-600">
            <Navigation className="w-4 h-4" />
          </div>
          <div className="truncate">
            <p className="text-xs text-[#64748b] font-semibold uppercase tracking-wider">Location</p>
            <p className="text-sm font-bold text-[#0f172a] truncate">{cityName}</p>
          </div>
        </div>
        <button 
          onClick={onOpenSearch}
          className="p-2 hover:bg-white rounded-lg transition-colors text-[#334155] shrink-0"
          title="Change location"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#0f172a] text-white shadow-md shadow-slate-900/10 font-semibold'
                  : 'text-[#334155] hover:bg-[#f8fafc] hover:text-[#0f172a]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-[#64748b]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Auth Section */}
      <div className="p-4 border-t border-[#e2e8f0] bg-white/50 space-y-2">
        {user ? (
          <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-[#0f172a] truncate">{user.name}</p>
                <p className="text-[10px] text-[#64748b] truncate">{user.role}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>
        )}

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl font-medium text-xs text-[#334155] hover:bg-[#f8fafc] transition-colors"
        >
          <Settings className="w-3.5 h-3.5 text-[#64748b]" />
          <span>Settings & Data Sources</span>
        </button>

        <div className="pt-2 border-t border-[#e2e8f0]/60 flex items-center justify-between text-[11px] text-[#64748b]">
          <span>AQI Index: <strong>{aqi}</strong></span>
          <span className="flex items-center gap-1 font-semibold" style={{ color: statusColor }}>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: statusColor }}></span>
            Live Telemetry
          </span>
        </div>
      </div>
    </aside>
  );
};
