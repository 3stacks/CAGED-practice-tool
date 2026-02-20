import React, { useState, ChangeEvent } from "react";
import type { AllKeys, CAGED, Scales } from "../types";
import type { DrillMode, DrillSettings } from "./types";
import { usePracticeSession, getSessionStats } from "./hooks/usePracticeSession";
import { Timer } from "./components/Timer";
import { DrillCard } from "./components/DrillCard";
import { Select, Toggle } from "../components/ui";
import { CAGED_NOTES, SCALES } from "../constants";

const ALL_KEYS: AllKeys[] = [
  "C", "G", "D", "A", "E", "B",
  "F", "Bb", "Eb", "Ab", "Db", "Gb"
];

const DRILL_MODES: { value: DrillMode; label: string; description: string }[] = [
  { value: "random_key", label: "Random Key", description: "Fixed shape/scale, random keys" },
  { value: "random_shape", label: "Random Shape", description: "Fixed key/scale, random shapes" },
  { value: "random_scale", label: "Random Scale", description: "Fixed key/shape, random scales" },
  { value: "full_random", label: "Full Random", description: "Everything randomized" },
  { value: "sequential", label: "Sequential", description: "Cycle through keys in order" },
];

const INTERVALS = [5, 10, 15, 20, 30, 45, 60];

export default function PracticeMode() {
  const [settings, setSettings] = useState<DrillSettings>({
    mode: "random_key",
    interval: 15,
    fixedKey: "C",
    fixedShape: "C",
    fixedScale: "major",
  });

  const { state, start, pause, reset, skip } = usePracticeSession(settings);
  const [showStats, setShowStats] = useState(false);

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      mode: e.target.value as DrillMode,
    }));
  };

  const handleIntervalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      interval: parseInt(e.target.value, 10),
    }));
  };

  const sessionStats = getSessionStats();
  const totalPracticeTime = sessionStats.reduce((acc, s) => acc + s.totalTime, 0);
  const totalDrills = sessionStats.reduce((acc, s) => acc + s.drillsCompleted, 0);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Practice Mode
        </h2>

        {/* Settings (only show when not running) */}
        {!state.isRunning && (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Drill Mode"
                value={settings.mode}
                onChange={handleModeChange}
              >
                {DRILL_MODES.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </Select>

              <Select
                label="Interval (seconds)"
                value={settings.interval.toString()}
                onChange={handleIntervalChange}
              >
                {INTERVALS.map((interval) => (
                  <option key={interval} value={interval}>
                    {interval}s
                  </option>
                ))}
              </Select>
            </div>

            {/* Fixed values based on mode */}
            {settings.mode !== "full_random" && (
              <div className="grid grid-cols-3 gap-4">
                {settings.mode !== "random_key" && settings.mode !== "sequential" && (
                  <Select
                    label="Fixed Key"
                    value={settings.fixedKey || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        fixedKey: e.target.value as AllKeys,
                      }))
                    }
                  >
                    {ALL_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </Select>
                )}

                {settings.mode !== "random_shape" && (
                  <Select
                    label="Fixed Shape"
                    value={settings.fixedShape || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        fixedShape: e.target.value as CAGED,
                      }))
                    }
                  >
                    {CAGED_NOTES.map((shape) => (
                      <option key={shape} value={shape}>
                        {shape}
                      </option>
                    ))}
                  </Select>
                )}

                {settings.mode !== "random_scale" && (
                  <Select
                    label="Fixed Scale"
                    value={settings.fixedScale || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        fixedScale: e.target.value as Scales,
                      }))
                    }
                  >
                    {SCALES.map((scale) => (
                      <option key={scale} value={scale}>
                        {scale.replace(/_/g, " ")}
                      </option>
                    ))}
                  </Select>
                )}
              </div>
            )}

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {DRILL_MODES.find((m) => m.value === settings.mode)?.description}
            </p>
          </div>
        )}

        {/* Current drill display */}
        <div className="mb-6">
          <DrillCard
            currentKey={state.currentKey}
            currentShape={state.currentShape}
            currentScale={state.currentScale}
          />
        </div>

        {/* Timer and controls */}
        <div className="flex flex-col items-center gap-4">
          <Timer timeRemaining={state.timeRemaining} totalTime={settings.interval} />

          <div className="flex gap-3">
            {!state.isRunning ? (
              <button
                type="button"
                onClick={start}
                className="min-h-[44px] px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Start
              </button>
            ) : (
              <button
                type="button"
                onClick={pause}
                className="min-h-[44px] px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
              >
                Pause
              </button>
            )}

            <button
              type="button"
              onClick={skip}
              disabled={!state.isRunning}
              className="min-h-[44px] px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={reset}
              className="min-h-[44px] px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Session info */}
          <div className="text-center text-gray-600 dark:text-gray-400">
            <span className="font-medium">{state.totalDrills}</span> drills this session
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <button
          type="button"
          onClick={() => setShowStats(!showStats)}
          className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white"
        >
          <span>Practice Statistics</span>
          <span>{showStats ? "−" : "+"}</span>
        </button>

        {showStats && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.floor(totalPracticeTime / 60)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Minutes
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {totalDrills}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Drills
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {sessionStats.length} sessions recorded
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
