import React, { useState } from 'react';
import { EnvironmentalData, HouseholdProfile } from '../types';
import { ShieldAlert, CheckSquare, Square, Users, Baby, HeartPulse, UserCheck, AlertTriangle } from 'lucide-react';

interface FamilySafetyProps {
  data: EnvironmentalData;
}

export const FamilySafety: React.FC<FamilySafetyProps> = ({ data }) => {
  const [profiles, setProfiles] = useState<HouseholdProfile[]>([
    {
      id: 'kids',
      title: 'Families with Children',
      description: 'Children breathe faster and inhale more air per pound than adults. Protect outdoor school sports & recess during high AQI.',
      iconName: 'Baby',
      active: true,
    },
    {
      id: 'elderly',
      title: 'Older Adults (65+)',
      description: 'Increased vulnerability to cardiovascular and pulmonary stress during severe smog events.',
      iconName: 'UserCheck',
      active: true,
    },
    {
      id: 'respiratory',
      title: 'Asthma & Respiratory Sensitivities',
      description: 'Requires strict adherence to inhaler action plans and continuous indoor HEPA filtration.',
      iconName: 'HeartPulse',
      active: false,
    },
    {
      id: 'general',
      title: 'General Household Protection',
      description: 'Standard air quality precautions and monitoring for all household members.',
      iconName: 'Users',
      active: true,
    },
  ]);

  const toggleProfile = (id: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const isHighPollution = data.aqi > 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 px-3 py-1 bg-purple-50 rounded-full border border-purple-200">
            Family Safety Mode
          </span>
          <h2 className="text-2xl font-space font-bold text-[#0f172a] mt-2">
            Household Vulnerability & Protection Center
          </h2>
          <p className="text-sm text-[#64748b]">
            Select household needs to receive tailored health precautions and activity alerts.
          </p>
        </div>

        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          isHighPollution ? 'bg-red-50 border-red-200 text-red-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Safety Alert Status</p>
            <p className="text-sm font-semibold">
              {isHighPollution ? 'Active Advisory: Restrict Outdoor Exposure' : 'Conditions Stable: Normal Family Activity'}
            </p>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => toggleProfile(profile.id)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              profile.active
                ? 'bg-purple-50/40 border-purple-300 shadow-md'
                : 'bg-white border-[#e2e8f0] opacity-75 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    profile.active ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {profile.id === 'kids' && <Baby className="w-5 h-5" />}
                    {profile.id === 'elderly' && <UserCheck className="w-5 h-5" />}
                    {profile.id === 'respiratory' && <HeartPulse className="w-5 h-5" />}
                    {profile.id === 'general' && <Users className="w-5 h-5" />}
                  </div>
                  <h3 className="font-space font-bold text-lg text-[#0f172a]">{profile.title}</h3>
                </div>
                {profile.active ? (
                  <CheckSquare className="w-6 h-6 text-purple-600" />
                ) : (
                  <Square className="w-6 h-6 text-[#94a3b8]" />
                )}
              </div>
              <p className="text-sm text-[#64748b] leading-relaxed">{profile.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2e8f0]/60 flex items-center justify-between text-xs font-semibold">
              <span className={profile.active ? 'text-purple-700' : 'text-[#64748b]'}>
                {profile.active ? 'Active Profile Protection Enabled' : 'Click to enable'}
              </span>
              <span className="text-[#64748b]">AQI Trigger: &gt; 100</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tailored Medical Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm mb-1">Medical Disclaimer</p>
          <p className="leading-relaxed">
            AirWise AI provides environmental telemetry and precautionary lifestyle guidance based on verified meteorological and particulate data. This application does not diagnose medical conditions or replace professional medical advice. Always consult a physician for respiratory or cardiovascular treatment plans.
          </p>
        </div>
      </div>
    </div>
  );
};
