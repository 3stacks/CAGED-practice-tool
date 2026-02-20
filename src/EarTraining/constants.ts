export interface IntervalInfo {
  name: string;
  shortName: string;
  semitones: number;
  difficulty: 1 | 2 | 3; // 1 = easy, 2 = medium, 3 = hard
}

export const INTERVALS: IntervalInfo[] = [
  { name: "Unison", shortName: "P1", semitones: 0, difficulty: 1 },
  { name: "Minor 2nd", shortName: "m2", semitones: 1, difficulty: 2 },
  { name: "Major 2nd", shortName: "M2", semitones: 2, difficulty: 2 },
  { name: "Minor 3rd", shortName: "m3", semitones: 3, difficulty: 1 },
  { name: "Major 3rd", shortName: "M3", semitones: 4, difficulty: 1 },
  { name: "Perfect 4th", shortName: "P4", semitones: 5, difficulty: 1 },
  { name: "Tritone", shortName: "TT", semitones: 6, difficulty: 2 },
  { name: "Perfect 5th", shortName: "P5", semitones: 7, difficulty: 1 },
  { name: "Minor 6th", shortName: "m6", semitones: 8, difficulty: 3 },
  { name: "Major 6th", shortName: "M6", semitones: 9, difficulty: 3 },
  { name: "Minor 7th", shortName: "m7", semitones: 10, difficulty: 2 },
  { name: "Major 7th", shortName: "M7", semitones: 11, difficulty: 3 },
  { name: "Octave", shortName: "P8", semitones: 12, difficulty: 1 },
];

export type IntervalMode = "ascending" | "descending" | "harmonic" | "random";

export const DIFFICULTY_LEVELS = [
  { level: 1, name: "Easy", description: "Unison, 3rds, 4ths, 5ths, Octave" },
  { level: 2, name: "Medium", description: "+ 2nds, Tritone, 7ths" },
  { level: 3, name: "Hard", description: "All intervals including 6ths" },
];

export const getIntervalsForDifficulty = (maxDifficulty: 1 | 2 | 3): IntervalInfo[] => {
  return INTERVALS.filter((i) => i.difficulty <= maxDifficulty);
};
