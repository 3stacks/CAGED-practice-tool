export type Notes =
  | "C"
  | "Db"
  | "D"
  | "Eb"
  | "E"
  | "F"
  | "Gb"
  | "G"
  | "Ab"
  | "A"
  | "Bb"
  | "B";
export type Interval = [number, number];
export type ScaleInterval = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type StringNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type CAGED = "C" | "A" | "G" | "E" | "D";
export type Scales =
  | "major"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "natural_minor"
  | "locrian"
  | "pentatonic_major"
  | "pentatonic_minor";
export type ScaleDegree = "I" | "ii" | "iii" | "IV" | "V" | "vi" | "vii°";
