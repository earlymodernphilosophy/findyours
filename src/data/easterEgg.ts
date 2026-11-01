/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Philosopher, OverallQuizResult, MatchResult, DimensionKey } from '../types/philosophy';
import { PHILOSOPHERS } from './philosophers';

export function isJakeBeardsley(name: string): boolean {
  if (!name) return false;
  const normalized = name.toLowerCase().trim().replace(/[^a-z]/g, '');
  if (normalized.includes('beardsley')) return true;
  if (normalized === 'jake' || normalized === 'jacob') return true;
  if (normalized.startsWith('jake') || normalized.startsWith('jacob')) return true;
  return false;
}

export const BRUTUS_BUCKEYE: Philosopher = {
  id: 'brutus-buckeye',
  name: 'Brutus Buckeye',
  dates: 'c. 1965–Present',
  century: 'Transitional',
  nationality: 'Buckeye Nation (Columbus, Ohio)',
  school: 'Utilitarianism & Hedonism',
  motto: 'Why understand other viewpoints when you can do bad math on happiness units?',
  quote: 'Actually, if you run the numbers, my wildly controversial take maximizes net dopamine, and you just don’t get basic utility, bro.',
  quoteSource: 'A Reddit debate at 3:17 AM',
  magnumOpus: 'The Panopticon of the Horseshoe: An Essay on Why Everyone Else is Cognitively Inferior',
  summary:
    'A bumbling, thoroughly confused collegiate mascot turned self-styled philosopher who loudly proclaims himself the ultimate utilitarian. Possessing a profound, almost supernatural inability to comprehend any other human being’s philosophical views, Brutus reduces every nuanced moral dilemma to crude arithmetic, alienating everyone in the seminar while firmly convinced he is the smartest thinker in the room.',
  coreTheses: [
    'Every subtle ethical nuance, virtue, or tragic dilemma can be solved by multiplying arbitrary pleasure numbers on a cocktail napkin.',
    'Any philosopher who disagrees with me simply suffers from inferior cognitive processing bandwidth.',
    'Deontology, virtue ethics, and care ethics are just emotional cope for people who cannot do elementary hedonic multiplication.',
    'A giant round Ohio Buckeye nut contains all the necessary metaphysical wisdom required by the universe.'
  ],
  historicalContext:
    'Born on the football sidelines of Columbus, Ohio, Brutus wandered into a philosophy department library by mistake in 1968, skimmed two pages of Jeremy Bentham, completely misunderstood John Stuart Mill, and never looked back. He has spent the subsequent decades aggressively lecturing professors on utility functions while completely deaf to counterarguments.',
  keyConcepts: [
    'Edgelord Utilitarianism',
    'Cognitive Incomprehension of Others',
    'Napkin Hedonic Calculus',
    'Mascot Sophistry',
    'Nut-Based Epistemology'
  ],
  scores: {
    epistemology: -0.9,  // Claims crude empiricism/data, but understands none of it
    metaphysics: -1.0,   // Vulgar physicalism
    theology: -0.9,      // Agnostic hedonist
    ethics: -1.0,        // Vulgar hedonic utilitarianism
    politics: 0.8,       // Authoritarian utility mandates
    methodology: 0.9,    // Blind adherence to simplistic pseudo-mathematical models
    metaphilosophy: 0.9  // Dogmatic pseudo-system builder
  },
  domainPriorities: {
    ethics: 5,
    methodology: 4,
    metaphilosophy: 4,
    politics: 3,
    epistemology: 2,
    metaphysics: 1,
    theology: 1
  },
  signatureTraits: [
    'Oversized Buckeye nut head with a glassy, unblinking smile',
    'Wearing an 18th-century frock coat over a scarlet-and-gray jersey',
    'Perched powdered wig that constantly slides off his round shell',
    'Aggressively explains utility functions nobody asked for'
  ],
  archRivalId: 'martha-nussbaum',
  archRivalReason: 'Martha Nussbaum repeatedly points out with devastating classical eloquence that human beings are not spreadsheet numbers, utterly humiliating Brutus’s napkin calculus.'
};

