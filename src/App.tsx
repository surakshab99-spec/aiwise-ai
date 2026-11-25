import React, { useState, useEffect } from 'react';
import { EnvironmentalData } from './types';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LiveAirQuality } from './components/LiveAirQuality';
import { AiAssistant } from './components/AiAssistant';
import { IndoorAirQuality } from './components/IndoorAirQuality';
import { ActionPlanner } from './components/ActionPlanner';
import { EnvironmentalImpact } from './components/EnvironmentalImpact';
import { PollutionMap } from './components/PollutionMap';
import { FamilySafety } from './components/FamilySafety';
import { CommunityHub } from './components/CommunityHub';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EnvironmentalData | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('airwise_user');
    return saved ? JSON.parse(saved) : { name: 'Sarah Connor', email: 'sarah@airwise.ai', role: 'Family Guardian' };
  });

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('airwise_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('airwise_user');
    setIsAuthModalOpen(true);
  };

  // Fetch environmental data from backend API
  const fetchEnvironmentalData = async (lat = 28.6139, lon = 77.2090, cityName = 'New Delhi') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/environmental-data?lat=${lat}&lon=${lon}&city=${encodeURIComponent(cityName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch environmental telemetry');
      }
      const json = await response.json();
      setData(json);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error connecting to environmental data services.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load with default city or geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchEnvironmentalData(lat, lon, 'Local GPS Location');
        },
        () => {
          fetchEnvironmentalData(28.6139, 77.2090, 'New Delhi');
        },
        { timeout: 10000 }
      );
    } else {
      fetchEnvironmentalData(28.6139, 77.2090, 'New Delhi');
    }
  }, []);

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchEnvironmentalData(position.coords.latitude, position.coords.longitude, 'Detected Location');
        },
        () => {
          alert('Geolocation permission denied. Please select from manual city list.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSelectCity = (cityName: string, lat: number, lon: number) => {
    fetchEnvironmentalData(lat, lon, cityName);
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex flex-col items-center justify-center p-6 text-[#0f172a]">
        <div className="w-16 h-16 rounded-2xl bg-[#0f172a] text-emerald-400 flex items-center justify-center animate-bounce shadow-xl mb-4">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
        <h2 className="text-xl font-space font-bold">AirWise AI is calibrating environmental sensors...</h2>
        <p className="text-xs text-[#64748b] mt-1">Connecting to Open-Meteo & OpenAQ telemetry networks</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex flex-col items-center justify-center p-6 text-[#0f172a]">
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl max-w-md text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
          <h3 className="font-space font-bold text-lg text-red-900">Connection Error</h3>
          <p className="text-xs text-red-700">{error}</p>
          <button
            onClick={() => fetchEnvironmentalData(28.6139, 77.2090, 'New Delhi')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col lg:flex-row">
      {/* Navigation Sidebar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cityName={data?.cityName || 'New Delhi'}
        aqi={data?.aqi || 150}
        statusColor={data?.statusColor || '#d97706'}
        onOpenSearch={() => setIsSettingsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && data && (
          <Dashboard
            data={data}
            onRefresh={() => fetchEnvironmentalData(data.coordinates.lat, data.coordinates.lon, data.cityName)}
            loading={loading}
            setActiveTab={setActiveTab}
            userName={user?.name}
          />
        )}
        {activeTab === 'air-quality' && data && <LiveAirQuality data={data} />}
        {activeTab === 'assistant' && data && <AiAssistant data={data} />}
        {activeTab === 'indoor' && data && <IndoorAirQuality data={data} />}
        {activeTab === 'planner' && <ActionPlanner />}
        {activeTab === 'impact' && <EnvironmentalImpact />}
        {activeTab === 'map' && data && <PollutionMap data={data} />}
        {activeTab === 'family' && data && <FamilySafety data={data} />}
        {activeTab === 'community' && <CommunityHub />}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        cityName={data?.cityName || 'New Delhi'}
        onSelectCity={handleSelectCity}
        onDetectLocation={handleDetectLocation}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
