/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Zap, Crown, RotateCcw } from 'lucide-react';

interface HeroProps {
  onStartQuiz: (mode: '50' | '100') => void;
  hasSavedResult: boolean;
  onViewSavedResult: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  hasSavedResult,
  onViewSavedResult
}) => {
  return (
    <div className="py-12 md:py-24 px-6 max-w-3xl mx-auto text-center flex flex-col items-center">
      {/* Historical Era Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] text-[#22C55E] font-mono font-bold text-xs uppercase tracking-wider border-2 border-[#0F172A] dark:border-[#22C55E]/40 shadow-[2px_2px_0px_#EC4899] mb-5">
        <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] inline-block" />
        <span>17th & 18th Century Thinkers</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#0F172A] dark:text-white leading-[1.08] mb-4 [text-wrap:balance]">
        Which Early Modern <span className="underline decoration-wavy decoration-[#EC4899] decoration-3 text-[#DB2777] dark:text-[#EC4899]">Philosopher</span> Are You?
      </h1>

      {/* Natural Explanation */}
      <p className="text-base sm:text-xl text-[#475569] dark:text-[#94A3B8] font-prose-serif max-w-lg mx-auto leading-relaxed mb-10">
        Answer statements on knowledge, reality, morality, and government to see which early modern thinker shared your worldview.
      </p>

      {/* Two Framed Mode Buttons */}
      <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* 50 Question Mode */}
        <button
          onClick={() => onStartQuiz('50')}
          className="group relative p-6 rounded-2xl bg-[#F0FDF4] dark:bg-[#064E3B]/30 hover:bg-[#DCFCE7] dark:hover:bg-[#064E3B]/50 border-2 border-[#0F172A] dark:border-[#22C55E] shadow-[5px_5px_0px_#10B981] hover:shadow-[2px_2px_0px_#10B981] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-left cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-[#10B981] text-white border-2 border-[#0F172A] dark:border-[#22C55E] shadow-[2px_2px_0px_#0F172A]">
              <Zap className="w-5 h-5 fill-current" />
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#0F172A] border border-[#0F172A] dark:border-[#22C55E]/40 text-[#059669] dark:text-[#22C55E]">
              50 Statements
            </span>
          </div>

          <div>
            <div className="text-xl font-black font-serif text-[#0F172A] dark:text-white group-hover:text-[#059669] dark:group-hover:text-[#22C55E] transition-colors mb-1">
              50 Statements
            </div>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Quick overview. Takes about 3 to 4 minutes.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-[#10B981]/30 dark:border-[#22C55E]/30 flex items-center justify-between text-xs font-bold text-[#059669] dark:text-[#22C55E]">
            <span>Start 50-Quiz</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>

        {/* 100 Question Mode */}
        <button
          onClick={() => onStartQuiz('100')}
          className="group relative p-6 rounded-2xl bg-[#FDF2F8] dark:bg-[#831843]/30 hover:bg-[#FCE7F3] dark:hover:bg-[#831843]/50 border-2 border-[#0F172A] dark:border-[#EC4899] shadow-[5px_5px_0px_#EC4899] hover:shadow-[2px_2px_0px_#EC4899] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-left cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-[#EC4899] text-white border-2 border-[#0F172A] dark:border-[#EC4899] shadow-[2px_2px_0px_#0F172A]">
              <Crown className="w-5 h-5 fill-current text-[#FDE047]" />
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#0F172A] border border-[#0F172A] dark:border-[#EC4899]/40 text-[#DB2777] dark:text-[#EC4899]">
              100 Statements
            </span>
          </div>

          <div>
            <div className="text-xl font-black font-serif text-[#0F172A] dark:text-white group-hover:text-[#DB2777] dark:group-hover:text-[#EC4899] transition-colors mb-1">
              100 Statements
            </div>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Comprehensive profile. Takes about 7 to 8 minutes.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-[#EC4899]/30 dark:border-[#EC4899]/30 flex items-center justify-between text-xs font-bold text-[#DB2777] dark:text-[#EC4899]">
            <span>Start 100-Quiz</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>
      </div>

      {hasSavedResult && (
        <button
          onClick={onViewSavedResult}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F0FDF4] dark:bg-[#0F172A] text-[#059669] dark:text-[#22C55E] hover:bg-[#DCFCE7] dark:hover:bg-[#1E293B] border-2 border-[#0F172A] dark:border-[#22C55E]/40 shadow-[3px_3px_0px_#0F172A] dark:shadow-[3px_3px_0px_#22C55E]/30 transition-all cursor-pointer font-bold text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>View Previous Result</span>
        </button>
      )}
    </div>
  );
};
