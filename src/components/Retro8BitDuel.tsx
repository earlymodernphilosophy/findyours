/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Monitor, ArrowRight, RotateCcw, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { duelAudio } from '../utils/duelAudio';
import { getPixelPhilosopher, getDuelKeywords, PixelPhilosopherConfig } from '../data/pixelPhilosophers';

interface Retro8BitDuelProps {
  playerPhilosopherId: string;
  nemesisPhilosopherId: string;
  playerName?: string;
  onVictory: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

interface FloatText {
  id: number;
  text: string;
  x: number;
  y: number;
  vy: number;
  color: string;
  alpha: number;
}

const NES_WIDTH = 256;
const NES_HEIGHT = 192;

export const Retro8BitDuel: React.FC<Retro8BitDuelProps> = ({
  playerPhilosopherId,
  nemesisPhilosopherId,
  playerName = 'Player',
  onVictory
}) => {
  const playerConfig = getPixelPhilosopher(playerPhilosopherId);
  const nemesisConfig = getPixelPhilosopher(nemesisPhilosopherId);

  // Game States: 'READY' | 'PLAYING' | 'PLAYER_ATTACK' | 'NEMESIS_ATTACK' | 'GAME_OVER' | 'VICTORY'
  const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'PLAYER_ATTACK' | 'NEMESIS_ATTACK' | 'GAME_OVER' | 'VICTORY'>('READY');
  const [muted, setMuted] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Health and Hearts
  const [playerHearts, setPlayerHearts] = useState(3);
  const [nemesisHp, setNemesisHp] = useState(100);
  const [nemesisLagHp, setNemesisLagHp] = useState(100);

  // Tailored philosophical keywords specifically chosen to irritate the nemesis
  const duelKeywords = getDuelKeywords(playerPhilosopherId, nemesisPhilosopherId);

  // Typing & Prompts
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState('');

  // Current active word
  const currentWord = duelKeywords[currentPromptIndex % duelKeywords.length] || 'MATERIALISM';

  // Difficulty & Retry tracking
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [failCount, setFailCount] = useState(0);

  // Dynamic prompt duration helper: Hard on first try, +75% time on Easy Mode
  const calcDuration = useCallback((word: string, easy: boolean) => {
    const letterCount = word.replace(/\s+/g, '').length;
    if (easy) {
      // Easy Mode: generous time for comfortable typing
      return Math.max(9.0, Math.min(18.0, letterCount * 0.95 + 3.0));
    }
    // Hard Mode (first try): tense and challenging but fair for long philosophical isms
    return Math.max(5.5, Math.min(11.0, letterCount * 0.55 + 1.8));
  }, []);

  // Dynamic prompt duration based on current word difficulty and mode
  const promptDuration = calcDuration(currentWord, isEasyMode);
  const [promptTimeLeft, setPromptTimeLeft] = useState(promptDuration);

  // Victory Sequence
  const [victoryCountdown, setVictoryCountdown] = useState(10);
  const [zoomScale, setZoomScale] = useState(1.0);

  // Virtual keyboard layout
  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['DEL', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'CLEAR']
  ];

  // Visual effects refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const floatTextsRef = useRef<FloatText[]>([]);
  const screenShakeRef = useRef({ x: 0, y: 0, intensity: 0 });
  const animTickRef = useRef(0);

  // Calculate reveal percentage (0% to 100%)
  const revealPct = Math.min(100, Math.round(((100 - nemesisHp) / 100) * 100));

  // Audio unlock on user touch
  const handleUserGesture = () => {
    duelAudio.ensureUnlocked();
    if (gameState === 'READY') {
      setGameState('PLAYING');
      duelAudio.playKeyClick();
    }
  };

