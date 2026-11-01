/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PixelPhilosopherConfig {
  id: string;
  name: string;
  title: string;
  quote: string;
  keywords: string[]; // Longer, challenging philosophical positions
  pixelProfile: {
    hairStyle:
      | 'periwig'
      | 'curls'
      | 'powdered-bob'
      | 'receding'
      | 'tudor-cap'
      | 'bonnet'
      | 'pompadour'
      | 'buckeye'
      | 'modern-bob'
      | 'short-waves'
      | 'tonsure'
      | 'clerical-wig';
    hairColor: string;
    skinTone: string;
    facialHair?: 'pencil-mustache' | 'bacon-goatee' | 'hobbes-beard' | 'clean' | 'gray-whiskers';
    outfitType:
      | 'doublet'
      | 'frock-coat'
      | 'jansenist'
      | 'gown'
      | 'bishop'
      | 'oratorian'
      | 'buckeye-tee'
      | 'modern-suit'
      | 'academic'
      | 'scholar-robe';
    coatColor: string;
    accentColor: string;
    accessory?:
      | 'candle'
      | 'prism'
      | 'quill'
      | 'watch'
      | 'star-chart'
      | 'pendulum'
      | 'tar-water'
      | 'book'
      | 'solo-cup'
      | 'legal-scroll'
      | 'scroll'
      | 'lens';
  };
}

