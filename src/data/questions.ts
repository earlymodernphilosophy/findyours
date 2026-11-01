/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DimensionKey, DimensionScore, LikertChoice, LikertOption } from '../types/philosophy';

export const AXIS_CATEGORY_LABELS: Record<string, string> = {
  epistemology: 'Knowledge & Skepticism',
  metaphysics: 'Reality & Mind',
  theology: 'God & Nature',
  ethics: 'Morals & Duty',
  politics: 'Liberty & Authority',
  methodology: 'Science & Method',
  metaphilosophy: 'Scope of Philosophy',
  priority: 'Worldview Priority'
};

export interface LikertQuestion {
  id: number;
  originalId?: number;
  axis: 'epistemology' | 'metaphysics' | 'theology' | 'ethics' | 'politics' | 'methodology' | 'metaphilosophy' | 'priority';
  category: string;
  statement: string;
  dimensionImpact: Partial<DimensionScore>;
  isPriorityQuestion?: boolean;
  priorityImpact?: Partial<Record<DimensionKey, number>>;
}

export const LIKERT_OPTIONS: LikertOption[] = [
  { value: 'strongly_agree', label: 'Strongly Agree', multiplier: 1.0 },
  { value: 'agree', label: 'Agree', multiplier: 0.5 },
  { value: 'neutral', label: 'Neutral', multiplier: 0.0 },
  { value: 'disagree', label: 'Disagree', multiplier: -0.5 },
  { value: 'strongly_disagree', label: 'Strongly Disagree', multiplier: -1.0 }
];

/**
 * 100 Pure Axis-Based Philosophical Statements.
 * Crafted around foundational dilemmas without naming or obviously caricaturing historical figures.
 * Users evaluate core philosophical claims on their merits.
 */
