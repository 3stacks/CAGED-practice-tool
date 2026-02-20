import { useState, useEffect, useCallback, useRef } from "react";
import type { AllKeys, CAGED, Scales } from "../../types";
import type { DrillSettings, DrillState, SessionStats } from "../types";
import { CAGED_NOTES, SCALES } from "../../constants";

const ALL_KEYS: AllKeys[] = [
  "C", "G", "D", "A", "E", "B",
  "F", "Bb", "Eb", "Ab", "Db", "Gb"
];

const STORAGE_KEY = "caged-practice-stats";

const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export function usePracticeSession(settings: DrillSettings) {
  const [state, setState] = useState<DrillState>({
    currentKey: settings.fixedKey || "C",
    currentShape: settings.fixedShape || "C",
    currentScale: settings.fixedScale || "major",
    isRunning: false,
    timeRemaining: settings.interval,
    totalDrills: 0,
    startTime: null,
  });

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio("/click.m4a");
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current = null;
    };
  }, []);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Audio play failed - user hasn't interacted yet
      });
    }
  }, []);

  const getNextDrill = useCallback(() => {
    let key = state.currentKey;
    let shape = state.currentShape;
    let scale = state.currentScale;

    switch (settings.mode) {
      case "random_key":
        key = getRandomElement(ALL_KEYS);
        shape = settings.fixedShape || state.currentShape;
        scale = settings.fixedScale || state.currentScale;
        break;
      case "random_shape":
        key = settings.fixedKey || state.currentKey;
        shape = getRandomElement(CAGED_NOTES);
        scale = settings.fixedScale || state.currentScale;
        break;
      case "random_scale":
        key = settings.fixedKey || state.currentKey;
        shape = settings.fixedShape || state.currentShape;
        scale = getRandomElement(SCALES);
        break;
      case "full_random":
        key = getRandomElement(ALL_KEYS);
        shape = getRandomElement(CAGED_NOTES);
        scale = getRandomElement(SCALES);
        break;
      case "sequential": {
        // Cycle through keys in order
        const currentKeyIndex = ALL_KEYS.indexOf(state.currentKey);
        key = ALL_KEYS[(currentKeyIndex + 1) % ALL_KEYS.length];
        shape = settings.fixedShape || state.currentShape;
        scale = settings.fixedScale || state.currentScale;
        break;
      }
    }

    return { key, shape, scale };
  }, [settings, state.currentKey, state.currentShape, state.currentScale]);

  const advanceDrill = useCallback(() => {
    const { key, shape, scale } = getNextDrill();
    playSound();

    setState((prev) => ({
      ...prev,
      currentKey: key,
      currentShape: shape,
      currentScale: scale,
      timeRemaining: settings.interval,
      totalDrills: prev.totalDrills + 1,
    }));
  }, [getNextDrill, playSound, settings.interval]);

  const start = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
      startTime: Date.now(),
      timeRemaining: settings.interval,
    }));
  }, [settings.interval]);

  const pause = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
    }));
  }, []);

  const reset = useCallback(() => {
    // Save session stats before resetting
    if (state.startTime && state.totalDrills > 0) {
      const sessionStats: SessionStats = {
        totalTime: Math.floor((Date.now() - state.startTime) / 1000),
        drillsCompleted: state.totalDrills,
        date: new Date().toISOString(),
      };

      const existing = localStorage.getItem(STORAGE_KEY);
      const stats: SessionStats[] = existing ? JSON.parse(existing) : [];
      stats.push(sessionStats);
      // Keep only last 50 sessions
      if (stats.length > 50) {
        stats.shift();
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }

    setState({
      currentKey: settings.fixedKey || "C",
      currentShape: settings.fixedShape || "C",
      currentScale: settings.fixedScale || "major",
      isRunning: false,
      timeRemaining: settings.interval,
      totalDrills: 0,
      startTime: null,
    });
  }, [settings, state.startTime, state.totalDrills]);

  const skip = useCallback(() => {
    advanceDrill();
  }, [advanceDrill]);

  // Timer effect
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = window.setInterval(() => {
        setState((prev) => {
          if (prev.timeRemaining <= 1) {
            // Time's up - advance to next drill
            const { key, shape, scale } = getNextDrill();
            playSound();
            return {
              ...prev,
              currentKey: key,
              currentShape: shape,
              currentScale: scale,
              timeRemaining: settings.interval,
              totalDrills: prev.totalDrills + 1,
            };
          }
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          };
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, settings.interval, getNextDrill, playSound]);

  return {
    state,
    start,
    pause,
    reset,
    skip,
  };
}

export function getSessionStats(): SessionStats[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
