import type { AllKeys, CAGED, Scales } from "../types";

export type DrillMode =
  | "random_key"
  | "random_shape"
  | "random_scale"
  | "full_random"
  | "sequential";

export interface DrillSettings {
  mode: DrillMode;
  interval: number; // seconds
  fixedKey?: AllKeys;
  fixedShape?: CAGED;
  fixedScale?: Scales;
}

export interface DrillState {
  currentKey: AllKeys;
  currentShape: CAGED;
  currentScale: Scales;
  isRunning: boolean;
  timeRemaining: number;
  totalDrills: number;
  startTime: number | null;
}

export interface SessionStats {
  totalTime: number;
  drillsCompleted: number;
  date: string;
}
