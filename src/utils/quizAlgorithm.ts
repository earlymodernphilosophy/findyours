/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PHILOSOPHERS, PHILOSOPHICAL_DIMENSIONS } from '../data/philosophers';
import { COMPLETE_100_STATEMENTS, getQuizStatements, LikertQuestion, LIKERT_OPTIONS } from '../data/questions';
import {
  DimensionKey,
  DimensionScore,
  DimensionWeights,
  DEFAULT_DIMENSION_WEIGHTS,
  LikertChoice,
  MatchResult,
  OverallQuizResult,
  Philosopher
} from '../types/philosophy';

const DIMENSIONS: DimensionKey[] = [
  'epistemology',
  'metaphysics',
  'theology',
  'ethics',
  'politics',
  'methodology',
  'metaphilosophy'
];

const MULTIPLIERS: Record<LikertChoice, number> = {
  strongly_agree: 1.0,
  agree: 0.5,
  neutral: 0.0,
  disagree: -0.5,
  strongly_disagree: -1.0,
  skipped: 0.0
};

export function deriveDimensionWeightsFromAnswers(
  selectedChoices: Record<number, LikertChoice | string>,
  mode: '50' | '100' = '50'
): DimensionWeights {
  const weights: DimensionWeights = {
    epistemology: 1.0,
    metaphysics: 1.0,
    theology: 1.0,
    ethics: 1.0,
    politics: 1.0,
    methodology: 1.0,
    metaphilosophy: 1.0
  };

  const questionsList = getQuizStatements(mode);
  const priorityQuestions = questionsList.filter((q) => q.isPriorityQuestion);

  for (const q of priorityQuestions) {
    const rawChoice = selectedChoices[q.id] as LikertChoice;
    if (!rawChoice || rawChoice === 'skipped') continue;

    const mult = MULTIPLIERS[rawChoice] ?? 0;
    if (q.priorityImpact) {
      for (const [dim, impact] of Object.entries(q.priorityImpact) as [DimensionKey, number][]) {
        if (typeof impact === 'number') {
          weights[dim] += impact * mult;
        }
      }
    }
  }

  // Ensure all weights stay in healthy, expressive bounds [0.05, 4.0]
  for (const dim of DIMENSIONS) {
    weights[dim] = Math.round(clamp(weights[dim], 0.05, 4.0) * 100) / 100;
  }

  return weights;
}

export function calculateUserScores(
  selectedChoices: Record<number, LikertChoice | string>,
  mode: '50' | '100' = '50'
): {
  userScores: DimensionScore;
  answeredCount: number;
  skippedCount: number;
} {
  const sumScores: Record<DimensionKey, number> = {
    epistemology: 0,
    metaphysics: 0,
    theology: 0,
    ethics: 0,
    politics: 0,
    methodology: 0,
    metaphilosophy: 0
  };

  const countScores: Record<DimensionKey, number> = {
    epistemology: 0,
    metaphysics: 0,
    theology: 0,
    ethics: 0,
    politics: 0,
    methodology: 0,
    metaphilosophy: 0
  };

  let answeredCount = 0;
  let skippedCount = 0;

  const questionsList: LikertQuestion[] = getQuizStatements(mode);

  for (const q of questionsList) {
    const rawChoice = selectedChoices[q.id] as LikertChoice;
    if (!rawChoice) continue;

    if (rawChoice === 'skipped') {
      skippedCount += 1;
      continue;
    }

    const mult = MULTIPLIERS[rawChoice] ?? 0;
    answeredCount += 1;

    // Apply dimensional impacts to all 7 axes
    for (const dim of DIMENSIONS) {
      const baseImpact = q.dimensionImpact[dim];
      if (typeof baseImpact === 'number' && baseImpact !== 0) {
        sumScores[dim] += baseImpact * mult;
        countScores[dim] += Math.abs(baseImpact) * (Math.abs(mult) > 0 ? 1 : 0.35); // neutral gives mild pull towards center
      }
    }
  }

  // Calculate normalized averages, bounded within [-1.0, 1.0]
  const userScores: DimensionScore = {
    epistemology: countScores.epistemology > 0 ? clamp(sumScores.epistemology / countScores.epistemology, -1, 1) : 0,
    metaphysics: countScores.metaphysics > 0 ? clamp(sumScores.metaphysics / countScores.metaphysics, -1, 1) : 0,
    theology: countScores.theology > 0 ? clamp(sumScores.theology / countScores.theology, -1, 1) : 0,
    ethics: countScores.ethics > 0 ? clamp(sumScores.ethics / countScores.ethics, -1, 1) : 0,
    politics: countScores.politics > 0 ? clamp(sumScores.politics / countScores.politics, -1, 1) : 0,
    methodology: countScores.methodology > 0 ? clamp(sumScores.methodology / countScores.methodology, -1, 1) : 0,
    metaphilosophy: countScores.metaphilosophy > 0 ? clamp(sumScores.metaphilosophy / countScores.metaphilosophy, -1, 1) : 0
  };

  return { userScores, answeredCount, skippedCount };
}

