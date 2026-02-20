import { useState, useEffect, useRef, useCallback } from "react";

export type TimeSignature = "4/4" | "3/4" | "6/8";

interface MetronomeState {
  isPlaying: boolean;
  bpm: number;
  timeSignature: TimeSignature;
  currentBeat: number;
  accentDownbeat: boolean;
}

const getBeatsPerMeasure = (timeSignature: TimeSignature): number => {
  switch (timeSignature) {
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

export function useMetronome() {
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    bpm: 120,
    timeSignature: "4/4",
    currentBeat: 0,
    accentDownbeat: true,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);
  const currentBeatRef = useRef<number>(0);

  // Tap tempo tracking
  const tapTimesRef = useRef<number[]>([]);

  // Create click sound using Web Audio API
  const playClick = useCallback((isAccent: boolean) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Higher pitch for accent
    osc.frequency.value = isAccent ? 1000 : 800;
    osc.type = "square";

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  // Scheduler - runs slightly ahead to ensure accurate timing
  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const beatsPerMeasure = getBeatsPerMeasure(state.timeSignature);
    const secondsPerBeat = 60.0 / state.bpm;

    // Schedule notes 100ms ahead
    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      const isAccent = state.accentDownbeat && currentBeatRef.current === 0;
      playClick(isAccent);

      // Update visual beat indicator
      setState((prev) => ({
        ...prev,
        currentBeat: currentBeatRef.current,
      }));

      // Advance beat
      currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasure;
      nextNoteTimeRef.current += secondsPerBeat;
    }
  }, [state.bpm, state.timeSignature, state.accentDownbeat, playClick]);

  const start = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    // Resume if suspended (autoplay policy)
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    currentBeatRef.current = 0;
    nextNoteTimeRef.current = audioContextRef.current.currentTime;

    setState((prev) => ({ ...prev, isPlaying: true, currentBeat: 0 }));
  }, []);

  const stop = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false, currentBeat: 0 }));
    currentBeatRef.current = 0;
  }, []);

  const setBpm = useCallback((bpm: number) => {
    const clampedBpm = Math.min(240, Math.max(40, bpm));
    setState((prev) => ({ ...prev, bpm: clampedBpm }));
  }, []);

  const setTimeSignature = useCallback((ts: TimeSignature) => {
    setState((prev) => ({ ...prev, timeSignature: ts }));
    currentBeatRef.current = 0;
  }, []);

  const toggleAccent = useCallback(() => {
    setState((prev) => ({ ...prev, accentDownbeat: !prev.accentDownbeat }));
  }, []);

  const tapTempo = useCallback(() => {
    const now = Date.now();
    const taps = tapTimesRef.current;

    // Clear old taps (more than 2 seconds ago)
    while (taps.length > 0 && now - taps[0] > 2000) {
      taps.shift();
    }

    taps.push(now);

    // Need at least 2 taps to calculate tempo
    if (taps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avgInterval);
      setBpm(newBpm);
    }
  }, [setBpm]);

  // Run scheduler when playing
  useEffect(() => {
    if (state.isPlaying) {
      timerIdRef.current = window.setInterval(scheduler, 25);
    } else if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [state.isPlaying, scheduler]);

  // Cleanup audio context
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    state,
    start,
    stop,
    setBpm,
    setTimeSignature,
    toggleAccent,
    tapTempo,
  };
}
