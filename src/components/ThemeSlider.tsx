/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeSliderProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
  showTextLabel?: boolean;
}

export const ThemeSlider: React.FC<ThemeSliderProps> = ({
  isDark,
  onToggle,
  className = '',
  showTextLabel = true
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {showTextLabel && (
        <span className="hidden sm:inline-block font-mono text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}

      {/* Tactile Slider Button */}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex items-center h-8 w-16 p-0.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] ${
          isDark
            ? 'bg-[#0F172A] border-2 border-[#22C55E] shadow-[2px_2px_0px_#EC4899] hover:shadow-[3px_3px_0px_#22C55E]'
            : 'bg-[#F1F5F9] border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] hover:shadow-[3px_3px_0px_#10B981]'
        }`}
      >
        {/* Track Icons: Sun on left, Moon on right */}
        <div className="absolute inset-0 px-1.5 flex items-center justify-between pointer-events-none">
          <Sun
            className={`w-3.5 h-3.5 transition-opacity duration-200 ${
              isDark ? 'opacity-30 text-slate-400' : 'opacity-100 text-amber-500'
            }`}
          />
          <Moon
            className={`w-3.5 h-3.5 transition-opacity duration-200 ${
              isDark ? 'opacity-100 text-[#22C55E]' : 'opacity-30 text-slate-400'
            }`}
          />
        </div>

        {/* Sliding Thumb Knob */}
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-300 ease-spring z-10 ${
            isDark
              ? 'translate-x-8 bg-[#22C55E] text-[#07090E] shadow-[0_0_8px_#22C55E]'
              : 'translate-x-0.5 bg-amber-400 text-white shadow-sm'
          }`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 fill-current" />
          ) : (
            <Sun className="w-3 h-3 fill-current" />
          )}
        </span>
      </button>
    </div>
  );
};