export const MARTHA_NUSSBAUM: Philosopher = {
  id: 'martha-nussbaum',
  name: 'Martha Nussbaum',
  dates: '1947–Present',
  century: 'Transitional',
  nationality: 'American',
  school: 'Enlightenment & Reform',
  motto: 'To be a good human being is to have an openness to the world and its vulnerability.',
  quote: 'To be a good human being is to have a kind of openness to the world, an ability to trust uncertain things beyond your own control, that can lead you to be shattered in very extreme circumstances for which you were not to blame.',
  quoteSource: 'The Fragility of Goodness (1986)',
  magnumOpus: 'Creating Capabilities: The Human Development Approach',
  summary:
    'World-renowned moral and political philosopher and champion of the Capabilities Approach. Erudite, precise, and deeply attuned to the vulnerability and emotional richness of human life, she stands as the total philosophical antithesis to Brutus Buckeye’s cartoonish, unfeeling spreadsheet utilitarianism.',
  coreTheses: [
    'Human flourishing requires cultivating plural, incommensurable capabilities that can never be reduced to a single pleasure metric.',
    'Emotions are cognitive appraisals of value and essential components of ethical reasoning.',
    'Genuine philosophy demands deep empathy and the ability to inhabit the perspectives of others—a faculty Brutus completely lacks.'
  ],
  historicalContext:
    'Distinguished professor of law and ethics at the University of Chicago, Nussbaum revived Aristotelian practical wisdom and Hellenistic therapy of desire, dismantling reductionist economic utilitarianism with devastating scholarly elegance.',
  keyConcepts: [
    'Capabilities Approach',
    'Cognitive Theory of Emotions',
    'The Fragility of Goodness',
    'Tragic Moral Dilemmas',
    'Human Dignity'
  ],
  scores: {
    epistemology: 0.6,
    metaphysics: 0.7,
    theology: -0.2,
    ethics: 0.9,
    politics: -0.9,
    methodology: -0.5,
    metaphilosophy: -0.85
  },
  domainPriorities: {
    ethics: 5,
    politics: 5,
    metaphilosophy: 5,
    epistemology: 3,
    theology: 2,
    metaphysics: 1,
    methodology: 1
  },
  signatureTraits: [
    'Distinguished academic blazer with silk scarf',
    'Classical Athenian foil fencing stance',
    'Carrying a glowing volume of The Fragility of Goodness',
    'Exasperated look directed at collegiate mascots'
  ],
  archRivalId: 'brutus-buckeye',
  archRivalReason: 'Brutus Buckeye embodies the absolute nadir of reductionist utilitarian barbarism—a literal collegiate mascot who treats profound human vulnerability as an arithmetic error.'
};

export function getJakeBeardsleyResult(): OverallQuizResult {
  const userScores = {
    epistemology: -0.9,
    metaphysics: -1.0,
    theology: -0.9,
    ethics: -1.0,
    politics: 0.8,
    methodology: 0.9,
    metaphilosophy: 0.9
  };

  const dimensions: DimensionKey[] = [
    'epistemology',
    'metaphysics',
    'theology',
    'ethics',
    'politics',
    'methodology',
    'metaphilosophy'
  ];

  // Compute rankings across all standard philosophers against Brutus's scores
  const standardRankings: MatchResult[] = PHILOSOPHERS.map((phil) => {
    let sumSq = 0;
    const dimMatch: Record<DimensionKey, number> = {} as Record<DimensionKey, number>;

    for (const d of dimensions) {
      const diff = userScores[d] - phil.scores[d];
      sumSq += diff * diff;
      dimMatch[d] = Math.round((1 - Math.abs(diff) / 2) * 100);
    }
    const dist = Math.sqrt(sumSq);
    const simPct = Math.round(Math.max(12, Math.min(92, (1 - dist / Math.sqrt(24)) * 100)));

    return {
      philosopher: phil,
      matchScore: simPct,
      dimensionMatch: dimMatch,
      topCongruenceAspects: ['Shared interest in material nature and state power.'],
      pointsOfTension: ['Inability to grasp their complex epistemological frameworks.']
    };
  });

  // Sort descending
  standardRankings.sort((a, b) => b.matchScore - a.matchScore);

  const brutusMatch: MatchResult = {
    philosopher: BRUTUS_BUCKEYE,
    matchScore: 99,
    dimensionMatch: {
      epistemology: 99,
      metaphysics: 98,
      theology: 96,
      ethics: 100,
      politics: 94,
      methodology: 97,
      metaphilosophy: 98
    },
    topCongruenceAspects: [
      '100% Alignment on Edgelord Utilitarianism (calculating happiness on a cocktail napkin).',
      'Exceptional capacity for failing to understand what any other person is saying.',
      'Firm conviction that shouting "Basic utility, bro!" wins philosophical debates.'
    ],
    pointsOfTension: [
      'Reminded by Martha Nussbaum that human beings have genuine dignity and complex emotional lives.'
    ]
  };

  const nussbaumMatch: MatchResult = {
    philosopher: MARTHA_NUSSBAUM,
    matchScore: 8,
    dimensionMatch: {
      epistemology: 12,
      metaphysics: 10,
      theology: 25,
      ethics: 4,
      politics: 8,
      methodology: 15,
      metaphilosophy: 10
    },
    topCongruenceAspects: [],
    pointsOfTension: [
      'Nussbaum values human emotional complexity; Brutus thinks human emotions are inefficient code glitches.',
      'Nussbaum reads ancient Greek tragedy; Brutus watches YouTube shorts on crypto-hedonism.'
    ]
  };

  // Build the complete allRankings list: Brutus at top, standard philosophers in middle, Nussbaum at bottom
  const allRankings: MatchResult[] = [
    brutusMatch,
    ...standardRankings.filter((r) => r.philosopher.id !== 'martha-nussbaum'),
    nussbaumMatch
  ];

  // Council: top 4 closest thinkers following Brutus
  const council: MatchResult[] = standardRankings.slice(0, 4);

  return {
    userScores,
    primaryMatch: brutusMatch,
    council,
    nemesis: nussbaumMatch,
    allRankings,
    completedQuestionsCount: 50
  };
}
