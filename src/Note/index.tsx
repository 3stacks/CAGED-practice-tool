import React, { useMemo } from "react";
import type { CAGED, ScaleDegree, ScaleInterval, Scales } from "../types";
import {
  keyShapeRootFretPositionRange,
  MAJOR_KEYS,
  MINOR_KEYS,
  minorKeyShapeRootFretPositionRange,
} from "../constants";
import {
  getNoteClasses,
  isIntervalInTriad,
  prefixInterval,
  transformInterval,
} from "./utils";

export default function Note({
  intervalMode,
  note,
  activeKey,
  fretNumber,
  activeShape,
  hideAccidentals,
  activeScale,
  scaleDegree,
  triadMode,
  relativeIntervals,
}: {
  note: string;
  intervalMode: boolean;
  fretNumber: number;
  activeKey: CAGED | "";
  activeShape: CAGED | "all" | "";
  activeScale: Scales;
  scaleDegree: ScaleDegree;
  triadMode: boolean;
  hideAccidentals: boolean;
  relativeIntervals: boolean;
}) {
  const notesInKey = useMemo(
    () => (activeScale.includes("minor") ? MINOR_KEYS : MAJOR_KEYS),
    [activeScale]
  );

  const isInKey = activeKey ? notesInKey[activeKey].includes(note) : true;

  const isFretInRange = useMemo(() => {
    if (!activeKey || activeShape === "all") {
      return true;
    }

    const highlightRangesToUse = activeScale.includes("minor")
      ? minorKeyShapeRootFretPositionRange
      : keyShapeRootFretPositionRange;

    const highlightRange = highlightRangesToUse[activeKey][activeShape];

    if (highlightRange) {
      return fretNumber >= highlightRange[0] && fretNumber <= highlightRange[1];
    }
  }, [notesInKey, activeKey, activeShape]);

  const noteInterval = activeKey
    ? transformInterval(
        notesInKey[activeKey].indexOf(note) as ScaleInterval,
        scaleDegree,
        relativeIntervals
      ) + 1
    : 0;

  const shouldNoteBeHighlighted = useMemo(() => {
    if (!activeKey) {
      return true;
    }

    if (!isFretInRange) {
      return false;
    }

    if (activeScale === "pentatonic_major") {
      return ![4, 7].includes(noteInterval);
    }

    if (activeScale === "pentatonic_minor") {
      return ![2, 6].includes(noteInterval);
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

  if (!isInKey || (hideAccidentals && note.endsWith("b"))) {
    return <div className="note"></div>;
  }

  return (
    <div className={getNoteClasses(note, !shouldNoteBeHighlighted)}>
      {intervalMode ? prefixInterval(noteInterval, activeScale) : note}
    </div>
  );
}
