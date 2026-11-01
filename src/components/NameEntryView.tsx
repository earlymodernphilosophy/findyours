import React, { useState } from 'react';
import { ArrowRight, User, Sparkles } from 'lucide-react';
import { DimensionWeights } from '../types/philosophy';

interface NameEntryViewProps {
  onNameSubmit: (name: string, weights?: DimensionWeights) => void;
  questionCount: number;
  weights?: DimensionWeights;
  onChangeWeights?: (newWeights: DimensionWeights) => void;
}

export const NameEntryView: React.FC<NameEntryViewProps> = ({
  onNameSubmit,
  questionCount,
  weights
}) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    onNameSubmit(trimmed || 'Inquirer', weights);
  };

  return (
    <div className="py-10 md:py-16 px-4 sm:px-6 max-w-xl mx-auto flex flex-col items-center">
      {/* Main Card */}
      <div className="w-full bg-white dark:bg-[#0F172A] p-6 sm:p-9 rounded-3xl border-2 border-[#0F172A] dark:border-[#1E293B] shadow-[8px_8px_0px_#10B981] dark:shadow-[8px_8px_0px_#22C55E]/40 text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] dark:bg-[#064E3B]/50 text-[#10B981] dark:text-[#22C55E] border-2 border-[#0F172A] dark:border-[#22C55E]/40 shadow-[2px_2px_0px_#0F172A] flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold text-[#64748B] dark:text-[#94A3B8] bg-[#F8FAFC] dark:bg-[#1E293B] px-3 py-1 rounded-full border border-[#CBD5E1] dark:border-[#334155]">
            {questionCount} Statements Evaluated
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0F172A] dark:text-white leading-tight mb-2">
          Almost there! What is your name?
        </h2>

        <p className="text-sm text-[#475569] dark:text-[#94A3B8] font-prose-serif leading-relaxed mb-6">
          Tell us your name so we can address your philosophical match report directly to you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="user-first-name"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] mb-1.5"
            >
              First Name
            </label>
            <input
              id="user-first-name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eleanor, Arthur, Thomas..."
              className="w-full px-4 py-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border-2 border-[#0F172A] dark:border-[#334155] shadow-[3px_3px_0px_#0F172A] dark:shadow-[3px_3px_0px_#22C55E]/20 font-serif text-lg text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
              maxLength={40}
            />
          </div>

          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#FDF2F8] dark:bg-[#831843]/30 border-2 border-[#FBCFE8] dark:border-[#EC4899]/40 text-[#BE185D] dark:text-[#F472B6] text-xs">
            <Sparkles className="w-4 h-4 text-[#EC4899] shrink-0" />
            <span>
              Your philosophical match has been calculated directly from your quiz answers.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#10B981] via-[#A855F7] to-[#EC4899] hover:opacity-95 text-white font-serif font-black text-base border-3 border-[#0F172A] dark:border-[#EC4899] shadow-[4px_4px_0px_#0F172A] dark:shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[2px_2px_0px_#0F172A] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Reveal My Result</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
