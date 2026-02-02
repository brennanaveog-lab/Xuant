
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v4a2 2 0 002 2h4"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Global Compliance Scout</h1>
            <p className="text-xs text-slate-500 font-medium italic">出海合规选题决策系统</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">System Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
