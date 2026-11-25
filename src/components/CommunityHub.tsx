import React, { useState } from 'react';
import { Users, Award, Sparkles, CheckCircle, Flag, Trophy } from 'lucide-react';
import { CommunityChallenge } from '../types';

export const CommunityHub: React.FC = () => {
  const [challenges, setChallenges] = useState<CommunityChallenge[]>([
    {
      id: '1',
      title: 'Neighbourhood Car-Free Friday',
      participants: 1420,
      target: 2000,
      progress: 71,
      joined: true,
      rewardBadge: 'Green Commuter Star',
    },
    {
      id: '2',
      title: 'Zero Waste Burning Week',
      participants: 3890,
      target: 5000,
      progress: 77,
      joined: false,
      rewardBadge: 'Clean Air Champion',
    },
    {
      id: '3',
      title: 'Public Transit & Metro Challenge',
      participants: 2150,
      target: 3000,
      progress: 71,
      joined: true,
      rewardBadge: 'Transit Pioneer',
    },
  ]);

  const toggleJoin = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: !c.joined, participants: c.joined ? c.participants - 1 : c.participants + 1 } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 px-3 py-1 bg-teal-50 rounded-full border border-teal-200">
            Collective Action
          </span>
          <h2 className="text-2xl font-space font-bold text-[#0f172a] mt-2">
            Community Sustainability Hub
          </h2>
          <p className="text-sm text-[#64748b]">
            Join neighborhood challenges, car-free campaigns, and collective clean air initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-200 text-emerald-900">
          <Trophy className="w-6 h-6 text-emerald-600" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Community Standing</p>
            <p className="text-sm font-semibold">Active Contributor • Level 3</p>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  {challenge.rewardBadge}
                </span>
                <span className="text-xs font-bold text-[#64748b] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {challenge.participants} joined
                </span>
              </div>
              <h3 className="font-space font-bold text-lg text-[#0f172a] mb-2">{challenge.title}</h3>
              
              {/* Progress bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#64748b]">
                  <span>Goal Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
              <button
                onClick={() => toggleJoin(challenge.id)}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  challenge.joined
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-[#0f172a] text-white hover:bg-slate-800 shadow-md'
                }`}
              >
                {challenge.joined ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Joined Challenge</span>
                  </>
                ) : (
                  <>
                    <Flag className="w-4 h-4" />
                    <span>Join Initiative</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
