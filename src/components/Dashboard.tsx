import React from 'react';
import {
  Wind,
  Thermometer,
  Droplets,
  ArrowUpRight,
  Bot,
  Home,
  CheckSquare,
  ShieldAlert,
  RefreshCw,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EnvironmentalData } from '../types';
import { SparklesCore } from './ui/sparkles';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  data: EnvironmentalData;
  onRefresh: () => void;
  loading: boolean;
  setActiveTab: (tab: string) => void;
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  data,
  onRefresh,
  loading,
  setActiveTab,
  userName,
}) => {
  const getGaugeColor = (aqi: number) => {
    if (aqi <= 50) return '#10b981';
    if (aqi <= 100) return '#d97706';
    if (aqi <= 150) return '#ea580c';
    if (aqi <= 200) return '#dc2626';
    return '#701a75';
  };

  const getAtmosphericTheme = (aqi: number) => {
    if (aqi <= 50) {
      return {
        particleColor: '#34d399',
        beamPrimary: 'via-emerald-400',
        beamSecondary: 'via-sky-400',
        density: 75,
        speed: 1.2,
        modeLabel: 'Clean Air Stream',
      };
    }
    if (aqi <= 100) {
      return {
        particleColor: '#fbbf24',
        beamPrimary: 'via-amber-400',
        beamSecondary: 'via-sky-400',
        density: 95,
        speed: 1.5,
        modeLabel: 'Moderate Particulate Drift',
      };
    }
    if (aqi <= 150) {
      return {
        particleColor: '#fb923c',
        beamPrimary: 'via-orange-400',
        beamSecondary: 'via-amber-400',
        density: 115,
        speed: 1.8,
        modeLabel: 'Elevated Fine Dust',
      };
    }
    return {
      particleColor: '#e879f9',
      beamPrimary: 'via-fuchsia-400',
      beamSecondary: 'via-rose-400',
      density: 145,
      speed: 2.2,
      modeLabel: 'Dense Smog Alert',
    };
  };

  const gaugeColor = getGaugeColor(data.aqi);
  const percentage = Math.min(100, Math.round((data.aqi / 300) * 100));
  const atmoTheme = getAtmosphericTheme(data.aqi);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    const base = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return userName ? `${base}, ${userName.split(' ')[0]}` : base;
  };

  const personalizedTips = [
    {
      title: data.aqi <= 100 ? 'Outdoor Activity' : 'Indoor Activity Shift',
      detail:
        data.aqi <= 100
          ? 'Conditions support light outdoor walking or cycling away from arterial roads.'
          : 'Move cardio workouts indoors and keep strenuous exertion minimal outdoors.',
      tag: data.aqi <= 100 ? 'Optimal' : 'Caution',
      tagStyle: data.aqi <= 100 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      title: 'Home Ventilation',
      detail:
        data.aqi <= 100
          ? 'Cross-ventilate rooms briefly during lower-traffic hours to refresh indoor O₂.'
          : 'Keep exterior windows sealed and operate True HEPA filtration on medium-high.',
      tag: data.aqi <= 100 ? 'Safe Ventilation' : 'Seal & Filter',
      tagStyle: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Commute & Respiratory Care',
      detail:
        data.aqi > 150
          ? 'Wear a snug N95/FFP2 respirator outdoors and favor enclosed public transit.'
          : 'Combine errands into one trip or choose metro transit to curb tailpipe PM2.5.',
      tag: data.aqi > 150 ? 'N95 Advised' : 'Low-Emission',
      tagStyle: data.aqi > 150 ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Atmospheric Hero Banner with SparklesCore */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-gradient-to-br from-[#0b1c30] via-[#131b2e] to-[#0f172a] rounded-2xl p-6 md:p-7 text-white shadow-xl border border-slate-800/80 relative overflow-hidden"
      >
        {/* Interactive Atmospheric Particle Field */}
        <div className="absolute inset-0 w-full h-full z-0">
          <SparklesCore
            id="dashboard-air-particles"
            background="transparent"
            minSize={0.5}
            maxSize={1.6}
            particleDensity={atmoTheme.density}
            speed={atmoTheme.speed}
            className="w-full h-full"
            particleColor={atmoTheme.particleColor}
          />
          {/* Soft radial vignette for crisp typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/85 via-[#131b2e]/55 to-[#0f172a]/75 pointer-events-none" />
        </div>

        {/* Luminous Horizon Accent Beams */}
        <div
          className={`absolute inset-x-12 bottom-0 bg-gradient-to-r from-transparent ${atmoTheme.beamPrimary} to-transparent h-[2px] blur-xs opacity-80 pointer-events-none z-10`}
        />
        <div
          className={`absolute inset-x-12 bottom-0 bg-gradient-to-r from-transparent ${atmoTheme.beamPrimary} to-transparent h-px opacity-90 pointer-events-none z-10`}
        />
        <div
          className={`absolute inset-x-1/3 bottom-0 bg-gradient-to-r from-transparent ${atmoTheme.beamSecondary} to-transparent h-[4px] blur-sm opacity-75 pointer-events-none z-10`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" /> {atmoTheme.modeLabel}
              </span>
              <span className="px-2.5 py-1 bg-white/10 border border-white/15 text-slate-200 rounded-full text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs">
                <Calendar className="w-3 h-3 text-sky-300" /> {currentDate}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> Updated {data.lastUpdated}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-300/90 font-semibold">
                {getGreeting()}
              </p>
              <h2 className="text-2xl md:text-3xl font-space font-bold tracking-tight mt-0.5">
                Breathe Smarter in {data.cityName}
              </h2>
            </div>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {data.healthAdvice}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium text-sm text-white flex items-center gap-2 transition-all backdrop-blur-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Sensor</span>
            </button>
            <button
              onClick={() => setActiveTab('assistant')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold text-sm text-white flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Assistant</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: AQI Gauge & Key Pollutants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AQI Circular Gauge Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between relative"
        >
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Live Air Quality Index</p>
              <p className="text-xs font-medium text-[#0f172a] flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{data.dataSource}</span>
              </p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold border shrink-0"
              style={{ backgroundColor: data.badgeBg, color: data.textColor, borderColor: data.statusColor + '40' }}
            >
              {data.status}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center my-5">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="72"
                  stroke="#f1f5f9"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="72"
                  stroke={gaugeColor}
                  strokeWidth="14"
                  strokeDasharray={452}
                  strokeDashoffset={452 - (452 * percentage) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-[#64748b] font-semibold uppercase tracking-widest">US AQI</span>
                <span className="text-4xl font-space font-bold text-[#0f172a] tabular-nums">{data.aqi}</span>
                <span className="text-[11px] font-medium text-[#64748b] mt-0.5">Index Scale</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#e2e8f0]">
            <div className="bg-[#f8fafc] p-3 rounded-xl text-center border border-[#e2e8f0]">
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <Thermometer className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#64748b]">Temperature</p>
              <p className="text-base font-space font-bold text-[#0f172a] tabular-nums">{data.temperature}°C</p>
            </div>
            <div className="bg-[#f8fafc] p-3 rounded-xl text-center border border-[#e2e8f0]">
              <div className="flex items-center justify-center text-teal-600 mb-1">
                <Droplets className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#64748b]">Humidity</p>
              <p className="text-base font-space font-bold text-[#0f172a] tabular-nums">{data.humidity}%</p>
            </div>
            <div className="bg-[#f8fafc] p-3 rounded-xl text-center border border-[#e2e8f0]">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <Wind className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#64748b]">Wind Speed</p>
              <p className="text-base font-space font-bold text-[#0f172a] tabular-nums">{data.windSpeed} km/h</p>
            </div>
          </div>
        </motion.div>

        {/* Pollutant Breakdown & Hourly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Pollutant Cards */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-space font-bold text-lg text-[#0f172a]">Key Pollutants Telemetry</h3>
              <button
                onClick={() => setActiveTab('air-quality')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                Detailed breakdown <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748b]">PM2.5</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">Fine Dust</span>
                </div>
                <p className="text-xl font-space font-bold text-[#0f172a] tabular-nums">
                  {data.pollutants.pm25} <span className="text-xs font-normal text-[#64748b]">µg/m³</span>
                </p>
                <p className="text-[11px] text-[#64748b] mt-1">WHO limit: 15</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748b]">PM10</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Coarse Dust</span>
                </div>
                <p className="text-xl font-space font-bold text-[#0f172a] tabular-nums">
                  {data.pollutants.pm10} <span className="text-xs font-normal text-[#64748b]">µg/m³</span>
                </p>
                <p className="text-[11px] text-[#64748b] mt-1">WHO limit: 45</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748b]">NO₂</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Gas</span>
                </div>
                <p className="text-xl font-space font-bold text-[#0f172a] tabular-nums">
                  {data.pollutants.no2} <span className="text-xs font-normal text-[#64748b]">ppb</span>
                </p>
                <p className="text-[11px] text-[#64748b] mt-1">Traffic emissions</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748b]">O₃ (Ozone)</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">Smog</span>
                </div>
                <p className="text-xl font-space font-bold text-[#0f172a] tabular-nums">
                  {data.pollutants.o3} <span className="text-xs font-normal text-[#64748b]">ppb</span>
                </p>
                <p className="text-[11px] text-[#64748b] mt-1">Surface ozone</p>
              </div>
            </div>
          </div>

          {/* Hourly AQI Trend Chart */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-space font-bold text-lg text-[#0f172a]">Hourly AQI Trend</h3>
              <span className="text-xs text-[#64748b] font-medium">Past 12 Hours</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.hourlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={gaugeColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={gaugeColor} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area type="monotone" dataKey="aqi" stroke={gaugeColor} strokeWidth={2.5} fillOpacity={1} fill="url(#colorAqi)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Personalized Recommendations & 5-Day Forecast Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-space font-bold text-lg text-[#0f172a] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Personalized Daily Guidance
            </h3>
            <span className="text-xs text-[#64748b] font-medium">Tailored for {data.cityName}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {personalizedTips.map((tip, index) => (
              <div key={index} className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between">
                <div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 ${tip.tagStyle}`}>
                    {tip.tag}
                  </span>
                  <h4 className="font-space font-bold text-sm text-[#0f172a]">{tip.title}</h4>
                  <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{tip.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-space font-bold text-lg text-[#0f172a] flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" /> 5-Day Outlook
            </h3>
            <button
              onClick={() => setActiveTab('air-quality')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Forecast chart
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {data.dailyForecast.map((day, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-center flex flex-col items-center justify-between"
              >
                <span className="text-[11px] font-bold text-[#64748b]">{day.day}</span>
                <span
                  className="text-base font-space font-bold my-1.5 tabular-nums"
                  style={{ color: getGaugeColor(day.aqi) }}
                >
                  {day.aqi}
                </span>
                <span className="text-[10px] text-[#64748b] tabular-nums">
                  {day.tempMax}°/{day.tempMin}°
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('assistant')}
          className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <h4 className="font-space font-bold text-[#0f172a] text-base group-hover:text-emerald-600 transition-colors">AI Air Assistant</h4>
          <p className="text-xs text-[#64748b] mt-1">Ask questions about smog precautions, workouts & window ventilation.</p>
        </div>

        <div
          onClick={() => setActiveTab('indoor')}
          className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Home className="w-5 h-5" />
          </div>
          <h4 className="font-space font-bold text-[#0f172a] text-base group-hover:text-blue-600 transition-colors">Healthy Indoor Spaces</h4>
          <p className="text-xs text-[#64748b] mt-1">HEPA filtration guides, cooking pollution & safe ventilation times.</p>
        </div>

        <div
          onClick={() => setActiveTab('planner')}
          className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h4 className="font-space font-bold text-[#0f172a] text-base group-hover:text-amber-600 transition-colors">Daily Action Planner</h4>
          <p className="text-xs text-[#64748b] mt-1">Low-emission routines, public transit tips and eco-friendly checklist.</p>
        </div>

        <div
          onClick={() => setActiveTab('family')}
          className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="font-space font-bold text-[#0f172a] text-base group-hover:text-purple-600 transition-colors">Family Safety Mode</h4>
          <p className="text-xs text-[#64748b] mt-1">Customized precautions for children, elders and respiratory care.</p>
        </div>
      </div>
    </div>
  );
};
