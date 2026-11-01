/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DimensionMeta, Philosopher } from '../types/philosophy';

export const PHILOSOPHICAL_DIMENSIONS: DimensionMeta[] = [
  {
    key: 'epistemology',
    label: 'Epistemology',
    lowLabel: 'Empiricism & Skepticism (Senses & Doubt)',
    highLabel: 'Rationalism (Reason & Innate Ideas)',
    description: 'Whether knowledge comes from sensory experience and skepticism, or from innate ideas and logical certainty.'
  },
  {
    key: 'metaphysics',
    label: 'Metaphysics',
    lowLabel: 'Materialism (Matter & Motion)',
    highLabel: 'Idealism & Dualism (Mind & Spirit)',
    description: 'Whether reality consists of physical matter in motion, or of minds, ideas, and spiritual substance.'
  },
  {
    key: 'theology',
    label: 'Theology',
    lowLabel: 'Natural Order (Nature & Natural Law)',
    highLabel: 'Providence (Divine Guidance & Creator)',
    description: 'Whether God is identified with the laws of nature, or is a personal creator who guides the world.'
  },
  {
    key: 'ethics',
    label: 'Ethics',
    lowLabel: 'Feelings & Utility (Outcomes & Sympathy)',
    highLabel: 'Duty & Conscience (Moral Principles)',
    description: 'Whether morality comes from human feelings, sympathy, and outcomes, or from duty and universal principles.'
  },
  {
    key: 'politics',
    label: 'Politics',
    lowLabel: 'Liberty & Rights (Individual Freedom)',
    highLabel: 'Order & Authority (Social Stability)',
    description: 'Whether government exists to protect individual liberty and rights, or to preserve order, peace, and authority.'
  },
  {
    key: 'methodology',
    label: 'Scientific Method',
    lowLabel: 'Observation & Experiments (Bottom-Up)',
    highLabel: 'Logical Deduction (Top-Down Proofs)',
    description: 'Whether science advances through experiments and observation, or through logical deduction from first principles.'
  },
  {
    key: 'metaphilosophy',
    label: 'Scope of Philosophy',
    lowLabel: 'Critical Limits & Everyday Life',
    highLabel: 'Grand Systems & First Principles',
    description: 'Whether philosophy should set modest limits and serve human life, or construct grand systems explaining all of reality.'
  }
];

