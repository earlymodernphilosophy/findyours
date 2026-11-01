/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Authentic Web Audio NES 2A03 Chiptune Synthesizer
class DuelAudioSynthesizer {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  public initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Ensure unlocked on mobile touch
  public ensureUnlocked() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.enabled = !muted;
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // 8-bit typewriter pulse tick when a letter is pressed
  public playKeyClick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // 8-bit error / backspace buzz
  public playKeyError() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  // Authentic NES metallic sword slash (Square wave sweep + 1-bit noise burst)
  public playSlashHit() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Noise burst (blade impact)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.12);
      filter.Q.setValueAtTime(2.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // 2. Rising square pulse sword chirp
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.14);

      oscGain.gain.setValueAtTime(0.25, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Ignore
    }
  }

  // Nemesis lunging stab / player hurt (harsh low noise + descending pulse)
  public playNemesisStab() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Heavy noise crunch
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.2);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.7);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.2);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // Downward pulse groan
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.22);

      oscGain.gain.setValueAtTime(0.35, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch {
      // Ignore
    }
  }

  // Retro timer tick (urgent = higher pitch)
  public playTick(urgent: boolean = false) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(urgent ? 880 : 440, now);

      gain.gain.setValueAtTime(urgent ? 0.22 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (urgent ? 0.08 : 0.05));

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  // Disintegration sound when Nemesis dissolves
  public playBossDisintegrate() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 1.2;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);
      filter.Q.setValueAtTime(5.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch {
      // Ignore
    }
  }

  // Ascending Super Mario / Zelda style 8-bit Victory Fanfare
  public playVictoryFanfare() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Classic NES fanfare melody: C4, E4, G4, C5, E5, G5, C6 (sustain)
      const melody = [
        { freq: 261.63, dur: 0.1, time: 0 },
        { freq: 329.63, dur: 0.1, time: 0.1 },
        { freq: 392.0, dur: 0.1, time: 0.2 },
        { freq: 523.25, dur: 0.12, time: 0.32 },
        { freq: 659.25, dur: 0.12, time: 0.44 },
        { freq: 783.99, dur: 0.2, time: 0.58 },
        { freq: 1046.5, dur: 0.8, time: 0.8 }
      ];

      melody.forEach((note) => {
        const noteStart = now + note.time;
        const osc = this.ctx!.createOscillator();
        const sub = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(note.freq, noteStart);

        sub.type = 'triangle';
        sub.frequency.setValueAtTime(note.freq / 2, noteStart);

        gain.gain.setValueAtTime(0.28, noteStart);
        gain.gain.setValueAtTime(0.28, noteStart + note.dur * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + note.dur);

        osc.connect(gain);
        sub.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteStart);
        sub.start(noteStart);
        osc.stop(noteStart + note.dur);
        sub.stop(noteStart + note.dur);
      });
    } catch {
      // Ignore
    }
  }

  // Classic descending 8-bit Game Over theme
  public playGameOver() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { freq: 392.0, dur: 0.22, time: 0 }, // G4
        { freq: 369.99, dur: 0.22, time: 0.22 }, // F#4
        { freq: 349.23, dur: 0.22, time: 0.44 }, // F4
        { freq: 293.66, dur: 0.6, time: 0.66 } // D4
      ];

      notes.forEach((note) => {
        const noteStart = now + note.time;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(note.freq, noteStart);

        gain.gain.setValueAtTime(0.25, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + note.dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + note.dur);
      });
    } catch {
      // Ignore
    }
  }

  // Legacy compat aliases
  public playSlash() {
    this.playSlashHit();
  }
  public playThrust() {
    this.playNemesisStab();
  }
  public playParry() {
    this.playKeyClick();
  }
  public playWigPop() {
    this.playBossDisintegrate();
  }
  public playFanfare() {
    this.playVictoryFanfare();
  }
  public playBeep(high: boolean = false) {
    this.playTick(high);
  }
}

export const duelAudio = new DuelAudioSynthesizer();