export function evaluateQuiz(
  selectedChoices: Record<number, LikertChoice | string>,
  mode: '50' | '100' = '50',
  customWeights?: DimensionWeights
): OverallQuizResult {
  const { userScores, answeredCount } = calculateUserScores(selectedChoices, mode);

  // If customWeights are not passed (or are the default 1.0 placeholder), derive weights automatically from priority questions!
  const derivedWeights = deriveDimensionWeightsFromAnswers(selectedChoices, mode);
  const isDefaultUniform =
    customWeights &&
    Object.values(customWeights).length > 0 &&
    Object.values(customWeights).every((v) => Math.abs(v - 1.0) < 0.001);

  const weights: DimensionWeights = (!customWeights || isDefaultUniform)
    ? derivedWeights
    : {
        epistemology: customWeights.epistemology ?? derivedWeights.epistemology,
        metaphysics: customWeights.metaphysics ?? derivedWeights.metaphysics,
        theology: customWeights.theology ?? derivedWeights.theology,
        ethics: customWeights.ethics ?? derivedWeights.ethics,
        politics: customWeights.politics ?? derivedWeights.politics,
        methodology: customWeights.methodology ?? derivedWeights.methodology,
        metaphilosophy: customWeights.metaphilosophy ?? derivedWeights.metaphilosophy ?? 1.0
      };

  const allRankings: MatchResult[] = PHILOSOPHERS.map((philosopher) => {
    // 1. Metaphilosophical Domain Congruence:
    // Compares what the user considers the primary business of philosophy (weights)
    // with what the thinker actually prioritized and dedicated their thought to (domainPriorities).
    let dotDomain = 0;
    let normUserWeights = 0;
    let normPhilPriorities = 0;

    for (const dim of DIMENSIONS) {
      const uW = weights[dim];
      const pPriority = philosopher.domainPriorities?.[dim] ?? 3;
      dotDomain += uW * pPriority;
      normUserWeights += uW * uW;
      normPhilPriorities += pPriority * pPriority;
    }

    const domainCongruence =
      normUserWeights > 0 && normPhilPriorities > 0
        ? dotDomain / (Math.sqrt(normUserWeights) * Math.sqrt(normPhilPriorities))
        : 0.5;

    // 2. Position alignment:
    // Dimension weight combines the user's priority with the thinker's domain focus.
    let sumEffectiveWeight = 0;
    let sumWeightedSquaredDiff = 0;
    let weightedDotProduct = 0;
    let weightedNormU = 0;
    let weightedNormP = 0;
    let sumDimMatch = 0;

    const dimensionMatch: Record<DimensionKey, number> = {} as Record<DimensionKey, number>;

    for (const dim of DIMENSIONS) {
      const uVal = userScores[dim];
      const pVal = philosopher.scores[dim];
      const diff = uVal - pVal;
      const rawW = weights[dim];
      const pPriority = (philosopher.domainPriorities?.[dim] ?? 3) / 3.0;
      const effW = Math.pow(Math.max(0.01, rawW * Math.pow(pPriority, 1.2)), 1.5);

      sumEffectiveWeight += effW;
      sumWeightedSquaredDiff += effW * (diff * diff);

      weightedDotProduct += effW * (uVal * pVal);
      weightedNormU += effW * (uVal * uVal);
      weightedNormP += effW * (pVal * pVal);

      // 1D similarity in percent: 0 to 100
      const dimDist = Math.abs(diff);
      const singleDimPct = Math.round((1 - dimDist / 2) * 100);
      dimensionMatch[dim] = singleDimPct;
      sumDimMatch += singleDimPct;
    }

    // Normalized weighted Euclidean distance bounded in [0, 2]
    const normalizedEuclideanDist = Math.sqrt(sumWeightedSquaredDiff / Math.max(0.001, sumEffectiveWeight));
    const euclideanSimilarity = Math.max(0, 1 - normalizedEuclideanDist / 2);

    // Weighted Cosine similarity in multidimensional space (direction of philosophical commitments)
    const cosineSim =
      weightedNormU > 0 && weightedNormP > 0
        ? weightedDotProduct / (Math.sqrt(weightedNormU) * Math.sqrt(weightedNormP))
        : 0;
    const normalizedCosine = (cosineSim + 1) / 2;

    // Global overall fidelity across all 7 dimensions (guards against deep contradictions on unprioritized axes)
    const globalFidelity = sumDimMatch / 700;

    // Composite similarity score:
    // 20% Euclidean distance, 30% directional alignment, 30% metaphilosophical domain priority congruence, 20% global fidelity
    const combinedWeight =
      0.20 * euclideanSimilarity +
      0.30 * normalizedCosine +
      0.30 * domainCongruence +
      0.20 * globalFidelity;
    let finalPercentage = Math.round(combinedWeight * 100);

    // Keep percentage within realistic bounds
    finalPercentage = Math.min(99, Math.max(10, finalPercentage));

    // Congruence insights with weights considered
    const topCongruenceAspects = generateCongruenceAspects(userScores, philosopher, weights);
    const pointsOfTension = generatePointsOfTension(userScores, philosopher, weights);

    return {
      philosopher,
      matchScore: finalPercentage,
      rawScore: combinedWeight,
      dimensionMatch,
      topCongruenceAspects,
      pointsOfTension
    };
  });

  // Sort descending by precise raw unboosted geometric score
  allRankings.sort((a, b) => (b.rawScore ?? b.matchScore / 100) - (a.rawScore ?? a.matchScore / 100));

  // Determine #1 Primary Match:
  // Major well-known canonical figures receive a decisive advantage (+4.5%) for the headline Persona
  // when competitive with specialized/minor thinkers.
  const primaryCandidates = [...allRankings].sort((a, b) => {
    const scoreA = (a.rawScore ?? a.matchScore / 100) * 100 + (a.philosopher.isMajorFigure ? 4.5 : 0);
    const scoreB = (b.rawScore ?? b.matchScore / 100) * 100 + (b.philosopher.isMajorFigure ? 4.5 : 0);
    if (Math.abs(scoreB - scoreA) > 0.001) {
      return scoreB - scoreA;
    }
    return (b.rawScore ?? 0) - (a.rawScore ?? 0);
  });

  const primaryMatch = primaryCandidates[0];

  // The 5 closest matches (Council of Peers) are strictly based on unboosted geometric match scores,
  // excluding the chosen primary match.
  const council = allRankings
    .filter((r) => r.philosopher.id !== primaryMatch.philosopher.id)
    .slice(0, 5);

  const nemesis = allRankings[allRankings.length - 1];

  return {
    userScores,
    primaryMatch,
    council,
    nemesis,
    allRankings,
    completedQuestionsCount: answeredCount,
    dimensionWeights: weights
  };
}

