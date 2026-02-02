
import React from 'react';
import { TopicEvaluationCard } from '../types';

interface Props {
  card: TopicEvaluationCard;
}

const TopicCard: React.FC<Props> = ({ card }) => {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 7) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            {card.title}
          </h2>
          <div className={`flex flex-col items-center px-3 py-1 rounded-lg border ${getScoreColor(card.score)} shrink-0`}>
            <span className="text-2xl font-black">{card.score}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Score</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 italic">
          {card.scoreExplanation}
        </p>
      </div>

      <div className="p-6 space-y-6 flex-grow">
        {/* Trigger Event */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">触发事件</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{card.triggeringEvent}</p>
        </section>

        {/* Impact Info */}
        <div className="grid grid-cols-2 gap-4">
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">核心受众</h3>
            <p className="text-sm font-medium text-slate-800">{card.targetAudience}</p>
          </section>
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">高敏行业</h3>
            <p className="text-sm font-medium text-slate-800">{card.impactedIndustries}</p>
          </section>
        </div>

        {/* Angles */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">写作建议角度</h3>
          <ul className="space-y-1">
            {card.writingAngles.map((angle, idx) => (
              <li key={idx} className="text-sm text-slate-700 flex gap-2">
                <span className="text-indigo-500 font-bold">•</span> {angle}
              </li>
            ))}
          </ul>
        </section>

        {/* Blind Spot - Highlighted */}
        <section className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">认知错位 (Blind Spot)</h3>
          <p className="text-sm text-amber-900 font-medium">{card.blindSpot}</p>
        </section>

        {/* Action Package */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">行动建议包</h3>
          <ul className="space-y-1">
            {card.actionPackage.map((action, idx) => (
              <li key={idx} className="text-sm text-slate-700 flex gap-2 items-start">
                <span className="text-green-600 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </span>
                {action}
              </li>
            ))}
          </ul>
        </section>

        {/* Novelty */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">价值信号</h3>
          <p className="text-sm text-slate-600">{card.noveltySignal}</p>
        </section>
      </div>

      {/* Footer - Sources */}
      <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-3">
        {card.primarySources.length > 0 && (
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">权威来源 (Primary)</h4>
            <div className="flex flex-wrap gap-2">
              {card.primarySources.map((s, idx) => (
                <a 
                  key={idx} 
                  href={s.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 underline truncate max-w-[200px]"
                >
                  {s.title || 'Official Document'}
                </a>
              ))}
            </div>
          </div>
        )}
        {card.secondarySources.length > 0 && (
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">辅助解读 (Secondary)</h4>
            <div className="flex flex-wrap gap-2">
              {card.secondarySources.map((s, idx) => (
                <a 
                  key={idx} 
                  href={s.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-600 hover:text-indigo-800 underline truncate max-w-[200px]"
                >
                  {s.title || 'Analysis'}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicCard;
