import React, { useState } from 'react';
import { EnvironmentalData, ChatMessage } from '../types';
import { Bot, Send, Sparkles, User, RefreshCw, AlertCircle } from 'lucide-react';
import { buildLocalAssistantReply } from '../utils/environmentalService';

interface AiAssistantProps {
  data: EnvironmentalData;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ data }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I am your AirWise AI environmental assistant. I'm currently monitoring **${data.cityName}** where the AQI is **${data.aqi}** (${data.status}). How can I help protect your health or advise on outdoor/indoor activities today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestedQuestions = [
    'Is it advisable to exercise outdoors today?',
    'Should I open my windows for ventilation?',
    'How can I protect my family and children from severe smog?',
    'What are the best indoor air-quality and HEPA practices?',
    'How can I reduce my daily contribution to air pollution?',
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!questionText) setInput('');
    setLoading(true);
    setError(null);

    try {
      let replyText = '';
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(12000),
          body: JSON.stringify({
            message: textToSend,
            context: {
              cityName: data.cityName,
              aqi: data.aqi,
              status: data.status,
              pm25: data.pollutants.pm25,
              pm10: data.pollutants.pm10,
              temperature: data.temperature,
              humidity: data.humidity,
              windSpeed: data.windSpeed,
            },
          }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const result = await response.json();
          replyText = result.reply;
        }
      } catch (networkErr) {
        console.warn('Backend /api/chat unreachable, using contextual fallback:', networkErr);
      }

      if (!replyText) {
        replyText = buildLocalAssistantReply(textToSend, data);
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with AI assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-space font-bold text-[#0f172a] flex items-center gap-2">
              AirWise AI Assistant <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">Gemini Powered</span>
            </h2>
            <p className="text-xs text-[#64748b]">Real-time environmental health advisor for {data.cityName}</p>
          </div>
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 shrink-0">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="px-3.5 py-2 bg-white hover:bg-[#f0f7ff] border border-[#e2e8f0] rounded-xl text-xs font-medium text-[#334155] whitespace-nowrap shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-[#0f172a] text-white' : 'bg-emerald-600 text-white shadow-md'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#0f172a] text-white rounded-tr-none' 
                : 'bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <p className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-slate-300' : 'text-[#64748b]'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 text-sm text-[#64748b]">
              AirWise AI is analyzing {data.cityName} telemetry and generating personalized guidance...
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl p-3 border border-[#e2e8f0] shadow-sm flex items-center gap-3 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask AirWise AI about air quality in ${data.cityName}...`}
          className="flex-1 px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 text-[#0f172a]"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-50 rounded-xl font-semibold text-sm text-white flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
