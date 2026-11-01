/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DimensionKey =
  | 'epistemology'
  | 'metaphysics'
  | 'theology'
  | 'ethics'
  | 'politics'
  | 'methodology'
  | 'metaphilosophy';

export interface DimensionScore {
  epistemology: number; // -1 (Radical Empiricism & Skepticism / Fallibilism) to +1 (Pure A Priori Rationalism & Certainty)
  metaphysics: number;  // -1 (Strict Materialism/Physicalism) to +1 (Idealism/Monadology/Dualism/Spirit)
  theology: number;     // -1 (Pantheism/Deism/Skepticism) to +1 (Theistic Providence/Sovereignty/Orthodoxy)
  ethics: number;       // -1 (Utilitarianism/Hedonic/Passions) to +1 (Deontology/Conscience/Eternal Duty)
  politics: number;     // -1 (Radical Egalitarian/Rights/Republican) to +1 (Strong Sovereign/Tradition/Order)
  methodology: number;  // -1 (Inductive/Empirical/Experiment) to +1 (Deductive/Geometrical/System-Building)
  metaphilosophy: number; // -1 (Critical Boundary-Setting & Pragmatic Reform) to +1 (Speculative System-Building & First Philosophy)
}

export interface DimensionMeta {
  key: DimensionKey;
  label: string;
  lowLabel: string;
  highLabel: string;
  description: string;
}

export type PhilosophicalSchool =
  | 'British Empiricism'
  | 'Continental Rationalism'
  | 'Cambridge Platonism'
  | 'Enlightenment & Reform'
  | 'Utilitarianism & Naturalism'
  | 'Utilitarianism & Hedonism'
  | 'Common Sense Realism'
  | 'Vitalist & Monist Metaphysics'
  | 'Mechanical & Experimental Philosophy'
  | 'Jansenist & Christian Rationalism';

export interface Philosopher {
  id: string;
  name: string;
  nativeSpelling?: string;
  dates: string;
  century: '17th Century' | '18th Century' | 'Transitional';
  nationality: string;
  school: PhilosophicalSchool;
  motto: string;
  quote: string;
  quoteSource: string;
  magnumOpus: string;
  summary: string;
  coreTheses: string[];
  historicalContext: string;
  keyConcepts: string[];
  scores: DimensionScore;
  domainPriorities: Record<DimensionKey, number>;
  metaphilosophicalFocus?: string;
  signatureTraits: string[];
  archRivalId: string;
  archRivalReason: string;
  isMajorFigure?: boolean;
}

export type LikertChoice =
  | 'strongly_agree'
  | 'agree'
  | 'neutral'
  | 'disagree'
  | 'strongly_disagree'
  | 'skipped';

export interface LikertOption {
  value: LikertChoice;
  label: string;
  multiplier: number;
}

export interface MatchResult {
  philosopher: Philosopher;
  matchScore: number;
  rawScore?: number;
  dimensionMatch: Record<DimensionKey, number>;
  topCongruenceAspects: string[];
  pointsOfTension: string[];
}

export type PriorityLevel = 'crucial' | 'standard' | 'secondary' | 'ignored';

export type DimensionWeights = Record<DimensionKey, number>;

export const PRIORITY_WEIGHT_VALUES: Record<PriorityLevel, number> = {
  crucial: 2.5,   // Heavy influence (2.5x)
  standard: 1.0,  // Normal consideration (1.0x)
  secondary: 0.35, // Low priority (0.35x)
  ignored: 0.0    // Excluded from match calculation (0.0x)
};

export const DEFAULT_DIMENSION_WEIGHTS: DimensionWeights = {
  epistemology: 1.0,
  metaphysics: 1.0,
  theology: 1.0,
  ethics: 1.0,
  politics: 1.0,
  methodology: 1.0,
  metaphilosophy: 1.0
};

export interface PriorityPreset {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  weights: DimensionWeights;
}

export const PRIORITY_PRESETS: PriorityPreset[] = [
  {
    id: 'balanced',
    name: 'Balanced (All Equal)',
    shortLabel: 'Balanced',
    description: 'Every topic carries equal weight.',
    weights: {
      epistemology: 1.0,
      metaphysics: 1.0,
      theology: 1.0,
      ethics: 1.0,
      politics: 1.0,
      methodology: 1.0,
      metaphilosophy: 1.0
    }
  },
  {
    id: 'mind-math-reality',
    name: 'Mind & Reality',
    shortLabel: 'Mind & Reality',
    description: 'Emphasizes knowledge, logic, and reality over morality and politics.',
    weights: {
      epistemology: 2.5,
      metaphysics: 2.5,
      methodology: 2.0,
      theology: 1.0,
      ethics: 0.0,
      politics: 0.35,
      metaphilosophy: 2.0
    }
  },
  {
    id: 'morals-politics',
    name: 'Morals & Society',
    shortLabel: 'Morals & Politics',
    description: 'Focuses primarily on ethics, justice, and government.',
    weights: {
      epistemology: 1.0,
      metaphysics: 0.35,
      theology: 0.35,
      ethics: 2.5,
      politics: 2.5,
      methodology: 0.35,
      metaphilosophy: 1.0
    }
  },
  {
    id: 'cosmology-theology',
    name: 'God & Nature',
    shortLabel: 'God & Nature',
    description: 'Focuses primarily on God, divine providence, and the cosmos.',
    weights: {
      epistemology: 1.0,
      metaphysics: 2.0,
      theology: 2.5,
      ethics: 1.0,
      politics: 0.35,
      methodology: 0.35,
      metaphilosophy: 1.5
    }
  }
];

export interface OverallQuizResult {
  userScores: DimensionScore;
  primaryMatch: MatchResult;
  council: MatchResult[];
  nemesis: MatchResult;
  allRankings: MatchResult[];
  completedQuestionsCount: number;
  dimensionWeights?: DimensionWeights;
}
