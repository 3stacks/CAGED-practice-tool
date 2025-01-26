import React, { useMemo } from "react";
import type { CAGED, ScaleDegree, ScaleInterval, Scales } from "../types";
import { keyShapeRootFretPositionRange, majorKeys } from "../constants";
import { getNoteClasses, isIntervalInTriad, transformInterval } from "./utils";

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
  const isInKey = activeKey ? majorKeys[activeKey].includes(note) : true;

  if (!isInKey || (hideAccidentals && note.endsWith("b"))) {
    return <div className="note"></div>;
  }

  const isFretInRange = useMemo(() => {
    if (!activeKey || activeShape === "all") {
      return true;
    }

    const highlightRange =
      keyShapeRootFretPositionRange[activeKey][activeShape];

    if (highlightRange) {
      return fretNumber >= highlightRange[0] && fretNumber <= highlightRange[1];
    }
  }, [activeKey, activeShape]);

  const noteInterval = activeKey
    ? transformInterval(
        majorKeys[activeKey].indexOf(note) as ScaleInterval,
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

  return (
    <div className={getNoteClasses(note, !shouldNoteBeHighlighted)}>
      {intervalMode ? noteInterval : note}
    </div>
  );
}