function generateCongruenceAspects(
  user: DimensionScore,
  phil: Philosopher,
  weights: DimensionWeights
): string[] {
  const aspects: { text: string; score: number }[] = [];

  for (const dim of PHILOSOPHICAL_DIMENSIONS) {
    const w = weights[dim.key] ?? 1.0;
    if (w <= 0) continue; // Skip completely ignored dimensions

    const delta = Math.abs(user[dim.key] - phil.scores[dim.key]);
    if (delta <= 0.65) {
      const userPole =
        user[dim.key] >= 0 ? dim.highLabel.split(' (')[0] : dim.lowLabel.split(' (')[0];
      // Prioritize high-importance dimensions
      const priorityScore = (1 - delta) * w;
      aspects.push({
        text: `Shared view on ${dim.label} (${userPole}).`,
        score: priorityScore
      });
    }
  }

  aspects.sort((a, b) => b.score - a.score);
  return aspects.slice(0, 3).map((a) => a.text);
}

function generatePointsOfTension(
  user: DimensionScore,
  phil: Philosopher,
  weights: DimensionWeights
): string[] {
  const tensions: { text: string; score: number }[] = [];

  for (const dim of PHILOSOPHICAL_DIMENSIONS) {
    const w = weights[dim.key] ?? 1.0;
    if (w <= 0.1) continue; // Don't flag major tensions in dimensions the user ignored or marked minimal

    const delta = Math.abs(user[dim.key] - phil.scores[dim.key]);
    if (delta >= 0.7) {
      const philPole =
        phil.scores[dim.key] >= 0
          ? dim.highLabel.split(' (')[0]
          : dim.lowLabel.split(' (')[0];
      const userPole =
        user[dim.key] >= 0
          ? dim.highLabel.split(' (')[0]
          : dim.lowLabel.split(' (')[0];
      const priorityScore = delta * w;
      tensions.push({
        text: `Different view on ${dim.label}: you favor ${userPole}, while ${phil.name} favored ${philPole}.`,
        score: priorityScore
      });
    }
  }

  tensions.sort((a, b) => b.score - a.score);
  return tensions.slice(0, 2).map((t) => t.text);
}

