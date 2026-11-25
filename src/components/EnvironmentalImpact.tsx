import React from 'react';
import { Leaf, Award, TrendingUp, ShieldCheck, Zap, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const EnvironmentalImpact: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', emissionsAvoided: 3.2, journeys: 2 },
    { day: 'Tue', emissionsAvoided: 4.8, journeys: 3 },
    { day: 'Wed', emissionsAvoided: 2.5, journeys: 1 },
    { day: 'Thu', emissionsAvoided: 5.6, journeys: 4 },
    { day: 'Fri', emissionsAvoided: 4.1, journeys: 3 },
    { day: 'Sat', emissionsAvoided: 6.2, journeys: 5 },
    { day: 'Sun', emissionsAvoided: 5.0, journeys: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
            Impact Dashboard
          </span>
          <h2 className="text-2xl font-space font-bold text-[#0f172a] mt-2">
            Environmental Impact Tracker
          </h2>
          <p className="text-sm text-[#64748b]">
            Visualizing estimated vehicle emissions avoided and cumulative sustainable choices.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Emissions Avoided</p>
            <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">31.4 <span className="text-base font-normal text-emerald-600">kg CO₂</span></p>
            <p className="text-xs text-[#64748b] mt-1">+14% compared to last week</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Leaf className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Avoided Car Trips</p>
            <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">22 <span className="text-base font-normal text-blue-600">journeys</span></p>
            <p className="text-xs text-[#64748b] mt-1">Via public transit & walking</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Zap className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Sustainability Tier</p>
            <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">Gold <span className="text-base font-normal text-amber-600">Guardian</span></p>
            <p className="text-xs text-[#64748b] mt-1">Top 5% community rank</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-space font-bold text-lg text-[#0f172a] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" /> Weekly CO₂ Emissions Avoided (kg)
          </h3>
          <span className="text-xs text-[#64748b]">Based on distance & transit substitution formulas</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="emissionsAvoided" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCo2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Methodology Notice */}
      <div className="bg-[#f0f7ff] border border-[#dce9ff] rounded-2xl p-5 text-[#0f172a] text-xs flex items-start gap-3">
        <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm mb-1">Impact Estimation Methodology</p>
          <p className="text-[#334155] leading-relaxed">
            Emissions avoided are calculated using standardized EPA and UNFCCC carbon offset coefficients for passenger vehicles (~120g CO₂ per km offset by public transit or active mobility). Individual actions contribute to community awareness and regional emissions reduction, though they do not directly alter ambient neighbourhood sensor readings.
          </p>
        </div>
      </div>
    </div>
  );
};
