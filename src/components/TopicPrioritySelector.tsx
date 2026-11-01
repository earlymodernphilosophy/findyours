/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Brain,
  Sparkles,
  Microscope,
  Scale,
  Landmark,
  Sun,
  Sliders,
  RotateCcw,
  Check,
  Zap,
  BookOpen
} from 'lucide-react';
import {
  DimensionKey,
  DimensionWeights,
  DEFAULT_DIMENSION_WEIGHTS,
  PRIORITY_PRESETS,
  PRIORITY_WEIGHT_VALUES
} from '../types/philosophy';

interface TopicConfig {
  key: DimensionKey;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOPICS: TopicConfig[] = [
  {
    key: 'epistemology',
    name: 'Epistemology',
    subtitle: 'Reason, senses, certainty, doubt, and how we know things',
    icon: Brain
  },
  {
    key: 'metaphysics',
    name: 'Metaphysics',
    subtitle: 'Consciousness, physical matter, mind, and the nature of reality',
    icon: Sparkles
  },
  {
    key: 'methodology',
    name: 'Scientific Method',
    subtitle: 'Experiments, observation, logical proofs, and scientific discovery',
    icon: Microscope
  },
  {
    key: 'ethics',
    name: 'Ethics',
    subtitle: 'Right and wrong, happiness, virtue, conscience, and moral duty',
    icon: Scale
  },
  {
    key: 'politics',
    name: 'Politics',
    subtitle: 'Individual liberty, equality, law, and government authority',
    icon: Landmark
  },
  {
    key: 'theology',
    name: 'Theology',
    subtitle: 'God, natural laws, free will, and divine providence',
    icon: Sun
  },
  {
    key: 'metaphilosophy',
    name: 'Scope of Philosophy',
    subtitle: 'Building grand systems versus solving practical human problems',
    icon: BookOpen
  }
];

interface TopicPrioritySelectorProps {
  weights: DimensionWeights;
  onChangeWeights: (newWeights: DimensionWeights) => void;
  compact?: boolean;
}

export const TopicPrioritySelector: React.FC<TopicPrioritySelectorProps> = ({
  weights,
  onChangeWeights,
  compact = false
}) => {
  // Helper to determine the discrete level of a weight
  const getLevel = (weight: number): 'crucial' | 'standard' | 'secondary' | 'ignored' => {
    if (weight <= 0.05) return 'ignored';
    if (weight <= 0.5) return 'secondary';
    if (weight <= 1.5) return 'standard';
    return 'crucial';
  };

  const handleSetLevel = (dim: DimensionKey, level: 'crucial' | 'standard' | 'secondary' | 'ignored') => {
    const updated = {
      ...weights,
      [dim]: PRIORITY_WEIGHT_VALUES[level]
    };
    onChangeWeights(updated);
  };

  const handleApplyPreset = (presetWeights: DimensionWeights) => {
    onChangeWeights({ ...presetWeights });
  };

  // Determine active preset if matching
  const activePreset = PRIORITY_PRESETS.find((p) => {
    return (
      Math.abs((weights.epistemology ?? 1) - p.weights.epistemology) < 0.1 &&
      Math.abs((weights.metaphysics ?? 1) - p.weights.metaphysics) < 0.1 &&
      Math.abs((weights.theology ?? 1) - p.weights.theology) < 0.1 &&
      Math.abs((weights.ethics ?? 1) - p.weights.ethics) < 0.1 &&
      Math.abs((weights.politics ?? 1) - p.weights.politics) < 0.1 &&
      Math.abs((weights.methodology ?? 1) - p.weights.methodology) < 0.1
    );
  });

  return (
    <div className="w-full bg-[#F8FAFC] rounded-2xl md:rounded-3xl border-2 border-[#0F172A] p-4 sm:p-6 shadow-[5px_5px_0px_#10B981]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#059669]">
            <Sliders className="w-3.5 h-3.5" />
            <span>Philosophical Priorities</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-black text-[#0F172A] mt-0.5">
            What topics matter most to you?
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-xl">
            Choose which topics carry the most weight for your match.
          </p>
        </div>

        <button
          onClick={() => onChangeWeights({ ...DEFAULT_DIMENSION_WEIGHTS })}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#475569] hover:text-[#0F172A] hover:border-[#0F172A] transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Balanced</span>
        </button>
      </div>

      {/* Preset Pills */}
      <div className="mb-5">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
          Quick Presets:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRIORITY_PRESETS.map((preset) => {
            const isSelected = activePreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.weights)}
                className={`py-2 px-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F0FDF4] border-[#10B981] shadow-[2px_2px_0px_#0F172A] text-[#059669]'
                    : 'bg-white border-[#E2E8F0] hover:border-[#0F172A] text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{preset.shortLabel}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
                </div>
                <span className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5">
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {TOPICS.map((topic) => {
          const currentWeight = weights[topic.key] ?? 1.0;
          const currentLevel = getLevel(currentWeight);
          const IconComponent = topic.icon;

          return (
            <div
              key={topic.key}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                currentLevel === 'ignored'
                  ? 'bg-slate-100/70 border-slate-300 opacity-60'
                  : currentLevel === 'crucial'
                  ? 'bg-[#FDF2F8] border-[#EC4899] shadow-[2px_2px_0px_#EC4899]'
                  : 'bg-white border-[#E2E8F0]'
              }`}
            >
              {/* Topic Info */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    currentLevel === 'crucial'
                      ? 'bg-[#FCE7F3] border-[#EC4899] text-[#DB2777]'
                      : currentLevel === 'ignored'
                      ? 'bg-slate-200 border-slate-300 text-slate-400'
                      : 'bg-[#F0FDF4] border-[#86EFAC] text-[#059669]'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#0F172A] truncate">
                      {topic.name}
                    </h4>
                    {currentLevel === 'crucial' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#EC4899] text-white border border-[#DB2777]">
                        Crucial (2.5x)
                      </span>
                    )}
                    {currentLevel === 'ignored' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600">
                        Ignored (0x)
                      </span>
                    )}
                  </div>
                  {!compact && (
                    <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 line-clamp-1 sm:line-clamp-none">
                      {topic.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* 4-Level Priority Buttons */}
              <div className="grid grid-cols-4 gap-1 sm:gap-1.5 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => handleSetLevel(topic.key, 'crucial')}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                    currentLevel === 'crucial'
                      ? 'bg-[#EC4899] border-[#0F172A] text-white shadow-[2px_2px_0px_#0F172A]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#0F172A]'
                  }`}
                >
                  Crucial
                </button>

                <button
                  type="button"
                  onClick={() => handleSetLevel(topic.key, 'standard')}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                    currentLevel === 'standard'
                      ? 'bg-[#0F172A] border-[#0F172A] text-[#22C55E] shadow-[2px_2px_0px_#0F172A]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#0F172A]'
                  }`}
                >
                  Normal
                </button>

                <button
                  type="button"
                  onClick={() => handleSetLevel(topic.key, 'secondary')}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                    currentLevel === 'secondary'
                      ? 'bg-[#DCFCE7] border-[#10B981] text-[#059669] shadow-[2px_2px_0px_#0F172A]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#0F172A]'
                  }`}
                >
                  Low
                </button>

                <button
                  type="button"
                  onClick={() => handleSetLevel(topic.key, 'ignored')}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                    currentLevel === 'ignored'
                      ? 'bg-[#FEE2E2] border-[#DC2626] text-[#991B1B] shadow-[2px_2px_0px_#0F172A]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] hover:border-[#0F172A]'
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