  const toggleSound = () => {
    const isNowMuted = !muted;
    setMuted(isNowMuted);
    duelAudio.setMuted(isNowMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Add floating damage text
  const addFloatText = (text: string, x: number, y: number, color: string = '#facc15') => {
    floatTextsRef.current.push({
      id: Date.now() + Math.random(),
      text,
      x,
      y,
      vy: -1.2,
      color,
      alpha: 1.0
    });
  };

  // Spawn retro particles
  const spawnHitParticles = (x: number, y: number, color: string, count: number = 14) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        color,
        size: Math.random() > 0.5 ? 3 : 2,
        life: 0,
        maxLife: 20 + Math.random() * 15
      });
    }
  };

  // Screen shake trigger
  const triggerScreenShake = (intensity: number = 5) => {
    screenShakeRef.current.intensity = intensity;
  };

  // Reset Duel with optional Easy Mode
  const restartGame = (enableEasyMode: boolean = isEasyMode) => {
    setIsEasyMode(enableEasyMode);
    setPlayerHearts(3);
    setNemesisHp(100);
    setNemesisLagHp(100);
    setCurrentPromptIndex(0);
    setTypedLetters('');
    const firstWord = duelKeywords[0] || 'MATERIALISM';
    const firstDuration = calcDuration(firstWord, enableEasyMode);
    setPromptTimeLeft(firstDuration);
    setVictoryCountdown(10);
    setZoomScale(1.0);
    setGameState('PLAYING');
    particlesRef.current = [];
    floatTextsRef.current = [];
    duelAudio.playKeyClick();
  };

  // Handle successful word completion
  const handleWordComplete = useCallback(() => {
    setGameState('PLAYER_ATTACK');
    duelAudio.playSlashHit();
    triggerScreenShake(7);
    spawnHitParticles(175, 105, '#f59e0b', 20);
    addFloatText(`${currentWord}! -12 HP`, 130, 75, '#22c55e');

    const nextHp = Math.max(0, nemesisHp - 12);
    setNemesisHp(nextHp);

    setTimeout(() => {
      if (nextHp <= 0) {
        // Boss Defeated
        setGameState('VICTORY');
        duelAudio.playBossDisintegrate();
        duelAudio.playVictoryFanfare();
        spawnHitParticles(175, 105, '#ffffff', 40);
        addFloatText('VICTORY!', 110, 65, '#fef08a');
      } else {
        setGameState('PLAYING');
        const nextIndex = currentPromptIndex + 1;
        setCurrentPromptIndex(nextIndex);
        setTypedLetters('');
        const nextWord = duelKeywords[nextIndex % duelKeywords.length] || 'MATERIALISM';
        const nextDuration = calcDuration(nextWord, isEasyMode);
        setPromptTimeLeft(nextDuration);
      }
    }, 450);
  }, [nemesisHp, currentWord, currentPromptIndex, duelKeywords, calcDuration, isEasyMode]);

  // Handle player taking damage
  const handlePlayerStabbed = useCallback(() => {
    setGameState('NEMESIS_ATTACK');
    duelAudio.playNemesisStab();
    triggerScreenShake(7);
    spawnHitParticles(75, 105, '#ef4444', 16);
    addFloatText('-1 HEART', 60, 75, '#ef4444');

    const nextHearts = playerHearts - 1;
    setPlayerHearts(nextHearts);

    setTimeout(() => {
      if (nextHearts <= 0) {
        setFailCount((prev) => prev + 1);
        setGameState('GAME_OVER');
        duelAudio.playGameOver();
      } else {
        setGameState('PLAYING');
        setTypedLetters('');
        setPromptTimeLeft(promptDuration);
      }
    }, 550);
  }, [playerHearts, promptDuration]);

  // Handle Key Input
  const handleKeyInput = useCallback(
    (key: string) => {
      if (gameState !== 'PLAYING') return;
      handleUserGesture();

      const upperKey = key.toUpperCase();

      if (upperKey === 'DEL' || upperKey === 'BACKSPACE') {
        if (typedLetters.length > 0) {
          duelAudio.playKeyClick();
          setTypedLetters((prev) => {
            const next = prev.slice(0, -1);
            // If the preceding char was a space, trim it too so player doesn't get stuck on empty space
            return next.endsWith(' ') ? next.slice(0, -1) : next;
          });
        }
        return;
      }

      if (upperKey === 'CLEAR') {
        setTypedLetters('');
        duelAudio.playKeyClick();
        return;
      }

      // Explicit Space handling
      if (upperKey === ' ' || upperKey === 'SPACE') {
        if (typedLetters.length < currentWord.length && currentWord[typedLetters.length] === ' ') {
          duelAudio.playKeyClick();
          const nextTyped = typedLetters + ' ';
          setTypedLetters(nextTyped);
          if (nextTyped === currentWord) {
            handleWordComplete();
          }
        }
        return;
      }

      if (/^[A-Z]$/.test(upperKey)) {
        let expectedNextChar = currentWord[typedLetters.length];
        let prefix = '';

        // If next expected character is a space, auto-bridge across it when the user types the subsequent letter!
        // This guarantees flawless typing whether the user presses space or types continuously.
        if (expectedNextChar === ' ') {
          expectedNextChar = currentWord[typedLetters.length + 1];
          prefix = ' ';
        }

        if (upperKey === expectedNextChar) {
          duelAudio.playKeyClick();
          const nextTyped = typedLetters + prefix + upperKey;
          setTypedLetters(nextTyped);

          if (nextTyped === currentWord) {
            handleWordComplete();
          }
        } else {
          duelAudio.playKeyError();
          triggerScreenShake(2);
          addFloatText('MISS', 110, 125, '#ef4444');
        }
      }
    },
    [gameState, currentWord, typedLetters, handleWordComplete]
  );

  // Keyboard Listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        handleKeyInput('DEL');
      } else if (e.key === 'Escape') {
        handleKeyInput('CLEAR');
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handleKeyInput('SPACE');
      } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        handleKeyInput(e.key);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyInput]);

  // Timer Interval
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const timer = setInterval(() => {
      setPromptTimeLeft((prev) => {
        const next = Math.max(0, prev - 0.1);
        if (next < 2.0 && Math.round(next * 10) % 5 === 0) {
          duelAudio.playTick(true);
        } else if (Math.round(next * 10) % 10 === 0) {
          duelAudio.playTick(false);
        }

        if (next <= 0) {
          handlePlayerStabbed();
          return promptDuration;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [gameState, handlePlayerStabbed, promptDuration]);

  // Lag Bar
  useEffect(() => {
    if (nemesisLagHp > nemesisHp) {
      const timer = setTimeout(() => {
        setNemesisLagHp((prev) => Math.max(nemesisHp, prev - 1.5));
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [nemesisHp, nemesisLagHp]);

  // Victory 10-Second Countdown
  useEffect(() => {
    if (gameState !== 'VICTORY') return;

    const countdownInterval = setInterval(() => {
      setVictoryCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          onVictory();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [gameState, onVictory]);

  // Victory zoom
  useEffect(() => {
    if (gameState === 'VICTORY') {
      let zoom = 1.0;
      const zoomInterval = setInterval(() => {
        zoom = Math.min(1.85, zoom + 0.03);
        setZoomScale(zoom);
        if (zoom >= 1.85) clearInterval(zoomInterval);
      }, 30);
      return () => clearInterval(zoomInterval);
    }
  }, [gameState]);

  // Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const drawPhilosopherSprite = (
      config: PixelPhilosopherConfig,
      baseX: number,
      baseY: number,
      isFlipped: boolean,
      revealFactor: number,
      isAttacking: boolean,
      isHurt: boolean
    ) => {
      ctx.save();

      let x = baseX;
      let y = baseY + (Math.sin(animTickRef.current * 0.08) * 1.5);
      if (isAttacking) x += isFlipped ? -18 : 18;
      if (isHurt) x += isFlipped ? 10 : -10;

      ctx.translate(x, y);
      if (isFlipped) {
        ctx.scale(-1, 1);
      }

      const P = 3;

      const resolveColor = (vibrantColor: string, pixelHash: number) => {
        if (revealFactor >= 1.0) return vibrantColor;
        const threshold = revealFactor * 100;
        if (pixelHash % 100 < threshold) {
          return vibrantColor;
        }
        return (pixelHash % 2 === 0) ? '#18181b' : '#27272a';
      };

      const prof = config.pixelProfile;

      // Special Dedicated Mascot Renderer for Brutus Buckeye
      if (config.id === 'brutus-buckeye') {
        // 1. Shadow beneath mascot
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        ctx.ellipse(0, 29 * P, 14 * P, 4 * P, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Athletic Sneakers (white with scarlet trim & black treads)
        ctx.fillStyle = resolveColor('#f8fafc', 10);
        ctx.fillRect(-5 * P, 26 * P, 4 * P, 3 * P);
        ctx.fillRect(1 * P, 26 * P, 4 * P, 3 * P);
        ctx.fillStyle = resolveColor('#dc2626', 15);
        ctx.fillRect(-5 * P, 25 * P, 4 * P, 1 * P);
        ctx.fillRect(1 * P, 25 * P, 4 * P, 1 * P);
        ctx.fillStyle = resolveColor('#09090b', 20);
        ctx.fillRect(-5 * P, 28 * P, 4 * P, 1 * P);
        ctx.fillRect(1 * P, 28 * P, 4 * P, 1 * P);

        // 3. Scarlet Mascot Pants
        ctx.fillStyle = resolveColor('#dc2626', 25);
        ctx.fillRect(-4 * P, 19 * P, 3 * P, 7 * P);
        ctx.fillRect(1 * P, 19 * P, 3 * P, 7 * P);
        // Gray side stripes
        ctx.fillStyle = resolveColor('#cbd5e1', 30);
        ctx.fillRect(-5 * P, 19 * P, 1 * P, 7 * P);
        ctx.fillRect(4 * P, 19 * P, 1 * P, 7 * P);

        // 4. Ohio State Scarlet & Gray Horizontally Striped Rugby Sweater
        // Stripe 1: Scarlet
        ctx.fillStyle = resolveColor('#dc2626', 35);
        ctx.fillRect(-7 * P, 8 * P, 14 * P, 2 * P);
        // Stripe 2: Gray
        ctx.fillStyle = resolveColor('#cbd5e1', 40);
        ctx.fillRect(-7 * P, 10 * P, 14 * P, 3 * P);
        // Stripe 3: Scarlet (with White Block "O" on chest)
        ctx.fillStyle = resolveColor('#dc2626', 45);
        ctx.fillRect(-7 * P, 13 * P, 14 * P, 3 * P);
        // Chest Block "O"
        ctx.fillStyle = resolveColor('#ffffff', 48);
        ctx.fillRect(-2 * P, 13 * P, 4 * P, 3 * P);
        ctx.fillStyle = resolveColor('#dc2626', 49);
        ctx.fillRect(-1 * P, 14 * P, 2 * P, 1 * P);
        // Stripe 4: Gray
        ctx.fillStyle = resolveColor('#cbd5e1', 50);
        ctx.fillRect(-7 * P, 16 * P, 14 * P, 3 * P);

        // 5. Arms & White Mascot Mitts/Gloves
        if (isAttacking) {
          ctx.fillStyle = resolveColor('#dc2626', 55);
          ctx.fillRect(5 * P, 10 * P, 4 * P, 4 * P);
          ctx.fillStyle = resolveColor('#cbd5e1', 56);
          ctx.fillRect(9 * P, 10 * P, 4 * P, 4 * P);
          ctx.fillStyle = resolveColor('#ffffff', 60);
          ctx.fillRect(13 * P, 9 * P, 5 * P, 6 * P);
          ctx.fillStyle = resolveColor('#94a3b8', 61);
          ctx.fillRect(17 * P, 11 * P, 1 * P, 3 * P);
          ctx.fillStyle = resolveColor('#dc2626', 62);
          ctx.fillRect(-9 * P, 11 * P, 3 * P, 6 * P);
        } else {
          // Left arm
          ctx.fillStyle = resolveColor('#dc2626', 55);
          ctx.fillRect(-9 * P, 9 * P, 3 * P, 3 * P);
          ctx.fillStyle = resolveColor('#cbd5e1', 56);
          ctx.fillRect(-9 * P, 12 * P, 3 * P, 3 * P);
          ctx.fillStyle = resolveColor('#dc2626', 57);
          ctx.fillRect(-9 * P, 15 * P, 3 * P, 3 * P);
          // Left white mascot mitt
          ctx.fillStyle = resolveColor('#ffffff', 60);
          ctx.fillRect(-10 * P, 18 * P, 4 * P, 4 * P);
          ctx.fillStyle = resolveColor('#94a3b8', 61);
          ctx.fillRect(-10 * P, 21 * P, 3 * P, 1 * P);

          // Right arm
          ctx.fillStyle = resolveColor('#dc2626', 65);
          ctx.fillRect(6 * P, 9 * P, 3 * P, 3 * P);
          ctx.fillStyle = resolveColor('#cbd5e1', 66);
          ctx.fillRect(6 * P, 12 * P, 3 * P, 3 * P);
          ctx.fillStyle = resolveColor('#dc2626', 67);
          ctx.fillRect(6 * P, 15 * P, 3 * P, 3 * P);
          // Right white mascot mitt
          ctx.fillStyle = resolveColor('#ffffff', 70);
          ctx.fillRect(6 * P, 18 * P, 4 * P, 4 * P);
          ctx.fillStyle = resolveColor('#94a3b8', 71);
          ctx.fillRect(7 * P, 21 * P, 3 * P, 1 * P);

          // Red Solo Cup in right hand
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(7 * P, 16 * P, 4 * P, 5 * P);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(7 * P, 16 * P, 4 * P, 1 * P);
        }

        // 6. GIANT BUCKEYE NUT HEAD (Signature rounded chestnut nut)
        const nutBrown = resolveColor('#582405', 75);
        const nutDark = resolveColor('#3a1702', 76);
        ctx.fillStyle = nutBrown;

        // Rounded nut shape:
        ctx.fillRect(-7 * P, -9 * P, 14 * P, 2 * P); // top curve
        ctx.fillRect(-9 * P, -7 * P, 18 * P, 2 * P); // upper bulge
        ctx.fillRect(-10 * P, -5 * P, 20 * P, 8 * P); // widest middle section
        ctx.fillRect(-9 * P, 3 * P, 18 * P, 3 * P);  // lower taper
        ctx.fillRect(-7 * P, 6 * P, 14 * P, 2 * P);  // bottom curve

        // Dark nut rim shading
        ctx.fillStyle = nutDark;
        ctx.fillRect(-10 * P, -2 * P, 1 * P, 5 * P);
        ctx.fillRect(9 * P, -2 * P, 1 * P, 5 * P);

        // 7. LIGHT BUCKEYE "EYE" / FACE PATCH (The iconic tan patch of the buckeye nut)
        const patchTan = resolveColor('#fef08a', 80);
        const patchWarm = resolveColor('#fed7aa', 81);
        ctx.fillStyle = patchTan;
        ctx.fillRect(-5 * P, -5 * P, 10 * P, 2 * P);
        ctx.fillRect(-7 * P, -3 * P, 14 * P, 8 * P);
        ctx.fillRect(-5 * P, 5 * P, 10 * P, 2 * P);

        ctx.fillStyle = patchWarm;
        ctx.fillRect(-4 * P, -4 * P, 8 * P, 1 * P);

        // 8. BIG GOOFY CARTOON MASCOT EYES
        // Eyebrows
        ctx.fillStyle = resolveColor('#000000', 83);
        ctx.fillRect(-6 * P, -3 * P, 4 * P, 1 * P);
        ctx.fillRect(2 * P, -3 * P, 4 * P, 1 * P);

        // Left Eye
        ctx.fillStyle = resolveColor('#ffffff', 85);
        ctx.fillRect(-5 * P, -2 * P, 4 * P, 4 * P);
        ctx.fillStyle = resolveColor('#000000', 86);
        ctx.fillRect(-4 * P, -1 * P, 2 * P, 3 * P);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-4 * P, -1 * P, 1 * P, 1 * P);

        // Right Eye
        ctx.fillStyle = resolveColor('#ffffff', 87);
        ctx.fillRect(1 * P, -2 * P, 4 * P, 4 * P);
        ctx.fillStyle = resolveColor('#000000', 88);
        ctx.fillRect(2 * P, -1 * P, 2 * P, 3 * P);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(2 * P, -1 * P, 1 * P, 1 * P);

        // 9. HUGE TOOTHY MASCOT GRIN
        ctx.fillStyle = resolveColor('#000000', 90);
        ctx.fillRect(-5 * P, 3 * P, 10 * P, 3 * P);
        ctx.fillRect(-6 * P, 3 * P, 1 * P, 2 * P);
        ctx.fillRect(5 * P, 3 * P, 1 * P, 2 * P);

        // Gleaming White Teeth row
        ctx.fillStyle = resolveColor('#ffffff', 92);
        ctx.fillRect(-4 * P, 3 * P, 8 * P, 1 * P);
        ctx.fillStyle = resolveColor('#cbd5e1', 93);
        ctx.fillRect(-2 * P, 3 * P, 1 * P, 1 * P);
        ctx.fillRect(1 * P, 3 * P, 1 * P, 1 * P);

        // Happy Red Tongue
        ctx.fillStyle = resolveColor('#ef4444', 94);
        ctx.fillRect(-2 * P, 5 * P, 4 * P, 1 * P);

        // 10. OHIO STATE STRIPED BEANIE CAP WITH POM-POM
        // Scarlet base band
        ctx.fillStyle = resolveColor('#dc2626', 95);
        ctx.fillRect(-8 * P, -11 * P, 16 * P, 2 * P);
        // Gray middle band
        ctx.fillStyle = resolveColor('#cbd5e1', 96);
        ctx.fillRect(-6 * P, -13 * P, 12 * P, 2 * P);
        // Scarlet top dome
        ctx.fillStyle = resolveColor('#dc2626', 97);
        ctx.fillRect(-4 * P, -15 * P, 8 * P, 2 * P);
        // Fluffy Pom-Pom at top
        ctx.fillStyle = resolveColor('#f8fafc', 98);
        ctx.fillRect(-2 * P, -18 * P, 4 * P, 3 * P);
        ctx.fillStyle = resolveColor('#dc2626', 99);
        ctx.fillRect(-1 * P, -17 * P, 2 * P, 1 * P);

        // Attack FX if attacking
        if (isAttacking) {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(15 * P, 10 * P, 12 * P, 2 * P);
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(17 * P, 9 * P, 9 * P, 4 * P);
          ctx.fillStyle = '#ec4899';
          ctx.fillRect(14 * P, 8 * P, 3 * P, 6 * P);
        }

        ctx.restore();
        return;
      }

      // 1. Shadow beneath character
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, 29 * P, 12 * P, 4 * P, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Legs / Boots
      ctx.fillStyle = resolveColor('#18181b', 12);
      ctx.fillRect(-4 * P, 22 * P, 3 * P, 7 * P);
      ctx.fillRect(1 * P, 22 * P, 3 * P, 7 * P);
      ctx.fillStyle = resolveColor('#cbd5e1', 25);
      ctx.fillRect(-4 * P, 27 * P, 2 * P, 2 * P);
      ctx.fillRect(2 * P, 27 * P, 2 * P, 2 * P);

      // 3. Torso / Coat
      ctx.fillStyle = resolveColor(prof.coatColor, 35);
      ctx.fillRect(-6 * P, 11 * P, 12 * P, 12 * P);
      ctx.fillStyle = resolveColor(prof.accentColor, 48);
      ctx.fillRect(-1 * P, 12 * P, 2 * P, 10 * P);

      // 4. Arms
      ctx.fillStyle = resolveColor(prof.coatColor, 55);
      if (isAttacking) {
        ctx.fillRect(4 * P, 12 * P, 9 * P, 3 * P);
        ctx.fillStyle = resolveColor(prof.skinTone, 60);
        ctx.fillRect(12 * P, 12 * P, 3 * P, 3 * P);
      } else {
        ctx.fillRect(-8 * P, 12 * P, 3 * P, 9 * P);
        ctx.fillRect(5 * P, 12 * P, 3 * P, 9 * P);
        ctx.fillStyle = resolveColor(prof.skinTone, 60);
        ctx.fillRect(-8 * P, 20 * P, 3 * P, 2 * P);
        ctx.fillRect(5 * P, 20 * P, 3 * P, 2 * P);
      }

      // 5. Collar
      ctx.fillStyle = resolveColor(prof.accentColor, 72);
      ctx.fillRect(-4 * P, 9 * P, 8 * P, 3 * P);

      // 6. Head & Face
      ctx.fillStyle = resolveColor(prof.skinTone, 80);
      ctx.fillRect(-4 * P, 2 * P, 8 * P, 8 * P);

      ctx.fillStyle = resolveColor('#09090b', 85);
      ctx.fillRect(-1 * P, 4 * P, 2 * P, 2 * P);
      ctx.fillRect(2 * P, 4 * P, 2 * P, 2 * P);

      if (prof.facialHair === 'pencil-mustache') {
        ctx.fillStyle = resolveColor('#18181b', 88);
        ctx.fillRect(0, 7 * P, 4 * P, 1 * P);
      } else if (prof.facialHair === 'bacon-goatee') {
        ctx.fillStyle = resolveColor('#451a03', 88);
        ctx.fillRect(1 * P, 7 * P, 2 * P, 1 * P);
        ctx.fillRect(1 * P, 8 * P, 2 * P, 3 * P);
      } else if (prof.facialHair === 'hobbes-beard') {
        ctx.fillStyle = resolveColor('#94a3b8', 88);
        ctx.fillRect(-2 * P, 7 * P, 6 * P, 4 * P);
      }

      const hair = resolveColor(prof.hairColor, 92);
      ctx.fillStyle = hair;

      if (prof.hairStyle === 'periwig') {
        ctx.fillRect(-6 * P, -2 * P, 12 * P, 6 * P);
        ctx.fillRect(-8 * P, 1 * P, 3 * P, 13 * P);
        ctx.fillRect(5 * P, 1 * P, 3 * P, 13 * P);
      } else if (prof.hairStyle === 'powdered-bob') {
        ctx.fillRect(-5 * P, 0, 10 * P, 4 * P);
        ctx.fillRect(-7 * P, 2 * P, 3 * P, 8 * P);
        ctx.fillRect(4 * P, 2 * P, 3 * P, 8 * P);
      } else if (prof.hairStyle === 'curls') {
        ctx.fillRect(-5 * P, 0, 10 * P, 4 * P);
        ctx.fillRect(-7 * P, 2 * P, 3 * P, 10 * P);
        ctx.fillRect(4 * P, 2 * P, 3 * P, 10 * P);
      } else if (prof.hairStyle === 'bonnet') {
        ctx.fillStyle = resolveColor('#f8fafc', 93);
        ctx.fillRect(-6 * P, -1 * P, 12 * P, 6 * P);
        ctx.fillRect(-7 * P, 3 * P, 3 * P, 8 * P);
      } else if (prof.hairStyle === 'tudor-cap') {
        ctx.fillStyle = resolveColor('#18181b', 93);
        ctx.fillRect(-7 * P, -3 * P, 14 * P, 4 * P);
        ctx.fillRect(-5 * P, -5 * P, 10 * P, 3 * P);
      } else if (prof.hairStyle === 'buckeye') {
        ctx.fillStyle = resolveColor('#78350f', 93);
        ctx.fillRect(-5 * P, -2 * P, 10 * P, 4 * P);
        ctx.fillStyle = resolveColor('#fed7aa', 94);
        ctx.fillRect(-3 * P, -2 * P, 6 * P, 3 * P);
      } else if (prof.hairStyle === 'modern-bob') {
        ctx.fillRect(-6 * P, 0, 12 * P, 4 * P);
        ctx.fillRect(-7 * P, 2 * P, 3 * P, 8 * P);
        ctx.fillRect(4 * P, 2 * P, 3 * P, 8 * P);
      }

      if (isAttacking) {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(14 * P, 11 * P, 14 * P, 2 * P);
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(16 * P, 10 * P, 10 * P, 4 * P);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(13 * P, 9 * P, 2 * P, 6 * P);
      } else {
        if (prof.accessory === 'candle') {
          ctx.fillStyle = resolveColor('#fef08a', 97);
          ctx.fillRect(6 * P, 16 * P, 3 * P, 5 * P);
          ctx.fillStyle = Math.sin(animTickRef.current * 0.3) > 0 ? '#ef4444' : '#f59e0b';
          ctx.fillRect(7 * P, 13 * P, 2 * P, 3 * P);
        } else if (prof.accessory === 'prism') {
          ctx.fillStyle = '#67e8f9';
          ctx.fillRect(6 * P, 16 * P, 4 * P, 4 * P);
        } else if (prof.accessory === 'solo-cup') {
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(6 * P, 16 * P, 4 * P, 5 * P);
        } else {
          ctx.fillStyle = resolveColor('#92400e', 97);
          ctx.fillRect(6 * P, 16 * P, 4 * P, 6 * P);
          ctx.fillStyle = resolveColor('#f8fafc', 98);
          ctx.fillRect(7 * P, 17 * P, 2 * P, 4 * P);
        }
      }

      ctx.restore();
    };

    const render = () => {
      animTickRef.current += 1;

      let offsetX = 0;
      let offsetY = 0;
      if (screenShakeRef.current.intensity > 0) {
        offsetX = (Math.random() - 0.5) * screenShakeRef.current.intensity * 2;
        offsetY = (Math.random() - 0.5) * screenShakeRef.current.intensity * 2;
        screenShakeRef.current.intensity = Math.max(0, screenShakeRef.current.intensity - 0.5);
      }

      ctx.save();
      ctx.translate(offsetX, offsetY);

      if (gameState === 'VICTORY') {
        const cx = 80;
        const cy = 105;
        ctx.translate(cx, cy);
        ctx.scale(zoomScale, zoomScale);
        ctx.translate(-cx, -cy);
      }

      // 8-Bit Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, NES_WIDTH, NES_HEIGHT);

      ctx.fillStyle = '#38bdf8';
      for (let s = 0; s < 12; s++) {
        const sx = (s * 23 + animTickRef.current * 0.1) % NES_WIDTH;
        const sy = (s * 13) % 55;
        ctx.fillRect(sx, sy, 2, 2);
      }

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 45, NES_WIDTH, 45);
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 43, NES_WIDTH, 3);
      for (let p = 0; p < NES_WIDTH; p += 32) {
        ctx.fillStyle = '#475569';
        ctx.fillRect(p, 45, 6, 45);
      }

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 90, NES_WIDTH, NES_HEIGHT - 90);
      for (let y = 90; y < NES_HEIGHT; y += 12) {
        for (let x = 0; x < NES_WIDTH; x += 24) {
          const isEven = (Math.floor(x / 24) + Math.floor(y / 12)) % 2 === 0;
          ctx.fillStyle = isEven ? '#1e293b' : '#334155';
          ctx.fillRect(x, y, 24, 12);
        }
      }

      ctx.fillStyle = '#991b1b';
      ctx.fillRect(35, 115, NES_WIDTH - 70, 45);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(35, 113, NES_WIDTH - 70, 2);
      ctx.fillRect(35, 160, NES_WIDTH - 70, 2);

      drawPhilosopherSprite(
        playerConfig,
        75,
        100,
        false,
        revealPct / 100,
        gameState === 'PLAYER_ATTACK',
        gameState === 'NEMESIS_ATTACK'
      );

      if (nemesisHp > 0) {
        drawPhilosopherSprite(
          nemesisConfig,
          180,
          100,
          true,
          1.0,
          gameState === 'NEMESIS_ATTACK',
          gameState === 'PLAYER_ATTACK'
        );
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life += 1;

        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      for (let i = floatTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatTextsRef.current[i];
        ft.y += ft.vy;
        ft.alpha -= 0.025;

        ctx.save();
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, Math.min(210, Math.max(50, ft.x)), ft.y);
        ctx.restore();

        if (ft.alpha <= 0) {
          floatTextsRef.current.splice(i, 1);
        }
      }

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [playerConfig, nemesisConfig, revealPct, nemesisHp, gameState, zoomScale]);

  return (
    <div
      onClick={handleUserGesture}
      className="w-full h-full flex flex-col justify-between items-center bg-stone-950 p-2 sm:p-3 select-none font-mono text-white overflow-hidden"
    >
      {/* TOP NES HUD */}
      <div className="w-full max-w-3xl flex items-center justify-between bg-stone-900 border border-stone-700 px-3 py-1.5 rounded text-xs">
        {/* Player Hearts */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400 font-bold uppercase text-[10px] sm:text-xs mr-1">
            {playerName.slice(0, 10)}:
          </span>
          {[1, 2, 3].map((heart) => (
            <span
              key={heart}
              className={`text-base transition-transform ${
                heart <= playerHearts
                  ? 'text-red-500 scale-100 animate-pulse'
                  : 'text-stone-700 scale-90'
              }`}
            >
              ♥
            </span>
          ))}
        </div>

        {/* Reveal Badge & Easy Mode indicator */}
        <div className="flex items-center gap-2">
          {isEasyMode && (
            <span className="px-2 py-0.5 rounded bg-amber-400 text-stone-950 text-[10px] font-black border border-amber-300 animate-pulse">
              EASY MODE (+75% TIME)
            </span>
          )}
          <div className="hidden sm:flex items-center gap-1.5 bg-stone-950 border border-stone-800 px-2 py-0.5 rounded text-[10px]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-stone-400">REVEAL:</span>
            <span className="text-amber-400 font-bold">{revealPct}%</span>
          </div>
        </div>

        {/* Nemesis HP & Controls */}
        <div className="flex items-center gap-2">
          <span className="text-stone-400 font-bold uppercase text-[10px] sm:text-xs">
            NEMESIS:
          </span>
          <div className="relative w-20 sm:w-28 h-3 bg-stone-950 border border-stone-700 rounded overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${nemesisLagHp}%` }}
            />
            <div
              className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-100"
              style={{ width: `${nemesisHp}%` }}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            title={muted ? 'Unmute' : 'Mute'}
            className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 ml-1"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setScanlines(!scanlines);
            }}
            title="Scanlines"
            className={`p-1 rounded hover:bg-stone-700 ${
              scanlines ? 'bg-amber-900/60 text-amber-300' : 'bg-stone-800 text-stone-400'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 8-BIT CANVAS CONTAINER */}
      <div className="relative flex-1 w-full max-w-3xl my-1.5 bg-black border-2 border-stone-800 rounded overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={NES_WIDTH}
          height={NES_HEIGHT}
          className="w-full h-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />

        {scanlines && (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-transparent bg-[length:100%_4px] opacity-75"
            style={{ boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.85)' }}
          />
        )}

        {/* READY STATE */}
        {gameState === 'READY' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] uppercase tracking-wider mb-2 animate-bounce">
              BOSS ENCOUNTER
            </div>
            <div className="text-amber-400 font-zany text-2xl sm:text-4xl font-black tracking-wider uppercase mb-1 drop-shadow-[2px_2px_0px_#991b1b]">
              NEMESIS BATTLE
            </div>
            <p className="text-xs sm:text-sm font-bold text-stone-200 lowercase tracking-wide max-w-sm mb-4">
              defeat your nemesis to reveal your match
            </p>
            <p className="text-[11px] text-amber-200/90 font-mono mb-5 max-w-xs">
              ⚡ Type the keyword fast before time runs out!
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUserGesture();
              }}
              className="px-8 py-3 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black tracking-widest text-sm uppercase rounded-xl border-2 border-white shadow-[4px_4px_0px_#000] cursor-pointer transition-transform"
            >
              FIGHT!
            </button>
          </div>
        )}

        {/* GAME OVER */}
        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-red-950/95 flex flex-col items-center justify-center p-4 text-center z-20">
            <div className="text-red-500 text-2xl sm:text-3xl font-black tracking-widest mb-1 drop-shadow-md">
              GAME OVER
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xs mb-4">
              Your nemesis struck with devastating precision!
            </p>

            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restartGame(true);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-black text-xs uppercase rounded border-2 border-amber-300 shadow-lg cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-stone-950 shrink-0" />
                <span>RETRY (EASY MODE · +75% TIME)</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restartGame(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-300 hover:text-white font-bold text-xs uppercase rounded border border-stone-600 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>RETRY (HARD MODE)</span>
              </button>
            </div>
          </div>
        )}

        {/* VICTORY */}
        {gameState === 'VICTORY' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center z-20">
            <div className="text-yellow-400 text-xl sm:text-3xl font-black tracking-widest mb-1 animate-pulse">
              YOU WIN!
            </div>
            <div className="text-emerald-400 text-xs uppercase tracking-wider mb-2">
              NEMESIS DEFEATED!
            </div>

            <div className="bg-stone-900 border border-amber-500/60 p-3 rounded max-w-sm w-full mb-3 shadow-xl">
              <div className="text-amber-300 font-bold text-sm">
                YOU ARE: {playerConfig.name.toUpperCase()}
              </div>
              <div className="text-[11px] text-stone-400 italic mt-0.5">
                &ldquo;{playerConfig.quote}&rdquo;
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-[11px] text-stone-400">
                Results in {victoryCountdown}s...
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVictory();
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold uppercase rounded border border-emerald-400 cursor-pointer"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TYPING PROMPTS & HUD */}
      {gameState !== 'VICTORY' && gameState !== 'GAME_OVER' && (
        <div className="w-full max-w-3xl flex flex-col items-center shrink-0">
          {/* Timer bar */}
          <div className="w-full max-w-md flex items-center gap-2 mb-1 px-2">
            <span className="text-[10px] text-stone-400 font-bold uppercase">
              TIMER:
            </span>
            <div className="relative flex-1 h-2 bg-stone-900 border border-stone-700 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ${
                  promptTimeLeft > 2.5
                    ? 'bg-emerald-500'
                    : promptTimeLeft > 1.2
                    ? 'bg-amber-500'
                    : 'bg-red-500 animate-pulse'
                }`}
                style={{ width: `${(promptTimeLeft / promptDuration) * 100}%` }}
              />
            </div>
            <span
              className={`text-[10px] font-bold ${
                promptTimeLeft > 1.2 ? 'text-stone-300' : 'text-red-400'
              }`}
            >
              {promptTimeLeft.toFixed(1)}s
            </span>
          </div>

          {/* Letter slots with dynamic responsive sizing */}
          <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-1.5 my-1 max-w-full overflow-hidden px-1 py-1">
            {currentWord.split('').map((char, index) => {
              const isSpace = char === ' ';
              const isTyped = index < typedLetters.length;
              const isNext =
                index === typedLetters.length ||
                (currentWord[typedLetters.length] === ' ' && index === typedLetters.length + 1);
              const isLongWord = currentWord.length >= 12;

              if (isSpace) {
                return (
                  <div
                    key={index}
                    className="w-2 sm:w-3.5 flex items-center justify-center shrink-0"
                    title="space"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isTyped ? 'bg-emerald-400' : 'bg-stone-600'
                      }`}
                    />
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`flex items-center justify-center font-black rounded border-2 transition-colors shrink-0 ${
                    isLongWord
                      ? 'w-5 h-7 sm:w-7 sm:h-9 text-[10px] sm:text-xs'
                      : 'w-6 h-8 sm:w-8 sm:h-10 text-xs sm:text-sm'
                  } ${
                    isTyped
                      ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                      : isNext
                      ? 'bg-stone-800 border-amber-400 text-white animate-pulse'
                      : 'bg-stone-900 border-stone-700 text-stone-500'
                  }`}
                >
                  {isTyped ? typedLetters[index] : char}
                </div>
              );
            })}
          </div>

          {/* RETRO ARCADE KEYPAD */}
          <div className="w-full max-w-md mt-1 pt-1 border-t border-stone-800/80 flex flex-col gap-1 items-center">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1 w-full justify-center">
                {row.map((btnKey) => {
                  const isDel = btnKey === 'DEL';
                  const isClear = btnKey === 'CLEAR';
                  return (
                    <button
                      key={btnKey}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleKeyInput(btnKey);
                      }}
                      className={`h-8 sm:h-9 font-bold text-xs rounded border transition-all active:scale-90 active:bg-amber-400 active:text-stone-950 cursor-pointer ${
                        isDel || isClear
                          ? 'px-2 bg-red-950/60 border-red-700 text-red-300 hover:bg-red-900'
                          : 'flex-1 max-w-[34px] sm:max-w-[40px] bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700'
                      }`}
                    >
                      {btnKey}
                    </button>
                  );
                })}
              </div>
            ))}
            {/* Contextual Space Bar for mobile touch when prompt phrase contains spaces */}
            {currentWord.includes(' ') && (
              <div className="flex gap-1 w-full justify-center mt-0.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleKeyInput('SPACE');
                  }}
                  className="w-1/2 max-w-[200px] h-7 sm:h-8 font-bold text-[10px] sm:text-xs rounded border border-stone-600 bg-stone-800 text-stone-300 hover:bg-stone-700 active:scale-95 active:bg-amber-400 active:text-stone-950 transition-all cursor-pointer flex items-center justify-center tracking-widest uppercase shadow-sm"
                >
                  SPACE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
