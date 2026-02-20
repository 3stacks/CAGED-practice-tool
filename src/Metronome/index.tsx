import React from "react";
import { useMetronome, TimeSignature } from "./hooks/useMetronome";
import { Select, Toggle } from "../components/ui";

const TIME_SIGNATURES: TimeSignature[] = ["4/4", "3/4", "6/8"];

const getBeatsPerMeasure = (ts: TimeSignature): number => {
  switch (ts) {
    case "4/4":
      return 4;
    case "3/4":
      return 3;
    case "6/8":
      return 6;
    default:
      return 4;
  }
};

export default function Metronome() {
  const {
    state,
    start,
    stop,
    setBpm,
    setTimeSignature,
    toggleAccent,
    tapTempo,
  } = useMetronome();

  const beatsPerMeasure = getBeatsPerMeasure(state.timeSignature);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Metronome
        </h2>

        {/* BPM Display */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
            {state.bpm}
          </div>
          <div className="text-gray-600 dark:text-gray-400">BPM</div>
        </div>

        {/* Beat indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: beatsPerMeasure }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-100 ${
                state.isPlaying && state.currentBeat === i
                  ? i === 0 && state.accentDownbeat
                    ? "bg-red-500 scale-125"
                    : "bg-blue-500 scale-125"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* BPM Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="40"
            max="240"
            value={state.bpm}
            onChange={(e) => setBpm(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>40</span>
            <span>240</span>
          </div>
        </div>

        {/* BPM increment buttons */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setBpm(state.bpm - 10)}
            className="min-h-[44px] px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            -10
          </button>
          <button
            type="button"
            onClick={() => setBpm(state.bpm - 1)}
            className="min-h-[44px] px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            -1
          </button>
          <button
            type="button"
            onClick={() => setBpm(state.bpm + 1)}
            className="min-h-[44px] px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            +1
          </button>
          <button
            type="button"
            onClick={() => setBpm(state.bpm + 10)}
            className="min-h-[44px] px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            +10
          </button>
        </div>

        {/* Settings row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            label="Time Signature"
            value={state.timeSignature}
            onChange={(e) => setTimeSignature(e.target.value as TimeSignature)}
          >
            {TIME_SIGNATURES.map((ts) => (
              <option key={ts} value={ts}>
                {ts}
              </option>
            ))}
          </Select>

          <div className="flex flex-col">
            <Toggle
              label="Accent downbeat"
              checked={state.accentDownbeat}
              onChange={toggleAccent}
            />
          </div>
        </div>

        {/* Main controls */}
        <div className="flex gap-3 justify-center">
          {!state.isPlaying ? (
            <button
              type="button"
              onClick={start}
              className="min-h-[56px] px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
          ) : (
            <button
              type="button"
              onClick={stop}
              className="min-h-[56px] px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 6h12v12H6z" />
              </svg>
              Stop
            </button>
          )}

          <button
            type="button"
            onClick={tapTempo}
            className="min-h-[56px] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-colors"
          >
            Tap Tempo
          </button>
        </div>
      </div>
    </div>
  );
}
