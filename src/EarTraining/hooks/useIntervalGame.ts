import { useState, useCallback, useRef, useEffect } from "react";
import {
  INTERVALS,
  IntervalInfo,
  IntervalMode,
  getIntervalsForDifficulty,
} from "../constants";

interface GameState {
  currentInterval: IntervalInfo | null;
  currentMode: IntervalMode;
  rootNote: number; // MIDI note number
  score: number;
  totalQuestions: number;
  showAnswer: boolean;
  lastGuessCorrect: boolean | null;
  streak: number;
}

const MIDI_NOTES = {
  C3: 48,
  C4: 60,
  C5: 72,
};

// Generate a random note in a comfortable range
const getRandomRootNote = (): number => {
  return MIDI_NOTES.C3 + Math.floor(Math.random() * 24); // C3 to B4
};

const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export function useIntervalGame(
  difficulty: 1 | 2 | 3,
  mode: IntervalMode
) {
  const [state, setState] = useState<GameState>({
    currentInterval: null,
    currentMode: mode,
    rootNote: MIDI_NOTES.C4,
    score: 0,
    totalQuestions: 0,
    showAnswer: false,
    lastGuessCorrect: null,
    streak: 0,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const availableIntervals = getIntervalsForDifficulty(difficulty);

  // Initialize audio context
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getAudioContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Play a note using Web Audio API
  const playNote = useCallback(
    (midiNote: number, startTime: number, duration: number = 0.8) => {
      const ctx = getAudioContext();
      const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = frequency;

      gain.gain.setValueAtTime(0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    },
    [getAudioContext]
  );

  const playInterval = useCallback(() => {
    if (!state.currentInterval) return;

    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const root = state.rootNote;
    const second = root + state.currentInterval.semitones;

    const actualMode =
      state.currentMode === "random"
        ? getRandomElement(["ascending", "descending", "harmonic"] as IntervalMode[])
        : state.currentMode;

    switch (actualMode) {
      case "ascending":
        playNote(root, now, 0.8);
        playNote(second, now + 0.9, 0.8);
        break;
      case "descending":
        playNote(second, now, 0.8);
        playNote(root, now + 0.9, 0.8);
        break;
      case "harmonic":
        playNote(root, now, 1.2);
        playNote(second, now, 1.2);
        break;
    }
  }, [state.currentInterval, state.rootNote, state.currentMode, playNote, getAudioContext]);

  const newQuestion = useCallback(() => {
    const interval = getRandomElement(availableIntervals);
    const rootNote = getRandomRootNote();

    setState((prev) => ({
      ...prev,
      currentInterval: interval,
      rootNote,
      showAnswer: false,
      lastGuessCorrect: null,
    }));

    // Play the interval after a short delay
    setTimeout(() => {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const second = rootNote + interval.semitones;

      const actualMode =
        mode === "random"
          ? getRandomElement(["ascending", "descending", "harmonic"] as IntervalMode[])
          : mode;

      switch (actualMode) {
        case "ascending":
          playNote(rootNote, now, 0.8);
          playNote(second, now + 0.9, 0.8);
          break;
        case "descending":
          playNote(second, now, 0.8);
          playNote(rootNote, now + 0.9, 0.8);
          break;
        case "harmonic":
          playNote(rootNote, now, 1.2);
          playNote(second, now, 1.2);
          break;
      }
    }, 100);
  }, [availableIntervals, mode, playNote, getAudioContext]);

  const guess = useCallback(
    (intervalName: string) => {
      if (!state.currentInterval || state.showAnswer) return;

      const isCorrect = state.currentInterval.shortName === intervalName;

      setState((prev) => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        totalQuestions: prev.totalQuestions + 1,
        showAnswer: true,
        lastGuessCorrect: isCorrect,
        streak: isCorrect ? prev.streak + 1 : 0,
      }));
    },
    [state.currentInterval, state.showAnswer]
  );

  const reset = useCallback(() => {
    setState({
      currentInterval: null,
      currentMode: mode,
      rootNote: MIDI_NOTES.C4,
      score: 0,
      totalQuestions: 0,
      showAnswer: false,
      lastGuessCorrect: null,
      streak: 0,
    });
  }, [mode]);

  return {
    state,
    availableIntervals,
    newQuestion,
    playInterval,
    guess,
    reset,
  };
}
