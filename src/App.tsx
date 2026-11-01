/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { QuizView } from './components/QuizView';
import { NameEntryView } from './components/NameEntryView';
import { NemesisDuelView } from './components/NemesisDuelView';
import { ResultView } from './components/ResultView';
import { Footer } from './components/Footer';
import { ThemeSlider } from './components/ThemeSlider';
import { OverallQuizResult, DimensionWeights, DEFAULT_DIMENSION_WEIGHTS } from './types/philosophy';
import { evaluateQuiz, deriveDimensionWeightsFromAnswers } from './utils/quizAlgorithm';
import { isJakeBeardsley, getJakeBeardsleyResult } from './data/easterEgg';

type ViewMode = 'home' | 'quiz' | 'name-entry' | 'duel' | 'result';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [quizMode, setQuizMode] = useState<'50' | '100'>('50');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [dimensionWeights, setDimensionWeights] = useState<DimensionWeights>(DEFAULT_DIMENSION_WEIGHTS);
  const [userName, setUserName] = useState<string>('');
  const [quizResult, setQuizResult] = useState<OverallQuizResult | null>(null);

  // Dark Mode state (Default: true)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('early_modern_theme');
      if (saved === 'light') return false;
      return true; // Default to dark mode as requested
    } catch {
      return true;
    }
  });

  // Sync theme with document.documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('early_modern_theme', 'dark');
      } catch {
        // Fallback
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('early_modern_theme', 'light');
      } catch {
        // Fallback
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Load saved state from localStorage if present
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('early_modern_quiz_answers');
      const savedMode = (localStorage.getItem('early_modern_quiz_mode') as '50' | '100') || '50';
      const savedName = localStorage.getItem('early_modern_quiz_name') || '';
      const savedWeights = localStorage.getItem('early_modern_quiz_weights');

      if (savedName) setUserName(savedName);

      if (savedAnswers) {
        const parsed = JSON.parse(savedAnswers);
        if (Object.keys(parsed).length > 0) {
          setSelectedAnswers(parsed);
          setQuizMode(savedMode);

          // Derive priority weights from priority questions in answers
          const derived = deriveDimensionWeightsFromAnswers(parsed, savedMode);
          let activeWeights = derived;

          if (savedWeights) {
            try {
              const parsedWeights = JSON.parse(savedWeights);
              const isUniform = Object.values(parsedWeights).every((v) => Math.abs((v as number) - 1.0) < 0.001);
              if (!isUniform) {
                activeWeights = parsedWeights;
              }
            } catch {
              // Ignore parse errors
            }
          }

          setDimensionWeights(activeWeights);

          if (isJakeBeardsley(savedName)) {
            setQuizResult(getJakeBeardsleyResult());
          } else {
            const evalResult = evaluateQuiz(parsed, savedMode, activeWeights);
            setQuizResult(evalResult);
          }
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const handleStartQuiz = (mode: '50' | '100') => {
    setQuizMode(mode);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when all statements in the quiz are finished
  const handleQuizComplete = (answers: Record<number, string>) => {
    setSelectedAnswers(answers);
    const derivedWeights = deriveDimensionWeightsFromAnswers(answers, quizMode);
    setDimensionWeights(derivedWeights);

    try {
      localStorage.setItem('early_modern_quiz_answers', JSON.stringify(answers));
      localStorage.setItem('early_modern_quiz_mode', quizMode);
      localStorage.setItem('early_modern_quiz_weights', JSON.stringify(derivedWeights));
    } catch {
      // LocalStorage fallback
    }

    // Direct user to provide their first name before archival calculation
    setCurrentView('name-entry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic priority adjustment
  const handleUpdateWeights = (newWeights: DimensionWeights) => {
    setDimensionWeights(newWeights);
    try {
      localStorage.setItem('early_modern_quiz_weights', JSON.stringify(newWeights));
    } catch {
      // LocalStorage fallback
    }

    if (Object.keys(selectedAnswers).length > 0) {
      if (isJakeBeardsley(userName)) {
        setQuizResult(getJakeBeardsleyResult());
      } else {
        const evalResult = evaluateQuiz(selectedAnswers, quizMode, newWeights);
        setQuizResult(evalResult);
      }
    }
  };

  // Called when the user submits their name
  const handleNameSubmit = (enteredName: string, activeWeights?: DimensionWeights) => {
    const finalWeights = activeWeights || dimensionWeights;
    setUserName(enteredName);
    setDimensionWeights(finalWeights);

    try {
      localStorage.setItem('early_modern_quiz_name', enteredName);
      localStorage.setItem('early_modern_quiz_weights', JSON.stringify(finalWeights));
    } catch {
      // LocalStorage fallback
    }

    if (isJakeBeardsley(enteredName)) {
      setQuizResult(getJakeBeardsleyResult());
      setCurrentView('duel');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const evalResult = evaluateQuiz(selectedAnswers, quizMode, finalWeights);
    setQuizResult(evalResult);

    // Direct to Nemesis Retro 8-bit Boss Fight
    setCurrentView('duel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuelVictory = () => {
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizResult(null);
    setUserName('');
    setDimensionWeights(DEFAULT_DIMENSION_WEIGHTS);
    try {
      localStorage.removeItem('early_modern_quiz_answers');
      localStorage.removeItem('early_modern_quiz_name');
      localStorage.removeItem('early_modern_quiz_weights');
    } catch {
      // LocalStorage fallback
    }
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isNoScrollView = currentView === 'quiz' || currentView === 'duel';

  return (
    <div
      className={`min-h-screen bg-[#F8FAFC] dark:bg-[#07090E] text-[#0F172A] dark:text-[#F8FAFC] flex flex-col font-sans selection:bg-[#EC4899] selection:text-white transition-colors duration-200 ${
        isNoScrollView ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : ''
      }`}
    >
      {/* Top Header Bar with Theme Switcher Slider */}
      {currentView !== 'quiz' && (
        <header className="shrink-0 w-full backdrop-blur-md bg-white/80 dark:bg-[#07090E]/80 border-b border-[#0F172A]/10 dark:border-[#1E293B] py-2.5 px-4 sm:px-8 flex items-center justify-between transition-colors z-40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
            <span className="font-serif font-black text-sm tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Early Modern <span className="text-[#DB2777] dark:text-[#EC4899]">Thinkers</span>
            </span>
          </div>

          <ThemeSlider isDark={isDarkMode} onToggle={toggleDarkMode} />
        </header>
      )}

      {/* Main View Router */}
      <main className={`flex-1 ${isNoScrollView ? 'h-full max-h-full overflow-hidden' : ''}`}>
        {currentView === 'home' && (
          <Hero
            onStartQuiz={handleStartQuiz}
            hasSavedResult={Boolean(quizResult)}
            onViewSavedResult={() => {
              setCurrentView('result');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            mode={quizMode}
            initialAnswers={selectedAnswers}
            onComplete={handleQuizComplete}
            onExit={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isDark={isDarkMode}
            onToggleDark={toggleDarkMode}
          />
        )}

        {currentView === 'name-entry' && (
          <NameEntryView
            questionCount={quizMode === '50' ? 50 : 100}
            weights={dimensionWeights}
            onChangeWeights={handleUpdateWeights}
            onNameSubmit={handleNameSubmit}
          />
        )}

        {currentView === 'duel' && quizResult && (
          <NemesisDuelView
            quizResult={quizResult}
            userName={userName || 'Inquirer'}
            onVictory={handleDuelVictory}
          />
        )}

        {currentView === 'result' && quizResult && (
          <ResultView
            result={quizResult}
            userName={userName || 'Inquirer'}
            selectedAnswers={selectedAnswers}
            dimensionWeights={dimensionWeights}
            onUpdateWeights={handleUpdateWeights}
            onRetakeQuiz={handleResetQuiz}
            onSelectPhilosopherForDossier={() => {}}
          />
        )}
      </main>

      {/* Clean Bottom Navigation Footer */}
      {currentView !== 'duel' && currentView !== 'quiz' && (
        <Footer
          currentView={currentView}
          onNavigateHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onResetQuiz={handleResetQuiz}
          hasResult={Boolean(quizResult)}
        />
      )}
    </div>
  );
}
