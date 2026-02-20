import React, { useState } from "react";
import { useIntervalGame } from "./hooks/useIntervalGame";
import {
  IntervalMode,
  DIFFICULTY_LEVELS,
  getIntervalsForDifficulty,
} from "./constants";
import { Select } from "../components/ui";
import clsx from "clsx";

const MODES: { value: IntervalMode; label: string }[] = [
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" },
  { value: "harmonic", label: "Harmonic (simultaneous)" },
  { value: "random", label: "Random" },
];

export default function EarTraining() {
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<IntervalMode>("ascending");

  const {
    state,
    availableIntervals,
    newQuestion,
    playInterval,
    guess,
    reset,
  } = useIntervalGame(difficulty, mode);

  const accuracy =
    state.totalQuestions > 0
      ? Math.round((state.score / state.totalQuestions) * 100)
      : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Interval Ear Training
        </h2>

        {/* Settings */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            label="Difficulty"
            value={difficulty.toString()}
            onChange={(e) => {
              setDifficulty(parseInt(e.target.value, 10) as 1 | 2 | 3);
              reset();
            }}
          >
            {DIFFICULTY_LEVELS.map((d) => (
              <option key={d.level} value={d.level}>
                {d.name}
              </option>
            ))}
          </Select>

          <Select
            label="Mode"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as IntervalMode);
              reset();
            }}
          >
            {MODES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </Select>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {DIFFICULTY_LEVELS.find((d) => d.level === difficulty)?.description}
        </p>

        {/* Game area */}
        <div className="text-center mb-6">
          {!state.currentInterval ? (
            <button
              type="button"
              onClick={newQuestion}
              className="min-h-[56px] px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl transition-colors"
            >
              Start Training
            </button>
          ) : (
            <div className="space-y-4">
              {/* Result feedback */}
              {state.showAnswer && (
                <div
                  className={clsx(
                    "p-4 rounded-lg text-white font-bold text-lg",
                    state.lastGuessCorrect ? "bg-green-600" : "bg-red-600"
                  )}
                >
                  {state.lastGuessCorrect ? (
                    <>Correct! {state.streak > 1 && `${state.streak} streak!`}</>
                  ) : (
                    <>Wrong! It was {state.currentInterval.name}</>
                  )}
                </div>
              )}

              {/* Replay button */}
              <button
                type="button"
                onClick={playInterval}
                className="min-h-[56px] px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-colors"
              >
                Replay Interval
              </button>

              {/* Answer buttons */}
              {!state.showAnswer && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                  {availableIntervals.map((interval) => (
                    <button
                      key={interval.shortName}
                      type="button"
                      onClick={() => guess(interval.shortName)}
                      className="min-h-[44px] px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
                    >
                      <div className="text-sm font-bold">{interval.shortName}</div>
                      <div className="text-xs opacity-70">{interval.name}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Next button */}
              {state.showAnswer && (
                <button
                  type="button"
                  onClick={newQuestion}
                  className="min-h-[56px] px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl transition-colors"
                >
                  Next Interval
                </button>
              )}
            </div>
          )}
        </div>

        {/* Score display */}
        {state.totalQuestions > 0 && (
          <div className="flex justify-center gap-6 text-center">
            <div className="bg-white dark:bg-gray-700 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-green-600">
                {state.score}/{state.totalQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Score
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Accuracy
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-purple-600">
                {state.streak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Streak
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          How to Play
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>1. Click "Start Training" to hear an interval</li>
          <li>2. Select the interval you think you heard</li>
          <li>3. Use "Replay" if you need to hear it again</li>
          <li>4. Progress through difficulty levels as you improve</li>
        </ul>
      </div>
    </div>
  );
}