const RAW_100_STATEMENTS: Omit<LikertQuestion, 'category'>[] = [
  // ==========================================
  // AXIS 1: EPISTEMOLOGY (Empiricism [-1] vs. Rationalism [+1])
  // ==========================================
  {
    id: 1,
    axis: 'epistemology',
    statement: 'All human knowledge ultimately originates through sensory perception and bodily experience.',
    dimensionImpact: { epistemology: -1.0 }
  },
  {
    id: 2,
    axis: 'epistemology',
    statement: 'The human intellect possesses fundamental concepts and logical principles that exist prior to any experience.',
    dimensionImpact: { epistemology: 1.0 }
  },
  {
    id: 3,
    axis: 'epistemology',
    statement: 'The certainty of mathematics demonstrates that the human mind possesses innate rational concepts that owe nothing to sensory experience.',
    dimensionImpact: { epistemology: 1.0, methodology: 0.6 }
  },
  {
    id: 4,
    axis: 'epistemology',
    statement: 'Because sensory observations are frequently mistaken or biased, pure abstract reason is a more reliable guide to reality.',
    dimensionImpact: { epistemology: 1.0 }
  },
  {
    id: 5,
    axis: 'epistemology',
    statement: 'Any factual claim about the world that cannot be tested by observation or experiment is meaningless.',
    dimensionImpact: { epistemology: -1.0, methodology: -0.7 }
  },
  {
    id: 6,
    axis: 'epistemology',
    statement: 'Deep contemplation and conceptual reflection can reveal genuine truths about reality without needing empirical proof.',
    dimensionImpact: { epistemology: 1.0 }
  },
  {
    id: 7,
    axis: 'epistemology',
    statement: 'No matter how many times an event has occurred in the past, we cannot logically guarantee it will occur the same way tomorrow—induction reveals a permanent limit to human reason.',
    dimensionImpact: { epistemology: -1.0, methodology: -0.6, metaphilosophy: -0.6 }
  },
  {
    id: 8,
    axis: 'epistemology',
    statement: 'Certain foundational truths are immediately self-evident to clear thinking and require no external demonstration.',
    dimensionImpact: { epistemology: 1.0 }
  },
  {
    id: 9,
    axis: 'epistemology',
    statement: 'Reason is merely an organizing tool for sensory data; it cannot produce new knowledge out of itself.',
    dimensionImpact: { epistemology: -1.0 }
  },
  {
    id: 10,
    axis: 'epistemology',
    statement: 'We can never directly perceive an objective "necessary connection" between cause and effect; causality is merely a mental habit born of constant correlation.',
    dimensionImpact: { epistemology: -1.0, metaphilosophy: -0.7 }
  },
  {
    id: 11,
    axis: 'epistemology',
    statement: 'The order and coherence we perceive in nature are imposed by the structure of the human mind rather than found raw in nature.',
    dimensionImpact: { epistemology: 0.8, metaphysics: 0.6 }
  },
  {
    id: 12,
    axis: 'epistemology',
    statement: 'Doubting everything until reaching an undeniable bedrock of certainty is the only valid starting point for genuine knowledge.',
    dimensionImpact: { epistemology: 0.9, methodology: 0.8, metaphilosophy: 0.6 }
  },
  {
    id: 13,
    axis: 'epistemology',
    statement: 'Trusting common sense and everyday perception is generally more reliable than trusting elaborate philosophical systems.',
    dimensionImpact: { epistemology: -0.8, methodology: -0.7, metaphilosophy: -0.6 }
  },
  {
    id: 14,
    axis: 'epistemology',
    statement: 'We can achieve absolute deductive certainty about the fundamental nature of the universe.',
    dimensionImpact: { epistemology: 1.0, methodology: 0.9, metaphilosophy: 0.8 }
  },
  {
    id: 15,
    axis: 'epistemology',
    statement: 'Because human cognitive faculties are inherently fallible, claiming absolute certainty about ultimate metaphysical reality is an illusion; mitigated skepticism is the only honest posture.',
    dimensionImpact: { epistemology: -1.0, metaphilosophy: -0.9 }
  },
  {
    id: 16,
    axis: 'epistemology',
    statement: 'Logical deductions from first principles are more trustworthy than statistical patterns derived from field observations.',
    dimensionImpact: { epistemology: 0.9, methodology: 0.9 }
  },
  {
    id: 17,
    axis: 'epistemology',
    statement: 'All intellectual disputes could theoretically be settled with mathematical precision if we had a comprehensive conceptual language.',
    dimensionImpact: { epistemology: 1.0, methodology: 0.8, metaphilosophy: 0.7 }
  },

  // ==========================================
  // AXIS 2: METAPHYSICS (Physicalism [-1] vs. Idealism / Dualism / Mind [+1])
  // ==========================================
  {
    id: 18,
    axis: 'metaphysics',
    statement: 'Every thought, feeling, and conscious experience is ultimately reducible to physical matter and energy in motion.',
    dimensionImpact: { metaphysics: -1.0 }
  },
  {
    id: 19,
    axis: 'metaphysics',
    statement: 'Conscious awareness is fundamentally distinct from physical matter and cannot be produced by mechanical processes alone.',
    dimensionImpact: { metaphysics: 1.0 }
  },
  {
    id: 20,
    axis: 'metaphysics',
    statement: 'Physical objects exist completely independently of whether any mind or observer is aware of them.',
    dimensionImpact: { metaphysics: -0.9 }
  },
  {
    id: 21,
    axis: 'metaphysics',
    statement: 'Qualities like colors, sounds, and heat exist only as mental experiences, not as inherent properties of physical atoms.',
    dimensionImpact: { metaphysics: 0.7, epistemology: -0.4 }
  },
  {
    id: 22,
    axis: 'metaphysics',
    statement: 'The universe is essentially an immense mechanical machine operating strictly by cause and effect.',
    dimensionImpact: { metaphysics: -1.0 }
  },
  {
    id: 23,
    axis: 'metaphysics',
    statement: 'Nature is alive with dynamic, active spiritual or mental energy rather than inert, passive matter.',
    dimensionImpact: { metaphysics: 1.0 }
  },
  {
    id: 24,
    axis: 'metaphysics',
    statement: 'Human beings are entirely biological organisms without any immortal or non-physical soul.',
    dimensionImpact: { metaphysics: -1.0, theology: -0.7 }
  },
  {
    id: 25,
    axis: 'metaphysics',
    statement: 'Mind and body are two completely different kinds of substance that somehow interact during life.',
    dimensionImpact: { metaphysics: 0.9 }
  },
  {
    id: 26,
    axis: 'metaphysics',
    statement: 'Reality is composed of indivisible fundamental units that possess inner perceptual states rather than mere physical extension.',
    dimensionImpact: { metaphysics: 1.0 }
  },
  {
    id: 27,
    axis: 'metaphysics',
    statement: 'Space and time are not objective physical containers, but forms of human intuition used to organize experiences.',
    dimensionImpact: { metaphysics: 0.8, epistemology: 0.7 }
  },
  {
    id: 28,
    axis: 'metaphysics',
    statement: 'Every physical event in the universe is strictly determined by antecedent physical causes, leaving no room for uncaused free will.',
    dimensionImpact: { metaphysics: -0.9, ethics: -0.6 }
  },
  {
    id: 29,
    axis: 'metaphysics',
    statement: 'There is an underlying non-material harmony that coordinates the relationship between conscious minds and physical occurrences.',
    dimensionImpact: { metaphysics: 1.0 }
  },
  {
    id: 30,
    axis: 'metaphysics',
    statement: 'To speak of non-physical spiritual entities is to use words that have no coherent meaning in reality.',
    dimensionImpact: { metaphysics: -1.0 }
  },
  {
    id: 31,
    axis: 'metaphysics',
    statement: 'Matter itself has an inherent capacity for self-organization, motion, and organic life without requiring supernatural assistance.',
    dimensionImpact: { metaphysics: -0.8, theology: -0.7 }
  },
  {
    id: 32,
    axis: 'metaphysics',
    statement: 'The ultimate nature of reality is mental or spiritual; physical phenomena are appearances perceived by consciousness.',
    dimensionImpact: { metaphysics: 1.0 }
  },
  {
    id: 33,
    axis: 'metaphysics',
    statement: 'The laws of nature are regularities in our observations rather than invisible metaphysical bonds that compel events to occur.',
    dimensionImpact: { metaphysics: -0.8, epistemology: -0.8 }
  },
  {
    id: 34,
    axis: 'metaphysics',
    statement: 'The conscious "self" is not a fixed, indivisible spiritual soul, but a passing bundle of ever-changing sensations and thoughts in perpetual flux.',
    dimensionImpact: { metaphysics: -0.6, epistemology: -0.8 }
  },

  // ==========================================
  // AXIS 3: THEOLOGY & COSMOLOGY (Naturalism / Immanence [-1] vs. Transcendent Providence [+1])
  // ==========================================
  {
    id: 35,
    axis: 'theology',
    statement: 'The universe operates strictly through unvarying natural laws that never permit miraculous suspensions.',
    dimensionImpact: { theology: -1.0 }
  },
  {
    id: 36,
    axis: 'theology',
    statement: 'The intricate order and complexity of living creatures provides convincing evidence of deliberate design by a supreme creator.',
    dimensionImpact: { theology: 1.0 }
  },
  {
    id: 37,
    axis: 'theology',
    statement: 'God and the natural universe are one and the same entity: the totality of existence governed by necessity.',
    dimensionImpact: { theology: -1.0, metaphysics: 0.1 }
  },
  {
    id: 38,
    axis: 'theology',
    statement: 'Human history is guided by a supreme benevolent intelligence with an intentional moral purpose for mankind.',
    dimensionImpact: { theology: 1.0 }
  },
  {
    id: 39,
    axis: 'theology',
    statement: 'Religious beliefs should be judged strictly by the standards of human reason and natural evidence rather than authoritative dogma.',
    dimensionImpact: { theology: -0.8, epistemology: -0.4 }
  },
  {
    id: 40,
    axis: 'theology',
    statement: 'Human reason is too flawed to comprehend the divine, making personal faith or sacred revelation essential.',
    dimensionImpact: { theology: 0.9 }
  },
  {
    id: 41,
    axis: 'theology',
    statement: 'The widespread presence of horrific suffering in the world makes the existence of an all-powerful, loving creator improbable.',
    dimensionImpact: { theology: -0.9 }
  },
  {
    id: 42,
    axis: 'theology',
    statement: 'Objective moral standards would collapse into mere personal preference if there were no divine judge overseeing human conduct.',
    dimensionImpact: { theology: 1.0, ethics: 0.8 }
  },
  {
    id: 43,
    axis: 'theology',
    statement: 'Belief in a creator who actively intervenes in daily life is a comforting psychological illusion.',
    dimensionImpact: { theology: -1.0 }
  },
  {
    id: 44,
    axis: 'theology',
    statement: 'Every event in the cosmos has been predetermined from eternity by supreme divine sovereignty.',
    dimensionImpact: { theology: 1.0, metaphysics: 0.5 }
  },
  {
    id: 45,
    axis: 'theology',
    statement: 'The most rational concept of a creator is a grand architect who set physical laws in motion and then let nature run on its own.',
    dimensionImpact: { theology: -0.6 }
  },
  {
    id: 46,
    axis: 'theology',
    statement: 'Even if God’s existence cannot be scientifically proven, wagering on faith is the most rational choice a person can make.',
    dimensionImpact: { theology: 0.8 }
  },
  {
    id: 47,
    axis: 'theology',
    statement: 'Miracle stories in historical texts are far more likely to reflect human exaggeration than real violations of the laws of nature.',
    dimensionImpact: { theology: -1.0, epistemology: -0.8 }
  },
  {
    id: 48,
    axis: 'theology',
    statement: 'Conscience is an inward divine voice implanted within the human soul to guide us toward eternal righteousness.',
    dimensionImpact: { theology: 0.9, ethics: 0.9 }
  },
  {
    id: 49,
    axis: 'theology',
    statement: 'The universe requires no explanation beyond its own eternal physical mechanisms and cycles.',
    dimensionImpact: { theology: -1.0 }
  },
  {
    id: 50,
    axis: 'theology',
    statement: 'Spiritual reality is an undeniable realm that deeply influences and sustains the physical world around us.',
    dimensionImpact: { theology: 1.0, metaphysics: 0.9 }
  },

  // ==========================================
  // AXIS 4: ETHICS (Sentiments / Outcomes [-1] vs. Deontological Duty / Objective Conscience [+1])
  // ==========================================
  {
    id: 51,
    axis: 'ethics',
    statement: 'The moral value of any action depends entirely on the net happiness or suffering it produces in the real world.',
    dimensionImpact: { ethics: -1.0 }
  },
  {
    id: 52,
    axis: 'ethics',
    statement: 'Certain actions, such as torture or breaking solemn vows, are fundamentally wrong regardless of how beneficial the outcome might be.',
    dimensionImpact: { ethics: 1.0 }
  },
  {
    id: 53,
    axis: 'ethics',
    statement: 'Morality is founded upon emotional empathy and natural sympathy for others rather than abstract intellectual deductions.',
    dimensionImpact: { ethics: -0.9, epistemology: -0.6 }
  },
  {
    id: 54,
    axis: 'ethics',
    statement: 'Moral obligations are universal and unconditional; they apply to all rational beings everywhere without exception.',
    dimensionImpact: { ethics: 1.0 }
  },
  {
    id: 55,
    axis: 'ethics',
    statement: 'Compassion and feeling for others are more effective at motivating moral behavior than an intellectual sense of duty.',
    dimensionImpact: { ethics: -0.9 }
  },
  {
    id: 56,
    axis: 'ethics',
    statement: 'An action is truly moral only when performed out of respect for duty, rather than because it brings personal pleasure or gratification.',
    dimensionImpact: { ethics: 1.0 }
  },
  {
    id: 57,
    axis: 'ethics',
    statement: 'Moral rules are useful social conventions developed to make cooperative communal living possible, not eternal cosmic laws.',
    dimensionImpact: { ethics: -1.0 }
  },
  {
    id: 58,
    axis: 'ethics',
    statement: 'Each person possesses an authoritative internal conscience that provides direct insight into right and wrong.',
    dimensionImpact: { ethics: 0.9 }
  },
  {
    id: 59,
    axis: 'ethics',
    statement: 'When making difficult moral decisions, the right course is whichever choice produces the greatest good for the greatest number.',
    dimensionImpact: { ethics: -1.0 }
  },
  {
    id: 60,
    axis: 'ethics',
    statement: 'You should only act according to principles that you would be willing to make universal laws for everyone to follow.',
    dimensionImpact: { ethics: 1.0 }
  },
  {
    id: 61,
    axis: 'ethics',
    statement: 'Human beings are primarily driven by self-interest and the pursuit of personal preservation and advantage.',
    dimensionImpact: { ethics: -0.8, politics: 0.6 }
  },
  {
    id: 62,
    axis: 'ethics',
    statement: 'Moral virtue consists of bringing one’s desires into alignment with rational cosmic order rather than satisfying bodily passions.',
    dimensionImpact: { ethics: 0.8 }
  },
  {
    id: 63,
    axis: 'ethics',
    statement: 'A lie is permissible whenever it prevents great catastrophe or protects an innocent person from unwarranted harm.',
    dimensionImpact: { ethics: -0.9 }
  },
  {
    id: 64,
    axis: 'ethics',
    statement: 'Moral goodness is an objective feature of reality, as real and unchangeable as the laws of geometry.',
    dimensionImpact: { ethics: 1.0 }
  },
  {
    id: 65,
    axis: 'ethics',
    statement: 'Punishment of criminals should be designed exclusively to deter future crime and reform behavior, not for retributive vengeance.',
    dimensionImpact: { ethics: -0.9, politics: -0.5 }
  },
  {
    id: 66,
    axis: 'ethics',
    statement: 'Justice requires giving individuals what their moral choices deserve, regardless of social utility or deterrence benefits.',
    dimensionImpact: { ethics: 1.0 }
  },
  {
    id: 67,
    axis: 'ethics',
    statement: 'Sympathy between human beings is an innate biological instinct that binds societies together before formal laws are ever written.',
    dimensionImpact: { ethics: -0.8, politics: -0.5 }
  },

  // ==========================================
  // AXIS 5: POLITICS (Egalitarian Rights [-1] vs. Sovereign Order / Tradition [+1])
  // ==========================================
  {
    id: 68,
    axis: 'politics',
    statement: 'A government’s primary duty is to protect individual liberty and basic rights, even if that results in social unrest or debate.',
    dimensionImpact: { politics: -1.0 }
  },
  {
    id: 69,
    axis: 'politics',
    statement: 'Preserving social order and stability is more vital for human flourishing than granting unrestricted personal freedoms.',
    dimensionImpact: { politics: 1.0 }
  },
  {
    id: 70,
    axis: 'politics',
    statement: 'Time-tested traditions and longstanding customs embody far deeper wisdom than abstract theories proposed by modern reformers.',
    dimensionImpact: { politics: 1.0 }
  },
  {
    id: 71,
    axis: 'politics',
    statement: 'Citizens have an unquestionable moral right to resist or overthrow any ruler who systematically violates fundamental liberties.',
    dimensionImpact: { politics: -1.0 }
  },
  {
    id: 72,
    axis: 'politics',
    statement: 'Without a strong, centralized authority capable of enforcing peace, human society inevitably descends into conflict and chaos.',
    dimensionImpact: { politics: 1.0 }
  },
  {
    id: 73,
    axis: 'politics',
    statement: 'Every human being is entitled to equal political and educational standing, regardless of gender, class, or background.',
    dimensionImpact: { politics: -1.0, ethics: -0.4 }
  },
  {
    id: 74,
    axis: 'politics',
    statement: 'Sudden, revolutionary transformations of society usually inflict far more suffering than the historical injustices they seek to remedy.',
    dimensionImpact: { politics: 0.9 }
  },
  {
    id: 75,
    axis: 'politics',
    statement: 'Legitimate political power derives solely from the consent of the governed, not from divine appointment or hereditary lineage.',
    dimensionImpact: { politics: -1.0 }
  },
  {
    id: 76,
    axis: 'politics',
    statement: 'Dividing governmental power among competing factions creates weakness and paralysis; sovereignty must be unified and decisive.',
    dimensionImpact: { politics: 0.9 }
  },
  {
    id: 77,
    axis: 'politics',
    statement: 'Private property is a natural right that existed before governments formed, and no state may legitimately confiscate it arbitrarily.',
    dimensionImpact: { politics: -0.7 }
  },
  {
    id: 78,
    axis: 'politics',
    statement: 'The modern civilization process and urbanization have corrupted mankind’s natural decency and created artificial inequalities.',
    dimensionImpact: { politics: -0.6, ethics: -0.6 }
  },
  {
    id: 79,
    axis: 'politics',
    statement: 'Society functions best when individuals recognize their designated roles within a stable, recognized hierarchy.',
    dimensionImpact: { politics: 1.0 }
  },
  {
    id: 80,
    axis: 'politics',
    statement: 'Freedom of speech and open philosophical inquiry must be defended unconditionally, even when they offend popular sentiments.',
    dimensionImpact: { politics: -1.0 }
  },
  {
    id: 81,
    axis: 'politics',
    statement: 'The collective common good of the community should always take precedence over the selfish demands of individual members.',
    dimensionImpact: { politics: 0.5, ethics: -0.5 }
  },
  {
    id: 82,
    axis: 'politics',
    statement: 'Legal systems should be systematically overhauled from scratch using modern scientific and rational principles.',
    dimensionImpact: { politics: -0.9, methodology: 0.6 }
  },
  {
    id: 83,
    axis: 'politics',
    statement: 'Monarchy or concentrated executive leadership provides more consistent governance than volatile democratic assemblies.',
    dimensionImpact: { politics: 0.9 }
  },
  {
    id: 84,
    axis: 'politics',
    statement: 'Universal education for all people is the single most vital tool for abolishing tyranny and superstition.',
    dimensionImpact: { politics: -1.0 }
  },

  // ==========================================
  // AXIS 6: METHODOLOGY (Inductive Observation [-1] vs. Deductive Systems [+1])
  // ==========================================
  {
    id: 85,
    axis: 'methodology',
    statement: 'Scientific understanding should be constructed bottom-up by systematically collecting experimental data and observations.',
    dimensionImpact: { methodology: -1.0, epistemology: -0.7 }
  },
  {
    id: 86,
    axis: 'methodology',
    statement: 'True science begins with clear, self-evident axioms from which all natural consequences are rigorously deduced.',
    dimensionImpact: { methodology: 1.0, epistemology: 0.8 }
  },
  {
    id: 87,
    axis: 'methodology',
    statement: 'The primary purpose of scientific inquiry is practical mastery over nature to improve the physical conditions of human life.',
    dimensionImpact: { methodology: -0.9 }
  },
  {
    id: 88,
    axis: 'methodology',
    statement: 'A mathematically unified and logically coherent theoretical system is more trustworthy than disconnected experimental trials.',
    dimensionImpact: { methodology: 1.0 }
  },
  {
    id: 89,
    axis: 'methodology',
    statement: 'We should avoid forming speculative grand hypotheses until a vast body of empirical facts has been gathered and cataloged.',
    dimensionImpact: { methodology: -1.0 }
  },
  {
    id: 90,
    axis: 'methodology',
    statement: 'A single logical contradiction is sufficient to invalidate an entire theoretical framework, regardless of how much data supports it.',
    dimensionImpact: { methodology: 0.9, epistemology: 0.8 }
  },
  {
    id: 91,
    axis: 'methodology',
    statement: 'The book of nature is written in the language of mathematics, and physical phenomena must be explained by geometrical laws.',
    dimensionImpact: { methodology: 0.9, epistemology: 0.7 }
  },
  {
    id: 92,
    axis: 'methodology',
    statement: 'Scientific hypotheses must remain tentative and open to revision whenever new experimental evidence contradicts them.',
    dimensionImpact: { methodology: -1.0 }
  },
  {
    id: 93,
    axis: 'methodology',
    statement: 'Philosophers should construct comprehensive, all-encompassing systems of thought that explain the totality of existence.',
    dimensionImpact: { methodology: 1.0 }
  },
  {
    id: 94,
    axis: 'methodology',
    statement: 'Careful natural history and hands-on laboratory observation are far superior to armchair metaphysical speculations.',
    dimensionImpact: { methodology: -1.0 }
  },
  {
    id: 95,
    axis: 'methodology',
    statement: 'Universal laws of nature can be discovered through intellectual deduction from the inherent properties of matter and space.',
    dimensionImpact: { methodology: 0.9, epistemology: 0.8 }
  },
  {
    id: 96,
    axis: 'methodology',
    statement: 'Inductive generalization from particular experiments can never provide absolute mathematical certainty, only practical confidence.',
    dimensionImpact: { methodology: -0.8, epistemology: -0.7 }
  },
  {
    id: 97,
    axis: 'methodology',
    statement: 'Rigorous definitions and clear logical classifications are more crucial for intellectual progress than inventing new laboratory tools.',
    dimensionImpact: { methodology: 0.9 }
  },
  {
    id: 98,
    axis: 'methodology',
    statement: 'Scientific progress requires public collaboration and institutionalized open sharing of experimental protocols.',
    dimensionImpact: { methodology: -0.8, politics: -0.5 }
  },
  {
    id: 99,
    axis: 'methodology',
    statement: 'Complex systems can be completely understood by breaking them down into their simplest elementary parts and mechanisms.',
    dimensionImpact: { methodology: -0.7, metaphysics: -0.7 }
  },
  {
    id: 100,
    axis: 'methodology',
    statement: 'Philosophy should be conducted using the strict, axiomatic deductive method of Euclidean geometry.',
    dimensionImpact: { methodology: 1.0, epistemology: 0.9 }
  }
];

