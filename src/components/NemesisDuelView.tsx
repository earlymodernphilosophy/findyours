/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Swords, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { OverallQuizResult } from '../types/philosophy';
import { Retro8BitDuel } from './Retro8BitDuel';
import { PixelCharacterSprite } from './PixelCharacterSprite';
import { duelAudio } from '../utils/duelAudio';

interface NemesisDuelViewProps {
  quizResult: OverallQuizResult;
  userName?: string;
  onVictory: () => void;
}

const NEMESIS_TAUNTS: Record<string, string> = {
  'rene-descartes': '“Your senses are completely deceiving you, and so are your answers!”',
  'thomas-hobbes': '“Without an absolute sovereign, your life is nasty, brutish, and short!”',
  'david-hume': '“I have examined your reasoning and found zero evidence of sanity.”',
  'george-berkeley': '“Your physical matter literally does not exist. Stop pretending!”',
  'baruch-spinoza': '“Your emotional passions are geometrically irrational. Sit down.”',
  'john-locke': '“Your mind is a blank slate—and there is still nothing on it!”',
  'jean-jacques-rousseau': '“Civilization has thoroughly corrupted your soul. Go touch grass!”',
  'immanuel-kant': '“Your maxims cannot be universalized without immediate logical ruin!”',
  'voltaire': '“I might defend your right to speak, but your ideas are utterly absurd!”',
  'francis-bacon': '“You are trapped in the Idols of the Mind. Run an experiment!”',
  'edmund-burke': '“You just trashed two centuries of ancestral tradition in five minutes!”',
  'jeremy-bentham': '“Your opinions produce negative utility. The calculation has failed!”',
  'blaise-pascal': '“You are gambling your eternal soul and your bets are terrible!”',
  'gottfried-wilhelm-leibniz': '“This is the best of all possible worlds, but your answers are not.”',
  'mary-wollstonecraft': '“Reason knows no gender, and your answers know no discipline!”',
  'pierre-bayle': '“Your claims crumble under the slightest examination of critical doubt.”',
  'antoine-arnauld': '“Your flawed deductions offend both divine logic and basic grammar.”',
  'ralph-cudworth': '“Blind mechanical clockwork cannot account for the eternal soul!”',
  'christian-wolff': '“Your ideas lack systematic deductive structure and rigorous definition.”',
  'isaac-newton': '“I frame no hypotheses, but your claims defy universal gravitation.”',
  'robert-boyle': '“Your grand armchair theories fail every modest laboratory test.”',
  'pierre-gassendi': '“Dogmatic systems collapse; atomistic observations endure.”',
  'martha-nussbaum': '“Human beings are not arithmetic units on a cocktail napkin, Brutus!”',
  'brutus-buckeye': '“Actually, if you run the numbers, my takes maximize net dopamine, bro!”'
};