// Philosophical positions tailored to irritate each specific nemesis ("a stab in the gut!")
// Packed with authentic -isms and doctrines the nemesis despised, with 10 per figure so none repeat.
export const NEMESIS_IRRITANTS: Record<string, string[]> = {
  // René Descartes separates mind and body -> Stabbing him with materialism & monism!
  'rene-descartes': [
    'MATERIALISM',
    'PANPSYCHISM',
    'EMPIRICISM',
    'PHYSICALISM',
    'BEHAVIORISM',
    'VITALISM',
    'PYRRHONISM',
    'NOMINALISM',
    'SENSATIONALISM',
    'RELATIVISM'
  ],

  // Baruch Spinoza denies free will, teleology, and personal creation -> Stabbing him with substance dualism!
  'baruch-spinoza': [
    'SUBSTANCE DUALISM',
    'CREATIONISM',
    'FREE WILL',
    'TELEOLOGY',
    'SUPERNATURALISM',
    'INDETERMINISM',
    'PROVIDENTIALISM',
    'ANTHROPOMORPHISM',
    'VOLUNTARISM',
    'CARTESIANISM'
  ],

  // John Locke champions blank slate and experience -> Stabbing him with innate ideas!
  'john-locke': [
    'INNATISM',
    'CARTESIANISM',
    'APRIORISM',
    'PATRIARCHALISM',
    'ABSOLUTISM',
    'SOLIPSISM',
    'AUTHORITARIANISM',
    'DOGMATISM',
    'SCHOLASTICISM',
    'PLATONISM'
  ],

  // G.W. Leibniz insists on best of all possible worlds and monads -> Stabbing him with vacuum and atoms!
  'gottfried-wilhelm-leibniz': [
    'MATERIALISM',
    'ATOMISM',
    'VACUISM',
    'VOLUNTARISM',
    'PESSIMISM',
    'OCCASIONALISM',
    'FATALISM',
    'IRRATIONALISM',
    'NOMINALISM',
    'MECHANISM'
  ],

  // David Hume denies necessary causation and metaphysical substance -> Stabbing him with rational certainty!
  'david-hume': [
    'RATIONALISM',
    'CAUSAL NECESSITY',
    'DEONTOLOGY',
    'SUBSTANTIALISM',
    'APRIORISM',
    'DOGMATISM',
    'TELEOLOGY',
    'INNATISM',
    'MORAL REALISM',
    'SCHOLASTICISM'
  ],

  // Immanuel Kant insists on duty and categorical imperative -> Stabbing him with utilitarian consequences!
  'immanuel-kant': [
    'UTILITARIANISM',
    'CONSEQUENTIALISM',
    'HEDONISM',
    'MORAL RELATIVISM',
    'DOGMATIC METAPHYSICS',
    'RADICAL EMPIRICISM',
    'PRAGMATISM',
    'FATALISM',
    'EUDIAMONISM',
    'SKEPTICISM'
  ],

  // Thomas Hobbes denies immaterial soul and champions Leviathan -> Stabbing him with conscience & liberty!
  'thomas-hobbes': [
    'IMMATERIALISM',
    'ANARCHISM',
    'LIBERTARIANISM',
    'SUBSTANCE DUALISM',
    'SCHOLASTICISM',
    'NATURAL ALTRUISM',
    'SEPARATION OF POWERS',
    'REPUBLICANISM',
    'PACIFISM',
    'CONSCIENTIOUS REFUSAL'
  ],

  // Francis Bacon rejects deduction and scholasticism -> Stabbing him with syllogistic deduction!
  'francis-bacon': [
    'SCHOLASTICISM',
    'APRIORISM',
    'SYLLOGISTIC DEDUCTION',
    'OCCULT MYSTICISM',
    'DOGMATISM',
    'SPECULATION',
    'OBSCURANTISM',
    'TELEOLOGY',
    'IDEALISM',
    'QUIETISM'
  ],

  // Blaise Pascal champions heart and faith -> Stabbing him with secularism and Pelagianism!
  'blaise-pascal': [
    'SECULARISM',
    'PELAGIANISM',
    'JESUIT CASUISTRY',
    'CARTESIAN DEISM',
    'RATIONALISM',
    'STOICISM',
    'HEDONISM',
    'MATERIALISM',
    'OPTIMISM',
    'MORAL LAXITY'
  ],

  // George Berkeley denies matter exists -> Stabbing him with physical matter!
  'george-berkeley': [
    'MATERIALISM',
    'PHYSICALISM',
    'CORPUSCULARIANISM',
    'DEISM',
    'ATHEISM',
    'ATOMISM',
    'MECHANISM',
    'SECULARISM',
    'SENSATIONALISM',
    'DUALISM'
  ],

  // Jeremy Bentham reduces all morals to pain/pleasure math -> Stabbing him with categorical duty!
  'jeremy-bentham': [
    'DEONTOLOGY',
    'NATURAL RIGHTS',
    'VIRTUE ETHICS',
    'MORAL INTUITIONISM',
    'TRADITIONALISM',
    'RETRIBUTIVISM',
    'ASCETICISM',
    'DIVINE COMMAND',
    'LEGAL MYSTICISM',
    'ABSOLUTISM'
  ],

  // Edmund Burke defends tradition and custom -> Stabbing with radical revolution & Jacobinism!
  'edmund-burke': [
    'JACOBINISM',
    'RADICALISM',
    'UTILITARIANISM',
    'EGALITARIAN LEVELLING',
    'ABSTRACT RATIONALISM',
    'INDIVIDUALISM',
    'NIHILISM',
    'REVOLUTIONISM',
    'COSMOPOLITANISM',
    'CONTRACTARIANISM'
  ],

  // Jean-Jacques Rousseau champions natural innocence -> Stabbing him with original sin & commercialism!
  'jean-jacques-rousseau': [
    'COMMERCIALISM',
    'HOBBESIAN EGOISM',
    'SOPHISTICATED CYNICISM',
    'TECHNOCRATIC ELITISM',
    'HEREDITARY ARISTOCRACY',
    'DESPOTISM',
    'ORIGINAL SIN',
    'COLD RATIONALISM',
    'CAPITALISM',
    'ARTIFICIALITY'
  ],

  // Voltaire mocks fanaticism & Panglossian optimism -> Stabbing with religious fanaticism & superstition!
  'voltaire': [
    'RELIGIOUS FANATICISM',
    'INTOLERANCE',
    'LEIBNIZIAN OPTIMISM',
    'INQUISITORIAL CENSORSHIP',
    'OBSCURANTISM',
    'SUPERSTITION',
    'CLERICAL DESPOTISM',
    'SCHOLASTICISM',
    'FATALISM',
    'DOGMATISM'
  ],

  // Mary Wollstonecraft fights for women's equal education -> Stabbing with patriarchal dogmas!
  'mary-wollstonecraft': [
    'PATRIARCHALISM',
    'CHAUVINISM',
    'HEREDITARY ARISTOCRACY',
    'BIOLOGICAL DETERMINISM',
    'BURKEAN SENTIMENTALISM',
    'DOMESTIC SUBJUGATION',
    'MORAL RELATIVISM',
    'FALSE GALLANTRY',
    'CLERICAL MISOGYNY',
    'DESPOTISM'
  ],

  // Isaac Newton champions absolute space and gravity -> Stabbing with vortices and relativity!
  'isaac-newton': [
    'CARTESIAN VORTICES',
    'RELATIONAL SPACE',
    'MATERIALISTIC ATHEISM',
    'OCCULT QUALITY',
    'HYPOTHESIS MONGERING',
    'PLENISM',
    'ARISTOTELIAN PHYSICS',
    'DETERMINISTIC CLOSURE',
    'CHANCE ATOMISM',
    'BLIND MECHANISM'
  ],

  // Nicolas Malebranche champions occasionalism -> Stabbing with creature causality!
  'nicolas-malebranche': [
    'CREATURE CAUSALITY',
    'EMPIRICAL SENSATIONALISM',
    'SPINOZISTIC PANTHEISM',
    'MATERIALISM',
    'EPICUREAN ATOMISM',
    'PELAGIAN HUMANISM',
    'ARISTOTELIAN FORMS',
    'SECULAR DEISM',
    'SKEPTICISM',
    'PHYSICAL INFLUX'
  ],

  // Pierre Bayle defends universal toleration -> Stabbing with dogmatism & fanaticism!
  'pierre-bayle': [
    'INTOLERANCE',
    'FANATICISM',
    'DOGMATIC RATIONALISM',
    'THEODICY',
    'PERSECUTIONISM',
    'CLERICAL INFALLIBILITY',
    'MORAL THEOCRACY',
    'SUPERSTITION',
    'SECTARIAN CHAUVINISM',
    'DOGMATISM'
  ],

  // Thomas Reid champions common sense realism -> Stabbing with solipsism & skepticism!
  'thomas-reid': [
    'THE WAY OF IDEAS',
    'HUMEAN SKEPTICISM',
    'BERKELEIAN IMMATERIALISM',
    'SOLIPSISM',
    'REDUCTIVE MATERIALISM',
    'SUBJECTIVISM',
    'EPISTEMIC NIHILISM',
    'CARTESIAN UNIVERSAL DOUBT',
    'DETERMINISTIC FATALISM',
    'PHENOMENALISM'
  ],

  // Antoine Arnauld (strict Jansenist) -> Stabbing with lax Jesuit casuistry!
  'antoine-arnauld': [
    'JESUIT CASUISTRY',
    'OCCASIONALISM',
    'PELAGIAN FREE WILL',
    'SPINOZISM',
    'MATERIALISM',
    'PYRRHONIC SKEPTICISM',
    'ANTINOMIANISM',
    'MORAL LAXITY',
    'PROBABILISM',
    'SECULAR MORALISM'
  ],

  // Anton Wilhelm Amo defends mental apatheia -> Stabbing with embodied soul confusion!
  'anton-wilhelm-amo': [
    'EMBODIED SOUL CONFUSION',
    'RACIALIST ANTHROPOLOGY',
    'MATERIALISTIC MONISM',
    'CHATTEL SLAVERY',
    'PASSIVE INTELLECTUALISM',
    'ARISTOTELIAN HYLOMORPHISM',
    'PREJUDICE',
    'DETERMINISTIC ANIMALISM',
    'EPISTEMIC DOGMATISM',
    'SENSATIONALISM'
  ],

  // Christian Wolff defends rational system -> Stabbing with irrational disorder!
  'christian-wolff': [
    'PIETISTIC ANTI INTELLECTUALISM',
    'RADICAL EMPIRICISM',
    'OBSCURANTISM',
    'VOLUNTARISM',
    'IRRATIONALISM',
    'DISORGANIZED ECLECTICISM',
    'FATALISTIC ATHEISM',
    'MORAL RELATIVISM',
    'NOMINALISTIC CHAOS',
    'SKEPTICISM'
  ],

  // Francis Hutcheson defends moral sense -> Stabbing with selfish egoism!
  'francis-hutcheson': [
    'PSYCHOLOGICAL EGOISM',
    'MANDEVILLEAN CYNICISM',
    'MORAL RATIONALISM',
    'TOTAL DEPRAVITY',
    'DESPOTIC SLAVERY',
    'CALLOUS AMORALITY',
    'AUTHORITARIAN CRUELTY',
    'ASCETIC MISANTHROPY',
    'HOBBESIANISM',
    'RELATIVISM'
  ],

  // Henry More defends extended divine space -> Stabbing with unextended spirit!
  'henry-more': [
    'NULLIBISM',
    'MECHANICAL BEAST MACHINE',
    'HOBBESIAN MATERIALISM',
    'ATHEISTIC SKEPTICISM',
    'CORPOREALISM',
    'DEISTIC INDIFFERENCE',
    'ENTHUSIASM',
    'PESSIMISTIC MECHANISM',
    'EPICUREAN ATOMISM',
    'DUALISTIC REDUCTION'
  ],

  // Jonathan Edwards defends sovereign glory -> Stabbing with Arminian free will!
  'jonathan-edwards': [
    'ARMINIAN FREE WILL',
    'DEISTIC SECULARISM',
    'MORAL SELF SUFFICIENCY',
    'PELAGIAN MORALISM',
    'SPIRITUAL LUKEWARMNESS',
    'MATERIALISTIC DEISM',
    'ANTINOMIAN LICENTIOUSNESS',
    'SOCINIAN HERESY',
    'SECULAR HUMANISM',
    'FATALISM'
  ],

  // Joseph Butler defends conscience -> Stabbing with Mandevillian vice!
  'joseph-butler': [
    'MANDEVILLEAN PARADOX',
    'HOBBESIAN EGOISM',
    'SUPERFICIAL DEISM',
    'MORAL LICENTIOUSNESS',
    'UNBRIDLED ENTHUSIASM',
    'FATALISTIC RECKLESSNESS',
    'CYNICAL NIHILISM',
    'SOLIPSISTIC HEDONISM',
    'SECTARIAN FANATICISM',
    'AMORALITY'
  ],

  // Mary Shepherd defends causal necessity against Hume -> Stabbing with Humean habit & skepticism!
  'mary-shepherd': [
    'HUMEAN CAUSAL SKEPTICISM',
    'BERKELEIAN IMMATERIALISM',
    'REDUCTIVE PHENOMENALISM',
    'EPISTEMIC SENSATIONALISM',
    'IRRATIONAL INDETERMINISM',
    'EMPIRICAL SOLIPSISM',
    'BLIND CASUALTY',
    'MIND DEPENDENT FICTIONALISM',
    'SUPERSTITIOUS METAPHYSICS',
    'SUBJECTIVISM'
  ],

  // Pierre Gassendi champions atomism in void -> Stabbing with Cartesian plenism!
  'pierre-gassendi': [
    'CARTESIAN PLENISM',
    'INNATE IDEAS',
    'SUBSTANCE DUALISM',
    'ARISTOTELIAN SCHOLASTICISM',
    'METAPHYSICAL DOGMATISM',
    'A PRIORI COSMOLOGY',
    'PANTHEISTIC FATALISM',
    'AUTHORITARIAN SCHOLASTICISM',
    'INTANGIBLE EXTENSION',
    'OCCULT QUALITIES'
  ],

  // Ralph Cudworth champions plastic nature -> Stabbing with atheistic materialism!
  'ralph-cudworth': [
    'HOBBESIAN ATHEISM',
    'THEOLOGICAL VOLUNTARISM',
    'BLIND MECHANISM',
    'RELATIVISTIC POSITIVISM',
    'FATALISTIC DETERMINISM',
    'HYLOZOIC MATERIALISM',
    'NIHILISTIC SKEPTICISM',
    'EPICUREAN ATOMISM',
    'CARTESIAN DISSOCIATION',
    'MATERIALISM'
  ],

  // Robert Boyle champions experimental chemistry -> Stabbing with alchemical mysticism!
  'robert-boyle': [
    'ARISTOTELIAN FORMS',
    'ESOTERIC ALCHEMY',
    'CARTESIAN DEDUCTION',
    'HOBBESIAN DOGMATISM',
    'ATHEISTIC ATOMISM',
    'DOGMATIC SCHOLASTICISM',
    'PANTHEISTIC VITALISM',
    'RADICAL PYRRHONISM',
    'OCCULT MYSTICISM',
    'ARMCHAIR PHYSICS'
  ],

  // Samuel Clarke defends eternal moral fitness -> Stabbing with Spinozist fatalism!
  'samuel-clarke': [
    'SPINOZISTIC NECESSITARIANISM',
    'RELATIONAL SPACE',
    'HOBBESIAN RELATIVISM',
    'THEOLOGICAL VOLUNTARISM',
    'BLIND FATALISM',
    'EGOISTIC HEDONISM',
    'DEISTIC ABSENTEEISM',
    'MATERIALISTIC DETERMINISM',
    'PYRRHONIC MORAL SKEPTICISM',
    'AMORALITY'
  ],

  // Sophie de Grouchy champions sympathy and justice -> Stabbing with callous despotism!
  'sophie-de-grouchy': [
    'FEUDAL TYRANNY',
    'CALLOUS DESPOTISM',
    'PATRIARCHAL SUBJUGATION',
    'CYNICAL EGOISM',
    'JACOBIN TERROR',
    'BOURGEOIS INDIFFERENCE',
    'RELIGIOUS INTOLERANCE',
    'HEREDITARY PRIVILEGE',
    'COLD SOCIAL DARWINISM',
    'MISOGYNY'
  ],

  // Anne Conway defends spiritual monism -> Stabbing with dead Cartesian matter!
  'anne-conway': [
    'CARTESIAN DUALISM',
    'HOBBESIAN MATERIALISM',
    'ETERNAL DAMNATION',
    'DEAD INERT MATTER',
    'SPINOZISTIC PANTHEISM',
    'PATRIARCHAL DISDAIN',
    'MECHANICAL SOULLESSNESS',
    'BLIND FATALISM',
    'CALVINISTIC PREDESTINATION',
    'CORPOREALISM'
  ],

  // Margaret Cavendish defends vitalist materialism -> Stabbing with lifeless matter!
  'margaret-cavendish': [
    'DEAD INERT MATTER',
    'CARTESIAN DUALISM',
    'MICROSCOPIC DELUSION',
    'SCHOLASTIC TYRANNY',
    'ATOMISTIC DISORDER',
    'MECHANICAL BEAST MACHINE',
    'ARROGANT SCIENTISM',
    'THEOLOGICAL VOLUNTARISM',
    'ABSTRACT IMMATERIALISM',
    'MALE CHAUVINISM'
  ],

  // Émilie du Châtelet defends energy conservation -> Stabbing with Cartesian momentum & dogmatism!
  'emilie-du-chatelet': [
    'CARTESIAN MOMENTUM',
    'ACADEMIC MISOGYNY',
    'UNGROUNDED EMPIRICISM',
    'BLIND DOGMATISM',
    'PANGLOSSIAN CARICATURE',
    'RELIGIOUS OBSCURANTISM',
    'CARTESIAN VORTICES',
    'INTELLECTUAL COWARDICE',
    'FATALISTIC SKEPTICISM',
    'SUPERSTITION'
  ],

  // Martha Nussbaum (facing Brutus Buckeye) -> Stabbing her with crude napkin utilitarianism!
  'martha-nussbaum': [
    'CRUDE UTILITARIANISM',
    'HEDONIC REDUCTIONISM',
    'COCKTAIL NAPKIN ETHICS',
    'STOIC APATHY',
    'PATRIARCHAL OPPRESSION',
    'ECONOMIC COMMODIFICATION',
    'TECHNO BRO SOPHISTRY',
    'MORAL SIMPLIFICATION',
    'AUTHORITARIAN PATERNALISM',
    'CALLOUS EFFICIENCY'
  ],

  // Brutus Buckeye (facing Martha Nussbaum) -> Stabbing him with rich human capabilities and tragic nuance!
  'brutus-buckeye': [
    'DEONTOLOGY',
    'VIRTUE ETHICS',
    'CAPABILITIES APPROACH',
    'CARE ETHICS',
    'MORAL NUANCE',
    'INCOMMENSURABILITY',
    'HUMAN DIGNITY',
    'INTROSPECTION',
    'QUALITATIVE PLURALISM',
    'TRAGIC VULNERABILITY'
  ]
};

