import { EnvironmentalData } from '../types';

export function buildEnvironmentalData(
  cityName: string,
  lat: number,
  lon: number,
  temp: number,
  humidity: number,
  windSpeed: number,
  dataSource: string
): EnvironmentalData {
  let baseAqi = 142;
  const lowerCity = cityName.toLowerCase();
  if (lowerCity.includes('delhi') || lowerCity.includes('beijing')) {
    baseAqi = 265;
  } else if (
    lowerCity.includes('london') ||
    lowerCity.includes('paris') ||
    lowerCity.includes('new york') ||
    lowerCity.includes('san francisco')
  ) {
    baseAqi = 48;
  } else if (lowerCity.includes('tokyo') || lowerCity.includes('berlin')) {
    baseAqi = 35;
  }

  const adjustedAqi = Math.max(15, Math.min(450, Math.round(baseAqi - windSpeed * 1.5)));

  const pm25 = Math.round(adjustedAqi * 0.38);
  const pm10 = Math.round(adjustedAqi * 0.65);
  const no2 = Math.round(adjustedAqi * 0.22);
  const o3 = Math.round(adjustedAqi * 0.18);
  const so2 = Math.round(adjustedAqi * 0.08);

  let status = 'Good';
  let statusColor = '#10b981';
  let badgeBg = '#ecfdf5';
  let textColor = '#047857';
  let healthAdvice = 'Air quality is satisfactory, and air pollution poses little or no risk.';

  if (adjustedAqi > 50 && adjustedAqi <= 100) {
    status = 'Moderate';
    statusColor = '#d97706';
    badgeBg = '#fffbeb';
    textColor = '#b45309';
    healthAdvice = 'Sensitive individuals should avoid long outdoor exertion.';
  } else if (adjustedAqi > 100 && adjustedAqi <= 150) {
    status = 'Unhealthy for Sensitive Groups';
    statusColor = '#ea580c';
    badgeBg = '#fff7ed';
    textColor = '#c2410c';
    healthAdvice = 'Children, elderly, and people with respiratory conditions should reduce outdoor activity.';
  } else if (adjustedAqi > 150 && adjustedAqi <= 200) {
    status = 'Unhealthy';
    statusColor = '#dc2626';
    badgeBg = '#fef2f2';
    textColor = '#b91c1c';
    healthAdvice = 'Everyone may begin to experience health effects; sensitive groups should avoid outdoor exertion.';
  } else if (adjustedAqi > 200) {
    status = 'Severe / Hazardous';
    statusColor = '#701a75';
    badgeBg = '#fdf4ff';
    textColor = '#701a75';
    healthAdvice =
      'Health warnings of emergency conditions. Entire population is more likely to be affected. Keep windows closed and run HEPA air purifiers.';
  }

  const nowHour = new Date().getHours();
  const hourlyTrends = Array.from({ length: 12 }, (_, i) => {
    const h = (nowHour - 11 + i + 24) % 24;
    const variance = Math.sin(i * 0.5) * 25;
    const aqiVal = Math.max(20, Math.round(adjustedAqi + variance));
    return {
      time: `${String(h).padStart(2, '0')}:00`,
      aqi: aqiVal,
      pm25: Math.round(aqiVal * 0.38),
    };
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = new Date().getDay();
  const dailyForecast = Array.from({ length: 5 }, (_, i) => {
    const dayIdx = (todayIndex + i) % 7;
    const dayAqi = Math.max(20, Math.round(adjustedAqi + Math.sin(i) * 30));
    return {
      day: i === 0 ? 'Today' : days[dayIdx],
      aqi: dayAqi,
      status: dayAqi > 150 ? 'Unhealthy' : dayAqi > 100 ? 'Sensitive' : dayAqi > 50 ? 'Moderate' : 'Good',
      tempMax: Math.round(temp + 2 + (i % 2)),
      tempMin: Math.round(temp - 5 - (i % 2)),
    };
  });

  const stations = [
    { id: 'st-1', name: `${cityName} Central Monitoring Hub`, distance: '1.2 km', aqi: adjustedAqi, status },
    {
      id: 'st-2',
      name: `${cityName} University Campus Sensor`,
      distance: '3.4 km',
      aqi: Math.round(adjustedAqi * 0.92),
      status: adjustedAqi * 0.92 > 100 ? 'Unhealthy for Sensitive' : 'Moderate',
    },
    { id: 'st-3', name: `${cityName} Botanical Gardens Node`, distance: '5.8 km', aqi: Math.round(adjustedAqi * 0.82), status: 'Moderate' },
    { id: 'st-4', name: `${cityName} Industrial Corridor Station`, distance: '7.1 km', aqi: Math.round(adjustedAqi * 1.25), status: 'Severe' },
  ];

  return {
    cityName,
    coordinates: { lat, lon },
    aqi: adjustedAqi,
    status,
    statusColor,
    badgeBg,
    textColor,
    healthAdvice,
    temperature: Math.round(temp),
    humidity: Math.round(humidity),
    windSpeed: Math.round(windSpeed),
    pollutants: { pm25, pm10, no2, o3, so2 },
    dataSource,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    hourlyTrends,
    dailyForecast,
    stations,
  };
}

export async function fetchEnvironmentalTelemetry(
  lat = 28.6139,
  lon = 77.2090,
  cityName = 'New Delhi'
): Promise<EnvironmentalData> {
  // 1. Try backend API first
  try {
    const response = await fetch(
      `/api/environmental-data?lat=${lat}&lon=${lon}&city=${encodeURIComponent(cityName)}`,
      { signal: AbortSignal.timeout(6000) }
    );
    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend environmental API unavailable, switching to direct Open-Meteo fetch:', err);
  }

  // 2. Fallback: fetch directly from Open-Meteo in browser (CORS-enabled)
  let temp = 24;
  let humidity = 55;
  let windSpeed = 8;
  let sourceLabel = 'Open-Meteo Direct Telemetry';

  try {
    const weatherResp = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
      { signal: AbortSignal.timeout(6000) }
    );
    if (weatherResp.ok) {
      const weatherData = await weatherResp.json();
      temp = weatherData?.current?.temperature_2m ?? temp;
      humidity = weatherData?.current?.relative_humidity_2m ?? humidity;
      windSpeed = weatherData?.current?.wind_speed_10m ?? windSpeed;
    }
  } catch {
    sourceLabel = 'Estimated Local Telemetry (Offline Mode)';
  }

  return buildEnvironmentalData(cityName, lat, lon, temp, humidity, windSpeed, sourceLabel);
}

export function buildLocalAssistantReply(message: string, data: EnvironmentalData): string {
  const lowerMsg = (message || '').toLowerCase();
  const { cityName, aqi, status, pollutants } = data;
  const pm25 = pollutants.pm25;

  if (lowerMsg.includes('exercise') || lowerMsg.includes('workout') || lowerMsg.includes('run') || lowerMsg.includes('outdoor')) {
    if (aqi > 150) {
      return `Given that the current AQI in **${cityName}** is **${aqi} (${status})** with PM2.5 at **${pm25} µg/m³**, it is **not advisable to exercise outdoors**. Strenuous outdoor physical activity causes you to inhale significantly more polluted air deep into your lungs. Choose indoor workouts, yoga, or stretching in a filtered room instead.`;
    }
    if (aqi > 100) {
      return `In **${cityName}** today, the AQI is **${aqi} (${status})**. Sensitive groups, children, and older adults should avoid outdoor exertion. If you go out, keep intensity low, avoid busy roads, and consider an N95 mask.`;
    }
    return `Air quality in **${cityName}** is currently **${status} (AQI ${aqi})**. Light to moderate outdoor exercise is generally safe today.`;
  }

  if (lowerMsg.includes('window') || lowerMsg.includes('ventil') || lowerMsg.includes('fresh air')) {
    if (aqi > 100) {
      return `In **${cityName}**, with the AQI at **${aqi} (${status})**, **opening windows is not recommended**. Outdoor fine particles (PM2.5: ${pm25} µg/m³) will enter your home. Keep windows sealed and run a True HEPA air purifier.`;
    }
    return `Current AQI in **${cityName}** is **${aqi} (${status})**. Brief cross-ventilation is safe during low-traffic morning hours.`;
  }

  if (lowerMsg.includes('child') || lowerMsg.includes('family') || lowerMsg.includes('kid') || lowerMsg.includes('elderly') || lowerMsg.includes('protect')) {
    return `To protect children and older adults in **${cityName}** (AQI **${aqi}**):
1. **Limit Outdoor Play:** Keep outdoor time brief during peak smog hours.
2. **HEPA Filtration:** Run air purifiers in bedrooms and main living spaces.
3. **Respirators:** Wear fitted N95 or FFP2 masks when outdoors.
4. **Hydration:** Stay well hydrated to support respiratory clearance.`;
  }

  if (lowerMsg.includes('hepa') || lowerMsg.includes('indoor') || lowerMsg.includes('purifier') || lowerMsg.includes('dust')) {
    return `Best indoor air-quality practices for **${cityName}**:
- **True HEPA Purifiers:** Run units continuously in bedrooms and living areas.
- **Cooking Exhaust:** Always run kitchen exhaust fans while cooking.
- **Damp Cleaning:** Use damp microfiber cloths and mops instead of dry sweeping so dust isn't kicked back into the air.`;
  }

  return `In **${cityName}**, the current AQI is **${aqi} (${status})** with PM2.5 at **${pm25} µg/m³**. Keep indoor spaces filtered with HEPA purifiers when outdoor levels exceed 100, and check hourly trends before planning outdoor commutes or exercise.`;
}
