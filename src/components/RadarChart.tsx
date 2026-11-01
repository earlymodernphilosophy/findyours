/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DimensionKey, DimensionScore, Philosopher } from '../types/philosophy';
import { PHILOSOPHICAL_DIMENSIONS } from '../data/philosophers';

interface RadarChartProps {
  userScores: DimensionScore;
  philosopher: Philosopher;
  nemesis?: Philosopher;
  showComparison?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  userScores,
  philosopher,
  nemesis,
  showComparison = true
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const size = 380;
  const center = size / 2;
  const maxRadius = 135;

  const dimensions = PHILOSOPHICAL_DIMENSIONS;
  const numAxes = dimensions.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Convert score in [-1, 1] to normalized radius [0.15, 1.0] for clean aesthetic presentation
  const normalize = (val: number) => {
    const unit = (val + 1) / 2;
    return 0.15 + unit * 0.85;
  };

  const getPoint = (dimKey: DimensionKey, score: number, index: number) => {
    const radius = normalize(score) * maxRadius;
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  };

  // Generate polygon points
  const userPoints = dimensions.map((d, i) => getPoint(d.key, userScores[d.key], i));
  const philPoints = dimensions.map((d, i) => getPoint(d.key, philosopher.scores[d.key], i));
  const nemPoints = nemesis
    ? dimensions.map((d, i) => getPoint(d.key, nemesis.scores[d.key], i))
    : null;

  const userPath = userPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const philPath = philPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const nemPath = nemPoints ? nemPoints.map((p) => `${p.x},${p.y}`).join(' ') : '';

  // Web rings
  const ringSteps = [0.35, 0.65, 1.0];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible select-none"
        >
          {/* Concentric rings */}
          {ringSteps.map((step, ringIdx) => {
            const r = step * maxRadius;
            const ringPoints = dimensions
              .map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(' ');

            return (
              <polygon
                key={ringIdx}
                points={ringPoints}
                fill="none"
                className="stroke-slate-300 dark:stroke-slate-700"
                strokeWidth={ringIdx === ringSteps.length - 1 ? 1.5 : 1}
                strokeDasharray={ringIdx === 1 ? '3 3' : undefined}
              />
            );
          })}

          {/* Spokes */}
          {dimensions.map((dim, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = center + maxRadius * Math.cos(angle);
            const y2 = center + maxRadius * Math.sin(angle);
            const labelX = center + (maxRadius + 28) * Math.cos(angle);
            const labelY = center + (maxRadius + 24) * Math.sin(angle);

            const isHovered = hoveredIndex === i;

            return (
              <g
                key={dim.key}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <line
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke={isHovered ? '#22C55E' : 'currentColor'}
                  className={isHovered ? '' : 'text-slate-300 dark:text-slate-700'}
                  strokeWidth={isHovered ? 2 : 1}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-[11px] font-sans transition-all ${
                    isHovered
                      ? 'fill-[#22C55E] font-black text-[12px]'
                      : 'fill-[#475569] dark:fill-[#94A3B8] font-medium'
                  }`}
                >
                  {dim.label.split(' ')[0]}
                </text>
              </g>
            );
          })}

          {/* Nemesis Polygon (Crimson Red with dotted border) */}
          {nemPoints && nemPath && (
            <g>
              <polygon
                points={nemPath}
                fill="#EF4444"
                fillOpacity="0.16"
                stroke="#DC2626"
                strokeWidth="2.2"
                strokeDasharray="3 3"
              />
              {nemPoints.map((p, i) => (
                <circle
                  key={`nem-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r="3.5"
                  fill="#EF4444"
                  stroke="#7F1D1D"
                  strokeWidth="1.5"
                />
              ))}
            </g>
          )}

          {/* Philosopher Polygon (Hot Neon Pink) */}
          {showComparison && (
            <g>
              <polygon
                points={philPath}
                fill="#EC4899"
                fillOpacity="0.2"
                stroke="#EC4899"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              {philPoints.map((p, i) => (
                <circle
                  key={`phil-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#EC4899"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              ))}
            </g>
          )}

          {/* User Polygon (Neon Green) */}
          <g>
            <polygon
              points={userPath}
              fill="#22C55E"
              fillOpacity="0.28"
              stroke="#22C55E"
              strokeWidth="3"
            />
            {userPoints.map((p, i) => (
              <circle
                key={`user-${i}`}
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#22C55E"
                stroke="#0F172A"
                strokeWidth="2"
              />
            ))}
          </g>

          {/* Center axis point */}
          <circle cx={center} cy={center} r="2.5" className="fill-[#0F172A] dark:fill-[#22C55E]" />
        </svg>

        {/* Hover inspection pill */}
        {hoveredIndex !== null && (
          <div className="absolute bottom-2 inset-x-2 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-sm border-2 border-[#0F172A] dark:border-[#22C55E]/50 rounded-xl p-2.5 text-center shadow-[3px_3px_0px_#22C55E]">
            <div className="text-xs font-bold text-[#0F172A] dark:text-white">
              {dimensions[hoveredIndex].label}
            </div>
            <div className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-0.5 font-mono flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5">
              <span className="text-[#15803D] dark:text-[#22C55E] font-bold">
                You: {userScores[dimensions[hoveredIndex].key] > 0 ? '+' : ''}{userScores[dimensions[hoveredIndex].key].toFixed(2)}
              </span>
              <span className="text-[#CBD5E1] dark:text-slate-600">|</span>
              <span className="text-[#DB2777] dark:text-[#EC4899] font-bold">
                {philosopher.name.split(' ')[0]}: {philosopher.scores[dimensions[hoveredIndex].key] > 0 ? '+' : ''}{philosopher.scores[dimensions[hoveredIndex].key].toFixed(2)}
              </span>
              {nemesis && (
                <>
                  <span className="text-[#CBD5E1] dark:text-slate-600">|</span>
                  <span className="text-[#DC2626] dark:text-[#F87171] font-bold">
                    Nemesis ({nemesis.name.split(' ')[0]}): {nemesis.scores[dimensions[hoveredIndex].key] > 0 ? '+' : ''}{nemesis.scores[dimensions[hoveredIndex].key].toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend with 3 entities: User, Primary Match, Nemesis */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs font-bold">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#0F172A] shadow-xs inline-block" />
          <span className="text-[#0F172A] dark:text-white">Your Mind</span>
        </div>

        {showComparison && (
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EC4899] border-2 border-[#0F172A] shadow-xs inline-block" />
            <span className="text-[#DB2777] dark:text-[#EC4899]">{philosopher.name}</span>
          </div>
        )}

        {nemesis && (
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-[#7F1D1D] shadow-xs inline-block border-dashed" />
            <span className="text-[#DC2626] dark:text-[#F87171]">Nemesis: {nemesis.name.split(' ')[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
};
