export interface EnvironmentalData {
  cityName: string;
  coordinates: { lat: number; lon: number };
  aqi: number;
  status: string;
  statusColor: string;
  badgeBg: string;
  textColor: string;
  healthAdvice: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    o3: number;
    so2: number;
  };
  dataSource: string;
  lastUpdated: string;
  hourlyTrends: Array<{ time: string; aqi: number; pm25: number }>;
  dailyForecast: Array<{ day: string; aqi: number; status: string; tempMax: number; tempMin: number }>;
  stations: Array<{ id: string; name: string; distance: string; aqi: number; status: string }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ActionItem {
  id: string;
  title: string;
  category: string;
  points: number;
  completed: boolean;
  impact: string;
}

export interface HouseholdProfile {
  id: string;
  title: string;
  description: string;
  iconName: string;
  active: boolean;
}

export interface CommunityChallenge {
  id: string;
  title: string;
  participants: number;
  target: number;
  progress: number;
  joined: boolean;
  rewardBadge: string;
}
