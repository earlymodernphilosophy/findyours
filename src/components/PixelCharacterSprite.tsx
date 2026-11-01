/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { getPixelPhilosopher, PixelPhilosopherConfig } from '../data/pixelPhilosophers';

interface PixelCharacterSpriteProps {
  philosopherId: string;
  size?: number; // Canvas display width/height in px
  isFlipped?: boolean;
  isSilhouette?: boolean;
  className?: string;
}

export const PixelCharacterSprite: React.FC<PixelCharacterSpriteProps> = ({
  philosopherId,
  size = 140,
  isFlipped = false,
  isSilhouette = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const config: PixelPhilosopherConfig = getPixelPhilosopher(philosopherId);
    const prof = config.pixelProfile;

    const render = () => {
      tickRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Center sprite in canvas
      const P = Math.max(2, Math.floor(canvas.width / 36));
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + Math.sin(tickRef.current * 0.08) * (P * 0.6);

      ctx.translate(centerX, centerY);
      if (isFlipped) {
        ctx.scale(-1, 1);
      }

      const resolveColor = (vibrantColor: string) => {
        if (isSilhouette) return '#18181b';
        return vibrantColor;
      };

      // 1. Soft shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(0, 16 * P, 11 * P, 3.5 * P, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Legs / Boots
      ctx.fillStyle = resolveColor('#18181b');
      ctx.fillRect(-4 * P, 10 * P, 3 * P, 6 * P);
      ctx.fillRect(1 * P, 10 * P, 3 * P, 6 * P);
      if (!isSilhouette) {
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(-4 * P, 14 * P, 2 * P, 2 * P);
        ctx.fillRect(2 * P, 14 * P, 2 * P, 2 * P);
      }

      // 3. Torso / Coat
      ctx.fillStyle = resolveColor(prof.coatColor);
      ctx.fillRect(-6 * P, 0 * P, 12 * P, 11 * P);
      if (!isSilhouette) {
        ctx.fillStyle = resolveColor(prof.accentColor);
        ctx.fillRect(-1 * P, 1 * P, 2 * P, 9 * P);
      }

      // 4. Arms
      ctx.fillStyle = resolveColor(prof.coatColor);
      ctx.fillRect(-8 * P, 1 * P, 3 * P, 8 * P);
      ctx.fillRect(5 * P, 1 * P, 3 * P, 8 * P);
      ctx.fillStyle = resolveColor(prof.skinTone);
      ctx.fillRect(-8 * P, 8 * P, 3 * P, 2 * P);
      ctx.fillRect(5 * P, 8 * P, 3 * P, 2 * P);

      // 5. Collar
      if (!isSilhouette) {
        ctx.fillStyle = resolveColor(prof.accentColor);
        ctx.fillRect(-4 * P, -1 * P, 8 * P, 3 * P);
      }

      // 6. Head & Face
      ctx.fillStyle = resolveColor(prof.skinTone);
      ctx.fillRect(-4 * P, -7 * P, 8 * P, 7 * P);

      if (!isSilhouette) {
        // Eyes
        ctx.fillStyle = '#09090b';
        ctx.fillRect(-1 * P, -5 * P, 2 * P, 2 * P);
        ctx.fillRect(2 * P, -5 * P, 2 * P, 2 * P);

        // Facial Hair
        if (prof.facialHair === 'pencil-mustache') {
          ctx.fillStyle = '#18181b';
          ctx.fillRect(0, -2 * P, 4 * P, 1 * P);
        } else if (prof.facialHair === 'bacon-goatee') {
          ctx.fillStyle = '#451a03';
          ctx.fillRect(1 * P, -2 * P, 2 * P, 1 * P);
          ctx.fillRect(1 * P, -1 * P, 2 * P, 2 * P);
        } else if (prof.facialHair === 'hobbes-beard') {
          ctx.fillStyle = '#94a3b8';
          ctx.fillRect(-2 * P, -2 * P, 6 * P, 3 * P);
        }
      }

      // 7. Hair / Wig
      const hair = resolveColor(prof.hairColor);
      ctx.fillStyle = hair;

      if (prof.hairStyle === 'periwig') {
        ctx.fillRect(-6 * P, -10 * P, 12 * P, 5 * P);
        ctx.fillRect(-8 * P, -7 * P, 3 * P, 12 * P);
        ctx.fillRect(5 * P, -7 * P, 3 * P, 12 * P);
      } else if (prof.hairStyle === 'powdered-bob') {
        ctx.fillRect(-5 * P, -9 * P, 10 * P, 4 * P);
        ctx.fillRect(-7 * P, -6 * P, 3 * P, 7 * P);
        ctx.fillRect(4 * P, -6 * P, 3 * P, 7 * P);
      } else if (prof.hairStyle === 'curls') {
        ctx.fillRect(-5 * P, -9 * P, 10 * P, 4 * P);
        ctx.fillRect(-7 * P, -6 * P, 3 * P, 9 * P);
        ctx.fillRect(4 * P, -6 * P, 3 * P, 9 * P);
      } else if (prof.hairStyle === 'bonnet') {
        ctx.fillStyle = resolveColor('#f8fafc');
        ctx.fillRect(-6 * P, -9 * P, 12 * P, 5 * P);
        ctx.fillRect(-7 * P, -5 * P, 3 * P, 7 * P);
      } else if (prof.hairStyle === 'tudor-cap') {
        ctx.fillStyle = resolveColor('#18181b');
        ctx.fillRect(-7 * P, -11 * P, 14 * P, 3 * P);
        ctx.fillRect(-5 * P, -13 * P, 10 * P, 3 * P);
      } else if (prof.hairStyle === 'buckeye') {
        // Buckeye nut head (brown) + Ohio State striped beanie cap
        ctx.fillStyle = resolveColor('#582405');
        ctx.fillRect(-6 * P, -9 * P, 12 * P, 7 * P);
        ctx.fillStyle = resolveColor('#fef08a');
        ctx.fillRect(-4 * P, -6 * P, 8 * P, 5 * P);
        // Striped Beanie cap
        ctx.fillStyle = resolveColor('#dc2626');
        ctx.fillRect(-6 * P, -11 * P, 12 * P, 2 * P);
        ctx.fillStyle = resolveColor('#cbd5e1');
        ctx.fillRect(-4 * P, -13 * P, 8 * P, 2 * P);
        ctx.fillStyle = resolveColor('#f8fafc');
        ctx.fillRect(-1 * P, -15 * P, 2 * P, 2 * P);
      } else {
        ctx.fillRect(-5 * P, -9 * P, 10 * P, 4 * P);
        ctx.fillRect(-7 * P, -6 * P, 3 * P, 7 * P);
        ctx.fillRect(4 * P, -6 * P, 3 * P, 7 * P);
      }

      // 8. Accessory
      if (!isSilhouette) {
        if (prof.accessory === 'candle') {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(6 * P, 5 * P, 3 * P, 4 * P);
          ctx.fillStyle = Math.sin(tickRef.current * 0.3) > 0 ? '#ef4444' : '#f59e0b';
          ctx.fillRect(7 * P, 3 * P, 2 * P, 2 * P);
        } else if (prof.accessory === 'prism') {
          ctx.fillStyle = '#67e8f9';
          ctx.fillRect(6 * P, 5 * P, 4 * P, 3 * P);
        } else if (prof.accessory === 'solo-cup') {
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(6 * P, 5 * P, 4 * P, 4 * P);
        } else {
          // Quill or Book
          ctx.fillStyle = '#92400e';
          ctx.fillRect(6 * P, 5 * P, 4 * P, 5 * P);
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(7 * P, 6 * P, 2 * P, 3 * P);
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [philosopherId, isFlipped, isSilhouette]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      style={{ imageRendering: 'pixelated', width: size, height: size }}
    />
  );
};
