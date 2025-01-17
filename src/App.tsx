import React, { useState } from "react";
import "./index.css";
import String from "./String";

export type CAGED = "C" | "A" | "G" | "E" | "D";

export const CAGED_NOTES: CAGED[] = ["C", "A", "G", "E", "D"];

function App() {
  const [activeKey, setActiveKey] = useState<CAGED | "">("");
  const [activeShape, setActiveShape] = useState<CAGED | "">("");
  const [triadMode, setTriadMode] = useState<boolean>(false);
  const [hideAccidentals, setHideAccidentals] = useState<boolean>(false);
  const [intervalMode, setIntervalMode] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <div>
            <label htmlFor="triad_mode">Triad mode</label>
            <input
              type="checkbox"
              name="triad_mode"
              checked={triadMode}
              onChange={(e) => setTriadMode(e.target.checked)}
            />
          </div>
          <div>
            <label htmlFor="hideAccidentals">Hide accidentals</label>
            <input
              type="checkbox"
              name="hideAccidentals"
              checked={hideAccidentals}
              onChange={(e) => setHideAccidentals(e.target.checked)}
            />
          </div>
          <div>
            <label htmlFor="intervalMode">Show intervals</label>
            <input
              type="checkbox"
              name="intervalMode"
              checked={intervalMode}
              onChange={(e) => setIntervalMode(e.target.checked)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="key">Key</label>
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
        <div>
          <label htmlFor="shape">Shape</label>
          <select
            name="shape"
            value={activeShape}
            onChange={(e) => {
              setActiveShape(e.target.value as CAGED);
            }}
          >
            {activeKey ? (
              CAGED_NOTES.slice(CAGED_NOTES.indexOf(activeKey))
                .concat(CAGED_NOTES.slice(0, CAGED_NOTES.indexOf(activeKey)))
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
      </div>
      <div className="flex items-center mb-8">
        <div className="pl-4 flex flex-col space-y-4 items-center">
          {(["E", "B", "G", "D", "A", "E"] as CAGED[]).map(
            (firstNote, index) => (
              <String
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
            <span className="note ml-4">0</span>
            <span className="note">1</span>
            <span className="note">2</span>
            <span className="note">3</span>
            <span className="note">4</span>
            <span className="note">5</span>
            <span className="note">6</span>
            <span className="note">7</span>
            <span className="note">8</span>
            <span className="note">9</span>
            <span className="note">10</span>
            <span className="note">11</span>
            <span className="note">12</span>
            <span className="note">13</span>
            <span className="note">14</span>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">Todo</h1>
      <ul className="list-disc pl-4">
        <li>✅ Hide accidentals toggle</li>
        <li>
          ⏱️ CAGED mode
          <ul className="list-disc pl-4">
            <li>✅ Select key</li>
            <li>✅ Show major scale in each position</li>
            <li>✅ Display intervals instead of notes</li>
            <li>✅ Highlight triads (1, 3, 5)</li>
            <li>
              &quot;Roman Numeral&quot; mode
              <ul className="list-disc pl-4">
                <li>
                  Allow cycling through each scale degree, e.g. Key of C (C, Dm,
                  Em, F, G, Am, Bdim)
                </li>
                <li>show triads for each of these scale degrees</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