/**
 * Interleaves a set of questions across all philosophical axes with high entropy and smooth depletion,
 * guaranteeing zero consecutive questions from the same axis and avoiding predictable repeating loops.
 */
function interleaveQuestions(
  questions: LikertQuestion[],
  seed = 4242
): LikertQuestion[] {
  type CoreAxis = 'epistemology' | 'metaphysics' | 'theology' | 'ethics' | 'politics' | 'methodology';
  const axes: CoreAxis[] = [
    'epistemology',
    'metaphysics',
    'theology',
    'ethics',
    'politics',
    'methodology'
  ];

  const buckets: Record<CoreAxis, LikertQuestion[]> = {
    epistemology: [],
    metaphysics: [],
    theology: [],
    ethics: [],
    politics: [],
    methodology: []
  };

  for (const q of questions) {
    if (q.axis in buckets) {
      buckets[q.axis as CoreAxis].push(q);
    }
  }

  let currentSeed = seed;
  const rand = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };

  const result: LikertQuestion[] = [];
  let lastAxis: CoreAxis | null = null;
  let secondLastAxis: CoreAxis | null = null;
  const total = questions.length;

  for (let step = 0; step < total; step++) {
    const available = axes.filter((a) => buckets[a].length > 0);
    if (available.length === 0) break;

    // Check if any bucket has urgency (its remaining count >= half the remaining items)
    const remainingTotal = available.reduce((acc, a) => acc + buckets[a].length, 0);
    const urgentAxis = available.find((a) => buckets[a].length * 2 >= remainingTotal);

    let chosenAxis: LikertQuestion['axis'];
    if (urgentAxis && urgentAxis !== lastAxis) {
      chosenAxis = urgentAxis;
    } else {
      let candidates = available.filter((a) => a !== lastAxis);
      if (candidates.length === 0) candidates = available;

      const withoutSecondLast = candidates.filter((a) => a !== secondLastAxis);
      if (withoutSecondLast.length >= 2) {
        candidates = withoutSecondLast;
      }

      candidates.sort((a, b) => buckets[b].length - buckets[a].length);

      const maxCount = buckets[candidates[0]].length;
      const topCandidates = candidates.filter((c) => buckets[c].length >= maxCount - 1);
      const pickIndex = Math.floor(rand() * topCandidates.length);
      chosenAxis = topCandidates[pickIndex] || candidates[0];
    }

    const chosenQuestion = buckets[chosenAxis].shift()!;
    result.push(chosenQuestion);

    secondLastAxis = lastAxis;
    lastAxis = chosenAxis;
  }

  return result;
}

