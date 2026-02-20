import React, { ChangeEvent, useState } from "react";
import String from "../String/index";
import type { AllKeys, CAGED, Notes, ScaleDegree, Scales } from "../types";
import { CAGED_NOTES, KEY_CHORDS, SCALES } from "../constants";
import FretNumbers from "../FretNumbers";
import { mod } from "../utils";
import { parseScaleName } from "./utils";
import { Select, Toggle } from "../components/ui";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { usePinchZoom } from "../hooks/usePinchZoom";
import ChordDiagram from "../ChordDiagram";

// All 12 keys grouped for dropdown
const NATURAL_KEYS: AllKeys[] = ["C", "G", "D", "A", "E", "B"];
const FLAT_KEYS: AllKeys[] = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

export default function CAGED() {
  const [activeKey, setActiveKey] = useState<AllKeys | "">("");
  const [activeShape, setActiveShape] = useState<CAGED | "all" | "">("");
  const [activeScale, setActiveScale] = useState<Scales>("major");
  const [triadMode, setTriadMode] = useState<boolean>(false);
  const [hideAccidentals, setHideAccidentals] = useState<boolean>(false);
  const [showBothEnharmonics, setShowBothEnharmonics] = useState<boolean>(false);
  const [intervalMode, setIntervalMode] = useState<boolean>(false);
  const [relativeIntervals, setRelativeIntervals] = useState<boolean>(false);
  const [scaleDegree, setScaleDegree] = useState<ScaleDegree>("I");
  const [showControls, setShowControls] = useState<boolean>(true);

  const handleKeyChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AllKeys | "";
    setActiveKey(value);
    // Set shape to matching CAGED shape if available, otherwise default to first
    if (CAGED_NOTES.includes(value as CAGED)) {
      setActiveShape(value as CAGED);
    } else if (value) {
      setActiveShape("C"); // Default shape for non-CAGED keys
    } else {
      setActiveShape("");
    }
    setIntervalMode(!!value);
    setScaleDegree("I");
  };

  const handleShapeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveShape(e.target.value as CAGED | "all");
    setScaleDegree("I");
  };

  const handleScaleChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveScale(e.target.value as Scales);
  };

  const handleArpeggioModeChecked = (checked: boolean) => {
    setTriadMode(checked);
    setScaleDegree("I");
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    activeKey,
    setActiveKey,
    activeShape,
    setActiveShape,
    activeScale,
    setActiveScale,
    triadMode,
    setTriadMode,
    intervalMode,
    setIntervalMode,
  });

  // Pinch-to-zoom for mobile
  const { containerRef, style: zoomStyle, scale, resetZoom } = usePinchZoom(0.5, 2);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-6">
      {/* Mobile controls toggle */}
      <button
        type="button"
        onClick={() => setShowControls(!showControls)}
        className="lg:hidden mb-4 min-h-[44px] px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 font-medium"
      >
        {showControls ? "Hide Controls" : "Show Controls"}
      </button>

      {/* Controls panel - collapsible on mobile, sidebar on desktop */}
      <div
        className={`
          ${showControls ? "block" : "hidden"} lg:block
          order-2 lg:order-2
          lg:w-[340px] lg:flex-shrink-0
          mb-6 lg:mb-0
        `}
      >
        <div className="flex flex-col space-y-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6">
          {/* Key/Shape/Scale selects */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Select label="Key" value={activeKey} onChange={handleKeyChanged}>
              <option value="">None</option>
              <optgroup label="Natural Keys">
                {NATURAL_KEYS.map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </optgroup>
              <optgroup label="Flat Keys">
                {FLAT_KEYS.map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </optgroup>
            </Select>

            <Select
              label="Shape"
              value={activeShape}
              disabled={!activeKey}
              onChange={handleShapeChanged}
            >
              <option value="all">All</option>
              {CAGED_NOTES.map((note) => (
                <option value={note} key={note}>
                  {note}
                  {activeScale.includes("minor")
                    ? ` - (${CAGED_NOTES[mod(CAGED_NOTES.indexOf(note) - 1, CAGED_NOTES.length)]})`
                    : ""}
                </option>
              ))}
            </Select>

            <Select
              label="Scale"
              value={activeScale}
              onChange={handleScaleChanged}
              className="col-span-2 sm:col-span-1"
            >
              {SCALES.map((scale) => (
                <option value={scale} key={scale}>
                  {parseScaleName(scale)}
                </option>
              ))}
            </Select>
          </div>

          {/* Options */}
          <fieldset className="flex flex-col">
            <legend className="text-lg font-bold mb-2 dark:text-white">Options</legend>
            <div className="space-y-1">
              <Toggle
                label="Arpeggio mode"
                checked={triadMode}
                onChange={handleArpeggioModeChecked}
              />
              <Toggle
                label="Hide accidentals"
                checked={hideAccidentals}
                onChange={setHideAccidentals}
              />
              <Toggle
                label="Show both spellings"
                description="e.g. F#/Gb"
                checked={showBothEnharmonics}
                onChange={setShowBothEnharmonics}
              />
              <Toggle
                label="Show intervals"
                checked={intervalMode}
                onChange={setIntervalMode}
              />
            </div>
          </fieldset>

          {/* Arpeggio mode options */}
          {triadMode && activeKey && (
            <fieldset className="flex flex-col">
              <legend className="text-lg font-bold mb-2 dark:text-white">
                Arpeggio options
              </legend>
              <div className="space-y-2">
                <Toggle
                  label="Relative intervals"
                  description="e.g. ii chord: 2,4,6 → 1,3,5"
                  checked={relativeIntervals}
                  onChange={setRelativeIntervals}
                />
                <Select
                  label="Scale degree"
                  value={scaleDegree}
                  onChange={(e) => setScaleDegree(e.target.value as ScaleDegree)}
                >
                  <option value="I">I - {KEY_CHORDS[activeKey]["I"]}</option>
                  <option value="ii">ii - {KEY_CHORDS[activeKey]["ii"]}</option>
                  <option value="iii">iii - {KEY_CHORDS[activeKey]["iii"]}</option>
                  <option value="IV">IV - {KEY_CHORDS[activeKey]["IV"]}</option>
                  <option value="V">V - {KEY_CHORDS[activeKey]["V"]}</option>
                  <option value="vi">vi - {KEY_CHORDS[activeKey]["vi"]}</option>
                  <option value="vii°">vii° - {KEY_CHORDS[activeKey]["vii°"]}</option>
                </Select>
              </div>
            </fieldset>
          )}

          {/* Chord diagram - show when a specific shape is selected */}
          {activeKey && activeShape && activeShape !== "all" && (
            <div className="flex flex-col items-center pt-2">
              <span className="text-sm font-medium mb-2 dark:text-gray-200">
                {activeShape} Shape Reference
              </span>
              <ChordDiagram
                shape={activeShape as CAGED}
                isMinor={activeScale.includes("minor")}
                title={`${activeShape} ${activeScale.includes("minor") ? "minor" : "major"}`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Fretboard - horizontal scroll on mobile with pinch-to-zoom */}
      <div className="order-1 lg:order-1 flex-1 mb-6 lg:mb-0">
        {/* Zoom reset button - only show when zoomed */}
        {scale !== 1 && (
          <button
            type="button"
            onClick={resetZoom}
            className="mb-2 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 lg:hidden"
          >
            Reset Zoom ({Math.round(scale * 100)}%)
          </button>
        )}
        <div
          ref={containerRef}
          className="overflow-x-auto pb-4 touch-pan-x"
        >
          <div className="min-w-[850px]" style={zoomStyle}>
            <div className="flex w-full flex-col space-y-3 sm:space-y-4 items-center">
              {(["E", "B", "G", "D", "A", "E"] as Notes[]).map(
                (firstNote, index) => (
                  <String
                    key={`${firstNote}-${index}`}
                    activeKey={activeKey}
                    activeShape={activeShape}
                    firstNote={firstNote}
                    triadMode={triadMode}
                    hideAccidentals={hideAccidentals}
                    showBothEnharmonics={showBothEnharmonics}
                    intervalMode={intervalMode}
                    scaleDegree={scaleDegree}
                    relativeIntervals={relativeIntervals}
                    activeScale={activeScale}
                  />
                )
              )}
              <FretNumbers fretCount={17} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
