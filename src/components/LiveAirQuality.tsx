import React from 'react';
import { EnvironmentalData } from '../types';
import { Activity, MapPin, Calendar, ShieldCheck, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface LiveAirQualityProps {
  data: EnvironmentalData;
}

export const LiveAirQuality: React.FC<LiveAirQualityProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
            Station Telemetry
          </span>
          <h2 className="text-2xl font-space font-bold text-[#0f172a] mt-2">
            Live Air Quality & Pollutant Breakdown
          </h2>
          <p className="text-sm text-[#64748b]">
            Real-time atmospheric analysis for {data.cityName} sourced via {data.dataSource}.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#64748b]">Current AQI Status</p>
          <p className="text-xl font-space font-bold" style={{ color: data.statusColor }}>
            {data.status} ({data.aqi})
          </p>
        </div>
      </div>

      {/* Detailed Pollutants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
          <p className="text-xs font-bold text-[#64748b]">PM2.5 (Fine Particles)</p>
          <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">{data.pollutants.pm25} <span className="text-sm font-normal text-[#64748b]">µg/m³</span></p>
          <p className="text-xs text-orange-600 font-semibold mt-2">WHO Safe limit: 15 µg/m³</p>
          <p className="text-[11px] text-[#64748b] mt-1">Penetrates deep into lungs and bloodstream.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
          <p className="text-xs font-bold text-[#64748b]">PM10 (Coarse Dust)</p>
          <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">{data.pollutants.pm10} <span className="text-sm font-normal text-[#64748b]">µg/m³</span></p>
          <p className="text-xs text-amber-600 font-semibold mt-2">WHO Safe limit: 45 µg/m³</p>
          <p className="text-[11px] text-[#64748b] mt-1">Irritates eyes, nose, and respiratory airways.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
          <p className="text-xs font-bold text-[#64748b]">NO₂ (Nitrogen Dioxide)</p>
          <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">{data.pollutants.no2} <span className="text-sm font-normal text-[#64748b]">ppb</span></p>
          <p className="text-xs text-blue-600 font-semibold mt-2">Primary source: Traffic</p>
          <p className="text-[11px] text-[#64748b] mt-1">Aggravates asthma and bronchitis symptoms.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
          <p className="text-xs font-bold text-[#64748b]">O₃ (Ground Ozone)</p>
          <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">{data.pollutants.o3} <span className="text-sm font-normal text-[#64748b]">ppb</span></p>
          <p className="text-xs text-teal-600 font-semibold mt-2">Photochemical smog</p>
          <p className="text-[11px] text-[#64748b] mt-1">Reduces lung function during outdoor exertion.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm">
          <p className="text-xs font-bold text-[#64748b]">SO₂ (Sulfur Dioxide)</p>
          <p className="text-3xl font-space font-bold text-[#0f172a] mt-2">{data.pollutants.so2} <span className="text-sm font-normal text-[#64748b]">ppb</span></p>
          <p className="text-xs text-purple-600 font-semibold mt-2">Industrial source</p>
          <p className="text-[11px] text-[#64748b] mt-1">Causes respiratory constriction in sensitive groups.</p>
        </div>
      </div>

      {/* 5-Day Forecast & Monitoring Stations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 5-Day Forecast */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-space font-bold text-lg text-[#0f172a] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" /> 5-Day Pollution Forecast
            </h3>
            <span className="text-xs text-[#64748b]">Estimated Outlook</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dailyForecast} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="aqi" fill="#0284c7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monitoring Stations */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-space font-bold text-lg text-[#0f172a] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" /> Nearby Monitoring Stations
            </h3>
            <div className="space-y-3">
              {data.stations.map((station) => (
                <div key={station.id} className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-[#0f172a]">{station.name}</p>
                    <p className="text-xs text-[#64748b]">Distance: {station.distance}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-space font-bold text-base" style={{ color: station.aqi > 150 ? '#dc2626' : station.aqi > 100 ? '#ea580c' : '#10b981' }}>
                      {station.aqi}
                    </span>
                    <p className="text-[10px] font-semibold text-[#64748b]">{station.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-blue-50 text-blue-900 text-xs flex items-center gap-2 border border-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>All station data is verified through real-time atmospheric APIs.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
