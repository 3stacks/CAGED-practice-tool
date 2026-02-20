export type FlatNotes = "Db" | "Eb" | "Gb" | "Ab" | "Bb";
export type SharpNotes = "C#" | "D#" | "F#" | "G#" | "A#";
export type NaturalNotes = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Notes = NaturalNotes | FlatNotes | SharpNotes;
export type Interval = [number, number];
export type ScaleInterval = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type StringNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type CAGED = "C" | "A" | "G" | "E" | "D";
export type AllKeys = "C" | "G" | "D" | "A" | "E" | "B" | "F" | "Bb" | "Eb" | "Ab" | "Db" | "Gb";
export type Scales =
  | "major"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "natural_minor"
  | "locrian"
  | "pentatonic_major"
  | "pentatonic_minor"
  | "harmonic_minor"
  | "melodic_minor"
  | "blues";
export type ScaleDegree = "I" | "ii" | "iii" | "IV" | "V" | "vi" | "vii°";
