import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Crown, FastForward, SkipForward, Sparkles } from 'lucide-react';
import { getQuizStatements, LikertQuestion } from '../data/questions';
import { LikertChoice } from '../types/philosophy';
import { ThemeSlider } from './ThemeSlider';

interface QuizViewProps {
  mode: '50' | '100';
  onComplete: (selectedAnswers: Record<number, string>) => void;
  onExit: () => void;
  initialAnswers?: Record<number, string>;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  mode,
  onComplete,
  onExit,
  initialAnswers = {},
  isDark = true,
  onToggleDark
}) => {
  const questions: LikertQuestion[] = getQuizStatements(mode);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] =
    useState<Record<number, string>>(initialAnswers);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [justSelected, setJustSelected] = useState<LikertChoice | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const currentChoice = selectedAnswers[currentQuestion.id] as LikertChoice | undefined;
  const isCurrentQuestionAnswered = Boolean(currentChoice);
  const isFinalQuestion = currentIndex === totalQuestions - 1;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectLikert = (choice: LikertChoice) => {
    setJustSelected(choice);
    const updated = {
      ...selectedAnswers,
      [currentQuestion.id]: choice
    };
    setSelectedAnswers(updated);

    if (autoAdvance) {
      if (currentIndex < totalQuestions - 1) {
        setTimeout(() => {
          setJustSelected(null);
          setCurrentIndex((prev) => prev + 1);
        }, 130);
      } else {
        setTimeout(() => {
          setJustSelected(null);
          onComplete(updated);
        }, 160);
      }
    } else {
      setTimeout(() => setJustSelected(null), 300);
    }
  };

  const handleSkip = () => {
    const updated = {
      ...selectedAnswers,
      [currentQuestion.id]: 'skipped'
    };
    setSelectedAnswers(updated);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(updated);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(selectedAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard shortcut listener (1-5 for options, Left/Right for navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '1') {
        handleSelectLikert('strongly_agree');
      } else if (e.key === '2') {
        handleSelectLikert('agree');
      } else if (e.key === '3') {
        handleSelectLikert('neutral');
      } else if (e.key === '4') {
        handleSelectLikert('disagree');
      } else if (e.key === '5') {
        handleSelectLikert('strongly_disagree');
      } else if (e.key === 'ArrowRight' && isCurrentQuestionAnswered) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isCurrentQuestionAnswered, currentQuestion, autoAdvance, selectedAnswers]);

  const LIKERT_OPTIONS_LIST: {
    value: LikertChoice;
    label: string;
    number: string;
    activeStyle: string;
    hoverStyle: string;
    pillColor: string;
    accentDot: string;
  }[] = [
    {
      value: 'strongly_agree',
      label: 'Strongly Agree',
      number: '1',
      activeStyle: 'bg-[#F0FDF4] dark:bg-[#064E3B]/60 border-[#10B981] dark:border-[#22C55E] text-[#047857] dark:text-[#22C55E]',
      hoverStyle: 'hover:border-[#10B981] hover:bg-[#DCFCE7] dark:hover:bg-[#064E3B]/40',
      pillColor: 'bg-[#10B981] border-[#10B981] text-white shadow-[0_0_8px_#10B981]',
      accentDot: 'bg-[#22C55E]'
    },
    {
      value: 'agree',
      label: 'Agree',
      number: '2',
      activeStyle: 'bg-[#F0FDF4] dark:bg-[#064E3B]/40 border-[#34D399] dark:border-[#34D399] text-[#047857] dark:text-[#34D399]',
      hoverStyle: 'hover:border-[#34D399] hover:bg-[#DCFCE7] dark:hover:bg-[#064E3B]/30',
      pillColor: 'bg-[#059669] border-[#059669] text-white',
      accentDot: 'bg-[#059669]'
    },
    {
      value: 'neutral',
      label: 'Neutral',
      number: '3',
      activeStyle: 'bg-[#F8FAFC] dark:bg-[#1E293B] border-[#94A3B8] dark:border-[#94A3B8] text-[#334155] dark:text-[#E2E8F0]',
      hoverStyle: 'hover:border-[#64748B] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]/70',
      pillColor: 'bg-[#64748B] border-[#64748B] text-white',
      accentDot: 'bg-[#64748B]'
    },
    {
      value: 'disagree',
      label: 'Disagree',
      number: '4',
      activeStyle: 'bg-[#FFF1F2] dark:bg-[#881337]/50 border-[#FB7185] dark:border-[#FB7185] text-[#E11D48] dark:text-[#FDA4AF]',
      hoverStyle: 'hover:border-[#FB7185] hover:bg-[#FFE4E6] dark:hover:bg-[#881337]/30',
      pillColor: 'bg-[#FB7185] border-[#FB7185] text-white',
      accentDot: 'bg-[#FB7185]'
    },
    {
      value: 'strongly_disagree',
      label: 'Strongly Disagree',
      number: '5',
      activeStyle: 'bg-[#FDF2F8] dark:bg-[#831843]/60 border-[#EC4899] dark:border-[#F472B6] text-[#BE185D] dark:text-[#F472B6]',
      hoverStyle: 'hover:border-[#EC4899] hover:bg-[#FCE7F3] dark:hover:bg-[#831843]/40',
      pillColor: 'bg-[#EC4899] border-[#EC4899] text-white shadow-[0_0_8px_#EC4899]',
      accentDot: 'bg-[#EC4899]'
    }
  ];

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-2 sm:py-3.5 flex flex-col justify-between overflow-hidden select-none bg-transparent">
      {/* 1. TOP BAR */}
      <div className="shrink-0 flex flex-col gap-1.5 pb-2 border-b border-[#0F172A]/15 dark:border-[#1E293B]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onExit}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-[#0F172A] border border-[#CBD5E1] dark:border-[#334155] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quit</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-2 border-[#0F172A] dark:border-[#22C55E]/40 bg-[#F0FDF4] dark:bg-[#064E3B]/40 text-[#059669] dark:text-[#22C55E] shadow-xs">
              {mode === '50' ? <Zap className="w-3.5 h-3.5 text-[#10B981] fill-[#10B981]" /> : <Crown className="w-3.5 h-3.5 text-[#EC4899] fill-[#EC4899]" />}
              <span>{mode === '50' ? '50' : '100'} Statements</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleDark && (
              <ThemeSlider isDark={isDark} onToggle={onToggleDark} showTextLabel={false} />
            )}

            <button
              onClick={() => setAutoAdvance(!autoAdvance)}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                autoAdvance
                  ? 'bg-[#FDF2F8] dark:bg-[#831843]/40 border-[#EC4899] text-[#DB2777] dark:text-[#F472B6]'
                  : 'bg-white dark:bg-[#0F172A] border-[#CBD5E1] dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8]'
              }`}
            >
              <FastForward className="w-3 h-3" />
              <span>Auto-advance: {autoAdvance ? 'ON' : 'OFF'}</span>
            </button>

            <div className="flex items-center gap-1.5 bg-white dark:bg-[#0F172A] px-2.5 py-1 rounded-lg border border-[#CBD5E1] dark:border-[#334155] shadow-xs">
              <Zap className="w-3 h-3 text-[#22C55E] fill-[#22C55E]" />
              <span className="text-xs font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {currentIndex + 1} / {totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Animated Progress Bar with Shimmer Highlight (Neon Green to Pink Gradient) */}
        <div className="h-2 w-full bg-[#E2E8F0] dark:bg-[#1E293B] rounded-full overflow-hidden relative border border-[#0F172A]/10 dark:border-[#334155]">
          <div
            className="h-full bg-gradient-to-r from-[#22C55E] via-[#10B981] to-[#EC4899] rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Shimmer beam */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* 2. STATEMENT & LIKERT CARD (ANIMATED QUESTION FOLIO) */}
      <div
        key={currentQuestion.id}
        className="animate-quiz-slide relative flex-1 min-h-0 my-1.5 sm:my-2.5 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white dark:bg-[#0F172A] border-2 border-[#0F172A] dark:border-[#1E293B] shadow-[4px_4px_0px_#0F172A] dark:shadow-[4px_4px_0px_#22C55E]/30 md:shadow-[6px_6px_0px_#0F172A] md:dark:shadow-[6px_6px_0px_#22C55E]/30 flex flex-col justify-between overflow-hidden"
      >
        {/* Header: Category Pill & Question Number */}
        <div className="shrink-0 flex items-center justify-between border-b border-[#0F172A]/10 dark:border-[#1E293B] pb-2">
          {currentQuestion.isPriorityQuestion ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F8] dark:bg-[#831843]/40 text-[#DB2777] dark:text-[#F472B6] font-black text-[10px] sm:text-xs uppercase tracking-wider border border-[#FBCFE8] dark:border-[#EC4899]/50 shadow-xs animate-scale-in">
              <Sparkles className="w-3 h-3 text-[#EC4899]" />
              <span>Worldview Priority</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-[#F0FDF4] dark:bg-[#064E3B]/50 text-[#059669] dark:text-[#22C55E] font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-[#86EFAC] dark:border-[#22C55E]/40 shadow-xs animate-scale-in">
              {currentQuestion.category}
            </span>
          )}
          <span className="text-[10px] sm:text-xs font-mono font-bold text-[#64748B] dark:text-[#94A3B8] bg-[#F8FAFC] dark:bg-[#1E293B] px-2.5 py-0.5 rounded border border-[#E2E8F0] dark:border-[#334155]">
            QUESTION #{currentQuestion.id}
          </span>
        </div>

        {/* Statement: Crisp Bold Typography */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center my-2 sm:my-3 px-2 sm:px-6 text-center">
          <div className="max-w-3xl w-full">
            <h2
              className={`font-zany font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug sm:leading-snug text-center [text-wrap:balance] tracking-tight ${
                currentQuestion.statement.length > 140
                  ? 'text-lg sm:text-xl md:text-2xl lg:text-[28px]'
                  : currentQuestion.statement.length > 80
                  ? 'text-xl sm:text-2xl md:text-[28px] lg:text-[32px]'
                  : 'text-2xl sm:text-3xl md:text-[34px] lg:text-[38px]'
              }`}
            >
              {currentQuestion.statement}
            </h2>
          </div>
        </div>

        {/* 5 Substantial Likert Option Panels with Micro-Animations */}
        <div className="shrink-0 space-y-1.5 sm:space-y-2 md:space-y-2.5 w-full max-w-3xl mx-auto">
          {LIKERT_OPTIONS_LIST.map((option) => {
            const isSelected = currentChoice === option.value;
            const isJustClicked = justSelected === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelectLikert(option.value)}
                className={`relative w-full text-left py-2 sm:py-2.5 md:py-3.5 px-3 sm:px-4 md:px-5 rounded-xl md:rounded-2xl border-2 transition-all duration-150 cursor-pointer flex items-center justify-between group active:scale-[0.985] ${
                  isSelected
                    ? `${option.activeStyle} shadow-[4px_4px_0px_#0F172A] dark:shadow-[4px_4px_0px_#22C55E]/40 animate-option-pop`
                    : `bg-[#FAFAF9] dark:bg-[#1E293B]/70 ${option.hoverStyle} border-[#E2E8F0] dark:border-[#334155] hover:border-[#0F172A] dark:hover:border-[#22C55E] hover:translate-x-0.5 hover:shadow-[3px_3px_0px_#0F172A] dark:hover:shadow-[3px_3px_0px_#22C55E]`
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 relative">
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-black border transition-all duration-150 shrink-0 ${
                      isSelected
                        ? `${option.pillColor} animate-scale-in`
                        : 'bg-white dark:bg-[#0F172A] border-[#0F172A] dark:border-[#64748B] text-[#0F172A] dark:text-white group-hover:scale-105'
                    }`}
                  >
                    {option.number}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {option.label}
                  </span>

                  {/* Micro Visual Burst Sparkles when clicked */}
                  {isJustClicked && (
                    <div className="absolute -left-1 -top-1 pointer-events-none flex gap-1 animate-scale-in">
                      <span className={`w-1.5 h-1.5 rounded-full ${option.accentDot} animate-ping`} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden md:inline-block text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] bg-white dark:bg-[#0F172A] px-2 py-0.5 rounded border border-[#E2E8F0] dark:border-[#334155]">
                    Key {option.number}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-current animate-scale-in" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM NAVIGATION (PREV, SKIP, NEXT) */}
      <div className="shrink-0 flex items-center justify-between gap-2 pt-1 pb-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl border-2 transition-all cursor-pointer ${
            currentIndex === 0
              ? 'opacity-40 border-[#CBD5E1] dark:border-[#334155] text-[#94A3B8] cursor-not-allowed'
              : 'bg-white dark:bg-[#0F172A] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border-[#0F172A] dark:border-[#334155] text-[#0F172A] dark:text-white shadow-[2px_2px_0px_#0F172A] dark:shadow-[2px_2px_0px_#22C55E]/20 active:translate-y-0.5'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleSkip}
          className={`inline-flex items-center gap-1 px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl border-2 transition-all cursor-pointer ${
            currentChoice === 'skipped'
              ? 'bg-[#FDF2F8] dark:bg-[#831843]/40 border-[#EC4899] text-[#DB2777] dark:text-[#F472B6] shadow-[2px_2px_0px_#EC4899]'
              : 'bg-white dark:bg-[#0F172A] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border-[#0F172A] dark:border-[#334155] text-[#475569] dark:text-[#CBD5E1] shadow-[2px_2px_0px_#0F172A] active:translate-y-0.5'
          }`}
        >
          <SkipForward className="w-3.5 h-3.5" />
          <span>{currentChoice === 'skipped' ? 'Skipped ✓' : 'Skip'}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered}
          className={`inline-flex items-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-black rounded-xl border-2 border-[#0F172A] dark:border-[#22C55E]/50 transition-all cursor-pointer ${
            !isCurrentQuestionAnswered
              ? 'opacity-50 bg-[#E2E8F0] dark:bg-[#1E293B] text-[#94A3B8] cursor-not-allowed'
              : isFinalQuestion
              ? 'bg-gradient-to-r from-[#10B981] to-[#EC4899] text-white shadow-[2px_2px_0px_#0F172A] dark:shadow-[0_0_12px_#EC4899] active:translate-y-0.5 hover:scale-[1.02]'
              : 'bg-[#0F172A] dark:bg-[#22C55E] hover:bg-[#1E293B] dark:hover:bg-[#16A34A] text-[#22C55E] dark:text-[#07090E] shadow-[2px_2px_0px_#EC4899] active:translate-y-0.5 hover:scale-[1.02]'
          }`}
        >
          <span>{isFinalQuestion ? 'Finish' : 'Next'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
