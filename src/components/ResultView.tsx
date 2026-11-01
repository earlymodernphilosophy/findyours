/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Share2,
  Check,
  RotateCcw,
  Compass,
  Swords,
  Users,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  X,
  BookOpen,
  Quote,
  Camera,
  Sliders
} from 'lucide-react';
import { OverallQuizResult, Philosopher, DimensionWeights, PRIORITY_PRESETS } from '../types/philosophy';
import { PHILOSOPHICAL_DIMENSIONS } from '../data/philosophers';
import { COMPLETE_100_STATEMENTS, getQuizStatements } from '../data/questions';
import { RadarChart } from './RadarChart';
import { AlgorithmTransparencyView } from './AlgorithmTransparencyView';
import { getPhilosopherPortrait } from '../utils/philosopherPortraits';
import { ShareCardModal } from './ShareCardModal';
import { TopicPrioritySelector } from './TopicPrioritySelector';
import { getNemesisExplanation } from '../utils/quizAlgorithm';

interface ResultViewProps {
  result: OverallQuizResult;
  userName?: string;
  selectedAnswers: Record<number, string>;
  dimensionWeights?: DimensionWeights;
  onUpdateWeights?: (newWeights: DimensionWeights) => void;
  onRetakeQuiz: () => void;
  onSelectPhilosopherForDossier: (philosopher: Philosopher) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  userName,
  selectedAnswers,
  dimensionWeights,
  onUpdateWeights,
  onRetakeQuiz,
  onSelectPhilosopherForDossier
}) => {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [activeDossier, setActiveDossier] = useState<Philosopher | null>(null);

  const { primaryMatch, council, nemesis, userScores, completedQuestionsCount } = result;
  const primaryPhil = primaryMatch.philosopher;
  const nemesisPhil = nemesis.philosopher;

  const handleCopyPersona = () => {
    const text = `🎉 My Early Modern Philosopher Match: ${primaryPhil.name} (${primaryMatch.matchScore}% Match)
Tradition: ${primaryPhil.school}
Motto: "${primaryPhil.motto}"
Magnum Opus: ${primaryPhil.magnumOpus}
Council of Peers: ${council.map((c) => `${c.philosopher.name} (${c.matchScore}%)`).join(', ')}
Arch-Nemesis: ${nemesisPhil.name} (${nemesis.matchScore}% alignment)

Take the 50 or 100 question Likert quiz to discover your philosophical twin!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const LIKERT_DISPLAY_MAP: Record<string, { label: string; badgeClass: string }> = {
    strongly_agree: { label: 'Strongly Agree', badgeClass: 'bg-[#F0FDF4] dark:bg-[#064E3B]/70 text-[#047857] dark:text-[#22C55E] border-[#10B981]' },
    agree: { label: 'Agree', badgeClass: 'bg-[#F0FDF4] dark:bg-[#064E3B]/70 text-[#047857] dark:text-[#34D399] border-[#10B981]' },
    neutral: { label: 'Neutral', badgeClass: 'bg-[#F8FAFC] dark:bg-[#1E293B] text-[#334155] dark:text-[#E2E8F0] border-[#94A3B8]' },
    disagree: { label: 'Disagree', badgeClass: 'bg-[#FFF1F2] dark:bg-[#881337]/70 text-[#E11D48] dark:text-[#FDA4AF] border-[#FB7185]' },
    strongly_disagree: { label: 'Strongly Disagree', badgeClass: 'bg-[#FDF2F8] dark:bg-[#831843]/70 text-[#BE185D] dark:text-[#F472B6] border-[#EC4899]' },
    skipped: { label: 'Skipped', badgeClass: 'bg-[#F1F5F9] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] border-[#94A3B8]' }
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 md:py-14">
      {/* Banner Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0F172A] text-[#22C55E] font-mono text-xs uppercase tracking-wider border-2 border-[#0F172A] dark:border-[#22C55E]/40 shadow-[2px_2px_0px_#EC4899] mb-3">
          <Award className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Based on {completedQuestionsCount} answers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0F172A] dark:text-white tracking-tight leading-tight mb-2 [text-wrap:balance]">
          You Are Most Like <span className="underline decoration-wavy decoration-[#EC4899] text-[#DB2777] dark:text-[#EC4899]">{primaryPhil.name}</span>!
        </h1>

        <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] font-prose-serif leading-relaxed mb-4">
          Your answers align closest with {primaryPhil.name} ({primaryPhil.school}, {primaryPhil.century}).
        </p>

        {/* Share & Export Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs uppercase tracking-wider border-2 border-[#0F172A] dark:border-[#22C55E] shadow-[3px_3px_0px_#0F172A] dark:shadow-[3px_3px_0px_#22C55E]/40 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>Share Match Card</span>
          </button>

          <button
            onClick={handleCopyPersona}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EC4899] hover:bg-[#DB2777] text-white font-bold text-xs uppercase tracking-wider border-2 border-[#0F172A] dark:border-[#EC4899] shadow-[3px_3px_0px_#0F172A] dark:shadow-[3px_3px_0px_#EC4899]/40 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4 text-white" />}
            <span>{copied ? 'Copied Summary!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Main Persona Match Card */}
      <div className="rounded-3xl border-2 border-[#0F172A] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-[8px_8px_0px_#10B981] dark:shadow-[8px_8px_0px_#22C55E]/30 overflow-hidden mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] via-white to-[#FDF2F8] dark:from-[#0F172A] dark:via-[#111827] dark:to-[#1E293B] border-b-2 lg:border-b-0 lg:border-r-2 border-[#0F172A] dark:border-[#1E293B] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-[#0F172A] dark:bg-[#22C55E] text-[#22C55E] dark:text-[#07090E] font-mono text-xs font-bold shadow-xs">
                  {primaryMatch.matchScore}% Match
                </span>
                <span className="text-xs font-mono font-bold text-[#64748B] dark:text-[#94A3B8]">
                  {primaryPhil.dates}
                </span>
              </div>

              <h2 className="text-3xl font-serif font-black text-[#0F172A] dark:text-white mb-1">
                {primaryPhil.name}
              </h2>
              <div className="text-xs font-bold text-[#DB2777] dark:text-[#EC4899]">
                {primaryPhil.school} · {primaryPhil.nationality}
              </div>
            </div>

            {/* Real Historical Portrait */}
            <div className="my-4 aspect-[4/5] max-h-72 w-full rounded-2xl overflow-hidden border-3 border-[#0F172A] dark:border-[#22C55E]/50 shadow-[4px_4px_0px_#10B981] bg-stone-900 relative group">
              <img
                src={getPhilosopherPortrait(primaryPhil.id)}
                alt={primaryPhil.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-2.5 text-white">
                <div className="text-[10px] font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                  Historical Likeness
                </div>
              </div>
            </div>

            {/* Motto Box */}
            <div className="mb-4 p-4 rounded-2xl bg-white dark:bg-[#1E293B] border-2 border-[#0F172A] dark:border-[#334155] shadow-[3px_3px_0px_#EC4899]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#DB2777] dark:text-[#EC4899] mb-1">
                Motto
              </div>
              <div className="text-sm font-serif italic text-[#0F172A] dark:text-slate-100 leading-snug">
                &ldquo;{primaryPhil.motto}&rdquo;
              </div>
            </div>

            <div className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
              Magnum Opus: <span className="italic font-serif text-[#0F172A] dark:text-white font-bold">{primaryPhil.magnumOpus}</span>
            </div>
          </div>

          {/* Right Core Dossier */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Quote */}
              <div className="mb-5 pb-5 border-b-2 border-dashed border-[#E2E8F0] dark:border-[#334155]">
                <blockquote className="text-base sm:text-lg font-serif italic text-[#0F172A] dark:text-slate-100 leading-relaxed mb-2 font-prose-serif">
                  &ldquo;{primaryPhil.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
                  — {primaryPhil.quoteSource}
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed mb-6 font-prose-serif">
                {primaryPhil.summary}
              </p>

              {/* Congruence and Tension */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-[#059669] dark:text-[#22C55E] mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#10B981] dark:text-[#22C55E]" />
                    <span>Where you agree</span>
                  </div>
                  <ul className="space-y-1">
                    {primaryMatch.topCongruenceAspects.map((aspect, idx) => (
                      <li key={idx} className="text-xs text-[#334155] dark:text-slate-300 flex items-start gap-2">
                        <span className="text-[#059669] dark:text-[#22C55E] font-bold">✓</span>
                        <span>{aspect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {primaryMatch.pointsOfTension.length > 0 && (
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-[#DB2777] dark:text-[#EC4899] mb-1.5 flex items-center gap-1.5">
                      <Swords className="w-3.5 h-3.5 text-[#EC4899]" />
                      <span>Where you differ</span>
                    </div>
                    <ul className="space-y-1">
                      {primaryMatch.pointsOfTension.map((tension, idx) => (
                        <li key={idx} className="text-xs text-[#475569] dark:text-slate-400 flex items-start gap-2">
                          <span className="text-[#EC4899] font-bold">~</span>
                          <span>{tension}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t-2 border-[#0F172A]/10 dark:border-[#1E293B] flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyPersona}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black text-[#22C55E] bg-[#0F172A] hover:bg-[#1E293B] rounded-xl border-2 border-[#0F172A] dark:border-[#22C55E]/50 shadow-[3px_3px_0px_#10B981] transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[#22C55E]" />}
                <span>{copied ? 'Card Copied!' : 'Share Persona'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveDossier(primaryPhil);
                  onSelectPhilosopherForDossier(primaryPhil);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#059669] dark:text-[#22C55E] bg-[#F0FDF4] dark:bg-[#064E3B]/40 hover:bg-[#DCFCE7] dark:hover:bg-[#064E3B]/70 border-2 border-[#0F172A] dark:border-[#22C55E]/40 rounded-xl shadow-[2px_2px_0px_#0F172A] transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#10B981] dark:text-[#22C55E]" />
                <span>Read Full Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column: Radar Chart & Arch-Nemesis */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
        {/* Radar Chart with Nemesis Map */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#0F172A] border-2 border-[#0F172A] dark:border-[#1E293B] shadow-[6px_6px_0px_#10B981] dark:shadow-[6px_6px_0px_#22C55E]/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#059669] dark:text-[#22C55E]">
                Overview
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white">
                Seven Philosophical Dimensions
              </h3>
            </div>
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono">
              You vs {primaryPhil.name.split(' ')[0]} vs {nemesisPhil.name.split(' ')[0]}
            </span>
          </div>

          <RadarChart
            userScores={userScores}
            philosopher={primaryPhil}
            nemesis={nemesisPhil}
          />
        </div>

        {/* Arch-Nemesis Card with Real Portrait */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-[#FFF1F2] dark:bg-[#881337]/25 border-3 border-[#0F172A] dark:border-[#FB7185]/60 shadow-[6px_6px_0px_#EC4899] dark:shadow-[6px_6px_0px_#EC4899]/30 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFE4E6] dark:bg-[#881337]/50 text-[#E11D48] dark:text-[#FDA4AF] font-black text-xs uppercase tracking-wider border border-[#FDA4AF] dark:border-[#FB7185]/50 mb-4">
              <Swords className="w-3.5 h-3.5" />
              <span>Nemesis</span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded-2xl overflow-hidden border-3 border-[#0F172A] dark:border-[#FB7185] shadow-[3px_3px_0px_#E11D48] bg-stone-900">
                <img
                  src={getPhilosopherPortrait(nemesisPhil.id)}
                  alt={nemesisPhil.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-[#0F172A] dark:text-white leading-tight mb-1">
                  {nemesisPhil.name}
                </h3>
                <div className="text-xs font-bold text-[#E11D48] dark:text-[#FDA4AF] mb-1">
                  {nemesisPhil.school}
                </div>
                <div className="text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                  {nemesisPhil.dates}
                </div>
                <div className="mt-1 text-xs font-mono font-bold text-[#E11D48] dark:text-[#FB7185]">
                  {nemesis.matchScore}% Alignment
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#1E293B] border-2 border-[#0F172A] dark:border-[#334155] shadow-[2px_2px_0px_#0F172A] mb-4">
              <div className="text-xs font-serif italic text-[#0F172A] dark:text-slate-200">
                &ldquo;{nemesisPhil.quote}&rdquo;
              </div>
            </div>

            <div className="text-xs font-bold text-[#BE185D] dark:text-[#F472B6] mb-1">
              Disagreement:
            </div>
            <p className="text-xs text-[#334155] dark:text-[#CBD5E1] leading-relaxed mb-4 font-prose-serif">
              {getNemesisExplanation(primaryPhil, nemesisPhil, userScores)}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveDossier(nemesisPhil);
              onSelectPhilosopherForDossier(nemesisPhil);
            }}
            className="w-full text-center py-2.5 text-xs font-bold text-[#E11D48] dark:text-[#FDA4AF] bg-white dark:bg-[#1E293B] hover:bg-[#FFE4E6] dark:hover:bg-[#881337]/50 border-2 border-[#0F172A] dark:border-[#FB7185]/60 rounded-xl shadow-[2px_2px_0px_#0F172A] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#FDA4AF]" />
            <span>View Dossier</span>
          </button>
        </div>
      </div>

      {/* Algorithm Transparency & 7-Dimension Deep Breakdown */}
      <AlgorithmTransparencyView
        result={result}
        selectedAnswers={selectedAnswers}
      />

      {/* Your Intellectual Council (Top 4 Allies) with Real Portraits */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#059669] dark:text-[#22C55E]">
              Allies
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] dark:text-white">
              Closest Allies
            </h3>
          </div>
          <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            Click any ally to view dossier
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {council.map((peer, idx) => {
            const phil = peer.philosopher;
            return (
              <div
                key={phil.id}
                onClick={() => {
                  setActiveDossier(phil);
                  onSelectPhilosopherForDossier(phil);
                }}
                className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] hover:bg-[#F0FDF4] dark:hover:bg-[#1E293B] border-2 border-[#0F172A] dark:border-[#1E293B] shadow-[4px_4px_0px_#0F172A] dark:shadow-[4px_4px_0px_#22C55E]/30 hover:shadow-[2px_2px_0px_#10B981] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-mono text-[#64748B] dark:text-[#94A3B8] font-bold">#{idx + 2} Ally</span>
                    <span className="font-bold text-[#059669] dark:text-[#22C55E] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] dark:bg-[#064E3B]/60 border border-[#0F172A] dark:border-[#22C55E]/40">
                      {peer.matchScore}%
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-14 shrink-0 rounded-xl overflow-hidden border-2 border-[#0F172A] dark:border-[#22C55E]/40 shadow-[2px_2px_0px_#0F172A] bg-stone-900">
                      <img
                        src={getPhilosopherPortrait(phil.id)}
                        alt={phil.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-serif font-black text-[#0F172A] dark:text-white group-hover:text-[#059669] dark:group-hover:text-[#22C55E] transition-colors leading-tight truncate">
                        {phil.name}
                      </h4>
                      <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-semibold truncate">
                        {phil.school}
                      </div>
                      <div className="text-[10px] text-[#94A3B8] dark:text-slate-500 font-mono">
                        {phil.dates}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#475569] dark:text-[#CBD5E1] line-clamp-3 leading-relaxed font-prose-serif mb-3">
                    {phil.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B] text-[11px] text-[#059669] dark:text-[#22C55E] font-bold flex items-center justify-between">
                  <span>View Dossier</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer Review Accordion */}
      <div className="rounded-3xl border-3 border-[#0F172A] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] overflow-hidden mb-10 shadow-[6px_6px_0px_#0F172A] dark:shadow-[6px_6px_0px_#22C55E]/20">
        <button
          onClick={() => setShowAnswerReview(!showAnswerReview)}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-[#F0FDF4] dark:hover:bg-[#1E293B] transition-colors"
        >
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#059669] dark:text-[#22C55E]">
              Answers
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0F172A] dark:text-white">
              Review Your Answers ({Object.keys(selectedAnswers).length} statements)
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] dark:text-white">
            <span>{showAnswerReview ? 'Hide' : 'Show All Stances'}</span>
            {showAnswerReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAnswerReview && (
          <div className="p-6 pt-0 border-t-2 border-[#0F172A] dark:border-[#1E293B] divide-y divide-[#E2E8F0] dark:divide-[#334155] max-h-[500px] overflow-y-auto subtle-scroll">
            {(() => {
              const relevantQuestions =
                Object.keys(selectedAnswers).length <= 50
                  ? getQuizStatements('50')
                  : COMPLETE_100_STATEMENTS;
              return relevantQuestions.map((q) => {
                const rawChoice = selectedAnswers[q.id];
                if (!rawChoice) return null;

                const choiceConfig = LIKERT_DISPLAY_MAP[rawChoice] || {
                  label: rawChoice,
                  badgeClass: 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white border-[#0F172A]'
                };

                return (
                  <div key={q.id} className="py-3.5">
                    <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8] mb-1">
                      <span className="font-bold text-[#059669] dark:text-[#22C55E]">
                        #{q.id} · {q.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${choiceConfig.badgeClass}`}>
                        {choiceConfig.label}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] font-serif">
                      {q.statement}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t-2 border-[#0F172A]/15 dark:border-[#1E293B]">
        <button
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white bg-[#10B981] hover:bg-[#059669] border-3 border-[#0F172A] dark:border-[#22C55E] rounded-2xl shadow-[4px_4px_0px_#0F172A] dark:shadow-[4px_4px_0px_#22C55E]/30 hover:shadow-[2px_2px_0px_#0F172A] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer w-full sm:w-auto justify-center"
        >
          <Camera className="w-4 h-4" />
          <span>Share Match Card</span>
        </button>

        <button
          onClick={onRetakeQuiz}
          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white bg-[#EC4899] hover:bg-[#DB2777] border-3 border-[#0F172A] dark:border-[#EC4899] rounded-2xl shadow-[4px_4px_0px_#0F172A] dark:shadow-[4px_4px_0px_#EC4899]/30 hover:shadow-[2px_2px_0px_#0F172A] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer w-full sm:w-auto justify-center"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Quiz (50 or 100 Statements)</span>
        </button>
      </div>

      {/* Interactive Philosopher Dossier Modal */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#0F172A] rounded-3xl border-4 border-[#0F172A] dark:border-[#22C55E] shadow-[10px_10px_0px_#10B981] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#0F172A] text-white flex items-center justify-between border-b-3 border-[#0F172A] dark:border-[#22C55E]/40">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#22C55E]">
                <BookOpen className="w-4 h-4 text-[#22C55E]" />
                <span>PHILOSOPHER DOSSIER</span>
              </div>
              <button
                onClick={() => setActiveDossier(null)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto subtle-scroll space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Authentic Framed Portrait */}
                <div className="w-32 h-40 sm:w-36 sm:h-44 shrink-0 rounded-2xl overflow-hidden border-3 border-[#0F172A] dark:border-[#22C55E]/40 shadow-[4px_4px_0px_#10B981] bg-stone-900 mx-auto sm:mx-0">
                  <img
                    src={getPhilosopherPortrait(activeDossier.id)}
                    alt={activeDossier.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F0FDF4] dark:bg-[#064E3B]/60 text-[#059669] dark:text-[#22C55E] font-mono text-xs font-bold border border-[#0F172A] dark:border-[#22C55E]/40 mb-1.5">
                    {activeDossier.dates} · {activeDossier.nationality}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#0F172A] dark:text-white leading-tight mb-1">
                    {activeDossier.name}
                  </h3>
                  <div className="text-xs font-bold text-[#DB2777] dark:text-[#EC4899] mb-3">
                    {activeDossier.school} ({activeDossier.century})
                  </div>

                  {activeDossier.motto && (
                    <div className="p-2.5 rounded-xl bg-[#FDF2F8] dark:bg-[#831843]/30 border border-[#FBCFE8] dark:border-[#EC4899]/40 text-xs font-serif italic text-[#BE185D] dark:text-[#F472B6]">
                      &ldquo;{activeDossier.motto}&rdquo;
                    </div>
                  )}
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border-2 border-[#0F172A] dark:border-[#334155] shadow-[3px_3px_0px_#EC4899]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                  <Quote className="w-3 h-3 text-[#10B981] dark:text-[#22C55E]" />
                  <span>Famous Quote</span>
                </div>
                <blockquote className="text-sm font-serif italic text-[#0F172A] dark:text-slate-100 leading-relaxed mb-1">
                  &ldquo;{activeDossier.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
                  — {activeDossier.quoteSource}
                </div>
              </div>

              {/* Bio Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5">
                  Philosophical Overview
                </h4>
                <p className="text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed font-prose-serif">
                  {activeDossier.summary}
                </p>
              </div>

              {/* Magnum Opus */}
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-xs">
                <span className="font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase mr-2">Magnum Opus:</span>
                <span className="font-serif font-bold text-[#0F172A] dark:text-white italic">{activeDossier.magnumOpus}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-[#1E293B] border-t-2 border-[#0F172A]/10 dark:border-[#334155] flex justify-end">
              <button
                onClick={() => setActiveDossier(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-[#22C55E] font-mono text-xs font-bold transition-colors cursor-pointer border border-[#22C55E]/40"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareModal && (
        <ShareCardModal
          result={result}
          userName={userName}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};
