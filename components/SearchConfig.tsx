
import React from 'react';

interface Props {
  days: number;
  setDays: (days: number) => void;
  count: number;
  setCount: (count: number) => void;
  onSearch: () => void;
  loading: boolean;
}

const SearchConfig: React.FC<Props> = ({ days, setDays, count, setCount, onSearch, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <h2 className="text-base font-bold text-slate-900">检索配置</h2>
      </div>

      <div className="space-y-6">
        {/* Traceback Time */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-500">追溯时间</label>
            <span className="bg-slate-100 text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider">
              GLOBAL ONLY
            </span>
          </div>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="1" 
              max="30" 
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="flex-grow h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-sm font-bold text-slate-900 w-10 text-right">{days}天</span>
          </div>
        </div>

        {/* Card Count */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-500">生成卡片数量</label>
          <select 
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
          >
            <option value={3}>3 张卡片</option>
            <option value={6}>6 张卡片</option>
            <option value={9}>9 张卡片</option>
            <option value={12}>12 张卡片</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={onSearch}
          disabled={loading}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold transition-all shadow-lg ${
            loading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-indigo-100'
          }`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          )}
          {loading ? '正在检索最新动态...' : '开始生成选题'}
        </button>
      </div>
    </div>
  );
};

export default SearchConfig;