const RAW_PHILOSOPHERS: Philosopher[] = [
  {
    id: 'francis-bacon',
    name: 'Francis Bacon',
    dates: '1561–1626',
    century: '17th Century',
    nationality: 'English',
    school: 'British Empiricism',
    motto: 'Scientia potentia est (Knowledge is power)',
    quote: 'If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he shall end in certainties.',
    quoteSource: 'The Advancement of Learning (1605)',
    magnumOpus: 'Novum Organum (1620)',
    summary: 'The pioneer of the scientific revolution who replaced scholastic dogmatism with systematic inductive inquiry and natural history.',
    coreTheses: [
      'Knowledge must be derived systematically from observational experiments rather than armchair deduction.',
      'Human understanding is clouded by the four "Idols of the Mind" (Tribe, Cave, Marketplace, Theater).',
      'The purpose of natural philosophy is the relief of man\'s estate through practical technological mastery.'
    ],
    historicalContext: 'Lord Chancellor of England during the Jacobean era; laid the conceptual foundation for the Royal Society.',
    keyConcepts: ['Inductive Method', 'Idols of the Mind', 'Empirical Observation', 'Technological Progress'],
    scores: {
      epistemology: -0.9,
      metaphysics: -0.5,
      theology: 0.3,
      ethics: -0.2,
      politics: 0.6,
      methodology: -1.0,
      metaphilosophy: -0.85
    },
    domainPriorities: {
      "methodology": 5,
      "epistemology": 5,
      "metaphilosophy": 5,
      "politics": 3,
      "metaphysics": 2,
      "theology": 2,
      "ethics": 2
},
    metaphilosophicalFocus: "Inductive scientific revolution and natural history; philosophy must master nature for human relief rather than spinning abstract metaphysical webs.",
    signatureTraits: ['inductive-experiment', 'idols-critique', 'practical-science'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Disdained Descartes\'s top-down mathematical deduction as an insular spider spinning webs from its own mind without experimental soil.'
  },
  {
    id: 'jeremy-bentham',
    name: 'Jeremy Bentham',
    dates: '1748–1832',
    century: '18th Century',
    nationality: 'English',
    school: 'Utilitarianism & Naturalism',
    motto: 'The greatest happiness of the greatest number',
    quote: 'Nature has placed mankind under the governance of two sovereign masters, pain and pleasure. It is for them alone to point out what we ought to do.',
    quoteSource: 'An Introduction to the Principles of Morals and Legislation (1789)',
    magnumOpus: 'Principles of Morals and Legislation (1789)',
    summary: 'The radical reformer and father of modern utilitarianism who evaluated all laws, traditions, and moralities strictly by their consequences for sentient pleasure and pain.',
    coreTheses: [
      'Actions are right strictly in proportion to their tendency to promote pleasure and mitigate pain.',
      'Natural rights are "nonsense upon stilts"; only positive legal rights engineered for utility hold validity.',
      'The "Felicific Calculus" allows scientific measurement of moral actions by intensity, duration, and extent.'
    ],
    historicalContext: 'Philosophical Radical who campaigned for legal codification, prison reform (the Panopticon), universal suffrage, and animal welfare.',
    keyConcepts: ['Utilitarianism', 'Felicific Calculus', 'Consequentialism', 'Legal Positivism'],
    scores: {
      epistemology: -0.8,
      metaphysics: -0.9,
      theology: -0.9,
      ethics: -1.0,
      politics: -0.7,
      methodology: -0.4,
      metaphilosophy: -0.9
    },
    domainPriorities: {
      "ethics": 5,
      "politics": 5,
      "metaphilosophy": 5,
      "methodology": 4,
      "epistemology": 3,
      "metaphysics": 1,
      "theology": 1
},
    metaphilosophicalFocus: "Radical utilitarian law reform and hedonistic quantification; dismisses natural rights and abstract speculative ontology as nonsense upon stilts.",
    signatureTraits: ['hedonic-calculus', 'consequentialist-utility', 'legal-reform'],
    archRivalId: 'edmund-burke',
    archRivalReason: 'Fiercely rejected Burke\'s reverence for ancestral prescription and unwritten English common law as irrational superstition.'
  },
  {
    id: 'george-berkeley',
    name: 'George Berkeley',
    dates: '1685–1753',
    century: '18th Century',
    nationality: 'Irish',
    school: 'British Empiricism',
    motto: 'Esse est percipi aut percipere (To be is to be perceived or to perceive)',
    quote: 'All the choir of heaven and furniture of the earth, in a word all those bodies which compose the mighty frame of the world, have not any subsistence without a mind.',
    quoteSource: 'A Treatise Concerning the Principles of Human Knowledge (1710)',
    magnumOpus: 'Treatise Concerning the Principles of Human Knowledge (1710)',
    summary: 'The audacious immaterialist who argued that physical matter does not exist independently of perceiving minds, solving skepticism by demonstrating that reality is a direct divine language.',
    coreTheses: [
      'Material substance is a contradictory abstraction; we only experience ideas, sensations, and perceiving spirits.',
      'Objects exist continually because they are ceaselessly perceived by the infinite mind of God.',
      'Scientific laws are not physical forces, but the steady grammatical rules of God\'s sensory communication.'
    ],
    historicalContext: 'Bishop of Cloyne in Ireland; defended orthodox Christianity against the rising tide of deism and mechanistic materialism.',
    keyConcepts: ['Subjective Idealism', 'Immaterialism', 'Esse est Percipi', 'Divine Visual Language'],
    scores: {
      epistemology: -0.7,
      metaphysics: 1.0,
      theology: 0.9,
      ethics: 0.4,
      politics: 0.3,
      methodology: -0.5,
      metaphilosophy: 0.65
    },
    domainPriorities: {
      "metaphysics": 5,
      "epistemology": 5,
      "theology": 5,
      "metaphilosophy": 5,
      "methodology": 3,
      "ethics": 2,
      "politics": 2
},
    metaphilosophicalFocus: "Immaterialist metaphysical idealism; philosophy exists to vanquish skepticism and atheism by revealing all reality as God’s sensory visual language.",
    signatureTraits: ['immaterialism', 'divine-perception', 'anti-materialism'],
    archRivalId: 'thomas-hobbes',
    archRivalReason: 'Repulsed by Hobbes\'s crude mechanistic materialism, which reduced thought and consciousness to mere collisions of bodily corpuscles.'
  },
  {
    id: 'robert-boyle',
    name: 'Robert Boyle',
    dates: '1627–1691',
    century: '17th Century',
    nationality: 'Irish-English',
    school: 'Mechanical & Experimental Philosophy',
    motto: 'Ex rerum causis (From the causes of things)',
    quote: 'The study of nature is not an impediment, but rather a guide to the study of the supernatural.',
    quoteSource: 'The Christian Virtuoso (1690)',
    magnumOpus: 'The Sceptical Chymist (1661)',
    summary: 'The devout natural philosopher and founder of modern chemistry who pioneered the air-pump experiment and formulated the corpuscular mechanical philosophy.',
    coreTheses: [
      'Chemical phenomena are governed by the motion, size, and shape of minute physical particles (corpuscles).',
      'Experimental results must be publicly witnessed, replicable, and free from unwarranted metaphysical speculation.',
      'The intricate mechanical order of the cosmos provides undeniable evidence of an omniscient Divine Architect.'
    ],
    historicalContext: 'Founding fellow of the Royal Society of London; established Boyle\'s Law governing gas pressure and volume.',
    keyConcepts: ['Corpuscularianism', 'Experimental Air-Pump', 'Mechanical Philosophy', 'The Christian Virtuoso'],
    scores: {
      epistemology: -0.8,
      metaphysics: -0.3,
      theology: 0.8,
      ethics: 0.5,
      politics: 0.4,
      methodology: -0.9,
      metaphilosophy: -0.6
    },
    domainPriorities: {
      "methodology": 5,
      "metaphysics": 5,
      "theology": 4,
      "epistemology": 4,
      "metaphilosophy": 4,
      "ethics": 2,
      "politics": 1
},
    metaphilosophicalFocus: "Experimental natural philosophy and corpuscular mechanics; scientific labor constitutes a sacred duty of the Christian virtuoso.",
    signatureTraits: ['corpuscular-matter', 'experimental-empiricism', 'design-argument'],
    archRivalId: 'thomas-hobbes',
    archRivalReason: 'Engaged in a legendary multi-decade feud with Hobbes, who claimed vacuum pumps produced artificial illusions rather than genuine philosophical truth.'
  },
  {
    id: 'edmund-burke',
    name: 'Edmund Burke',
    dates: '1729–1797',
    century: '18th Century',
    nationality: 'Irish-British',
    school: 'Enlightenment & Reform',
    motto: 'Society is a partnership between the living, the dead, and the unborn',
    quote: 'The individual is foolish; the multitude, for the moment, is foolish, when they act without deliberation; but the species is wise, and when time is given to it, as a species it always acts right.',
    quoteSource: 'Speech on the Reform of the Representation of the Commons (1782)',
    magnumOpus: 'Reflections on the Revolution in France (1790)',
    summary: 'The eloquent statesman and founder of modern philosophical conservatism who warned against tearing down organic social fabrics in the name of abstract rationalist dogmas.',
    coreTheses: [
      'Social institutions embody the accumulated ancestral wisdom of generations, which no single intellect can reconstruct from scratch.',
      'Prudence, prescription, and historical continuity are far superior moral guides than geometric rights of man.',
      'True reform must be gradual and restorative, preserving inherited liberties while pruning corruption.'
    ],
    historicalContext: 'Whig member of the British Parliament who championed conciliation with the American colonies while condemning the French Jacobin terror.',
    keyConcepts: ['Prescription & Tradition', 'Organic Society', 'Critique of Abstract Rights', 'Prudence as First Virtue'],
    scores: {
      epistemology: -0.4,
      metaphysics: 0.3,
      theology: 0.6,
      ethics: 0.7,
      politics: 0.9,
      methodology: -0.6,
      metaphilosophy: -0.8
    },
    domainPriorities: {
      "politics": 5,
      "ethics": 5,
      "metaphilosophy": 5,
      "epistemology": 3,
      "theology": 3,
      "metaphysics": 1,
      "methodology": 1
},
    metaphilosophicalFocus: "Pragmatic political prudence and organic social tradition; holds deep contempt for speculative metaphysical abstractions in human affairs.",
    signatureTraits: ['organic-tradition', 'anti-radicalism', 'generational-compact'],
    archRivalId: 'mary-wollstonecraft',
    archRivalReason: 'Wollstonecraft penned "A Vindication of the Rights of Men" explicitly to dismantle Burke\'s defense of feudal hereditary aristocracy.'
  },
  {
    id: 'joseph-butler',
    name: 'Joseph Butler',
    dates: '1692–1752',
    century: '18th Century',
    nationality: 'English',
    school: 'Enlightenment & Reform',
    motto: 'Probability is the very guide of life',
    quote: 'Conscience does not only offer itself to show us the way we should walk in, but it likewise carries its own authority with it.',
    quoteSource: 'Fifteen Sermons Preached at the Rolls Chapel (1726)',
    magnumOpus: 'The Analogy of Religion (1736)',
    summary: 'The moral epistemologist and theologian who demonstrated that human nature is structured hierarchically under the supreme, authoritative tribunal of conscience.',
    coreTheses: [
      'Conscience is the supreme authoritative faculty of human nature, judging actions by an inherent divine standard.',
      'Cool self-love and genuine benevolence are not in conflict, but harmoniously aligned in a well-ordered soul.',
      'The difficulties in natural religion and Christian revelation are analogous to the difficulties observed in the course of nature.'
    ],
    historicalContext: 'Bishop of Durham; decisively dismantled the egoistic theories of Hobbes and Bernard Mandeville.',
    keyConcepts: ['Authority of Conscience', 'Analogy of Nature', 'Harmonized Benevolence', 'Moral Hierarchy'],
    scores: {
      epistemology: 0.2,
      metaphysics: 0.4,
      theology: 0.9,
      ethics: 0.9,
      politics: 0.4,
      methodology: -0.3,
      metaphilosophy: -0.5
    },
    domainPriorities: {
      "ethics": 5,
      "theology": 5,
      "metaphilosophy": 4,
      "epistemology": 3,
      "politics": 2,
      "metaphysics": 2,
      "methodology": 2
},
    metaphilosophicalFocus: "Sovereignty of moral conscience and the analogy of revealed religion to the constitution and course of nature.",
    signatureTraits: ['sovereignty-of-conscience', 'critique-of-egoism', 'probabilistic-theology'],
    archRivalId: 'thomas-hobbes',
    archRivalReason: 'Rebutted Hobbes\'s cynical claim that all human benevolence and charity is merely disguised anxiety and selfish ambition.'
  },
  {
    id: 'samuel-clarke',
    name: 'Samuel Clarke',
    dates: '1675–1729',
    century: '18th Century',
    nationality: 'English',
    school: 'Continental Rationalism',
    motto: 'Truth is eternal, immutable, and founded in the nature of things',
    quote: 'The mind of man cannot but feel the natural fitness or unfitness of things, as certainly as the eye perceives the difference of colors.',
    quoteSource: 'A Discourse Concerning the Unchangeable Obligations of Natural Religion (1706)',
    magnumOpus: 'A Demonstration of the Being and Attributes of God (1705)',
    summary: 'The rationalist metaphysician and Newton\'s chief philosophical lieutenant who formulated the rational fitness theory of objective moral laws and debated Leibniz on space and time.',
    coreTheses: [
      'Moral relations have an eternal, immutable objective "fitness" comparable to mathematical truths.',
      'Space and time are absolute properties and the divine sensorium, not merely relative relations between physical bodies.',
      'God endowed rational creatures with genuine metaphysical free will, independent of physical determinism.'
    ],
    historicalContext: 'Anglican clergyman who represented Isaac Newton in the famous Clarke-Leibniz Correspondence over relativity and divine providence.',
    keyConcepts: ['Moral Fitness', 'A Priori Cosmological Proof', 'Absolute Space', 'Metaphysical Free Will'],
    scores: {
      epistemology: 0.7,
      metaphysics: 0.6,
      theology: 0.8,
      ethics: 0.9,
      politics: 0.2,
      methodology: 0.7,
      metaphilosophy: 0.85
    },
    domainPriorities: {
      "theology": 5,
      "metaphysics": 5,
      "ethics": 4,
      "methodology": 4,
      "epistemology": 4,
      "metaphilosophy": 4,
      "politics": 2
},
    metaphilosophicalFocus: "A priori rational demonstration of the divine attributes and Newtonian ontology of space and time against Leibniz.",
    signatureTraits: ['eternal-fitness', 'clarke-leibniz-correspondence', 'rationalist-theology'],
    archRivalId: 'gottfried-wilhelm-leibniz',
    archRivalReason: 'Fought the epic epistolary battle of the century with Leibniz over whether space is absolute and whether Newton\'s God was an imperfect watchmaker.'
  },
  {
    id: 'anne-conway',
    name: 'Anne Conway',
    dates: '1631–1679',
    century: '17th Century',
    nationality: 'English',
    school: 'Vitalist & Monist Metaphysics',
    motto: 'Spirit and matter differ only in degree, not in essence',
    quote: 'Every creature is capable of further perfection, and there is no dead or completely inert matter in the whole universe of God.',
    quoteSource: 'The Principles of the Most Ancient and Modern Philosophy (1690)',
    magnumOpus: 'The Principles of the Most Ancient and Modern Philosophy (1690)',
    summary: 'The pioneering vitalist monist and Kabbalistic metaphysician whose dynamic, living philosophy of spiritual substance directly inspired Leibniz’s theory of monads.',
    coreTheses: [
      'Reality comprises three distinct ontological substances: God (unchangeable), the Mediator/Christ, and Creation (changeable).',
      'Matter and spirit are not separate dualist substances, but a continuous spectrum of living, spiritual vitality.',
      'Because God is purely good, divine justice is restorative rather than punitive: all creatures undergo continuous spiritual elevation.'
    ],
    historicalContext: 'Viscountess Conway of Ragley Hall; hosted prominent intellectual circles with Henry More and Francis Mercury van Helmont while enduring chronic pain.',
    keyConcepts: ['Vitalist Monism', 'Universal Transmutation', 'Restorative Theodicy', 'Continuity of Spirit and Body'],
    scores: {
      epistemology: 0.6,
      metaphysics: 0.9,
      theology: 0.7,
      ethics: 0.6,
      politics: -0.3,
      methodology: 0.5,
      metaphilosophy: 0.85
    },
    domainPriorities: {
      "metaphysics": 5,
      "theology": 5,
      "metaphilosophy": 4,
      "ethics": 3,
      "epistemology": 3,
      "methodology": 2,
      "politics": 1
},
    metaphilosophicalFocus: "Vitalist monism synthesizing Kabbalah, Platonism, and natural philosophy against Cartesian dualism and Hobbesian dead mechanism.",
    signatureTraits: ['spiritual-vitalism', 'kabbalistic-monism', 'restorative-justice'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Excoriated Cartesian dualism for inventing a dead, inert matter that made genuine communion between body and soul impossible.'
  },
  {
    id: 'rene-descartes',
    name: 'René Descartes',
    dates: '1596–1650',
    century: '17th Century',
    nationality: 'French',
    school: 'Continental Rationalism',
    motto: 'Cogito, ergo sum (I think, therefore I am)',
    quote: 'I think, therefore I am, was so certain and of such evidence that no ground of doubt, however extravagant, could be capable of shaking it.',
    quoteSource: 'Discourse on the Method (1637)',
    magnumOpus: 'Meditations on First Philosophy (1641)',
    summary: 'The father of modern Western philosophy and analytical geometry who employed radical hyperbolic doubt to establish an unshakable foundation of rational knowledge and substance dualism.',
    coreTheses: [
      'Through radical doubt, the thinking self (res cogitans) is discovered to be indubitably distinct from the physical body (res extensa).',
      'Clear and distinct rational perceptions, guaranteed by a non-deceiving God, are the ultimate criterion of truth.',
      'The entire physical world operates like a grand mechanical clockwork ruled by geometric laws of motion.'
    ],
    historicalContext: 'French philosopher, mathematician, and scientist whose Discourse on Method and Meditations revolutionized metaphysics and physics.',
    keyConcepts: ['Hyperbolic Doubt', 'Substance Dualism', 'Cogito Ergo Sum', 'Clear & Distinct Ideas', 'Mechanical Physics'],
    scores: {
      epistemology: 1.0,
      metaphysics: 0.7,
      theology: 0.7,
      ethics: 0.5,
      politics: 0.3,
      methodology: 0.9,
      metaphilosophy: 0.95
    },
    domainPriorities: {
      "epistemology": 5,
      "metaphysics": 5,
      "methodology": 5,
      "metaphilosophy": 5,
      "theology": 4,
      "ethics": 2,
      "politics": 1
},
    metaphilosophicalFocus: "Foundational certainty via the method of doubt; constructing the grand tree of knowledge rooted in metaphysics and trunked in physics.",
    signatureTraits: ['radical-doubt', 'mind-body-dualism', 'deductive-certainty'],
    archRivalId: 'pierre-gassendi',
    archRivalReason: 'Gassendi wrote the Fifth Set of Objections against Descartes, mocking the disembodied "thinking thing" and defending sensory atomism.'
  },
  {
    id: 'isaac-newton',
    name: 'Isaac Newton',
    dates: '1642–1727',
    century: '17th Century',
    nationality: 'English',
    school: 'Mechanical & Experimental Philosophy',
    motto: 'Hypotheses non fingo (I frame no hypotheses)',
    quote: 'To myself I seem to have been only like a boy playing on the seashore, whilst the great ocean of truth lay all undiscovered before me.',
    quoteSource: 'Memoirs of the Life of Sir Isaac Newton (Brewster)',
    magnumOpus: 'Philosophiae Naturalis Principia Mathematica (1687)',
    summary: 'The colossus of physics and mathematics whose universal laws of gravitation and optics unified the heavens and the earth through rigorous mathematical empiricism.',
    coreTheses: [
      'Universal gravitation and the three laws of motion govern all physical bodies across celestial and terrestrial realms.',
      'Natural philosophy must deduce causes directly from phenomena by experimental induction rather than ungrounded speculative hypotheses.',
      'Absolute space and time exist as the eternal framework in which divine omnipresence upholds cosmic stability.'
    ],
    historicalContext: 'President of the Royal Society, Master of the Royal Mint, and discoverer of infinitesimal calculus and the composition of light.',
    keyConcepts: ['Universal Gravitation', 'Absolute Space & Time', 'Mathematical Induction', 'Experimental Optics'],
    scores: {
      epistemology: -0.6,
      metaphysics: -0.2,
      theology: 0.8,
      ethics: 0.3,
      politics: 0.4,
      methodology: -0.7,
      metaphilosophy: -0.5
    },
    domainPriorities: {
      "methodology": 5,
      "metaphysics": 5,
      "metaphilosophy": 5,
      "theology": 4,
      "epistemology": 4,
      "ethics": 1,
      "politics": 1
},
    metaphilosophicalFocus: "Mathematical-experimental natural philosophy; deducing celestial mechanics from observable phenomena without feigning arbitrary hypotheses.",
    signatureTraits: ['mathematical-empiricism', 'universal-gravitation', 'providential-mechanics'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Decimated Descartes\'s speculative vortex theory of planetary orbits by proving physical celestial dynamics through gravity and mathematical proof.'
  },
  {
    id: 'jonathan-edwards',
    name: 'Jonathan Edwards',
    dates: '1703–1758',
    century: '18th Century',
    nationality: 'American Colonial',
    school: 'Jansenist & Christian Rationalism',
    motto: 'God is the fountain of all being, beauty, and excellence',
    quote: 'The soul comes to a saving knowledge of God not by mere speculative notions, but by tasting and experiencing divine sweetness.',
    quoteSource: 'Religious Affections (1746)',
    magnumOpus: 'Freedom of the Will (1754)',
    summary: 'The brilliant American philosophical theologian who fused Locke’s sensationalist psychology with rigorous theological determinism and immaterialist divine idealism.',
    coreTheses: [
      'Human choices are necessarily determined by the soul\'s prevailing inclination; metaphysical liberty of indifference is an absurdity.',
      'Physical bodies possess no independent material existence apart from God\'s immediate, continual constitutional sustaining of ideas.',
      'Genuine virtue is the disinterested "benevolence to Being in general," driven by spiritual affections and divine beauty.'
    ],
    historicalContext: 'Leader of the First Great Awakening in colonial Massachusetts and third president of the College of New Jersey (Princeton).',
    keyConcepts: ['Theological Determinism', 'Divine Immaterialism', 'Religious Affections', 'Benevolence to Being'],
    scores: {
      epistemology: 0.3,
      metaphysics: 0.8,
      theology: 1.0,
      ethics: 0.8,
      politics: 0.5,
      methodology: 0.6,
      metaphilosophy: 0.8
    },
    domainPriorities: {
      "theology": 5,
      "metaphysics": 5,
      "ethics": 4,
      "metaphilosophy": 5,
      "epistemology": 3,
      "methodology": 2,
      "politics": 2
},
    metaphilosophicalFocus: "Sovereign theological determinism and divine continuous creation; fusing Lockean psychology with absolute Calvinist metaphysics.",
    signatureTraits: ['sovereign-determinism', 'divine-idealism', 'theological-affection'],
    archRivalId: 'john-locke',
    archRivalReason: 'Used Locke\'s psychological premises to defeat Arminian free will and establish absolute divine predestination.'
  },
  {
    id: 'pierre-gassendi',
    name: 'Pierre Gassendi',
    dates: '1592–1655',
    century: '17th Century',
    nationality: 'French',
    school: 'Mechanical & Experimental Philosophy',
    motto: 'Ambulando solvitur (It is solved by walking)',
    quote: 'You say that you are a thinking thing. But what is this thing that thinks? For you cannot know yourself without your physical senses.',
    quoteSource: 'Disquisitio Metaphysica (1644)',
    magnumOpus: 'Syntagma Philosophicum (1658)',
    summary: 'The humanist astronomer and Catholic priest who resurrected Epicurean atomism, reconciling it with Christian theology to build a formidable empiricist science of nature.',
    coreTheses: [
      'All physical phenomena in the cosmos are caused by microscopic, indivisible atoms moving through genuine void space.',
      'Human knowledge is strictly limited to appearances gathered through sensory organs; essences of things remain hidden.',
      'Epicurean tranquility and moderate pleasure are compatible with divine providence and the immortality of the soul.'
    ],
    historicalContext: 'Provost of Digne and Professor of Mathematics at the Collège Royal; the primary intellectual antagonist to Descartes.',
    keyConcepts: ['Rehabilitated Atomism', 'Void Space', 'Sensory Empiricism', 'Constructive Skepticism'],
    scores: {
      epistemology: -0.9,
      metaphysics: -0.7,
      theology: 0.4,
      ethics: -0.5,
      politics: 0.2,
      methodology: -0.8,
      metaphilosophy: -0.8
    },
    domainPriorities: {
      "metaphysics": 5,
      "methodology": 5,
      "epistemology": 5,
      "metaphilosophy": 4,
      "theology": 3,
      "ethics": 3,
      "politics": 1
},
    metaphilosophicalFocus: "Rehabilitating Epicurean physical atomism and sensory fallibilism as an empirical natural science subordinate to Christian faith.",
    signatureTraits: ['epicurean-atomism', 'anti-cartesian', 'phenomenal-skepticism'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Addressed Descartes mockingly as "O Soul!" while Descartes responded with "O Flesh!", debating whether thinking could exist separate from flesh.'
  },
  {
    id: 'sophie-de-grouchy',
    name: 'Sophie de Grouchy',
    dates: '1764–1822',
    century: '18th Century',
    nationality: 'French',
    school: 'Enlightenment & Reform',
    motto: 'Sympathy is the moral cradle of equality and republican liberty',
    quote: 'Sympathy is born of our physical sensibility; we suffer at the sight of another\'s pain because the imagination recalls our own sensations.',
    quoteSource: 'Letters on Sympathy (1798)',
    magnumOpus: 'Letters on Sympathy (1798)',
    summary: 'The brilliant Enlightenment philosopher and translator of Adam Smith who grounded morality, republican justice, and women\'s rights in the physiological development of sympathy.',
    coreTheses: [
      'Moral conscience is not a mysterious innate faculty, but a natural development of sensory sympathy guided by reflective reason.',
      'Social inequality and corrupt political institutions deform natural human sympathy into callous vanity and cruelty.',
      'Universal public education and economic equality are essential to cultivate the moral sentiments necessary for a free republic.'
    ],
    historicalContext: 'Marquise de Condorcet; led one of the most intellectually influential salons of the French Revolution and published her Letters on Sympathy alongside her translation of Adam Smith.',
    keyConcepts: ['Physiological Sympathy', 'Republican Education', 'Moral Development', 'Enlightenment Egalitarianism'],
    scores: {
      epistemology: -0.8,
      metaphysics: -0.6,
      theology: -0.7,
      ethics: -0.3,
      politics: -0.9,
      methodology: -0.4,
      metaphilosophy: -0.75
    },
    domainPriorities: {
      "politics": 5,
      "ethics": 5,
      "metaphilosophy": 4,
      "epistemology": 3,
      "theology": 2,
      "metaphysics": 2,
      "methodology": 2
},
    metaphilosophicalFocus: "Physiological and moral development of sympathy as the engine of republican equality, criminal justice reform, and universal education.",
    signatureTraits: ['letters-on-sympathy', 'republican-education', 'sensibility-ethics'],
    archRivalId: 'edmund-burke',
    archRivalReason: 'Condemned Burke\'s sentimental reverence for feudal aristocracy as a perversion of sympathy that wept for queens while ignoring millions of starving peasants.'
  },
  {
    id: 'thomas-hobbes',
    name: 'Thomas Hobbes',
    dates: '1588–1679',
    century: '17th Century',
    nationality: 'English',
    school: 'Utilitarianism & Naturalism',
    motto: 'Auctoritas non veritas facit legem (Authority, not truth, makes law)',
    quote: 'The life of man, solitary, poor, nasty, brutish, and short... In the state of nature, there is a war of every man against every man.',
    quoteSource: 'Leviathan (1651)',
    magnumOpus: 'Leviathan (1651)',
    summary: 'The trenchant materialist and political realist who argued that to escape the terrifying violent anarchy of the state of nature, citizens must surrender power to an absolute sovereign.',
    coreTheses: [
      'The universe contains only physical bodies in motion; thoughts, emotions, and consciousness are merely mechanical brain motions.',
      'Without an overarching coercive power, human life descends inevitably into a perpetual war of all against all.',
      'Sovereignty is absolute, indivisible, and created by a social covenant to preserve peaceful survival.'
    ],
    historicalContext: 'Witness to the horrors of the English Civil War; founded modern social contract theory while scandalizing contemporaries with perceived atheism.',
    keyConcepts: ['The Leviathan', 'State of Nature', 'Mechanical Materialism', 'Social Contract for Security'],
    scores: {
      epistemology: -0.7,
      metaphysics: -1.0,
      theology: -0.7,
      ethics: -0.8,
      politics: 1.0,
      methodology: 0.6,
      metaphilosophy: 0.5
    },
    domainPriorities: {
      "politics": 5,
      "metaphysics": 5,
      "ethics": 4,
      "metaphilosophy": 4,
      "epistemology": 3,
      "theology": 3,
      "methodology": 3
},
    metaphilosophicalFocus: "Philosophy as the mechanical science of bodily motion and civic peace; rescuing humanity from the brutal anarchy of the state of nature.",
    signatureTraits: ['state-of-nature', 'absolute-sovereign', 'strict-materialism'],
    archRivalId: 'john-locke',
    archRivalReason: 'Locke insisted individuals retain inalienable natural rights and the right to rebel, whereas Hobbes argued rebellion instantly plunges humanity back into anarchy.'
  },
  {
    id: 'david-hume',
    name: 'David Hume',
    dates: '1711–1776',
    century: '18th Century',
    nationality: 'Scottish',
    school: 'British Empiricism',
    motto: 'Reason is, and ought only to be the slave of the passions',
    quote: 'A wise man proportions his belief to the evidence... If we take in our hand any volume; of divinity or school metaphysics, let us ask, Does it contain any abstract reasoning concerning quantity or number? No. Does it contain any experimental reasoning concerning matter of fact and existence? No. Commit it then to the flames: for it can contain nothing but sophistry and illusion.',
    quoteSource: 'An Enquiry Concerning Human Understanding (1748)',
    magnumOpus: 'A Treatise of Human Nature (1739–40)',
    summary: 'The titan of the Scottish Enlightenment whose radical empiricism dismantled dogmatic claims about causation, personal identity, and theological miracles.',
    coreTheses: [
      'All ideas are copies of impressions; whatever cannot be traced to sensory impressions is intellectual illusion.',
      'Causality is not an observable necessity in nature, but a habitual psychological expectation born of constant conjunction.',
      'The "self" is not a unified soul, but a flux of fleeting perceptions; morality is grounded in sympathy and emotion, not reason.'
    ],
    historicalContext: 'Librarian to the Faculty of Advocates in Edinburgh; his skepticism famously awoke Immanuel Kant from his dogmatic slumber.',
    keyConcepts: ['Problem of Induction', 'Critique of Causality', 'Bundle Theory of Self', 'Is-Ought Problem', 'Slave of Passions'],
    scores: {
      epistemology: -1.0,
      metaphysics: -0.7,
      theology: -0.95,
      ethics: -0.7,
      politics: -0.3,
      methodology: -0.9,
      metaphilosophy: -0.95
    },
    domainPriorities: {
      "epistemology": 5,
      "methodology": 5,
      "metaphilosophy": 5,
      "metaphysics": 4,
      "theology": 4,
      "ethics": 4,
      "politics": 2
},
    metaphilosophicalFocus: "Critical boundary-setting: introducing the experimental method of reasoning into moral subjects, exposing limits of knowledge, and committing dogmatic metaphysics to the flames.",
    signatureTraits: ['radical-empiricism', 'problem-of-causality', 'passions-over-reason'],
    archRivalId: 'thomas-reid',
    archRivalReason: 'Reid founded Common Sense realism specifically to refute Hume\'s skeptical dissolution of causality, perception, and the self.'
  },
  {
    id: 'blaise-pascal',
    name: 'Blaise Pascal',
    dates: '1623–1662',
    century: '17th Century',
    nationality: 'French',
    school: 'Jansenist & Christian Rationalism',
    motto: 'Le cœur a ses raisons que la raison ne connaît point (The heart has reasons reason knows not)',
    quote: 'The heart has its reasons of which reason knows nothing: we know this in countless ways... We know the truth, not only by reason, but also by the heart.',
    quoteSource: 'Pensées (1670)',
    magnumOpus: 'Pensées (1670)',
    summary: 'The mathematical prodigy and existential thinker who exposed the limits of human reason, the tragedy of mortality, and the pragmatic wager on divine grace.',
    coreTheses: [
      'Human beings are suspended between the infinite and the void—a thinking reed, at once wretched and noble.',
      'Cold geometrical reason cannot prove God\'s existence; authentic faith demands the intuitive insight of the heart.',
      'Pascal\'s Wager: Given infinite gain versus finite stake, betting on God\'s existence is the only rational choice.'
    ],
    historicalContext: 'Invented the mechanical calculator (Pascaline) and probability theory before a profound mystical experience drew him into the Jansenist community of Port-Royal.',
    keyConcepts: ['Pascal\'s Wager', 'Thinking Reed', 'Reasons of the Heart', 'Limits of Geometry'],
    scores: {
      epistemology: 0.2,
      metaphysics: 0.5,
      theology: 1.0,
      ethics: 0.6,
      politics: 0.7,
      methodology: 0.1,
      metaphilosophy: -0.7
    },
    domainPriorities: {
      "theology": 5,
      "epistemology": 5,
      "metaphilosophy": 5,
      "ethics": 4,
      "methodology": 4,
      "metaphysics": 3,
      "politics": 2
},
    metaphilosophicalFocus: "Exposing the tragic limits and vanity of human geometric reason; vindicating the reasons of the intuitive heart and the existential wager.",
    signatureTraits: ['pascals-wager', 'thinking-reed', 'reasons-of-the-heart'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Critiqued Descartes as "useless and uncertain," charging that Descartes merely used God to give the mechanical universe a flick of the finger to set it in motion.'
  },
  {
    id: 'francis-hutcheson',
    name: 'Francis Hutcheson',
    dates: '1694–1746',
    century: '18th Century',
    nationality: 'Irish-Scottish',
    school: 'Enlightenment & Reform',
    motto: 'That action is best, which procures the greatest happiness for the greatest numbers',
    quote: 'We are all conscious of a moral sense, by which we perceive virtue or vice in ourselves and others, antecedent to all prospect of interest.',
    quoteSource: 'An Inquiry into the Original of Our Ideas of Beauty and Virtue (1725)',
    magnumOpus: 'Inquiry into the Original of Our Ideas of Beauty and Virtue (1725)',
    summary: 'The founding father of the Scottish Enlightenment who introduced the concept of an innate "moral sense" oriented toward disinterested benevolence and universal happiness.',
    coreTheses: [
      'Human beings possess an internal "moral sense" that immediately approves of benevolent actions without calculating selfish reward.',
      'Virtue consists in disinterested benevolence aimed at maximizing happiness for all sentient creatures.',
      'The earliest formulation of the utilitarian principle: that action is best which procures the greatest happiness for the greatest numbers.'
    ],
    historicalContext: 'Professor of Moral Philosophy at Glasgow University; teacher and mentor of Adam Smith.',
    keyConcepts: ['The Moral Sense', 'Disinterested Benevolence', 'Moral Aesthetic', 'Greatest Happiness Principle'],
    scores: {
      epistemology: -0.6,
      metaphysics: -0.1,
      theology: 0.3,
      ethics: -0.2,
      politics: -0.6,
      methodology: -0.4,
      metaphilosophy: -0.75
    },
    domainPriorities: {
      "ethics": 5,
      "epistemology": 4,
      "politics": 4,
      "metaphilosophy": 4,
      "theology": 3,
      "metaphysics": 2,
      "methodology": 2
},
    metaphilosophicalFocus: "Moral sense theory: establishing that virtue consists in disinterested benevolence and emotional moral beauty innate to human nature.",
    signatureTraits: ['innate-moral-sense', 'disinterested-benevolence', 'moral-beauty'],
    archRivalId: 'thomas-hobbes',
    archRivalReason: 'Dedicated his entire philosophical career to proving that human nature has a genuine innate capacity for unselfish kindness, refuting Hobbes\'s universal egoism.'
  },
  {
    id: 'immanuel-kant',
    name: 'Immanuel Kant',
    dates: '1724–1804',
    century: '18th Century',
    nationality: 'German (Prussian)',
    school: 'Continental Rationalism',
    motto: 'Sapere aude! (Dare to know!)',
    quote: 'Two things fill the mind with ever new and increasing admiration and awe: the starry heavens above me and the moral law within me.',
    quoteSource: 'Critique of Practical Reason (1788)',
    magnumOpus: 'Critique of Pure Reason (1781)',
    summary: 'The architect of critical philosophy whose "Copernican Revolution" reconciled rationalism and empiricism by showing how the human mind actively synthesizes experience.',
    coreTheses: [
      'We cannot know things-in-themselves (noumena), only phenomena structured by space, time, and the pure categories of the understanding.',
      'The Categorical Imperative: Act only according to that maxim whereby you can at the same time will that it should become a universal law.',
      'Human beings must never be treated merely as a means to an end, but always as ends in themselves possessing intrinsic dignity.'
    ],
    historicalContext: 'Lifelong resident of Königsberg; synthesized Enlightenment philosophy and laid the groundwork for German Idealism and modern deontology.',
    keyConcepts: ['Transcendental Idealism', 'Categorical Imperative', 'Synthetic A Priori', 'Kingdom of Ends', 'Noumena vs Phenomena'],
    scores: {
      epistemology: 0.5,
      metaphysics: 0.4,
      theology: 0.2,
      ethics: 1.0,
      politics: -0.6,
      methodology: 0.5,
      metaphilosophy: -0.3
    },
    domainPriorities: {
      "epistemology": 5,
      "metaphysics": 5,
      "ethics": 5,
      "metaphilosophy": 5,
      "methodology": 4,
      "politics": 4,
      "theology": 3
},
    metaphilosophicalFocus: "The Critical tribunal: curbing dogmatic metaphysical excess, establishing the synthetic a priori limits of experience, and grounding autonomous moral duty.",
    signatureTraits: ['categorical-imperative', 'transcendental-synthesis', 'ends-in-themselves'],
    archRivalId: 'david-hume',
    archRivalReason: 'Accepted Hume\'s challenge to dogmatic metaphysics, but rescued causal necessity and mathematics by proving them synthetic a priori structures of the mind.'
  },
  {
    id: 'gottfried-wilhelm-leibniz',
    name: 'Gottfried Wilhelm Leibniz',
    dates: '1646–1716',
    century: '17th Century',
    nationality: 'German',
    school: 'Continental Rationalism',
    motto: 'The best of all possible worlds',
    quote: 'Music is the hidden arithmetic of the soul, toiling in numbers without knowing that it reckons.',
    quoteSource: 'Letters to Christian Goldbach (1712)',
    magnumOpus: 'Monadology (1714)',
    summary: 'The polymathic genius who discovered calculus independently, developed binary arithmetic, and posited a universe of windowless spiritual monads synchronized by divine harmony.',
    coreTheses: [
      'Reality consists of infinite indivisible, immaterial centers of perception called "Monads," having no physical windows into each other.',
      'Pre-established Harmony: God synchronized mind and physical movements at creation, producing seamless cosmic order without direct interaction.',
      'Principle of Sufficient Reason: Nothing happens without a reason why it is so and not otherwise; hence this is the best of all possible worlds.'
    ],
    historicalContext: 'Diplomat and court counselor to the House of Hanover; engaged with the greatest intellects across Europe and envisioned universal formal logic.',
    keyConcepts: ['Monadology', 'Pre-established Harmony', 'Principle of Sufficient Reason', 'Best of All Possible Worlds'],
    scores: {
      epistemology: 0.9,
      metaphysics: 1.0,
      theology: 0.6,
      ethics: 0.4,
      politics: 0.3,
      methodology: 0.9,
      metaphilosophy: 0.95
    },
    domainPriorities: {
      "metaphysics": 5,
      "epistemology": 5,
      "methodology": 5,
      "theology": 5,
      "metaphilosophy": 5,
      "ethics": 3,
      "politics": 2
},
    metaphilosophicalFocus: "Grand architectural synthesis of reality: monads, pre-established harmony, universal calculus, and the vindication of divine optimism.",
    signatureTraits: ['monadology', 'preestablished-harmony', 'best-possible-world'],
    archRivalId: 'voltaire',
    archRivalReason: 'Voltaire mercilessly satirized Leibniz\'s "best of all possible worlds" doctrine in Candide through the tragicomic Pangloss.'
  },
  {
    id: 'john-locke',
    name: 'John Locke',
    dates: '1632–1704',
    century: '17th Century',
    nationality: 'English',
    school: 'British Empiricism',
    motto: 'No man\'s knowledge here can go beyond his experience',
    quote: 'Let us then suppose the mind to be, as we say, white paper, void of all characters, without any ideas: How comes it to be furnished? To this I answer, in one word, from EXPERIENCE.',
    quoteSource: 'An Essay Concerning Human Understanding (1689)',
    magnumOpus: 'Two Treatises of Government (1689)',
    summary: 'The intellectual architect of modern constitutional democracy and empirical psychology who proclaimed the tabula rasa and inalienable rights to life, liberty, and property.',
    coreTheses: [
      'The mind is born a blank slate (tabula rasa); all ideas enter via sensation or reflection on internal mental operations.',
      'Legitimate political government is founded on the consent of the governed to protect natural rights to life, liberty, and estate.',
      'If a ruler violates the constitutional trust, citizens have the moral right and duty of revolution.'
    ],
    historicalContext: 'Physician and political advisor to Lord Shaftesbury; his writings inspired the Glorious Revolution, English Bill of Rights, and American Declaration of Independence.',
    keyConcepts: ['Tabula Rasa', 'Natural Rights', 'Social Contract & Consent', 'Primary vs Secondary Qualities', 'Right of Revolution'],
    scores: {
      epistemology: -0.9,
      metaphysics: -0.4,
      theology: 0.2,
      ethics: 0.3,
      politics: -0.8,
      methodology: -0.6,
      metaphilosophy: -0.75
    },
    domainPriorities: {
      "epistemology": 5,
      "politics": 5,
      "metaphilosophy": 5,
      "theology": 3,
      "ethics": 3,
      "methodology": 3,
      "metaphysics": 2
},
    metaphilosophicalFocus: "Serving as an under-labourer clearing ground for natural science; setting experiential bounds to human knowledge and articulating natural rights.",
    signatureTraits: ['tabula-rasa', 'natural-rights', 'consent-of-governed'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Dedicated the entire first book of his Essay to obliterating Descartes\'s claim that human beings are born with innate ideas.'
  },
  {
    id: 'nicolas-malebranche',
    name: 'Nicolas Malebranche',
    dates: '1638–1715',
    century: '17th Century',
    nationality: 'French',
    school: 'Continental Rationalism',
    motto: 'Vision in God (Vision en Dieu)',
    quote: 'There is only one true cause because there is only one true God: it is not the ball that moves another ball, but God who acts on the occasion of their impact.',
    quoteSource: 'The Search after Truth (1674–75)',
    magnumOpus: 'The Search after Truth (1674–75)',
    summary: 'The Oratorian priest and Cartesian metaphysician who solved the mind-body problem through Occasionalism, arguing that God is the sole true causal agent in the universe.',
    coreTheses: [
      'Occasionalism: Created things possess no active causal efficacy; physical collisions are merely the "occasions" for God to produce motion according to general laws.',
      'Vision in God: The human mind does not perceive external material objects directly, but sees ideas existing eternally in the divine intellect.',
      'God acts by simple, general, universal laws rather than arbitrary particular volitions.'
    ],
    historicalContext: 'Leader of the French Oratory of Jesus; combined Cartesian rational mechanics with Augustinian theological illumination.',
    keyConcepts: ['Occasionalism', 'Vision in God', 'General Laws of Providence', 'Sole Causal Efficacy of God'],
    scores: {
      epistemology: 0.8,
      metaphysics: 0.8,
      theology: 1.0,
      ethics: 0.5,
      politics: 0.5,
      methodology: 0.8,
      metaphilosophy: 0.9
    },
    domainPriorities: {
      "metaphysics": 5,
      "theology": 5,
      "epistemology": 4,
      "metaphilosophy": 5,
      "methodology": 3,
      "ethics": 3,
      "politics": 1
},
    metaphilosophicalFocus: "Theocentric Cartesian rationalism: demonstrating occasionalism (God as sole causal power) and the vision of eternal ideas in the divine mind.",
    signatureTraits: ['occasionalism', 'vision-in-god', 'divine-causation'],
    archRivalId: 'antoine-arnauld',
    archRivalReason: 'Engaged in a decades-long bitter war with Arnauld over whether ideas exist inside the human mind or only in God.'
  },
  {
    id: 'baruch-spinoza',
    name: 'Baruch Spinoza',
    dates: '1632–1677',
    century: '17th Century',
    nationality: 'Dutch (Portuguese-Jewish)',
    school: 'Continental Rationalism',
    motto: 'Deus sive Natura (God or Nature)',
    quote: 'I have made a ceaseless effort not to ridicule, not to bewail, not to scorn human actions, but to understand them.',
    quoteSource: 'Tractatus Politicus (1677)',
    magnumOpus: 'Ethics, Demonstrated in Geometrical Order (1677)',
    summary: 'The excommunicated lens-grinder whose fearless substance monism identified God and Nature as one infinite, eternal reality governed by unyielding geometric necessity.',
    coreTheses: [
      'Substance Monism: There exists only one infinite substance, which is simultaneously God and Nature (Deus sive Natura).',
      'Mind and body are not two distinct substances, but two complementary attributes of the single underlying divine reality.',
      'Human freedom consists not in uncaused free will, but in the intellectual love of God—rationally comprehending the necessary order of reality.'
    ],
    historicalContext: 'Excommunicated from the Amsterdam Sephardic Jewish community for radical heresy; chose poverty as a lens-grinder over academic censorship.',
    keyConcepts: ['Deus Sive Natura', 'Substance Monism', 'Intellectual Love of God', 'Geometrical Method', 'Conatus'],
    scores: {
      epistemology: 1.0,
      metaphysics: 0.2,
      theology: -1.0,
      ethics: 0.1,
      politics: -0.9,
      methodology: 1.0,
      metaphilosophy: 1
    },
    domainPriorities: {
      "metaphysics": 5,
      "epistemology": 5,
      "theology": 5,
      "metaphilosophy": 5,
      "methodology": 4,
      "ethics": 4,
      "politics": 3
},
    metaphilosophicalFocus: "Rigorous geometrical deduction of infinite substance (Deus sive Natura); liberating human understanding from superstition into the intellectual love of God.",
    signatureTraits: ['substance-monism', 'deus-sive-natura', 'geometrical-ethics'],
    archRivalId: 'samuel-clarke',
    archRivalReason: 'Clarke viewed Spinoza\'s pantheistic fatalism as an existential threat to religion that abolished free will, moral accountability, and divine personality.'
  },
  {
    id: 'margaret-cavendish',
    name: 'Margaret Cavendish',
    dates: '1623–1673',
    century: '17th Century',
    nationality: 'English',
    school: 'Vitalist & Monist Metaphysics',
    motto: 'Nature is an infinite, self-moving, and self-knowing living plenum',
    quote: 'There is no part of Nature that has not life and sense; for Nature is infinite, and so is life and knowledge in her.',
    quoteSource: 'Observations upon Experimental Philosophy (1666)',
    magnumOpus: 'Observations upon Experimental Philosophy & The Blazing World (1666)',
    summary: 'The Duchess of Newcastle who challenged both Cartesian dualism and mechanistic atomism, proposing that all matter is infused with organic vitality, self-motion, and perception.',
    coreTheses: [
      'Nature is a continuous material plenum entirely composed of rational, sensitive, and inanimate matter acting in unified harmony.',
      'Rejected atomism and vacuums: nature has no empty voids and no dead, inert particles driven merely by mechanical shoves.',
      'Critiqued microscope experimentalism as deceptive artifice that distorted rather than revealed natural wholeness.'
    ],
    historicalContext: 'First woman invited to attend a meeting of the Royal Society of London; authored natural philosophy treatises and early science fiction.',
    keyConcepts: ['Vital Materialism', 'Self-Moving Nature', 'Critique of Microscopy', 'Panpsychist Naturalism'],
    scores: {
      epistemology: -0.5,
      metaphysics: -0.6,
      theology: -0.4,
      ethics: 0.2,
      politics: 0.8,
      methodology: -0.7,
      metaphilosophy: 0.55
    },
    domainPriorities: {
      "metaphysics": 5,
      "methodology": 4,
      "metaphilosophy": 5,
      "politics": 3,
      "epistemology": 3,
      "theology": 2,
      "ethics": 2
},
    metaphilosophicalFocus: "Vitalist materialism: conceiving all nature as an animate, infinite, self-moving plenum; vehement rejection of artificial microscope experimentalism.",
    signatureTraits: ['vital-materialism', 'organic-plenum', 'self-moving-nature'],
    archRivalId: 'robert-boyle',
    archRivalReason: 'Satirized Boyle and the Royal Society experimentalists for peering through glass lenses at fleas instead of comprehending the living macrocosm.'
  },
  {
    id: 'emilie-du-chatelet',
    name: 'Émilie du Châtelet',
    dates: '1706–1749',
    century: '18th Century',
    nationality: 'French',
    school: 'Enlightenment & Reform',
    motto: 'Judge me for my own merits, not as an appendage of another',
    quote: 'Let us be certain of what we want to be; let us choose for ourselves our path in life, and let us try to strew that path with flowers.',
    quoteSource: 'Discourse on Happiness (1746)',
    magnumOpus: 'Institutions de Physique (Foundations of Physics, 1740)',
    summary: 'The brilliant mathematical physicist and philosopher who unified Newtonian empirical mechanics with Leibnizian metaphysics and demonstrated the conservation of kinetic energy (mv²).',
    coreTheses: [
      'Empirical physics requires a metaphysical foundation: unified Newtonian gravitational observation with Leibniz’s Principle of Sufficient Reason.',
      'Correctly verified the formula for living force (vis viva / kinetic energy) as proportional to velocity squared (mv²), correcting Newton and Descartes.',
      'Passionate advocate for women’s equal education and intellectual autonomy in scientific inquiry.'
    ],
    historicalContext: 'Translated Newton’s Principia into French with definitive commentary (still the standard translation today); collaborated with Voltaire at Cirey.',
    keyConcepts: ['Vis Viva (Kinetic Energy)', 'Synthesis of Newton & Leibniz', 'Sufficient Reason in Physics', 'Female Intellectual Autonomy'],
    scores: {
      epistemology: 0.6,
      metaphysics: 0.6,
      theology: -0.4,
      ethics: -0.4,
      politics: -0.7,
      methodology: 0.7,
      metaphilosophy: 0.65
    },
    domainPriorities: {
      "methodology": 5,
      "metaphysics": 5,
      "epistemology": 4,
      "metaphilosophy": 5,
      "politics": 3,
      "ethics": 3,
      "theology": 2
},
    metaphilosophicalFocus: "Synthesizing Newtonian experimental mechanics with Leibnizian metaphysics; proving kinetic energy conservation (mv²) and claiming female scientific autonomy.",
    signatureTraits: ['vis-viva-energy', 'newton-leibniz-synthesis', 'scientific-enlightenment'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Refuted Descartes\'s conservation of momentum (mv) by proving through experiment that kinetic energy is proportional to velocity squared (mv²).'
  },
  {
    id: 'thomas-reid',
    name: 'Thomas Reid',
    dates: '1710–1796',
    century: '18th Century',
    nationality: 'Scottish',
    school: 'Common Sense Realism',
    motto: 'In common sense we find the universal constitution of human nature',
    quote: 'I despise philosophy, and renounce its guidance, let my soul dwell with Common Sense... If there be certain principles which the constitution of our nature leads us to believe, we have no choice but to rely on them.',
    quoteSource: 'An Inquiry into the Human Mind on the Principles of Common Sense (1764)',
    magnumOpus: 'Inquiry into the Human Mind on the Principles of Common Sense (1764)',
    summary: 'The founder of Scottish Common Sense realism who defended direct realism against Hume’s skepticism, showing that basic beliefs about the external world are constitutive of human sanity.',
    coreTheses: [
      'Direct Realism: We perceive external objects directly, not intermediate subjective "ideas" or mental images as Locke and Hume claimed.',
      'The "Way of Ideas" leads inexorably to absurd skepticism; common sense principles are built into the constitutional architecture of the mind.',
      'Moral agency requires genuine libertarian active power, which humans experience directly in self-governance.'
    ],
    historicalContext: 'Successor to Adam Smith as Professor of Moral Philosophy at Glasgow University; founded the Scottish School of Common Sense.',
    keyConcepts: ['Direct Realism', 'Common Sense Principles', 'Active Libertarian Power', 'Rejection of the Way of Ideas'],
    scores: {
      epistemology: -0.6,
      metaphysics: 0.4,
      theology: 0.7,
      ethics: 0.9,
      politics: -0.3,
      methodology: -0.8,
      metaphilosophy: -0.75
    },
    domainPriorities: {
      "epistemology": 5,
      "metaphilosophy": 5,
      "metaphysics": 4,
      "ethics": 4,
      "methodology": 4,
      "theology": 3,
      "politics": 2
},
    metaphilosophicalFocus: "Common Sense realism: establishing that the universal constitutional principles of human nature provide an infallible bulwark against skeptical paralysis.",
    signatureTraits: ['direct-realism', 'common-sense', 'anti-skepticism'],
    archRivalId: 'david-hume',
    archRivalReason: 'Sent his draft manuscript to Hume, declaring that Hume\'s brilliant skeptical conclusions proved that the premise of intermediate "ideas" had to be completely false.'
  },
  {
    id: 'jean-jacques-rousseau',
    name: 'Jean-Jacques Rousseau',
    dates: '1712–1778',
    century: '18th Century',
    nationality: 'Genevan (Swiss-French)',
    school: 'Enlightenment & Reform',
    motto: 'Man is born free, and everywhere he is in chains',
    quote: 'The first man who, having fenced in a piece of land, said "This is mine," and found people naive enough to believe him, was the real founder of civil society.',
    quoteSource: 'Discourse on the Origin of Inequality (1755)',
    magnumOpus: 'The Social Contract (1762)',
    summary: 'The visionary romantic and democratic theorist who argued that civilization corrupts natural human innocence, calling for legitimate sovereignty grounded in the General Will.',
    coreTheses: [
      'In the state of nature, humans were innocent, solitary, and motivated by self-preservation tempered by natural pity (pitié).',
      'Private property and civil society created artificial inequality, vanity (amour-propre), and enslavement.',
      'True political liberty is achieved by submitting totally to the "General Will," where each citizen remains as free as before.'
    ],
    historicalContext: 'Citizen of Geneva whose radical democratic writings inspired the French Revolution and ignited the Romantic movement.',
    keyConcepts: ['General Will', 'Noble Savage / Natural State', 'Pitié vs Amour-Propre', 'Popular Sovereignty'],
    scores: {
      epistemology: 0.1,
      metaphysics: 0.5,
      theology: 0.6,
      ethics: 0.8,
      politics: -1.0,
      methodology: 0.2,
      metaphilosophy: -0.85
    },
    domainPriorities: {
      "politics": 5,
      "ethics": 5,
      "metaphilosophy": 5,
      "theology": 3,
      "epistemology": 2,
      "methodology": 1,
      "metaphysics": 1
},
    metaphilosophicalFocus: "Critique of civil society, luxury, and inequality; reclaiming authentic human pity and establishing republican liberty in the General Will; disengaged from physical science or ontology.",
    signatureTraits: ['general-will', 'critique-of-inequality', 'natural-pity'],
    archRivalId: 'voltaire',
    archRivalReason: 'Voltaire mocked Rousseau\'s Discourse on Inequality, saying reading it made one want to walk on all fours like a beast.'
  },
  {
    id: 'voltaire',
    name: 'Voltaire',
    nativeSpelling: 'François-Marie Arouet',
    dates: '1694–1778',
    century: '18th Century',
    nationality: 'French',
    school: 'Enlightenment & Reform',
    motto: 'Écrasez l\'infâme! (Crush the infamous thing!)',
    quote: 'Think for yourselves and let others enjoy the privilege to do so too. Those who can make you believe absurdities can make you commit atrocities.',
    quoteSource: 'Treatise on Tolerance (1763) & Questions on Miracles (1765)',
    magnumOpus: 'Candide (1759) & Treatise on Tolerance (1763)',
    summary: 'The sharpest pen of the French Enlightenment who waged a relentless crusade against religious intolerance, fanaticism, and metaphysical pretension using wit and reason.',
    coreTheses: [
      'Religious tolerance and freedom of conscience and speech are the foundation of any civilized society.',
      'Deism: Nature reveals a supreme clockmaker, but theological dogmas, miracles, and superstition are poisonous delusions.',
      'Skeptical about sweeping metaphysical optimism: rather than rationalizing evil, we must actively "cultivate our garden."'
    ],
    historicalContext: 'Imprisoned in the Bastille, exiled to England where he fell in love with Newton and Locke, and championed the victim of religious torture Jean Calas.',
    keyConcepts: ['Religious Tolerance', 'Deism', 'Anti-Clericalism', 'Cultivating One\'s Garden', 'Freedom of Speech'],
    scores: {
      epistemology: -0.8,
      metaphysics: -0.5,
      theology: -0.8,
      ethics: -0.3,
      politics: -0.7,
      methodology: -0.6,
      metaphilosophy: -0.85
    },
    domainPriorities: {
      "politics": 5,
      "metaphilosophy": 5,
      "theology": 5,
      "ethics": 4,
      "epistemology": 4,
      "methodology": 3,
      "metaphysics": 2
},
    metaphilosophicalFocus: "Public humanitarian crusade: religious tolerance, free expression, anti-fanaticism, and satirical debunking of grand metaphysical optimism (\"cultivate our garden\").",
    signatureTraits: ['free-speech-crusade', 'anti-fanaticism', 'cultivate-our-garden'],
    archRivalId: 'gottfried-wilhelm-leibniz',
    archRivalReason: 'Immortalized Leibniz as Dr. Pangloss in Candide, mocking the Panglossian claim that the Lisbon earthquake was part of the "best of all possible worlds."'
  },
  {
    id: 'mary-wollstonecraft',
    name: 'Mary Wollstonecraft',
    dates: '1759–1797',
    century: '18th Century',
    nationality: 'English',
    school: 'Enlightenment & Reform',
    motto: 'I do not wish women to have power over men; but over themselves',
    quote: 'If woman be not prepared by education to become the companion of man, she will stop the progress of knowledge and virtue; for truth must be common to all.',
    quoteSource: 'A Vindication of the Rights of Woman (1792)',
    magnumOpus: 'A Vindication of the Rights of Woman (1792)',
    summary: 'The mother of modern feminist political philosophy who argued that reason and moral virtue know no gender, calling for universal co-education and civil rights.',
    coreTheses: [
      'If reason is the foundation of virtue and immortality, then women, possessing reason equally with men, must possess equal moral and civil standing.',
      'The perceived frivolity and weakness of women are the artificial products of systemic educational deprivation and patriarchal socialization.',
      'True marriage and republican virtue require an equal partnership of rational, independent minds rather than sentimental subjugation.'
    ],
    historicalContext: 'Radical essayist and educator during the French Revolution; mother of Mary Shelley (author of Frankenstein).',
    keyConcepts: ['Equal Rationality of Sexes', 'Universal Co-Education', 'Critique of Patriarchal Socialization', 'Moral Autonomy'],
    scores: {
      epistemology: -0.2,
      metaphysics: 0.1,
      theology: 0.5,
      ethics: 0.9,
      politics: -1.0,
      methodology: -0.3,
      metaphilosophy: -0.6
    },
    domainPriorities: {
      "politics": 5,
      "ethics": 5,
      "metaphilosophy": 5,
      "epistemology": 2,
      "theology": 2,
      "metaphysics": 1,
      "methodology": 1
},
    metaphilosophicalFocus: "Radical egalitarian political vindication: universal co-education, equal moral reason between sexes, and human rights; completely unconcerned with physical science, ontology, or natural philosophy.",
    signatureTraits: ['rights-of-woman', 'universal-education', 'rational-equality'],
    archRivalId: 'jean-jacques-rousseau',
    archRivalReason: 'Fiercely attacked Rousseau\'s educational treatise Émile, in which he prescribed that women (represented by Sophie) should be educated merely to please men.'
  },
  {
    id: 'pierre-bayle',
    name: 'Pierre Bayle',
    dates: '1647–1706',
    century: '17th Century',
    nationality: 'French Huguenot',
    school: 'Enlightenment & Reform',
    motto: 'Conscience is inviolable, even when in error',
    quote: 'It is pure illusion to think that an opinion which passes down from century to century, from generation to generation, may not be entirely false.',
    quoteSource: 'Historical and Critical Dictionary (1697)',
    magnumOpus: 'Historical and Critical Dictionary (Dictionnaire Historique et Critique, 1697)',
    summary: 'The great philosophical skeptic and Huguenot exile whose massive Dictionary dismantled theological orthodoxies and proved that a society of moral atheists could flourish.',
    coreTheses: [
      'Historical and philosophical skepticism: Human reason is far more adept at discovering contradictions and errors than at proving ultimate truths.',
      'The "Ering Conscience": To force someone to act against their conscience, even an erroneous one, is a heinous moral sin.',
      'Separated morality from religious dogma by proving that moral conduct stems from social passions and education, not fear of divine damnation.'
    ],
    historicalContext: 'French Protestant refugee in Rotterdam whose Dictionary became the single most read book of the 18th-century Enlightenment.',
    keyConcepts: ['Historical Skepticism', 'Inviolability of Conscience', 'Virtuous Atheism', 'The Problem of Evil'],
    scores: {
      epistemology: -0.8,
      metaphysics: -0.4,
      theology: -0.8,
      ethics: -0.1,
      politics: -0.6,
      methodology: -0.7,
      metaphilosophy: -0.95
    },
    domainPriorities: {
      "epistemology": 5,
      "metaphilosophy": 5,
      "theology": 5,
      "ethics": 4,
      "politics": 3,
      "methodology": 3,
      "metaphysics": 2
},
    metaphilosophicalFocus: "Historical-critical skepticism: exposing the insoluble contradictions of all dogmatic systems, defending religious toleration, and proving virtuous atheism.",
    signatureTraits: ['historical-skepticism', 'virtuous-atheist', 'dictionary-of-critique'],
    archRivalId: 'gottfried-wilhelm-leibniz',
    archRivalReason: 'Bayle\'s relentless questions on why an all-powerful, good God permits rampant suffering forced Leibniz to compose his monumental Theodicy.'
  },
  {
    id: 'antoine-arnauld',
    name: 'Antoine Arnauld',
    dates: '1612–1694',
    century: '17th Century',
    nationality: 'French',
    school: 'Jansenist & Christian Rationalism',
    motto: 'Le Grand Arnauld: Clearness of thought, austerity of truth',
    quote: 'To think is to have ideas; and ideas are not external entities floating in God, but the very modifications of our own intellect.',
    quoteSource: 'On True and False Ideas (1683)',
    magnumOpus: 'Port-Royal Logic (1662) & On True and False Ideas (1683)',
    summary: 'Known as "Le Grand Arnauld," the formidable theologian and Cartesian logician of Port-Royal who defended the reality of direct mental perception against Malebranche.',
    coreTheses: [
      'Defended direct perception: Having an idea of an object is simply the mind\'s direct act of thinking about that object, not viewing an intermediary in God.',
      'Port-Royal Logic: Formulated the art of thinking based on clear definitions, axiomatic deduction, and rigorous syllogistic reasoning.',
      'Upholder of Jansenist Augustinian theology: human salvation requires efficacious divine grace, not mere natural moral effort.'
    ],
    historicalContext: 'Leader of the Jansenist movement at Port-Royal des Champs; corresponded with Descartes (author of the Fourth Objections) and Leibniz.',
    keyConcepts: ['Port-Royal Logic', 'Direct Intentionality of Ideas', 'Cartesian Defense', 'Augustinian Grace'],
    scores: {
      epistemology: 0.8,
      metaphysics: 0.6,
      theology: 0.9,
      ethics: 0.8,
      politics: 0.4,
      methodology: 0.8,
      metaphilosophy: 0.7
    },
    domainPriorities: {
      "theology": 5,
      "epistemology": 5,
      "methodology": 4,
      "metaphysics": 4,
      "metaphilosophy": 4,
      "ethics": 3,
      "politics": 1
},
    metaphilosophicalFocus: "Jansenist theological defense of divine grace; Port-Royal logic; rigorous Cartesian epistemology rejecting Occasionalist mediation of ideas.",
    signatureTraits: ['port-royal-logic', 'anti-occasionalism', 'jansenist-grace'],
    archRivalId: 'nicolas-malebranche',
    archRivalReason: 'Wrote "On True and False Ideas" to destroy Malebranche\'s "Vision in God," calling it a dangerous chimeric metaphysics that turned God into a gallery of paintings.'
  },
  {
    id: 'ralph-cudworth',
    name: 'Ralph Cudworth',
    dates: '1617–1688',
    century: '17th Century',
    nationality: 'English',
    school: 'Cambridge Platonism',
    motto: 'Morality is eternal, immutable, and prior to all will',
    quote: 'Things are what they are, not by will, but by nature. Even omnipotence itself cannot make that which is unjust to be just while it remains unjust.',
    quoteSource: 'A Treatise Concerning Eternal and Immutable Morality (1731)',
    magnumOpus: 'The True Intellectual System of the Universe (1678)',
    summary: 'The leading Cambridge Platonist who defended eternal moral realism and posited an immaterial "Plastic Nature" that executes divine design throughout physical reality.',
    coreTheses: [
      'Morality is eternal and immutable: ethical truth is not established by arbitrary divine command or human political sovereign convention, but by intrinsic nature.',
      'Plastic Nature: An immaterial, unconscious intermediary agent operating within the physical universe to organize life and teleology without God having to intervene directly by miracle.',
      'Refuted atheism by demonstrating that mind is ontologically prior to matter, not an accidental byproduct of dead atomic motion.'
    ],
    historicalContext: 'Master of Christ\'s College, Cambridge; central figure of the Cambridge Platonist movement seeking to reconcile Platonism with the new mechanical science.',
    keyConcepts: ['Eternal & Immutable Morality', 'Plastic Nature', 'Cambridge Platonism', 'Mind Prior to Matter'],
    scores: {
      epistemology: 0.7,
      metaphysics: 0.9,
      theology: 0.8,
      ethics: 1.0,
      politics: 0.2,
      methodology: 0.4,
      metaphilosophy: 0.85
    },
    domainPriorities: {
      "metaphysics": 5,
      "theology": 5,
      "ethics": 5,
      "metaphilosophy": 5,
      "epistemology": 4,
      "methodology": 2,
      "politics": 2
},
    metaphilosophicalFocus: "Defending the True Intellectual System of the Universe: Cambridge Platonism against atheistic atomism, plastic nature, and immutable morality.",
    signatureTraits: ['immutable-morality', 'plastic-nature', 'cambridge-platonism'],
    archRivalId: 'thomas-hobbes',
    archRivalReason: 'Wrote his massive True Intellectual System primarily to destroy Hobbes\'s nominalism and political voluntarism, which claimed justice is merely what the king decrees.'
  },
  {
    id: 'christian-wolff',
    name: 'Christian Wolff',
    dates: '1679–1754',
    century: '18th Century',
    nationality: 'German',
    school: 'Continental Rationalism',
    motto: 'Ad medullam pervenire (To reach the very marrow through systematic method)',
    quote: 'Philosophy is the science of all possible things, together with the manner and reason of their possibility.',
    quoteSource: 'Discursus Praeliminaris de Philosophia in Genere (1728)',
    magnumOpus: 'Philosophia Prima, sive Ontologia (1730)',
    summary: 'The great systematizer of the German Enlightenment who organized Leibnizian thought into an exhaustive axiomatic architecture of ontology, cosmology, and rational psychology.',
    coreTheses: [
      'Universal mathematical-demonstrative method must govern all philosophy: from logic and ontology to natural law and practical ethics.',
      'The Principle of Non-Contradiction is the fundamental root of all truth: whatever contains no contradiction is ontologically possible.',
      'Morality is the pursuit of perfection: humans are rationally obligated to perfect themselves and their fellow human beings.'
    ],
    historicalContext: 'Professor at Halle expelled under threat of the gallows by King Frederick William I for praising Chinese Confucian ethics, then triumphantly recalled by Frederick the Great.',
    keyConcepts: ['Systematic Rationalism', 'Ontology as First Philosophy', 'Ethical Perfectionism', 'Axiomatic Demonstration'],
    scores: {
      epistemology: 0.9,
      metaphysics: 0.7,
      theology: 0.3,
      ethics: 0.8,
      politics: 0.2,
      methodology: 1.0,
      metaphilosophy: 0.95
    },
    domainPriorities: {
      "metaphilosophy": 5,
      "metaphysics": 5,
      "methodology": 5,
      "epistemology": 4,
      "ethics": 4,
      "theology": 3,
      "politics": 2
},
    metaphilosophicalFocus: "Encyclopedic German rationalism: exhausting the complete structure of reality through strict mathematical and syllogistic deduction from first principles.",
    signatureTraits: ['axiomatic-system', 'leibniz-wolffian-school', 'ethical-perfection'],
    archRivalId: 'immanuel-kant',
    archRivalReason: 'Kant targeted the Leibniz-Wolffian dogmatic system as the primary example of metaphysics overstepping the limits of human experience.'
  },
  {
    id: 'anton-wilhelm-amo',
    name: 'Anton Wilhelm Amo',
    dates: 'c. 1703–c. 1759',
    century: '18th Century',
    nationality: 'Akan (Gold Coast / Ghana) & German',
    school: 'Continental Rationalism',
    motto: 'The soul is pure immaterial activity, immune to physical suffering',
    quote: 'Whatever feels or suffers belongs strictly to the living body; the mind, being purely active and immaterial, neither suffers nor feels passively.',
    quoteSource: 'On the Apatheia of the Human Mind (1734)',
    magnumOpus: 'Dissertatio de Apatheia Mentis Humanae (On the Impassivity of the Human Mind, 1734)',
    summary: 'The extraordinary African philosopher who taught at Halle and Jena, whose rigorous defense of the impassivity of the human mind critiqued Cartesian dualism and championed human dignity against slavery.',
    coreTheses: [
      'The Apatheia of Mind: Sensation and passivity belong strictly to the physical organic body; the immaterial human mind is purely active and intellectual, incapable of physical suffering.',
      'Critiqued Descartes: Showing that Cartesian dualism inconsistently attributed passive sensation to an immaterial substance that can only be active.',
      'Pioneered legal and natural rights arguments: Author of the lost treatise "On the Rights of Africans in Europe" defending the sovereignty and liberty of African people under Roman law.'
    ],
    historicalContext: 'Born near Axim (modern Ghana); brought to Germany as a child; earned doctorate in philosophy and lectured at the Universities of Halle and Jena before returning to Ghana.',
    keyConcepts: ['Apatheia of the Human Mind', 'Strict Mind-Body Division', 'Critique of Cartesian Sensation', 'Human Rights & Dignity'],
    scores: {
      epistemology: 0.6,
      metaphysics: 0.6,
      theology: 0.3,
      ethics: 0.7,
      politics: -0.9,
      methodology: 0.7,
      metaphilosophy: 0.4
    },
    domainPriorities: {
      "metaphysics": 5,
      "epistemology": 4,
      "methodology": 4,
      "metaphilosophy": 4,
      "ethics": 3,
      "politics": 3,
      "theology": 2
},
    metaphilosophicalFocus: "Rigorous scholastic Cartesian dualism: proving the absolute impassivity and incorporeal autonomy of the human mind against sensory materialism.",
    signatureTraits: ['apatheia-of-mind', 'rights-of-africans', 'anti-cartesian-passivity'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Demonstrated the logical contradiction in Descartes\'s claim that an immaterial thinking substance could "feel" pain or receive passive bodily sensory impressions.'
  },
  {
    id: 'mary-shepherd',
    name: 'Mary Shepherd',
    dates: '1777–1847',
    century: 'Transitional',
    nationality: 'Scottish',
    school: 'Common Sense Realism',
    motto: 'A cause is an essential relation of nature, perceived by understanding',
    quote: 'The idea of cause and effect is not an arbitrary habit of imagination, but a necessary truth: everything that begins to exist must have a cause in the nature of things.',
    quoteSource: 'An Essay upon the Relation of Cause and Effect (1824)',
    magnumOpus: 'An Essay upon the Relation of Cause and Effect (1824)',
    summary: 'The formidable Scottish metaphysician whose razor-sharp treatises provided the most comprehensive realist refutations of David Hume’s skeptical account of causality and George Berkeley’s idealism.',
    coreTheses: [
      'Causality is a necessary mathematical-rational relation: to begin to exist without a cause would mean non-being produced being, which is a logical contradiction.',
      'Refuted Hume: Causation is directly perceived through reasoned analysis of compound qualities when objects interact, not an irrational habit of mind.',
      'Refuted Berkeley: Sensory perceptions continually force us to deduce the necessary continuous existence of external, mind-independent physical objects.'
    ],
    historicalContext: 'Lady Mary Shepherd; admired by contemporaries like William Whewell and praised for providing the definitive philosophical answer to Hume\'s skepticism.',
    keyConcepts: ['Necessary Causal Relation', 'Refutation of Hume', 'Realism of External Objects', 'Reasoned Sensory Synthesis'],
    scores: {
      epistemology: 0.7,
      metaphysics: 0.6,
      theology: 0.6,
      ethics: 0.6,
      politics: -0.4,
      methodology: 0.6,
      metaphilosophy: 0.5
    },
    domainPriorities: {
      "epistemology": 5,
      "metaphysics": 5,
      "metaphilosophy": 5,
      "methodology": 4,
      "theology": 3,
      "ethics": 2,
      "politics": 1
},
    metaphilosophicalFocus: "Systematic refutation of Hume and Berkeley: establishing real causal necessity and the mind-independent physical universe through disciplined epistemological analysis.",
    signatureTraits: ['rational-causality', 'refutation-of-hume', 'realist-defense'],
    archRivalId: 'david-hume',
    archRivalReason: 'Dedicated her masterwork to tearing down Hume\'s claim that causality is mere psychological habit, proving causal necessity is a demonstrable rational law.'
  },
  {
    id: 'henry-more',
    name: 'Henry More',
    dates: '1614–1687',
    century: '17th Century',
    nationality: 'English',
    school: 'Cambridge Platonism',
    motto: 'Spirit is extended and omnipresent throughout space',
    quote: 'Space is not nothing; it is the divine amplitude and presence of the Infinite God, in which all created things live and move.',
    quoteSource: 'Enchiridion Metaphysicum (1671)',
    magnumOpus: 'Enchiridion Ethicum (1667) & Enchiridion Metaphysicum (1671)',
    summary: 'The renowned Cambridge Platonist who argued that spirit possesses spatial extension, identifying infinite space with the divine presence and influencing Newton’s cosmology.',
    coreTheses: [
      'Spirit is not non-spatial: spirits possess spatial extension and a unique fourth dimension of immaterial density called "spissitude."',
      'Infinite space is uncreated and incorporeal—an eternal attribute and sensorium of God in which physical creation is bathed.',
      'Rejected the mechanistic Cartesian view that animals are mere unfeeling automatons or that nature is devoid of spiritual vitality.'
    ],
    historicalContext: 'Fellow of Christ\'s College, Cambridge; mentor to Anne Conway and leading intellectual light in 17th-century English theology and Platonism.',
    keyConcepts: ['Extended Spirit', 'Spissitude', 'Divine Space (Sensorium)', 'Critique of Cartesian Beast-Machine'],
    scores: {
      epistemology: 0.5,
      metaphysics: 0.8,
      theology: 0.9,
      ethics: 0.8,
      politics: 0.5,
      methodology: 0.4,
      metaphilosophy: 0.85
    },
    domainPriorities: {
      "metaphysics": 5,
      "theology": 5,
      "metaphilosophy": 5,
      "ethics": 4,
      "methodology": 3,
      "epistemology": 3,
      "politics": 2
},
    metaphilosophicalFocus: "Cambridge Platonist ontology: demonstrating spatial extension of spirit and infinite space as the divine sensorium against mechanical materialism.",
    signatureTraits: ['extended-spirit', 'divine-space', 'cambridge-platonist'],
    archRivalId: 'rene-descartes',
    archRivalReason: 'Corresponded with Descartes, vehemently rejecting Descartes\'s reduction of spirit to a dimensionless point and matter to mere mechanical geometric extension.'
  }
];

export const MAJOR_CANONICAL_IDS = new Set<string>([
  'francis-bacon',
  'jeremy-bentham',
  'george-berkeley',
  'edmund-burke',
  'rene-descartes',
  'isaac-newton',
  'thomas-hobbes',
  'david-hume',
  'blaise-pascal',
  'immanuel-kant',
  'gottfried-wilhelm-leibniz',
  'john-locke',
  'baruch-spinoza',
  'jean-jacques-rousseau',
  'voltaire',
  'mary-wollstonecraft'
]);

export const PHILOSOPHERS: Philosopher[] = RAW_PHILOSOPHERS.map((p) => ({
  ...p,
  isMajorFigure: MAJOR_CANONICAL_IDS.has(p.id)
}));

