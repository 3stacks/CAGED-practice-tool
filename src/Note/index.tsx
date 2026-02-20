import React, { useMemo } from "react";
import type {
  AllKeys,
  CAGED,
  Notes,
  ScaleDegree,
  ScaleInterval,
  Scales,
} from "../types";
import {
  ENHARMONIC_MAP,
  getScaleNotes,
  getShapeFretRange,
} from "../constants";
import {
  getNoteClasses,
  isIntervalInTriad,
  prefixInterval,
  transformInterval,
  findNoteIndex,
  isNoteInArray,
} from "./utils";

export default function Note({
  intervalMode,
  note,
  activeKey,
  fretNumber,
  activeShape,
  hideAccidentals,
  showBothEnharmonics,
  activeScale,
  scaleDegree,
  triadMode,
  relativeIntervals,
}: {
  note: Notes;
  intervalMode: boolean;
  fretNumber: number;
  activeKey: AllKeys | "";
  activeShape: CAGED | "all" | "";
  activeScale: Scales;
  scaleDegree: ScaleDegree;
  triadMode: boolean;
  hideAccidentals: boolean;
  showBothEnharmonics: boolean;
  relativeIntervals: boolean;
}) {
  const notesInKey = useMemo(
    () => getScaleNotes(activeKey as Notes, activeScale),
    [activeScale, activeKey]
  );

  const isInKey = activeKey ? isNoteInArray(notesInKey, note) : true;

  const isFretInRange = useMemo(() => {
    if (!activeKey || activeShape === "all") {
      return true;
    }

    const isMinor = activeScale.includes("minor");
    const highlightRange = getShapeFretRange(activeKey, activeShape, isMinor);

    if (highlightRange) {
      return fretNumber >= highlightRange[0] && fretNumber <= highlightRange[1];
    }
    return false;
  }, [activeKey, activeShape, activeScale, fretNumber]);

  // Get the index of this note in the scale
  const noteIndexInScale = findNoteIndex(notesInKey, note);

  const noteInterval = activeKey
    ? transformInterval(
        noteIndexInScale as ScaleInterval,
        scaleDegree,
        relativeIntervals
      ) + 1
    : 0;

  // Get the correct enharmonic spelling from the scale (e.g., F# instead of Gb)
  const displayNote = activeKey && noteIndexInScale >= 0
    ? notesInKey[noteIndexInScale] || note
    : note;

  const shouldNoteBeHighlighted = useMemo(() => {
    if (!activeKey) {
      return true;
    }

    if (!isFretInRange) {
      return false;
    }

    if (triadMode) {
      if (relativeIntervals) {
        return [1, 3, 5].includes(noteInterval);
      }

      return isIntervalInTriad(noteInterval, scaleDegree);
    }

    return isFretInRange;
  }, [
    activeKey,
    activeScale,
    isFretInRange,
    noteInterval,
    relativeIntervals,
    scaleDegree,
    triadMode,
  ]);

  const isAccidental = displayNote.endsWith("b") || displayNote.includes("#");
  if (!isInKey || (hideAccidentals && isAccidental)) {
    return <div className="note"></div>;
  }

  // Get the display text (with optional enharmonic)
  const getDisplayText = () => {
    if (intervalMode) {
      return prefixInterval(noteInterval, activeScale);
    }
    if (showBothEnharmonics && isAccidental) {
      const enharmonic = ENHARMONIC_MAP[displayNote as string];
      if (enharmonic && enharmonic !== displayNote) {
        return `${displayNote}/${enharmonic}`;
      }
    }
    return displayNote;
  };

  return (
    <div className={getNoteClasses(displayNote, !shouldNoteBeHighlighted)}>
      {getDisplayText()}
    </div>
  );
}
