import React, { useEffect, useRef } from 'react';
import { EnvironmentalData } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Info } from 'lucide-react';

interface PollutionMapProps {
  data: EnvironmentalData;
}

export const PollutionMap: React.FC<PollutionMapProps> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [data.coordinates.lat, data.coordinates.lon],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.setView([data.coordinates.lat, data.coordinates.lon], 13);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers if any
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Add user location marker
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `<div style="background-color: #0f172a; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; background-color: #10b981; border-radius: 50%;"></div></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker([data.coordinates.lat, data.coordinates.lon], { icon: userIcon })
      .addTo(map)
      .bindPopup(`<b>Your Location</b><br>${data.cityName}<br>AQI: ${data.aqi}`);

    // Add monitoring stations around
    data.stations.forEach((station, idx) => {
      // Offset slightly for demo map spread
      const offsetLat = data.coordinates.lat + (idx === 0 ? 0.02 : idx === 1 ? -0.015 : idx === 2 ? 0.03 : -0.025);
      const offsetLon = data.coordinates.lon + (idx === 0 ? 0.015 : idx === 1 ? 0.025 : idx === 2 ? -0.02 : -0.015);

      const color = station.aqi > 150 ? '#dc2626' : station.aqi > 100 ? '#ea580c' : '#10b981';

      const stationIcon = L.divIcon({
        className: 'custom-station-marker',
        html: `<div style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 8px; font-weight: bold; font-size: 11px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 2px solid white; white-space: nowrap;">AQI ${station.aqi}</div>`,
        iconSize: [50, 24],
        iconAnchor: [25, 12],
      });

      L.marker([offsetLat, offsetLon], { icon: stationIcon })
        .addTo(map)
        .bindPopup(`<b>${station.name}</b><br>Distance: ${station.distance}<br>AQI: ${station.aqi} (${station.status})`);
    });

    return () => {
      // Cleanup map on unmount if needed
    };
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
            Geospatial Intelligence
          </span>
          <h2 className="text-2xl font-space font-bold text-[#0f172a] mt-2">
            Interactive Pollution & Monitoring Map
          </h2>
          <p className="text-sm text-[#64748b]">
            Explore air-quality monitoring nodes, surrounding area telemetry, and local green sanctuaries.
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm">
        <div ref={mapRef} className="w-full h-[500px] rounded-xl z-10"></div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748b] px-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Good / Moderate (0-100)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span> Sensitive (101-150)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span> Unhealthy / Severe (&gt;150)</span>
          </div>
          <span className="flex items-center gap-1 font-semibold text-[#0f172a]">
            <Navigation className="w-3.5 h-3.5 text-blue-600" /> Center: {data.cityName}
          </span>
        </div>
      </div>
    </div>
  );
};
