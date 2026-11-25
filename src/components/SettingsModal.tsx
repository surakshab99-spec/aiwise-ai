import React, { useState } from 'react';
import { X, MapPin, Search, Globe, Shield, Bell } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  onSelectCity: (cityName: string, lat: number, lon: number) => void;
  onDetectLocation: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  cityName,
  onSelectCity,
  onDetectLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const popularCities = [
    { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e2e8f0] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
          <div>
            <h3 className="font-space font-bold text-xl text-[#0f172a]">Settings & Location</h3>
            <p className="text-xs text-[#64748b]">Configure sensor telemetry and location parameters</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-[#64748b]" />
          </button>
        </div>

        {/* Location Detection Button */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Automatic Geolocation</label>
          <button
            onClick={() => {
              onDetectLocation();
              onClose();
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Use Browser GPS Location</span>
          </button>
        </div>

        {/* Manual City Search */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Popular Cities & Monitoring Stations</label>
          <div className="grid grid-cols-2 gap-2">
            {popularCities.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  onSelectCity(city.name, city.lat, city.lon);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  cityName === city.name
                    ? 'bg-[#0f172a] text-white border-[#0f172a]'
                    : 'bg-[#f8fafc] border-[#e2e8f0] text-[#0f172a] hover:bg-[#f0f7ff]'
                }`}
              >
                <span className="font-medium text-sm">{city.name}</span>
                <MapPin className="w-3.5 h-3.5 opacity-70" />
              </button>
            ))}
          </div>
        </div>

        {/* AQI Standard note */}
        <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b]">
          <span>AQI Standard: US EPA / CPCB Scale</span>
          <span>AirWise v2.5</span>
        </div>
      </div>
    </div>
  );
};
