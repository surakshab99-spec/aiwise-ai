import React, { useState } from 'react';
import { ActionItem } from '../types';
import { CheckSquare, CheckCircle, Circle, Award, Sparkles, Plus, Trash2 } from 'lucide-react';

export const ActionPlanner: React.FC = () => {
  const [actions, setActions] = useState<ActionItem[]>([
    {
      id: '1',
      title: 'Use public transportation or metro instead of driving',
      category: 'Mobility',
      points: 50,
      completed: true,
      impact: 'Avoided ~4.2 kg CO₂ emissions',
    },
    {
      id: '2',
      title: 'Combine multiple errands into a single efficient trip',
      category: 'Mobility',
      points: 30,
      completed: false,
      impact: 'Avoided cold-start vehicle emissions',
    },
    {
      id: '3',
      title: 'Run HEPA air purifiers on eco mode in living rooms',
      category: 'Indoor',
      points: 20,
      completed: true,
      impact: 'Maintained optimal indoor PM2.5 < 10',
    },
    {
      id: '4',
      title: 'Avoid unnecessary electricity consumption during peak hours',
      category: 'Energy',
      points: 25,
      completed: false,
      impact: 'Reduced grid fossil-fuel reliance',
    },
    {
      id: '5',
      title: 'Choose cycling or walking for short neighborhood trips (< 2 km)',
      category: 'Mobility',
      points: 40,
      completed: false,
      impact: 'Zero tailpipe emissions',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Mobility');

  const toggleAction = (id: string) => {
    setActions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ActionItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      points: 30,
      completed: false,
      impact: 'Custom sustainable habit',
    };

    setActions((prev) => [newItem, ...prev]);
    setNewTitle('');
  };

  const totalPoints = actions.filter((a) => a.completed).reduce((acc, curr) => acc + curr.points, 0);
  const completedCount = actions.filter((a) => a.completed).length;

  return (
    <div className="space-y-6">
      {/* Header & Score */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
            Daily Action Planner
          </span>
          <h2 className="text-2xl font-space font-bold text-[#0f172a] mt-2">
            Low-Emission Daily Routine
          </h2>
          <p className="text-sm text-[#64748b]">
            Adopt sustainable habits to reduce personal emissions and build cleaner community air.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#f8fafc] px-5 py-3 rounded-2xl border border-[#e2e8f0]">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#64748b] font-semibold">Impact Points Earned</p>
            <p className="text-2xl font-space font-bold text-[#0f172a]">{totalPoints} <span className="text-xs font-normal text-emerald-600">({completedCount}/{actions.length} completed)</span></p>
          </div>
        </div>
      </div>

      {/* Add Custom Habit Form */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
        <h3 className="font-space font-bold text-base text-[#0f172a] mb-3">Add Custom Sustainable Habit</h3>
        <form onSubmit={addAction} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Carpooled with colleague to office..."
            className="flex-1 px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm focus:outline-none focus:border-blue-600"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm focus:outline-none focus:border-blue-600 text-[#0f172a]"
          >
            <option value="Mobility">Mobility</option>
            <option value="Indoor">Indoor Air</option>
            <option value="Energy">Energy</option>
            <option value="Community">Community</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0f172a] hover:bg-slate-800 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Habit</span>
          </button>
        </form>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm space-y-3">
        <h3 className="font-space font-bold text-lg text-[#0f172a] mb-2">Today's Sustainable Checklist</h3>
        {actions.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleAction(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              item.completed 
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                : 'bg-[#f8fafc] border-[#e2e8f0] hover:border-slate-300 text-[#0f172a]'
            }`}
          >
            <div className="flex items-center space-x-3">
              {item.completed ? (
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-[#94a3b8] shrink-0" />
              )}
              <div>
                <p className={`font-semibold text-sm ${item.completed ? 'line-through text-emerald-800' : 'text-[#0f172a]'}`}>
                  {item.title}
                </p>
                <p className="text-xs text-[#64748b] mt-0.5">{item.impact}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                item.completed ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}>
                +{item.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
