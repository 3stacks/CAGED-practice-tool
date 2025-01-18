import React, { useState } from "react";
import "./index.css";
import String from "./String/index";
import { CAGED } from "./String/types";

export const CAGED_NOTES: CAGED[] = ["C", "A", "G", "E", "D"];

function App() {
  const [activeKey, setActiveKey] = useState<CAGED | "">("");
  const [activeShape, setActiveShape] = useState<CAGED | "all" | "">("");
  const [triadMode, setTriadMode] = useState<boolean>(false);
  const [hideAccidentals, setHideAccidentals] = useState<boolean>(false);
  const [intervalMode, setIntervalMode] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-screen-lg mx-auto flex flex-col items-between">
        <div className="w-full flex items-end justify-between mb-6">
          <h1 className="font-bold text-5xl">CAGED Study Tool</h1>
          <div className="flex items-center space-x-4 bg-gray-200 shadow-mg rounded-lg p-6">
            <fieldset className="flex flex-col">
              <legend className="text-xl font-bold mb-2">Options</legend>
              <div className="flex justify-between space-x-2">
                <label htmlFor="triad_mode">Triad mode</label>
                <input
                  type="checkbox"
                  name="triad_mode"
                  checked={triadMode}
                  onChange={(e) => setTriadMode(e.target.checked)}
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
            </fieldset>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label htmlFor="key" className="font-bold">
                  Key
                </label>
                <select
                  name="key"
                  value={activeKey}
                  onChange={(e) => {
                    setActiveKey(e.target.value as CAGED);
                    setActiveShape(e.target.value as CAGED);
                    setIntervalMode(!!e.target.value);
                  }}
                >
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
                  onChange={(e) => {
                    setActiveShape(e.target.value as CAGED);
                  }}
                >
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
                  <option value="all">All</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-8">
          <div className="pl-4 flex flex-col space-y-4 items-center">
            {(["E", "B", "G", "D", "A", "E"] as CAGED[]).map(
              (firstNote, index) => (
                <String
                  key={`${firstNote}-${index}`}
                  stringNumber={index + 1}
                  activeKey={activeKey}
                  activeShape={activeShape}
                  firstNote={firstNote}
                  triadMode={triadMode}
                  hideAccidentals={hideAccidentals}
                  intervalMode={intervalMode}
                />
              )
            )}
            <div className="w-full justify-evenly items-center text-center flex space-x-4">
              <span className="note text-black ml-4">0</span>
              <span className="note text-black">1</span>
              <span className="note text-black">2</span>
              <span className="note text-black">3</span>
              <span className="note text-black">4</span>
              <span className="note text-black">5</span>
              <span className="note text-black">6</span>
              <span className="note text-black">7</span>
              <span className="note text-black">8</span>
              <span className="note text-black">9</span>
              <span className="note text-black">10</span>
              <span className="note text-black">11</span>
              <span className="note text-black">12</span>
              <span className="note text-black">13</span>
              <span className="note text-black">14</span>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Todo</h1>
        <ul className="list-disc pl-4">
          <li>
            ⏱️ CAGED mode
            <ul className="list-disc pl-4">
              <li>✅ Select key</li>
              <li>✅ Show major scale in each position</li>
              <li>✅ Display intervals instead of notes</li>
              <li>✅ Highlight triads (1, 3, 5)</li>
              <li>
                ⏱️ Extended fretboard view - show all shapes to establish the
                overlaps between them
              </li>
              <li>
                ⏱️ &quot;Roman Numeral&quot; mode
                <ul className="list-disc pl-4">
                  <li>
                    Allow cycling through each scale degree, e.g. Key of C (C,
                    Dm, Em, F, G, Am, Bdim)
                  </li>
                  <li>show triads for each of these scale degrees</li>
                </ul>
              </li>
              <li>
                ⏱️ Show some other useful scales
                <ul className="list-disc pl-4">
                  <li>Natural minor</li>
                  <li>Pentatonic major</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