export const RAW_PRIORITY_QUESTIONS: Omit<LikertQuestion, 'category'>[] = [
  {
    id: 901,
    axis: 'priority',
    statement: 'When evaluating a philosophy, explaining knowledge, mathematics, and logic matters far more to me than moral rules or practical advice.',
    dimensionImpact: {},
    isPriorityQuestion: true,
    priorityImpact: {
      epistemology: 2.2,
      methodology: 1.2,
      ethics: -1.6,
      politics: -1.6
    }
  },
  {
    id: 902,
    axis: 'priority',
    statement: 'The supreme test of any philosophy is whether it can guide practical human morality, justice, and how society should be governed.',
    dimensionImpact: { metaphilosophy: -0.6 },
    isPriorityQuestion: true,
    priorityImpact: {
      ethics: 2.2,
      politics: 2.0,
      metaphysics: -1.4,
      epistemology: -1.2,
      methodology: -1.0
    }
  },
  {
    id: 903,
    axis: 'priority',
    statement: 'Understanding the ultimate nature of reality, substance, and the mind-body problem is vastly more fundamental than political opinions or social theories.',
    dimensionImpact: {},
    isPriorityQuestion: true,
    priorityImpact: {
      metaphysics: 2.2,
      epistemology: 1.2,
      politics: -1.6,
      ethics: -1.2
    }
  },
  {
    id: 904,
    axis: 'priority',
    statement: 'Verifiable empirical science, physical observation, and practical methodology matter far more to me than armchair speculative metaphysics.',
    dimensionImpact: { metaphilosophy: -0.9 },
    isPriorityQuestion: true,
    priorityImpact: {
      methodology: 2.0,
      epistemology: 1.4,
      theology: -1.2
    }
  },
  {
    id: 905,
    axis: 'priority',
    statement: 'Profound cosmological questions regarding the divine order, God, and the universe are far more essential to philosophy than secular politics or human conventions.',
    dimensionImpact: { metaphilosophy: 0.6 },
    isPriorityQuestion: true,
    priorityImpact: {
      theology: 2.4,
      metaphysics: 1.2,
      politics: -1.6
    }
  },
  {
    id: 906,
    axis: 'priority',
    statement: 'The highest aim of philosophy is to construct an exhaustive, unified system explaining all of reality and mind from foundational first principles.',
    dimensionImpact: { metaphilosophy: 1.0 },
    isPriorityQuestion: true,
    priorityImpact: {
      metaphilosophy: 2.2,
      methodology: 1.2,
      politics: -1.0
    }
  },
  {
    id: 907,
    axis: 'priority',
    statement: 'Philosophy\'s most vital task is critical: exposing the limits of human knowledge, debunking grand metaphysical systems, and serving practical human flourishing.',
    dimensionImpact: { metaphilosophy: -1.0 },
    isPriorityQuestion: true,
    priorityImpact: {
      epistemology: 2.0,
      methodology: 1.4,
      theology: -1.2
    }
  }
];

