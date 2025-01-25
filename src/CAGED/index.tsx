import React, { ChangeEvent, useState } from "react";
import String from "../String/index";
import type { CAGED, Notes, ScaleDegree, Scales, StringNumber } from "../types";
import { CAGED_NOTES, KEY_CHORDS } from "../constants";
import FretNumbers from "../FretNumbers";

function CAGED() {
  const [activeKey, setActiveKey] = useState<CAGED | "">("");
  const [activeShape, setActiveShape] = useState<CAGED | "all" | "">("");
  const [activeScale, setActiveScale] = useState<Scales>("major");
  const [triadMode, setTriadMode] = useState<boolean>(false);
  const [hideAccidentals, setHideAccidentals] = useState<boolean>(false);
  const [intervalMode, setIntervalMode] = useState<boolean>(false);
  const [relativeIntervals, setRelativeIntervals] = useState<boolean>(false);
  const [scaleDegree, setScaleDegree] = useState<ScaleDegree>("I");

  const handleKeyChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CAGED | "";

    setActiveKey(value);
    setActiveShape(value);
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

  const handleArpeggioModeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setTriadMode(e.target.checked);
    setScaleDegree("I");
  };

  return (
    <>
      <div className="flex w-full items-center mb-8">
        <div className="flex w-full flex-col space-y-4 items-center overflow-auto">
          {(["E", "B", "G", "D", "A", "E"] as Notes[]).map(
            (firstNote, index) => (
              <String
                key={`${firstNote}-${index}`}
                stringNumber={(index + 1) as StringNumber}
                activeKey={activeKey}
                activeShape={activeShape}
                firstNote={firstNote}
                triadMode={triadMode}
                hideAccidentals={hideAccidentals}
                intervalMode={intervalMode}
                scaleDegree={scaleDegree}
                relativeIntervals={relativeIntervals}
                activeScale={activeScale}
              />
            )
          )}
          <FretNumbers fretCount={16} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-stretch space-y-4 bg-gray-200 shadow-mg rounded-lg p-6 self-start w-[340px]">
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col">
              <label htmlFor="key" className="font-bold">
                Key
              </label>
              <select name="key" value={activeKey} onChange={handleKeyChanged}>
                <option value="">None</option>
                <option value="C">C</option>
                <option value="A">A</option>
                <option value="G">G</option>
                <option value="E">E</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="shape" className="font-bold">
                Shape
              </label>
              <select
                name="shape"
                value={activeShape}
                disabled={!activeKey}
                onChange={handleShapeChanged}
              >
                <option value="all">All</option>
                {activeKey ? (
                  CAGED_NOTES.slice(CAGED_NOTES.indexOf(activeKey))
                    .concat(
                      CAGED_NOTES.slice(0, CAGED_NOTES.indexOf(activeKey))
                    )
                    .map((note) => (
                      <option value={note} key={note}>
                        {note}
                      </option>
                    ))
                ) : (
                  <>
                    <option value="C">C</option>
                    <option value="A">A</option>
                    <option value="G">G</option>
                    <option value="E">E</option>
                    <option value="D">D</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="active_scale" className="font-bold">
                Scale
              </label>
              <select
                name="active_scale"
                value={activeScale}
                onChange={handleScaleChanged}
              >
                <option value="major">Major</option>
                <option value="pentatonic_major">Pentatonic Major</option>
              </select>
            </div>
          </div>
          <fieldset className="flex flex-col">
            <legend className="text-xl font-bold mb-2">Options</legend>
            <div className="flex justify-between items-start space-x-4">
              <div className="flex flex-col">
                <div className="flex justify-between space-x-2">
                  <label htmlFor="triad_mode">Arpeggio mode</label>
                  <input
                    type="checkbox"
                    name="triad_mode"
                    checked={triadMode}
                    onChange={handleArpeggioModeChecked}
                  />
                </div>
                <div className="flex justify-between space-x-2">
                  <label htmlFor="hideAccidentals">Hide accidentals</label>
                  <input
                    type="checkbox"
                    name="hideAccidentals"
                    checked={hideAccidentals}
                    onChange={(e) => setHideAccidentals(e.target.checked)}
                  />
                </div>
                <div className="flex justify-between space-x-2">
                  <label htmlFor="intervalMode">Show intervals</label>
                  <input
                    type="checkbox"
                    name="intervalMode"
                    checked={intervalMode}
                    onChange={(e) => setIntervalMode(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </fieldset>
          {triadMode && activeKey && (
            <fieldset className="flex flex-col">
              <legend className="text-xl font-bold mb-2">
                Arpeggio mode options
              </legend>
              <div className="flex flex-col">
                <div className="flex justify-between space-x-2">
                  <label htmlFor="relative_intervals">
                    Show relative intervals
                  </label>
                  <input
                    type="checkbox"
                    name="relative_intervals"
                    checked={relativeIntervals}
                    onChange={(e) => setRelativeIntervals(e.target.checked)}
                  />
                </div>
                <p className="text-xs">
                  e.g. ii chord intervals go from 2, 4, 6 to 1, 3, 5
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="scale_degree" className="font-bold">
                  Scale degree
                </label>
                <select
                  name="scale_degree"
                  value={scaleDegree}
                  onChange={(e) => {
                    setScaleDegree(e.target.value as ScaleDegree);
                  }}
                >
                  <option value="I">I - {KEY_CHORDS[activeKey]["I"]}</option>
                  <option value="ii">ii - {KEY_CHORDS[activeKey]["ii"]}</option>
                  <option value="iii">
                    iii - {KEY_CHORDS[activeKey]["iii"]}
                  </option>
                  <option value="IV">IV - {KEY_CHORDS[activeKey]["IV"]}</option>
                  <option value="V">V - {KEY_CHORDS[activeKey]["V"]}</option>
                  <option value="vi">vi - {KEY_CHORDS[activeKey]["vi"]}</option>
                  <option value="vii°">
                    vii° - {KEY_CHORDS[activeKey]["vii°"]}
                  </option>
                </select>
              </div>
            </fieldset>
          )}
        </div>
      </div>
    </>
  );
}

export default CAGED;
