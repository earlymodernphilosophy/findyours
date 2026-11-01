/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { DimensionKey, DimensionScore, OverallQuizResult, Philosopher } from '../types/philosophy';
import { PHILOSOPHICAL_DIMENSIONS } from '../data/philosophers';
import { COMPLETE_100_STATEMENTS, getQuizStatements, LikertQuestion } from '../data/questions';

interface AlgorithmTransparencyViewProps {
  result: OverallQuizResult;
  selectedAnswers: Record<number, string>;
}

export const AlgorithmTransparencyView: React.FC<AlgorithmTransparencyViewProps> = ({
  result,
  selectedAnswers
}) => {
  const { userScores, primaryMatch, nemesis, allRankings } = result;
  const primaryPhil = primaryMatch.philosopher;
  const nemesisPhil = nemesis.philosopher;

  const [expandedDimension, setExpandedDimension] = useState<DimensionKey | null>(null);
  const [showLogicGuide, setShowLogicGuide] = useState(false);
  const [showAllRankings, setShowAllRankings] = useState(false);

  // Human readable labels and styles
  const CHOICE_LABELS: Record<string, { label: string; color: string }> = {
    strongly_agree: { label: 'Strongly Agree', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    agree: { label: 'Agree', color: 'bg-sky-100 text-sky-800 border-sky-300' },
    neutral: { label: 'Neutral', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    disagree: { label: 'Disagree', color: 'bg-orange-100 text-orange-800 border-orange-300' },
    strongly_disagree: { label: 'Strongly Disagree', color: 'bg-red-100 text-red-800 border-red-300' },
    skipped: { label: 'Skipped', color: 'bg-stone-100 text-stone-600 border-stone-300' }
  };

  // Find all statements relevant to a specific dimension
  const getStatementsForDimension = (dimKey: DimensionKey): { question: LikertQuestion; choice: string }[] => {
    const is50Mode = Object.keys(selectedAnswers).length <= 50;
    const allQuestions = is50Mode ? getQuizStatements('50') : COMPLETE_100_STATEMENTS;

    return allQuestions
      .filter((q) => {
        const impact = q.dimensionImpact[dimKey];
        return typeof impact === 'number' && Math.abs(impact) > 0 && selectedAnswers[q.id];
      })
      .map((q) => ({
        question: q,
        choice: selectedAnswers[q.id]
      }));
  };

  const coordToPct = (coord: number) => {
    return Math.round(((coord + 1) / 2) * 100);
  };

  const getAlignmentDetail = (dimKey: DimensionKey, userVal: number, philVal: number): string => {
    const delta = Math.abs(userVal - philVal);
    const userDirection = userVal >= 0.15 ? 'high' : userVal <= -0.15 ? 'low' : 'center';

    switch (dimKey) {
      case 'epistemology':
        if (delta <= 0.35) {
          return `You and ${primaryPhil.name} agree on epistemology, favoring ${
            userVal >= 0 ? 'reason and innate ideas' : 'sensory observation and skepticism'
          }.`;
        }
        return `You lean ${userDirection === 'high' ? 'toward reason and certainty' : userDirection === 'low' ? 'toward sensory experience and skepticism' : 'toward a balance of reason and experience'}, while ${primaryPhil.name} took a different view.`;

      case 'metaphysics':
        if (delta <= 0.35) {
          return `You and ${primaryPhil.name} agree on the nature of reality, leaning toward ${
            userVal >= 0 ? 'mind, spirit, or ideas' : 'matter, motion, and physical bodies'
          }.`;
        }
        return `You lean toward ${userDirection === 'high' ? 'mind and spirit' : userDirection === 'low' ? 'matter and physical bodies' : 'a balanced view of reality'}.`;

      case 'theology':
        if (delta <= 0.35) {
          return `Your views align with ${primaryPhil.name} on God and nature, favoring ${
            userVal >= 0 ? 'divine guidance and a purposeful creator' : 'natural laws and skepticism'
          }.`;
        }
        return `Your answers put you closer to ${primaryPhil.name} than to ${nemesisPhil.name}.`;

      case 'ethics':
        if (delta <= 0.35) {
          return `You and ${primaryPhil.name} agree on ethics, grounding morality in ${
            userVal >= 0 ? 'duty, universal principles, and conscience' : 'human feelings, sympathy, and practical outcomes'
          }.`;
        }
        return `Your moral answers emphasize ${userDirection === 'high' ? 'duty and conscience' : userDirection === 'low' ? 'outcomes and human feelings' : 'both duty and outcomes'}.`;

      case 'politics':
        if (delta <= 0.35) {
          return `On government and society, you and ${primaryPhil.name} prefer ${
            userVal >= 0 ? 'order, stability, and authority' : 'individual liberty and equal rights'
          }.`;
        }
        return `You favor ${userDirection === 'high' ? 'social order' : userDirection === 'low' ? 'individual freedom' : 'balanced government'}.`;

      case 'methodology':
        if (delta <= 0.35) {
          return `You approach science the same way, prioritizing ${
            userVal >= 0 ? 'deductive logic and clear proofs' : 'hands-on experiments and observation'
          }.`;
        }
        return `You prefer ${userDirection === 'high' ? 'logical deduction' : userDirection === 'low' ? 'experiments and observation' : 'both experiments and deduction'}.`;

      case 'metaphilosophy':
        if (delta <= 0.35) {
          return `You and ${primaryPhil.name} agree on the scope of philosophy, favoring ${
            userVal >= 0 ? 'grand systems and first principles' : 'modest limits, careful doubt, and practical human life'
          }.`;
        }
        return `On the scope of philosophy, you lean toward ${userDirection === 'high' ? 'grand speculative systems' : userDirection === 'low' ? 'modest limits and practical reform' : 'a balanced approach'}.`;

      default:
        return `Alignment: ${(100 - delta * 50).toFixed(0)}%.`;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#0F172A] border-3 border-[#0F172A] dark:border-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#0F172A] dark:shadow-[8px_8px_0px_#22C55E]/30 mb-10">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-dashed border-[#E7E2D8] dark:border-[#334155]">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#0F172A] dark:text-white leading-tight">
            How You Match With {primaryPhil.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-prose-serif mt-1">
            Compare your answers across the seven philosophical dimensions.
          </p>
        </div>

        {/* Toggle Explanation */}
        <button
          onClick={() => setShowLogicGuide(!showLogicGuide)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F0FDF4] dark:bg-[#064E3B]/60 hover:bg-[#DCFCE7] dark:hover:bg-[#064E3B]/90 text-[#059669] dark:text-[#22C55E] text-xs font-bold border-2 border-[#0F172A] dark:border-[#22C55E]/40 shadow-[2px_2px_0px_#0F172A] transition-all cursor-pointer shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#10B981] dark:text-[#22C55E]" />
          <span>{showLogicGuide ? 'Hide' : 'How scoring works'}</span>
        </button>
      </div>

      {/* SIMPLE 4-STEP EXPLAINER */}
      {showLogicGuide && (
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-[#F0FDF4] dark:bg-[#064E3B]/40 border-2 border-[#10B981] dark:border-[#22C55E]/50 text-xs text-[#0F172A] dark:text-slate-200 animate-in fade-in duration-200">
          <div className="font-serif font-bold text-sm text-[#059669] dark:text-[#22C55E] mb-3">
            How scoring works
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-[#0F172A] p-3 rounded-xl border border-[#10B981]/40 dark:border-[#22C55E]/30 shadow-sm">
              <div className="font-bold text-[#059669] dark:text-[#22C55E] text-[11px] mb-1">
                1. Answers Scored
              </div>
              <p className="text-[11px] text-[#475569] dark:text-slate-300 leading-relaxed">
                Each answer places your position on a scale from -1 to +1.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] p-3 rounded-xl border border-[#10B981]/40 dark:border-[#22C55E]/30 shadow-sm">
              <div className="font-bold text-[#059669] dark:text-[#22C55E] text-[11px] mb-1">
                2. Seven Dimensions
              </div>
              <p className="text-[11px] text-[#475569] dark:text-slate-300 leading-relaxed">
                Your answers produce scores across Epistemology, Metaphysics, Theology, Ethics, Politics, Science, and Philosophy's Scope.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] p-3 rounded-xl border border-[#10B981]/40 dark:border-[#22C55E]/30 shadow-sm">
              <div className="font-bold text-[#059669] dark:text-[#22C55E] text-[11px] mb-1">
                3. Compared to Thinkers
              </div>
              <p className="text-[11px] text-[#475569] dark:text-slate-300 leading-relaxed">
                Your scores and topic priorities are measured against the recorded views of early modern philosophers.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] p-3 rounded-xl border border-[#10B981]/40 dark:border-[#22C55E]/30 shadow-sm">
              <div className="font-bold text-[#059669] dark:text-[#22C55E] text-[11px] mb-1">
                4. Match & Nemesis
              </div>
              <p className="text-[11px] text-[#475569] dark:text-slate-300 leading-relaxed">
                The thinker closest to your overall profile is your match ({primaryMatch.matchScore}%). The thinker furthest is your nemesis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7-DIMENSION SPECTRUM BREAKDOWN */}
      <div className="mt-5 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Topic Breakdown
          </span>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] border border-[#0F172A]" />
              <span className="font-bold text-[#059669] dark:text-[#22C55E]">You</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] border border-[#0F172A]" />
              <span className="font-bold text-[#DB2777]">{primaryPhil.name.split(' ')[0]}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
              <span className="text-[#64748B]">{nemesisPhil.name.split(' ')[0]} (Nemesis)</span>
            </span>
          </div>
        </div>

        {PHILOSOPHICAL_DIMENSIONS.map((dim) => {
          const userVal = userScores[dim.key];
          const philVal = primaryPhil.scores[dim.key];
          const nemVal = nemesisPhil.scores[dim.key];

          const userPct = coordToPct(userVal);
          const philPct = coordToPct(philVal);
          const nemPct = coordToPct(nemVal);

          const dimDelta = Math.abs(userVal - philVal);
          const dimMatchPct = Math.round((1 - dimDelta / 2) * 100);

          const isExpanded = expandedDimension === dim.key;
          const relevantStatements = getStatementsForDimension(dim.key);

          return (
            <div
              key={dim.key}
              className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/70 border-2 border-[#0F172A] dark:border-[#334155] shadow-[2px_2px_0px_#0F172A] dark:shadow-[2px_2px_0px_#22C55E]/20 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span className="text-base font-serif font-black text-[#0F172A] dark:text-white">
                    {dim.label}
                  </span>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-prose-serif">
                    {dim.description}
                  </p>
                </div>
                <div className="mt-1 sm:mt-0 flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F0FDF4] dark:bg-[#064E3B]/70 border border-[#10B981] dark:border-[#22C55E]/40 text-[#059669] dark:text-[#22C55E]">
                    {dimMatchPct}% Match
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="my-3">
                <div className="flex justify-between text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] mb-1.5">
                  <span className="max-w-[45%] truncate text-left">{dim.lowLabel}</span>
                  <span className="max-w-[45%] truncate text-right">{dim.highLabel}</span>
                </div>

                <div className="relative w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full border border-slate-300 dark:border-slate-600 overflow-visible">
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-400 dark:bg-slate-500 -translate-x-1/2" />

                  {/* Nemesis */}
                  <div
                    title={`${nemesisPhil.name}`}
                    className="absolute top-1/2 w-3.5 h-3.5 rounded-full bg-slate-600 border border-black -translate-x-1/2 -translate-y-1/2 z-10 shadow-sm"
                    style={{ left: `${nemPct}%` }}
                  />

                  {/* Philosopher (Hot Pink) */}
                  <div
                    title={`${primaryPhil.name}`}
                    className="absolute top-1/2 w-4 h-4 rounded-full bg-[#EC4899] border-2 border-[#0F172A] -translate-x-1/2 -translate-y-1/2 z-20 shadow-md"
                    style={{ left: `${philPct}%` }}
                  />

                  {/* User (Neon Green) */}
                  <div
                    title="You"
                    className="absolute top-1/2 w-4.5 h-4.5 rounded-full bg-[#22C55E] border-2 border-[#0F172A] -translate-x-1/2 -translate-y-1/2 z-30 shadow-lg"
                    style={{ left: `${userPct}%` }}
                  />
                </div>
              </div>

              {/* Explanation */}
              <div className="p-3 rounded-xl bg-white dark:bg-[#0F172A] border border-[#CBD5E1] dark:border-[#334155] text-xs text-[#334155] dark:text-slate-300 leading-relaxed mb-2.5">
                <span className="font-bold text-[#0F172A] dark:text-white mr-1">Why you matched:</span>
                {getAlignmentDetail(dim.key, userVal, philVal)}
              </div>

              {/* Contributory Statements */}
              {relevantStatements.length > 0 && (
                <div>
                  <button
                    onClick={() => setExpandedDimension(isExpanded ? null : dim.key)}
                    className="text-xs font-bold text-[#059669] dark:text-[#22C55E] hover:text-[#047857] dark:hover:text-[#4ADE80] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>
                      {isExpanded
                        ? 'Hide Statements'
                        : `Show ${relevantStatements.length} statements on this topic`}
                    </span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 pt-2.5 border-t border-dashed border-[#CBD5E1] dark:border-[#334155] space-y-2 animate-in fade-in duration-200">
                      {relevantStatements.map(({ question, choice }) => {
                        const choiceMeta = CHOICE_LABELS[choice] || {
                          label: choice,
                          color: 'bg-stone-100 text-stone-700'
                        };

                        return (
                          <div
                            key={question.id}
                            className="p-2.5 rounded-lg bg-white dark:bg-[#0F172A] border border-stone-200 dark:border-[#334155] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex-1">
                              <span className="text-[#0F172A] dark:text-slate-200">
                                {question.statement}
                              </span>
                            </div>

                            <div className="shrink-0">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${choiceMeta.color}`}>
                                {choiceMeta.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* LEADERBOARD OF ALL THINKERS */}
      <div className="mt-7 pt-5 border-t-2 border-dashed border-[#E7E2D8] dark:border-[#334155]">
        <button
          onClick={() => setShowAllRankings(!showAllRankings)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#FFFBEB] dark:bg-[#1E293B] hover:bg-[#FEF3C7] dark:hover:bg-[#334155] border-2 border-[#0F172A] dark:border-[#334155] shadow-[2px_2px_0px_#0F172A] dark:shadow-[2px_2px_0px_#22C55E]/20 text-left cursor-pointer transition-all"
        >
          <div>
            <div className="text-base font-serif font-black text-[#0F172A] dark:text-white">
              Where You Stand Against All Thinkers
            </div>
            <div className="text-xs text-[#57534E] dark:text-[#94A3B8]">
              See how closely you matched with all philosophers in the catalog.
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] dark:text-white">
            <span>{showAllRankings ? 'Hide' : 'Show All'}</span>
            {showAllRankings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAllRankings && (
          <div className="mt-3 border-2 border-[#0F172A] dark:border-[#334155] rounded-2xl bg-white dark:bg-[#0F172A] overflow-hidden shadow-sm animate-in fade-in duration-200">
            <div className="max-h-96 overflow-y-auto subtle-scroll divide-y divide-stone-200 dark:divide-[#334155]">
              {allRankings && allRankings.length > 0 ? (
                allRankings.map((ranked, index) => {
                  const phil = ranked.philosopher;
                  const isPrimary = index === 0;
                  const isNemesis = index === allRankings.length - 1;

                  return (
                    <div
                      key={phil.id}
                      className={`p-3 sm:px-4 flex items-center justify-between text-xs transition-colors ${
                        isPrimary
                          ? 'bg-emerald-50 dark:bg-[#064E3B]/40 font-bold'
                          : isNemesis
                          ? 'bg-pink-50 dark:bg-[#831843]/30 text-red-950 dark:text-pink-200'
                          : 'hover:bg-slate-50 dark:hover:bg-[#1E293B]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 font-mono text-slate-400 dark:text-slate-500 font-bold text-center">
                          #{index + 1}
                        </span>
                        <div>
                          <div className="font-serif font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                            <span>{phil.name}</span>
                            {isPrimary && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-[#064E3B] text-emerald-800 dark:text-[#22C55E] text-[10px] font-mono">
                                MATCH
                              </span>
                            )}
                            {isNemesis && (
                              <span className="px-1.5 py-0.2 rounded bg-pink-100 dark:bg-[#831843] text-pink-800 dark:text-pink-200 text-[10px] font-mono">
                                NEMESIS
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">
                            {phil.school} · {phil.century}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-20 sm:w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full ${
                              ranked.matchScore > 75
                                ? 'bg-emerald-500'
                                : ranked.matchScore > 50
                                ? 'bg-indigo-500'
                                : 'bg-pink-500'
                            }`}
                            style={{ width: `${ranked.matchScore}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-xs w-10 text-right text-[#0F172A] dark:text-white">
                          {ranked.matchScore}%
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-stone-500">
                  No rankings available.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