export const PIXEL_PHILOSOPHERS: Record<string, PixelPhilosopherConfig> = {
  'rene-descartes': {
    id: 'rene-descartes',
    name: 'René Descartes',
    title: 'The Father of Modern Rationalism',
    quote: 'I think, therefore I am.',
    keywords: ['RATIONALISM', 'SUBSTANCEDUAL', 'INNATEIDEAS', 'DEDUCTIVE', 'CERTAINTY', 'METAPHYSICS'],
    pixelProfile: {
      hairStyle: 'curls',
      hairColor: '#1a1a1a',
      skinTone: '#fcd34d',
      facialHair: 'pencil-mustache',
      outfitType: 'doublet',
      coatColor: '#18181b',
      accentColor: '#ffffff',
      accessory: 'candle'
    }
  },
  'baruch-spinoza': {
    id: 'baruch-spinoza',
    name: 'Baruch Spinoza',
    title: 'The Solitary Lens Grinder of Nature',
    quote: 'Nature and God are one and the same substance.',
    keywords: ['PANTHEISM', 'SUBSTANCE', 'DETERMINISM', 'GEOMETRICAL', 'NECESSITARIAN', 'AFFECTS'],
    pixelProfile: {
      hairStyle: 'curls',
      hairColor: '#262626',
      skinTone: '#d97706',
      facialHair: 'clean',
      outfitType: 'scholar-robe',
      coatColor: '#3f3f46',
      accentColor: '#e4e4e7',
      accessory: 'prism'
    }
  },
  'john-locke': {
    id: 'john-locke',
    name: 'John Locke',
    title: 'The Architect of the Blank Slate',
    quote: 'No man’s knowledge here can go beyond his experience.',
    keywords: ['EMPIRICISM', 'TABULARASA', 'EXPERIENCE', 'NATURALRIGHTS', 'SOCIALCONTRACT', 'TOLERATION'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#cbd5e1',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#15803d',
      accentColor: '#f8fafc',
      accessory: 'quill'
    }
  },
  'gottfried-wilhelm-leibniz': {
    id: 'gottfried-wilhelm-leibniz',
    name: 'G.W. Leibniz',
    title: 'The Universal Polymath of Monads',
    quote: 'This is the best of all possible worlds.',
    keywords: ['MONADOLOGY', 'PREESTABLISHED', 'OPTIMISM', 'CALCULUS', 'SUFFICIENTREASON', 'HARMONY'],
    pixelProfile: {
      hairStyle: 'periwig',
      hairColor: '#3b2518',
      skinTone: '#fde68a',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#7e22ce',
      accentColor: '#fbbf24',
      accessory: 'watch'
    }
  },
  'david-hume': {
    id: 'david-hume',
    name: 'David Hume',
    title: 'The Gentle Sceptic of Habit and Custom',
    quote: 'Reason is, and ought only to be, the slave of the passions.',
    keywords: ['SKEPTICISM', 'IMPRESSIONS', 'ASSOCIATION', 'CUSTOMARY', 'NATURALISM', 'SENTIMENTS'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#e2e8f0',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#b91c1c',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'immanuel-kant': {
    id: 'immanuel-kant',
    name: 'Immanuel Kant',
    title: 'The Master of the Critical System',
    quote: 'Two things fill my mind with ever-increasing awe: the starry heavens above me and the moral law within me.',
    keywords: ['DEONTOLOGY', 'CATEGORICAL', 'TRANSCENDENTAL', 'APRIORI', 'AUTONOMY', 'SYNTHETIC'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#f1f5f9',
      skinTone: '#fef08a',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#1d4ed8',
      accentColor: '#fbbf24',
      accessory: 'watch'
    }
  },
  'thomas-hobbes': {
    id: 'thomas-hobbes',
    name: 'Thomas Hobbes',
    title: 'The Philosopher of the Leviathan State',
    quote: 'The life of man in the state of nature is solitary, poor, nasty, brutish, and short.',
    keywords: ['LEVIATHAN', 'MATERIALISM', 'SOVEREIGNTY', 'ABSOLUTISM', 'MECHANICAL', 'COVENANT'],
    pixelProfile: {
      hairStyle: 'receding',
      hairColor: '#94a3b8',
      skinTone: '#fef3c7',
      facialHair: 'hobbes-beard',
      outfitType: 'scholar-robe',
      coatColor: '#1c1917',
      accentColor: '#e2e8f0',
      accessory: 'scroll'
    }
  },
  'francis-bacon': {
    id: 'francis-bacon',
    name: 'Francis Bacon',
    title: 'The Champion of Inductive Experiment',
    quote: 'Knowledge is power.',
    keywords: ['INDUCTION', 'EXPERIMENTAL', 'INSTRUMENT', 'IDOLSOFTHEMIND', 'NATURALHISTORY', 'EMPIRICISM'],
    pixelProfile: {
      hairStyle: 'tudor-cap',
      hairColor: '#451a03',
      skinTone: '#fed7aa',
      facialHair: 'bacon-goatee',
      outfitType: 'doublet',
      coatColor: '#854d0e',
      accentColor: '#ffffff',
      accessory: 'scroll'
    }
  },
  'blaise-pascal': {
    id: 'blaise-pascal',
    name: 'Blaise Pascal',
    title: 'The Jansenist Mystic of the Heart',
    quote: 'The heart has its reasons of which reason knows nothing.',
    keywords: ['JANSENISM', 'INFINITESIMAL', 'CONTRADICTION', 'CONVERSION', 'PROVIDENCE', 'MYSTICISM'],
    pixelProfile: {
      hairStyle: 'curls',
      hairColor: '#1c1917',
      skinTone: '#fef9c3',
      facialHair: 'clean',
      outfitType: 'jansenist',
      coatColor: '#09090b',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'anne-conway': {
    id: 'anne-conway',
    name: 'Anne Conway',
    title: 'The Vitalist Visionary of Universal Spirit',
    quote: 'All creatures are in continual motion and change toward the good.',
    keywords: ['VITALISTIC', 'MONISTICSPIRIT', 'METAMORPHOSIS', 'CREATIONISM', 'EMMANATION', 'PERFECTION'],
    pixelProfile: {
      hairStyle: 'bonnet',
      hairColor: '#64748b',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'gown',
      coatColor: '#334155',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'margaret-cavendish': {
    id: 'margaret-cavendish',
    name: 'Margaret Cavendish',
    title: 'The Duchess of Material Vitalism',
    quote: 'I would rather die in the adventure of noble thoughts than live in dull ignorance.',
    keywords: ['VITALMATTER', 'ORGANICISM', 'INFINITENATURE', 'MATERIALISM', 'ANIMA', 'PLURALISM'],
    pixelProfile: {
      hairStyle: 'pompadour',
      hairColor: '#451a03',
      skinTone: '#fef08a',
      facialHair: 'clean',
      outfitType: 'gown',
      coatColor: '#6b21a8',
      accentColor: '#e9d5ff',
      accessory: 'quill'
    }
  },
  'emilie-du-chatelet': {
    id: 'emilie-du-chatelet',
    name: 'Émilie du Châtelet',
    title: 'The Brilliant Translator of the Cosmos',
    quote: 'Judge me for my own merits, or lack of them, but do not look upon me as a mere appendage.',
    keywords: ['KINETICENERGY', 'CONSERVATION', 'GRAVITATIONAL', 'NEWTONIANISM', 'MATHEMATICAL', 'PHYSICS'],
    pixelProfile: {
      hairStyle: 'pompadour',
      hairColor: '#78350f',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'gown',
      coatColor: '#047857',
      accentColor: '#fef08a',
      accessory: 'star-chart'
    }
  },
  'george-berkeley': {
    id: 'george-berkeley',
    name: 'George Berkeley',
    title: 'The Idealist Bishop of Divine Perception',
    quote: 'To be is to be perceived.',
    keywords: ['IMMATERIALISM', 'IDEALISM', 'PERCEPTION', 'SPIRITUALITY', 'SOLIPSISM', 'DIVINEMIND'],
    pixelProfile: {
      hairStyle: 'clerical-wig',
      hairColor: '#e2e8f0',
      skinTone: '#fef08a',
      facialHair: 'clean',
      outfitType: 'bishop',
      coatColor: '#172554',
      accentColor: '#ffffff',
      accessory: 'tar-water'
    }
  },
  'nicolas-malebranche': {
    id: 'nicolas-malebranche',
    name: 'Nicolas Malebranche',
    title: 'The Oratorian Visionary of All Things in God',
    quote: 'We see all things in God.',
    keywords: ['OCCASIONALISM', 'DIVINEVISION', 'ILLUMINATION', 'EFFICACIOUS', 'PROVIDENCE', 'ORATORIAN'],
    pixelProfile: {
      hairStyle: 'tonsure',
      hairColor: '#1c1917',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'oratorian',
      coatColor: '#18181b',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'pierre-bayle': {
    id: 'pierre-bayle',
    name: 'Pierre Bayle',
    title: 'The Great Sceptic and Toleration Defender',
    quote: 'An opinion passed down through centuries may still be entirely false.',
    keywords: ['TOLERATION', 'PYRRHONISM', 'ENCYCLOPEDIA', 'SKEPTICISM', 'CONSCIENCE', 'HISTORICAL'],
    pixelProfile: {
      hairStyle: 'periwig',
      hairColor: '#94a3b8',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'scholar-robe',
      coatColor: '#334155',
      accentColor: '#e2e8f0',
      accessory: 'book'
    }
  },
  'thomas-reid': {
    id: 'thomas-reid',
    name: 'Thomas Reid',
    title: 'The Champion of Common Sense Realism',
    quote: 'Common sense is the compass of human life.',
    keywords: ['COMMONSENSE', 'DIRECTREALISM', 'PERCEPTION', 'INTUITION', 'FIRSTPRINCIPLE', 'EPISTEMIC'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#e2e8f0',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#155e75',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'voltaire': {
    id: 'voltaire',
    name: 'Voltaire (François-Marie Arouet)',
    title: 'The Witty Crusader for Liberty and Tolerance',
    quote: 'Think for yourselves and let others enjoy the privilege to do so too.',
    keywords: ['ANTICLERICAL', 'TOLERATION', 'ENLIGHTENMENT', 'DEISM', 'HUMANRIGHTS', 'SATIRICAL'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#cbd5e1',
      skinTone: '#fef08a',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#0284c7',
      accentColor: '#fbbf24',
      accessory: 'quill'
    }
  },
  'jean-jacques-rousseau': {
    id: 'jean-jacques-rousseau',
    name: 'Jean-Jacques Rousseau',
    title: 'The Voice of the General Will and Natural Virtue',
    quote: 'Man is born free, and everywhere he is in chains.',
    keywords: ['GENERALWILL', 'EGALITARIAN', 'SOCIALCONTRACT', 'ROMANTICISM', 'NATURALMAN', 'DEMOCRACY'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#64748b',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#4d7c0f',
      accentColor: '#fef08a',
      accessory: 'book'
    }
  },
  'mary-wollstonecraft': {
    id: 'mary-wollstonecraft',
    name: 'Mary Wollstonecraft',
    title: 'The Pioneer of Human Rights and Education',
    quote: 'I do not wish women to have power over men, but over themselves.',
    keywords: ['EMANCIPATION', 'EQUALEDUCATION', 'ENLIGHTENMENT', 'RATIONALITY', 'REPUBLICAN', 'JUSTICE'],
    pixelProfile: {
      hairStyle: 'bonnet',
      hairColor: '#78350f',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'gown',
      coatColor: '#0f766e',
      accentColor: '#ffffff',
      accessory: 'quill'
    }
  },
  'antoine-arnauld': {
    id: 'antoine-arnauld',
    name: 'Antoine Arnauld',
    title: 'The Sharp Jansenist Logician of Port-Royal',
    quote: 'Ideas are not entities outside us, but modifications of our own intellect.',
    keywords: ['PORTROYAL', 'JANSENISM', 'PREDESTINED', 'RATIONALISTIC', 'CARTESIAN', 'THEOLOGY'],
    pixelProfile: {
      hairStyle: 'tonsure',
      hairColor: '#475569',
      skinTone: '#fde68a',
      facialHair: 'clean',
      outfitType: 'jansenist',
      coatColor: '#0f172a',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'anton-wilhelm-amo': {
    id: 'anton-wilhelm-amo',
    name: 'Anton Wilhelm Amo',
    title: 'The Master of Mind-Body Apatheia',
    quote: 'The human mind does not feel material sensations; it contemplates them.',
    keywords: ['APATHEIA', 'IMMATERIALMIND', 'RATIONALISM', 'ENLIGHTENMENT', 'DUALISTIC', 'PHILOSOPHY'],
    pixelProfile: {
      hairStyle: 'short-waves',
      hairColor: '#0a0a0a',
      skinTone: '#5c3a21',
      facialHair: 'clean',
      outfitType: 'academic',
      coatColor: '#701a75',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'christian-wolff': {
    id: 'christian-wolff',
    name: 'Christian Wolff',
    title: 'The Systematic Architect of German Rationalism',
    quote: 'Philosophy is the science of all possible things.',
    keywords: ['SYSTEMATIC', 'AXIOMATIZATION', 'RATIONALISM', 'ONTOLOGY', 'TELEOLOGY', 'LEIBNIZIAN'],
    pixelProfile: {
      hairStyle: 'periwig',
      hairColor: '#e2e8f0',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#1e3a8a',
      accentColor: '#f59e0b',
      accessory: 'book'
    }
  },
  'edmund-burke': {
    id: 'edmund-burke',
    name: 'Edmund Burke',
    title: 'The Champion of Prudence and Organic Society',
    quote: 'Society is a partnership between the living, the dead, and the unborn.',
    keywords: ['CONSERVATISM', 'ORGANICSOCIETY', 'PRESCRIPTION', 'PRUDENCE', 'TRADITION', 'SUBLIME'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#cbd5e1',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#831843',
      accentColor: '#ffffff',
      accessory: 'scroll'
    }
  },
  'francis-hutcheson': {
    id: 'francis-hutcheson',
    name: 'Francis Hutcheson',
    title: 'The Founder of the Moral Sense Theory',
    quote: 'That action is best which procures the greatest happiness for the greatest numbers.',
    keywords: ['MORALSENSE', 'BENEVOLENCE', 'GREATESTGOOD', 'SENTIMENTAL', 'AESTHETIC', 'HAPPINESS'],
    pixelProfile: {
      hairStyle: 'clerical-wig',
      hairColor: '#e2e8f0',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#047857',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'henry-more': {
    id: 'henry-more',
    name: 'Henry More',
    title: 'The Cambridge Platonist of Infinite Space',
    quote: 'Space is the immense amphitheater of divine omnipresence.',
    keywords: ['PLATONISM', 'EXTENDEDSPIRIT', 'INFINITESPACE', 'DIVINITY', 'SPISSITUDE', 'CAMBRIDGE'],
    pixelProfile: {
      hairStyle: 'curls',
      hairColor: '#334155',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'academic',
      coatColor: '#312e81',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'isaac-newton': {
    id: 'isaac-newton',
    name: 'Sir Isaac Newton',
    title: 'The Master of Gravity and Universal Calculus',
    quote: 'If I have seen further, it is by standing on the shoulders of giants.',
    keywords: ['GRAVITATION', 'MATHEMATICAL', 'ABSOLUTESPACE', 'CORPUSCULAR', 'PRINCIPIA', 'CALCULUS'],
    pixelProfile: {
      hairStyle: 'curls',
      hairColor: '#94a3b8',
      skinTone: '#fef08a',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#431407',
      accentColor: '#ffffff',
      accessory: 'prism'
    }
  },
  'jeremy-bentham': {
    id: 'jeremy-bentham',
    name: 'Jeremy Bentham',
    title: 'The Radical Architect of Utilitarian Happiness',
    quote: 'Nature has placed mankind under the governance of two sovereign masters: pain and pleasure.',
    keywords: ['UTILITARIAN', 'HEDONICCALC', 'CONSEQUENTIAL', 'RADICALREFORM', 'PANOPTICON', 'LEGISLATION'],
    pixelProfile: {
      hairStyle: 'receding',
      hairColor: '#f1f5f9',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#14532d',
      accentColor: '#ffffff',
      accessory: 'watch'
    }
  },
  'jonathan-edwards': {
    id: 'jonathan-edwards',
    name: 'Jonathan Edwards',
    title: 'The Philosophical Divine of Idealist Awakening',
    quote: 'Grace is but glory begun, and glory is but grace perfected.',
    keywords: ['SOVEREIGNTY', 'DIVINEGLORY', 'AFFECTIONS', 'PREDESTINED', 'IDEALISM', 'CALVINISM'],
    pixelProfile: {
      hairStyle: 'clerical-wig',
      hairColor: '#cbd5e1',
      skinTone: '#fde68a',
      facialHair: 'clean',
      outfitType: 'academic',
      coatColor: '#09090b',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'joseph-butler': {
    id: 'joseph-butler',
    name: 'Joseph Butler',
    title: 'The Bishop of Conscience and Human Nature',
    quote: 'Everything is what it is, and not another thing.',
    keywords: ['CONSCIENCE', 'SELFREFLECTION', 'BENEVOLENCE', 'TELEOLOGY', 'MORALSYSTEM', 'ANALOGY'],
    pixelProfile: {
      hairStyle: 'clerical-wig',
      hairColor: '#e2e8f0',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'bishop',
      coatColor: '#1e1b4b',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'mary-shepherd': {
    id: 'mary-shepherd',
    name: 'Lady Mary Shepherd',
    title: 'The Keen Metaphysician of Causal Necessity',
    quote: 'Every beginning of existence must have a cause.',
    keywords: ['CAUSALNECESSITY', 'RATIONALREALISM', 'EPISTEMOLOGY', 'REFUTATION', 'PERCEPTION', 'SUBSTANCE'],
    pixelProfile: {
      hairStyle: 'bonnet',
      hairColor: '#581c87',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'gown',
      coatColor: '#4c1d95',
      accentColor: '#fbbf24',
      accessory: 'book'
    }
  },
  'pierre-gassendi': {
    id: 'pierre-gassendi',
    name: 'Pierre Gassendi',
    title: 'The Reconstructor of Epicurean Atomism',
    quote: 'Matter is made of indivisible atoms endowed with motion by God.',
    keywords: ['EPICUREANISM', 'MATERIALATOM', 'VACUUMSPACE', 'EMPIRICISM', 'MECHANICAL', 'CORPUSCULAR'],
    pixelProfile: {
      hairStyle: 'tonsure',
      hairColor: '#64748b',
      skinTone: '#fde68a',
      facialHair: 'gray-whiskers',
      outfitType: 'scholar-robe',
      coatColor: '#1c1917',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'ralph-cudworth': {
    id: 'ralph-cudworth',
    name: 'Ralph Cudworth',
    title: 'The Metaphysician of Plastic Nature',
    quote: 'Things are what they are by their own nature, not by arbitrary decree.',
    keywords: ['PLASTICNATURE', 'INDEPENDENT', 'ETERNALTRUTH', 'CAMBRIDGE', 'PLATONISM', 'THEISM'],
    pixelProfile: {
      hairStyle: 'curls',
      hairColor: '#475569',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'academic',
      coatColor: '#0f172a',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'robert-boyle': {
    id: 'robert-boyle',
    name: 'Robert Boyle',
    title: 'The Sceptical Chymist of Corpuscles',
    quote: 'The world is like a great automaton engine, guided by mechanical laws.',
    keywords: ['CORPUSCULAR', 'EXPERIMENTAL', 'MECHANICAL', 'CHYMISTRY', 'NATURALIST', 'EMPIRICAL'],
    pixelProfile: {
      hairStyle: 'periwig',
      hairColor: '#3b2518',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'frock-coat',
      coatColor: '#065f46',
      accentColor: '#fbbf24',
      accessory: 'watch'
    }
  },
  'samuel-clarke': {
    id: 'samuel-clarke',
    name: 'Samuel Clarke',
    title: 'The Champion of Necessary Moral Relations',
    quote: 'Moral fitnesses are as eternal and unchangeable as mathematical truths.',
    keywords: ['MORALFITNESS', 'ETERNALRELATION', 'FREEAGENCY', 'THEOLOGICAL', 'RATIONALISM', 'DEMONSTRATIVE'],
    pixelProfile: {
      hairStyle: 'clerical-wig',
      hairColor: '#cbd5e1',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'academic',
      coatColor: '#111827',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'sophie-de-grouchy': {
    id: 'sophie-de-grouchy',
    name: 'Sophie de Grouchy',
    title: 'The Republican Philosopher of Sympathy and Justice',
    quote: 'Sympathy is the natural seed from which universal justice and equality grow.',
    keywords: ['MORALSYMPATHY', 'REPUBLICANISM', 'EGALITARIAN', 'ENLIGHTENMENT', 'JUSTICE', 'EQUALITY'],
    pixelProfile: {
      hairStyle: 'pompadour',
      hairColor: '#713f12',
      skinTone: '#fef08a',
      facialHair: 'clean',
      outfitType: 'gown',
      coatColor: '#be123c',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  },
  'brutus-buckeye': {
    id: 'brutus-buckeye',
    name: 'Brutus Buckeye',
    title: 'The Utilitarian Edgelord of Columbus',
    quote: 'Philosophy is easy bro, just optimize the vibes and drink up.',
    keywords: ['CRUDEHEDONISM', 'UTILITARIAN', 'COCKTAILNAPKIN', 'DOPAMINECALC', 'REDUCTIONISM', 'EFFICIENCY'],
    pixelProfile: {
      hairStyle: 'buckeye',
      hairColor: '#78350f',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'buckeye-tee',
      coatColor: '#dc2626',
      accentColor: '#9ca3af',
      accessory: 'solo-cup'
    }
  },
  'martha-nussbaum': {
    id: 'martha-nussbaum',
    name: 'Martha Nussbaum',
    title: 'The Inquisitor of Human Capabilities',
    quote: 'To be a good human being is to have an openness to the world and its vulnerability.',
    keywords: ['CAPABILITIES', 'HUMANDIGNITY', 'VULNERABILITY', 'COMPLEXITY', 'EMPATHETIC', 'INCOMMENSURABLE'],
    pixelProfile: {
      hairStyle: 'modern-bob',
      hairColor: '#e2e8f0',
      skinTone: '#fed7aa',
      facialHair: 'clean',
      outfitType: 'modern-suit',
      coatColor: '#0f172a',
      accentColor: '#0284c7',
      accessory: 'legal-scroll'
    }
  }
};

export function getPixelPhilosopher(id: string): PixelPhilosopherConfig {
  if (PIXEL_PHILOSOPHERS[id]) {
    return PIXEL_PHILOSOPHERS[id];
  }
  return {
    id,
    name: id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    title: 'The Early Modern Thinker',
    quote: 'Truth is sought through reason and experience.',
    keywords: ['RATIONALISM', 'EMPIRICISM', 'METAPHYSICS', 'EPISTEMOLOGY', 'DETERMINISM', 'SUBSTANTIAL'],
    pixelProfile: {
      hairStyle: 'powdered-bob',
      hairColor: '#cbd5e1',
      skinTone: '#fed7aa',
      outfitType: 'frock-coat',
      coatColor: '#1e293b',
      accentColor: '#ffffff',
      accessory: 'book'
    }
  };
}

/**
 * Returns a tailored list of challenging philosophical keywords
 * that specifically assault and irritate the nemesis's core doctrine!
 * Contains 10 positions per nemesis so none repeat during the duel.
 */
export function getDuelKeywords(playerPhilId: string, nemesisPhilId: string): string[] {
  const nemesisIrritants = NEMESIS_IRRITANTS[nemesisPhilId];
  if (nemesisIrritants && nemesisIrritants.length >= 8) {
    return nemesisIrritants;
  }
  const playerConf = getPixelPhilosopher(playerPhilId);
  const playerKeywords = playerConf.keywords || [];
  const combined = [...(nemesisIrritants || []), ...playerKeywords];
  const unique = Array.from(new Set(combined));

  return unique.length > 0
    ? unique
    : [
        'UTILITARIANISM',
        'DEONTOLOGY',
        'VIRTUE ETHICS',
        'PANPSYCHISM',
        'PHYSICALISM',
        'RATIONALISM',
        'EMPIRICISM',
        'SOLIPSISM',
        'DETERMINISM',
        'MATERIALISM'
      ];
}
