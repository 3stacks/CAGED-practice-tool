import React from "react";
import type { CAGED } from "../types";
import type { ChordVoicing } from "./types";
import { CAGED_MAJOR_SHAPES, CAGED_MINOR_SHAPES } from "./constants";

interface ChordDiagramProps {
  shape: CAGED;
  isMinor?: boolean;
  title?: string;
}

const STRING_NAMES = ["E", "A", "D", "G", "B", "e"];

export default function ChordDiagram({
  shape,
  isMinor = false,
  title,
}: ChordDiagramProps) {
  const voicing: ChordVoicing = isMinor
    ? CAGED_MINOR_SHAPES[shape]
    : CAGED_MAJOR_SHAPES[shape];

  // Calculate dimensions
  const width = 120;
  const height = 150;
  const padding = { top: 30, right: 15, bottom: 20, left: 25 };
  const fretCount = 5;
  const stringCount = 6;

  const diagramWidth = width - padding.left - padding.right;
  const diagramHeight = height - padding.top - padding.bottom;
  const stringSpacing = diagramWidth / (stringCount - 1);
  const fretSpacing = diagramHeight / fretCount;

  // Find the fret range to display
  const playedFrets = voicing.frets.filter(
    (f): f is number => typeof f === "number" && f > 0
  );
  const minFret = Math.min(...playedFrets, 1);
  const baseFret = voicing.baseFret || (minFret > 3 ? minFret : 1);

  const getStringX = (stringIndex: number) =>
    padding.left + stringIndex * stringSpacing;

  const getFretY = (fret: number) =>
    padding.top + (fret - baseFret + 1) * fretSpacing;

  return (
    <div className="flex flex-col items-center">
      {title && (
        <span className="text-sm font-bold mb-1 dark:text-white">{title}</span>
      )}
      <svg
        width={width}
        height={height}
        className="bg-amber-50 dark:bg-amber-900/30 rounded"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Fret position indicator */}
        {baseFret > 1 && (
          <text
            x={padding.left - 8}
            y={padding.top + fretSpacing / 2 + 4}
            className="fill-gray-700 dark:fill-gray-300"
            fontSize="10"
            textAnchor="end"
          >
            {baseFret}fr
          </text>
        )}

        {/* Nut (only show if at first position) */}
        {baseFret === 1 && (
          <rect
            x={padding.left - 2}
            y={padding.top - 4}
            width={diagramWidth + 4}
            height={4}
            className="fill-gray-800 dark:fill-gray-200"
          />
        )}

        {/* Fret lines */}
        {Array.from({ length: fretCount + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={padding.left}
            y1={padding.top + i * fretSpacing}
            x2={width - padding.right}
            y2={padding.top + i * fretSpacing}
            className="stroke-gray-400 dark:stroke-gray-500"
            strokeWidth={1}
          />
        ))}

        {/* String lines */}
        {Array.from({ length: stringCount }).map((_, i) => (
          <line
            key={`string-${i}`}
            x1={getStringX(i)}
            y1={padding.top}
            x2={getStringX(i)}
            y2={height - padding.bottom}
            className="stroke-gray-600 dark:stroke-gray-400"
            strokeWidth={1}
          />
        ))}

        {/* String labels */}
        {STRING_NAMES.map((name, i) => (
          <text
            key={`label-${i}`}
            x={getStringX(i)}
            y={height - 5}
            className="fill-gray-500 dark:fill-gray-400"
            fontSize="8"
            textAnchor="middle"
          >
            {name}
          </text>
        ))}

        {/* Finger positions and X/O markers */}
        {voicing.frets.map((fret, stringIndex) => {
          const x = getStringX(stringIndex);

          if (fret === "x") {
            // Muted string - X marker
            return (
              <text
                key={`marker-${stringIndex}`}
                x={x}
                y={padding.top - 10}
                className="fill-gray-600 dark:fill-gray-400"
                fontSize="12"
                textAnchor="middle"
                fontWeight="bold"
              >
                ×
              </text>
            );
          }

          if (fret === 0) {
            // Open string - O marker
            return (
              <circle
                key={`marker-${stringIndex}`}
                cx={x}
                cy={padding.top - 12}
                r={5}
                className="fill-none stroke-gray-600 dark:stroke-gray-400"
                strokeWidth={1.5}
              />
            );
          }

          // Fretted note
          const y = getFretY(fret) - fretSpacing / 2;
          const finger = voicing.fingers[stringIndex];

          return (
            <g key={`finger-${stringIndex}`}>
              <circle
                cx={x}
                cy={y}
                r={8}
                className="fill-gray-800 dark:fill-gray-200"
              />
              {finger > 0 && (
                <text
                  x={x}
                  y={y + 3.5}
                  className="fill-white dark:fill-gray-800"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {finger}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