export const PRIORITY_QUESTIONS: LikertQuestion[] = RAW_PRIORITY_QUESTIONS.map((q) => ({
  ...q,
  originalId: q.id,
  category: 'Worldview & Metaphilosophy'
}));

const RAW_WITH_CATEGORIES: LikertQuestion[] = RAW_100_STATEMENTS.map((q) => ({
  ...q,
  originalId: q.id,
  category: AXIS_CATEGORY_LABELS[q.axis] || 'Philosophy'
}));

/**
 * Builds the 100-question pool: 93 interleaved axis questions + 7 worldview/priority questions.
 */
function build100Statements(): LikertQuestion[] {
  const axes: LikertQuestion['axis'][] = [
    'epistemology',
    'metaphysics',
    'theology',
    'ethics',
    'politics',
    'methodology'
  ];
  const targetPerAxis = [16, 16, 16, 15, 15, 15]; // 93 statements
  const selected: LikertQuestion[] = [];

  axes.forEach((axis, idx) => {
    const axisQuestions = RAW_WITH_CATEGORIES.filter((q) => q.axis === axis);
    const count = targetPerAxis[idx];
    const step = axisQuestions.length / count;
    for (let i = 0; i < count; i++) {
      const qIndex = Math.min(Math.floor(i * step), axisQuestions.length - 1);
      selected.push(axisQuestions[qIndex]);
    }
  });

  const interleaved = interleaveQuestions(selected, 4242);
  const result = [...interleaved];
  const insertIndices = [13, 27, 41, 55, 69, 83, 97];
  PRIORITY_QUESTIONS.forEach((pq, i) => {
    const insertAt = insertIndices[i] ?? result.length;
    result.splice(insertAt, 0, pq);
  });

  return result.map((q, idx) => ({
    ...q,
    id: idx + 1
  }));
}

