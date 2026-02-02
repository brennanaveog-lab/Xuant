
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchConfig from './components/SearchConfig';
import TopicCard from './components/TopicCard';
import { fetchComplianceTopics } from './services/geminiService';
import { TopicEvaluationCard, SearchState } from './types';

const App: React.FC = () => {
  const [days, setDays] = useState(14);
  const [count, setCount] = useState(6);
  const [state, setState] = useState<SearchState>({
    loading: false,
    error: null,
    results: [],
  });

  const handleSearch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null, results: [] }));
    try {
      const topics = await fetchComplianceTopics(days, count);
      setState({
        loading: false,
        error: null,
        results: topics,
      });
    } catch (err: any) {
      setState({
        loading: false,
        error: err.message || 'An unexpected error occurred.',
        results: [],
      });
    }
  }, [days, count]);

  // Initial fetch on mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchConfig 
          days={days}
          setDays={setDays}
          count={count}
          setCount={setCount}
          onSearch={handleSearch}
          loading={state.loading}
        />

        {state.loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-800">正在检索全球合规动态...</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                正在通过 Google Search 检索过去 {days} 天的监管更新、法院裁决及官方公告。
              </p>
            </div>
          </div>
        )}

        {state.error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-8 text-center space-y-4">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">检索任务中断</h3>
              <p className="text-sm text-red-700 mt-1">{state.error}</p>
            </div>
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              重试检索
            </button>
          </div>
        )}

        {!state.loading && !state.error && state.results.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">推荐选题卡片</h2>
                <p className="text-slate-500 font-medium mt-1">
                  基于过去 {days} 天的数据，已为您生成 {state.results.length} 组高商业决策价值课题。
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Latest Analysis
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {state.results.map((card, index) => (
                <TopicCard key={index} card={card} />
              ))}
            </div>
          </div>
        )}

        {!state.loading && !state.error && state.results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <svg className="w-20 h-20 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <p className="mt-4 text-xl font-medium text-slate-400 italic">请点击上方按钮开始生成选题</p>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-200 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Global Compliance Topic Scout. 
            由 Gemini AI 提供技术支持。本应用仅供出海律师参考，不构成正式法律意见。
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
