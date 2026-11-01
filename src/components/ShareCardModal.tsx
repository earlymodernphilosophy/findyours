/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check, Sparkles, Swords, Camera } from 'lucide-react';
import { toPng } from 'html-to-image';
import { OverallQuizResult, MatchResult } from '../types/philosophy';
import { getPhilosopherPortrait } from '../utils/philosopherPortraits';
import { getNemesisExplanation } from '../utils/quizAlgorithm';

interface ShareCardModalProps {
  result: OverallQuizResult;
  userName?: string;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  result,
  userName,
  onClose
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { primaryMatch, council, nemesis, allRankings, completedQuestionsCount } = result;
  const primaryPhil = primaryMatch.philosopher;
  const nemesisPhil = nemesis.philosopher;

  // Compute top 5 matches (Primary Twin + 4 closest peers)
  const top5: MatchResult[] = [primaryMatch, ...(council || []).slice(0, 4)];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true
      });
      const link = document.createElement('a');
      link.download = `${(userName || 'philosophy-match').toLowerCase().replace(/\s+/g, '-')}-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = () => {
    const lines = [
      `🏛️ My Early Modern Philosopher Match: ${primaryPhil.name} (${primaryMatch.matchScore}% Match)`,
      `School: ${primaryPhil.school}`,
      `Motto: "${primaryPhil.motto}"`,
      ``,
      `Top 5 Matches:`,
      ...top5.map((m, i) => `${i + 1}. ${m.philosopher.name} (${m.matchScore}%) - ${m.philosopher.school}`),
      ``,
      `Nemesis: ${nemesisPhil.name} (${nemesis.matchScore}% alignment)`,
      `Take the quiz to find your historical philosophical twin!`
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg my-auto flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between mb-3 px-1 text-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#22C55E] text-[#07090E]">
              <Camera className="w-4 h-4" />
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              Share Card (Screenshot Ready)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* THE SHAREABLE CARD CONTAINER (OPTIMIZED FOR SCREENSHOTS & PNG) */}
        {/* ============================================================== */}
        <div
          ref={cardRef}
          className="w-full bg-white border-2 border-[#0F172A] shadow-[8px_8px_0px_#10B981] rounded-3xl p-5 sm:p-6 text-[#0F172A] flex flex-col gap-4 select-none"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between border-b-2 border-[#0F172A]/15 pb-3">
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-[#059669]">
                Early Modern Philosopher Persona
              </div>
              <h2 className="text-lg sm:text-xl font-black font-serif text-[#0F172A] leading-tight">
                {userName ? `${userName}’s Profile` : 'Philosophical Persona'}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-[#F0FDF4] border border-[#0F172A] text-[#059669] font-mono text-[10px] sm:text-xs font-bold shrink-0">
              {completedQuestionsCount} Answers
            </span>
          </div>

          {/* 1. TOP MATCH HERO */}
          <div className="bg-gradient-to-br from-[#F0FDF4] via-white to-[#FDF2F8] border-3 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] rounded-2xl p-3.5 flex gap-3.5 items-center">
            {/* Portrait */}
            <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded-xl overflow-hidden border-2 border-[#0F172A] bg-stone-900 shadow-[2px_2px_0px_#10B981]">
              <img
                src={getPhilosopherPortrait(primaryPhil.id)}
                alt={primaryPhil.name}
                className="w-full h-full object-cover object-top"
                crossOrigin="anonymous"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-[#F0FDF4] text-[#059669] font-mono font-black text-[10px] sm:text-xs border border-[#10B981]">
                  {primaryMatch.matchScore}% Match
                </span>
                <span className="text-[10px] font-mono font-bold text-[#64748B]">
                  #1 Match
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0F172A] truncate leading-tight">
                {primaryPhil.name}
              </h3>

              <div className="text-[11px] sm:text-xs font-bold text-[#DB2777] truncate">
                {primaryPhil.school}
              </div>

              <div className="mt-1 text-[11px] font-serif italic text-slate-600 line-clamp-2 leading-tight">
                &ldquo;{primaryPhil.motto}&rdquo;
              </div>
            </div>
          </div>

          {/* 2. TOP 5 MATCHES (LEADERBOARD) */}
          <div className="bg-white border-2 border-[#0F172A] rounded-2xl p-3 shadow-[3px_3px_0px_#0F172A]">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Top 5 Matches</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Compatibility
              </span>
            </div>

            <div className="space-y-1.5">
              {top5.map((item, index) => {
                const isFirst = index === 0;
                return (
                  <div
                    key={item.philosopher.id}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-all ${
                      isFirst
                        ? 'bg-[#F0FDF4] border-[#10B981] font-bold'
                        : 'bg-[#F8FAFC] border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-mono font-black shrink-0 ${
                          isFirst ? 'bg-[#10B981] text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="w-5 h-5 rounded overflow-hidden border border-slate-400 shrink-0">
                        <img
                          src={getPhilosopherPortrait(item.philosopher.id)}
                          alt={item.philosopher.name}
                          className="w-full h-full object-cover object-top"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold truncate block">
                          {item.philosopher.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-500 hidden sm:inline truncate max-w-[110px]">
                        {item.philosopher.school}
                      </span>
                      <span className="text-xs font-mono font-black px-1.5 py-0.5 rounded bg-white border border-slate-300">
                        {item.matchScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. NEMESIS */}
          <div className="bg-[#FFF1F2] border-2 border-[#E11D48] rounded-2xl p-3 shadow-[3px_3px_0px_#E11D48]">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-rose-200">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#BE185D] flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Nemesis</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-white text-[#E11D48] font-mono text-[10px] font-bold border border-rose-300">
                {nemesis.matchScore}% Alignment
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-14 shrink-0 rounded-lg overflow-hidden border-2 border-[#E11D48] bg-stone-900 shadow-[1px_1px_0px_#BE185D]">
                <img
                  src={getPhilosopherPortrait(nemesisPhil.id)}
                  alt={nemesisPhil.name}
                  className="w-full h-full object-cover object-top"
                  crossOrigin="anonymous"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-black font-serif text-[#0F172A] truncate leading-snug">
                  {nemesisPhil.name}
                </div>
                <div className="text-[10px] font-bold text-[#E11D48] truncate">
                  {nemesisPhil.school}
                </div>
                <p className="text-[11px] text-[#334155] line-clamp-2 mt-0.5 leading-tight">
                  {getNemesisExplanation(primaryPhil, nemesisPhil, result.userScores)}
                </p>
              </div>
            </div>
          </div>

          {/* Card Watermark Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-[#0F172A]/15 text-[10px] font-mono text-slate-500">
            <span>Early Modern Persona Quiz</span>
            <span>Which thinker are you?</span>
          </div>
        </div>

        {/* Action Buttons Below Card */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-2.5 mt-4">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:flex-1 py-2.5 px-4 bg-[#06B6D4] hover:bg-[#0891B2] active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] cursor-pointer flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Generating PNG...' : 'Download Image (.PNG)'}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="w-full sm:flex-1 py-2.5 px-4 bg-[#EC4899] hover:bg-[#DB2777] active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] cursor-pointer flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Summary!' : 'Copy Text Summary'}</span>
          </button>
        </div>

        <p className="text-[11px] text-stone-400 text-center mt-2">
          Tip: You can also screenshot the card directly using your device shortcuts!
        </p>
      </div>
    </div>
  );
};