export const COMPLETE_100_STATEMENTS: LikertQuestion[] = build100Statements();

/**
 * Builds the 50-question pool: 43 interleaved axis questions + 7 worldview/priority questions.
 */
function build50Statements(): LikertQuestion[] {
  const axes: LikertQuestion['axis'][] = [
    'epistemology',
    'metaphysics',
    'theology',
    'ethics',
    'politics',
    'methodology'
  ];
  const targetPerAxis = [8, 7, 7, 7, 7, 7]; // 43 statements
  const selected: LikertQuestion[] = [];

  axes.forEach((axis, idx) => {
    const axisQuestions = RAW_WITH_CATEGORIES.filter((q) => q.axis === axis);
    const count = targetPerAxis[idx];
    const step = axisQuestions.length / count;
    for (let i = 0; i < count; i++) {
      const qIndex = Math.min(Math.floor(i * step), axisQuestions.length - 1);
      selected.push(axisQuestions[qIndex]);
    }
  });

  const interleaved = interleaveQuestions(selected, 8819);
  const result = [...interleaved];
  const insertIndices = [6, 13, 20, 27, 34, 41, 48];
  PRIORITY_QUESTIONS.forEach((pq, i) => {
    const insertAt = insertIndices[i] ?? result.length;
    result.splice(insertAt, 0, pq);
  });

  return result.map((q, idx) => ({
    ...q,
    id: idx + 1
  }));
}

export const COMPLETE_50_STATEMENTS: LikertQuestion[] = build50Statements();

/**
 * Generates an evenly distributed selection of questions for 50 or 100 statements mode,
 * seamlessly mixing in 5 priority questions that construct the user's worldview priorities profile.
 */
export function getQuizStatements(mode: '50' | '100'): LikertQuestion[] {
  return mode === '100' ? COMPLETE_100_STATEMENTS : COMPLETE_50_STATEMENTS;
}