function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function getNemesisExplanation(
  primaryPhil: Philosopher,
  nemesisPhil: Philosopher,
  userScores: DimensionScore
): string {
  // If the primary match and the nemesis happen to be historical arch-rivals, use the historical rivalry
  if (primaryPhil.archRivalId === nemesisPhil.id && primaryPhil.archRivalReason) {
    return primaryPhil.archRivalReason;
  }
  if (nemesisPhil.archRivalId === primaryPhil.id && nemesisPhil.archRivalReason) {
    return nemesisPhil.archRivalReason;
  }

  // Dynamic explanation based on the user's largest philosophical divergences with this nemesis
  const DIMENSION_OPPOSITIONS: Record<DimensionKey, { highDesc: string; lowDesc: string; topic: string }> = {
    epistemology: {
      topic: 'Epistemology',
      highDesc: 'reason, innate ideas, and certainty',
      lowDesc: 'sensory observation and skepticism'
    },
    metaphysics: {
      topic: 'Metaphysics',
      highDesc: 'immaterial mind and spirit',
      lowDesc: 'physical matter and motion'
    },
    theology: {
      topic: 'Theology',
      highDesc: 'divine providence and a personal creator',
      lowDesc: 'natural laws and skepticism'
    },
    ethics: {
      topic: 'Ethics',
      highDesc: 'moral duty and conscience',
      lowDesc: 'feelings, sympathy, and outcomes'
    },
    politics: {
      topic: 'Politics',
      highDesc: 'order, stability, and authority',
      lowDesc: 'individual liberty and equal rights'
    },
    methodology: {
      topic: 'Scientific Method',
      highDesc: 'logical deduction and proofs',
      lowDesc: 'experiments and observation'
    },
    metaphilosophy: {
      topic: 'Scope of Philosophy',
      highDesc: 'grand speculative systems',
      lowDesc: 'modest limits and everyday human life'
    }
  };

  const divergences = (Object.keys(DIMENSION_OPPOSITIONS) as DimensionKey[])
    .map((dim) => {
      const u = userScores[dim] ?? 0;
      const n = nemesisPhil.scores[dim] ?? 0;
      const delta = Math.abs(u - n);
      return { dim, delta, u, n };
    })
    .sort((a, b) => b.delta - a.delta);

  const top = divergences[0];
  const second = divergences[1];
  const surname = nemesisPhil.name.split(' ').slice(-1)[0] || nemesisPhil.name;

  if (top && top.delta >= 0.7) {
    const config = DIMENSION_OPPOSITIONS[top.dim];
    const userPole = top.u >= 0 ? config.highDesc : config.lowDesc;
    const nemPole = top.n >= 0 ? config.highDesc : config.lowDesc;

    if (second && second.delta >= 0.65) {
      const config2 = DIMENSION_OPPOSITIONS[second.dim];
      return `Your biggest clash with ${nemesisPhil.name} is on ${config.topic} and ${config2.topic}: you favor ${userPole}, while ${surname} championed ${nemPole}.`;
    }

    return `Your biggest clash with ${nemesisPhil.name} is on ${config.topic}: you favor ${userPole}, whereas ${surname} adamantly defended ${nemPole}.`;
  }

  return `Your answers sit furthest from ${nemesisPhil.name} across the seven core philosophical dimensions, representing your total philosophical antithesis.`;
}