export const NemesisDuelView: React.FC<NemesisDuelViewProps> = ({
  quizResult,
  userName = 'Inquirer',
  onVictory
}) => {
  // Stages:
  // 1. 'countdown': Brief, suspenseful tallying screen
  // 2. 'ambush': Zany, punchy Nemesis Battle card featuring 8-bit character
  // 3. 'duel': Fullscreen retro 8-bit combat game
  const [stage, setStage] = useState<'countdown' | 'ambush' | 'duel'>('countdown');
  const [countdown, setCountdown] = useState(2);

  const nemesis = quizResult.nemesis.philosopher;
  const primaryMatch = quizResult.primaryMatch.philosopher;

  const nemesisTaunt =
    NEMESIS_TAUNTS[nemesis.id] ||
    `“Your philosophical worldview makes zero sense. Prepare for intellectual combat!”`;

  // Brief, punchy countdown
  useEffect(() => {
    if (stage !== 'countdown') return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((c) => c - 1);
        duelAudio.playTick(false);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setStage('ambush');
      duelAudio.playNemesisStab();
    }
  }, [stage, countdown]);

  return (
    <div
      className={
        stage === 'duel'
          ? 'fixed inset-0 z-50 w-screen h-screen bg-black'
          : 'min-h-[90vh] py-6 px-4 flex flex-col items-center justify-center'
      }
    >
      {/* 1. BRIEF CALCULATING SCREEN */}
      {stage === 'countdown' && (
        <div className="max-w-sm w-full bg-white border-3 border-[#1E1B18] rounded-3xl p-7 text-center shadow-[6px_6px_0px_#1E1B18] animate-in fade-in duration-200">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#FEF08A] border-2 border-[#1E1B18] flex items-center justify-center text-[#B45309] shadow-[3px_3px_0px_#1E1B18]">
            <Sparkles className="w-7 h-7 animate-spin" />
          </div>

          <h2 className="text-xl font-zany font-bold text-[#1E1B18] mb-1">
            Calculating Your Thinker...
          </h2>
          <p className="text-stone-600 text-xs mb-4">
            Scanning 17th & 18th century archives for <span className="font-bold text-[#B45309]">{userName}</span>
          </p>

          <div className="text-4xl font-mono font-black text-[#B45309] mb-4 animate-pulse">
            {countdown === 2 ? 'CALCULATING' : 'READY!'}
          </div>

          <div className="w-full bg-[#E5E0D5] h-3 rounded-full overflow-hidden border-2 border-[#1E1B18]">
            <div
              className="bg-[#B45309] h-full transition-all duration-700 ease-linear"
              style={{ width: `${((2 - countdown) / 2) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 2. THE ZANY NEMESIS BATTLE CHALLENGE SCREEN */}
      {stage === 'ambush' && (
        <div className="max-w-lg w-full bg-[#FFFBF0] border-4 border-[#1E1B18] rounded-3xl p-5 sm:p-7 shadow-[8px_8px_0px_#1E1B18] text-center animate-in zoom-in-95 duration-300 relative select-none">
          {/* Top Comic Alarm Banner */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DC2626] border-2 border-[#1E1B18] text-white text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#1E1B18] animate-bounce">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>BOSS ENCOUNTER</span>
          </div>

          {/* REQUIRED EXACT TITLE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-zany font-black uppercase tracking-tight text-[#1E1B18] leading-none mb-1.5">
            nemesis battle
          </h1>

          {/* REQUIRED EXACT SUBHEADING */}
          <p className="text-sm sm:text-base font-bold text-[#991B1B] lowercase tracking-wide mb-5">
            defeat your nemesis to reveal your match
          </p>

          {/* ZANY 8-BIT CHARACTER SHOWCASE CARD */}
          <div className="bg-white border-3 border-[#1E1B18] rounded-2xl p-4 sm:p-5 mb-4 shadow-[4px_4px_0px_#1E1B18] relative overflow-hidden">
            {/* Top Challenger Header */}
            <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2.5 mb-3.5">
              <span className="px-2.5 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                CHALLENGER APPEARS
              </span>
              <span className="font-mono text-xs font-bold text-stone-500">
                {nemesis.dates}
              </span>
            </div>

            {/* Split Character Showcase: 8-Bit Pixel Character + Speech Bubble & Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-1">
              {/* 1. ANIMATED 8-BIT SPRITE WITH RETRO PEDESTAL */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative p-2.5 rounded-2xl bg-stone-900 border-2 border-[#1E1B18] shadow-[3px_3px_0px_#B45309] flex items-center justify-center">
                  <PixelCharacterSprite philosopherId={nemesis.id} size={115} />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-amber-400 text-stone-950 font-mono text-[9px] font-black">
                    8-BIT BOSS
                  </span>
                </div>
              </div>

              {/* 2. COMIC SPEECH BUBBLE & INFO */}
              <div className="flex-1 text-left min-w-0">
                <div className="relative bg-[#FEF3C7] border-2 border-[#1E1B18] rounded-xl p-3 shadow-[2px_2px_0px_#1E1B18] mb-3">
                  <p className="text-xs sm:text-sm font-zany font-bold text-[#92400E] leading-snug">
                    {nemesisTaunt}
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-black font-serif text-lg sm:text-xl text-[#1E1B18] leading-tight">
                    {nemesis.name}
                  </h3>
                  <div className="text-xs font-bold text-[#B45309]">
                    {nemesis.school} · {nemesis.nationality}
                  </div>
                  <p className="text-xs text-stone-600 pt-1 font-prose-serif leading-relaxed">
                    Your answers sit furthest from {nemesis.name.split(' ')[0]} across the core philosophical dimensions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BIG ZANY ACTION BUTTON */}
          <button
            onClick={() => {
              duelAudio.ensureUnlocked();
              duelAudio.playKeyClick();
              setStage('duel');
            }}
            className="w-full py-3.5 sm:py-4 bg-[#DC2626] hover:bg-[#B91C1C] active:translate-y-0.5 text-white font-zany font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl border-3 border-[#1E1B18] shadow-[5px_5px_0px_#1E1B18] hover:shadow-[3px_3px_0px_#1E1B18] cursor-pointer inline-flex items-center justify-center gap-2.5 transition-all group"
          >
            <Swords className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
            <span>FIGHT NOW!</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick funny skip link for accessibility */}
          <div className="mt-3.5">
            <button
              onClick={() => {
                duelAudio.ensureUnlocked();
                onVictory();
              }}
              className="text-stone-400 hover:text-stone-700 text-xs font-mono underline decoration-dotted transition-colors cursor-pointer"
            >
              (cowardly option: sneak past {nemesis.name.split(' ')[0]} to reveal match)
            </button>
          </div>
        </div>
      )}

      {/* 3. RETRO 8-BIT NES DUEL ARENA (FULLSCREEN) */}
      {stage === 'duel' && (
        <Retro8BitDuel
          playerPhilosopherId={primaryMatch.id}
          nemesisPhilosopherId={nemesis.id}
          playerName={userName}
          onVictory={onVictory}
        />
      )}
    </div>
  );
};
