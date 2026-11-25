import React from 'react';
import { EnvironmentalData } from '../types';
import { Home, ShieldCheck, Wind, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface IndoorAirQualityProps {
  data: EnvironmentalData;
}

export const IndoorAirQuality: React.FC<IndoorAirQualityProps> = ({ data }) => {
  const isOutdoorSafeForVentilation = data.aqi <= 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
            Healthy Indoor Spaces
          </span>
          <h2 className="text-2xl font-space font-bold text-[#0f172a] mt-2">
            Indoor Air Quality & Ventilation Guide
          </h2>
          <p className="text-sm text-[#64748b]">
            Protect your indoor sanctuary by synchronizing ventilation with outdoor AQI conditions.
          </p>
        </div>
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          isOutdoorSafeForVentilation 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          {isOutdoorSafeForVentilation ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
          )}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Ventilation Status</p>
            <p className="text-sm font-semibold">
              {isOutdoorSafeForVentilation ? 'Safe to open windows for ventilation' : 'Keep windows closed; use HEPA air purifiers'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Indoor Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="font-space font-bold text-lg text-[#0f172a]">Smart Ventilation Timing</h3>
            <p className="text-sm text-[#64748b] mt-2">
              Outdoor pollution fluctuates throughout the day. Ventilation is generally safest early in the morning before heavy traffic builds up or when wind speeds increase.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-medium text-emerald-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Recommended: Check AQI before opening windows.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-space font-bold text-lg text-[#0f172a]">HEPA Air Filtration</h3>
            <p className="text-sm text-[#64748b] mt-2">
              True HEPA filters capture 99.97% of airborne particles down to 0.3 microns, including fine PM2.5 dust and allergens. Run air purifiers on medium-high speed during high smog episodes.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-medium text-blue-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Replace pre-filters every 3-6 months.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="font-space font-bold text-lg text-[#0f172a]">Managing Cooking Pollution</h3>
            <p className="text-sm text-[#64748b] mt-2">
              Indoor cooking (frying, grilling, gas stoves) generates ultra-fine particles. Always turn on kitchen exhaust hoods and keep interior doors closed while cooking.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-medium text-amber-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Use electric induction or vented exhaust.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-space font-bold text-lg text-[#0f172a]">Reducing Indoor Dust</h3>
            <p className="text-sm text-[#64748b] mt-2">
              Use damp mops instead of dry sweeping or feather dusting, which re-suspends settled particulate matter into the breathing zone. Vacuum with HEPA-equipped vacuum cleaners.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-medium text-purple-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Microfiber damp mopping is most effective.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-space font-bold text-lg text-[#0f172a]">Avoiding Indoor Smoke</h3>
            <p className="text-sm text-[#64748b] mt-2">
              Strictly avoid indoor smoking, incense burning, or scented candles during high pollution days as they rapidly increase indoor PM2.5 concentrations beyond outdoor levels.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Keep indoor air combustion-free.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-space font-bold text-lg text-[#0f172a]">Door & Window Sealing</h3>
            <p className="text-sm text-[#64748b] mt-2">
              Check weather stripping around doors and windows. Air leaks allow outside smog to infiltrate living spaces even when windows are closed. Use draft stoppers for exterior doors.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-medium text-teal-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Seal gaps with weatherproofing tape.
          </div>
        </div>
      </div>
    </div>
  );
};
