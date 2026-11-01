/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

interface FooterProps {
  currentView: 'home' | 'quiz' | 'name-entry' | 'duel' | 'result';
  onNavigateHome: () => void;
  onResetQuiz: () => void;
  hasResult: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  currentView,
  onNavigateHome,
  onResetQuiz,
  hasResult
}) => {
  return (
    <footer className="w-full mt-auto py-8 px-6 border-t-2 border-[#0F172A] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#07090E] text-[#64748B] dark:text-[#94A3B8] transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#0F172A] dark:text-white font-serif font-black text-sm">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E] inline-block" />
          <span>Early Modern Philosopher Matcher</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {currentView !== 'home' && (
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] hover:bg-slate-100 dark:hover:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] text-[#0F172A] dark:text-white font-bold transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          )}

          {hasResult && currentView !== 'home' && (
            <button
              onClick={onResetQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] hover:bg-slate-100 dark:hover:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] text-[#0F172A] dark:text-white font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Retake</span>
            </button>
          )}

          <span className="text-[#EC4899] font-bold">·</span>
          <span>17th & 18th-Century Enlightenment</span>
        </div>
      </div>
    </footer>
  );
};
