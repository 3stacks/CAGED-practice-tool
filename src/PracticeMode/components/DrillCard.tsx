import React from "react";
import type { AllKeys, CAGED, Scales } from "../../types";

interface DrillCardProps {
  currentKey: AllKeys;
  currentShape: CAGED;
  currentScale: Scales;
}

const formatScaleName = (scale: Scales): string => {
  const names: Record<Scales, string> = {
    major: "Major",
    natural_minor: "Natural Minor",
    harmonic_minor: "Harmonic Minor",
    melodic_minor: "Melodic Minor",
    pentatonic_major: "Pentatonic Major",
    pentatonic_minor: "Pentatonic Minor",
    blues: "Blues",
    dorian: "Dorian",
    phrygian: "Phrygian",
    lydian: "Lydian",
    mixolydian: "Mixolydian",
    locrian: "Locrian",
  };
  return names[scale] || scale;
};

export function DrillCard({
  currentKey,
  currentShape,
  currentScale,
}: DrillCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="text-center">
        <div className="text-sm uppercase tracking-wide opacity-80 mb-1">
          Current Drill
        </div>
        <div className="text-5xl font-bold mb-4">{currentKey}</div>
        <div className="flex justify-center gap-4 text-lg">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="opacity-70">Shape:</span>{" "}
            <span className="font-bold">{currentShape}</span>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="opacity-70">Scale:</span>{" "}
            <span className="font-bold">{formatScaleName(currentScale)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
