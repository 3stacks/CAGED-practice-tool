import React from "react";

export default function Todo() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Todo</h1>
      <ul className="list-disc pl-4">
        <li>
          ✅ CAGED mode
          <ul className="list-disc pl-4">
            <li>
              ✅ &quot;Roman Numeral&quot; mode
              <ul className="list-disc pl-4">
                <li>
                  ✅ Allow cycling through each scale degree, e.g. Key of C (C,
                  Dm, Em, F, G, Am, Bdim)
                </li>
                <li>✅ show triads for each of these scale degrees</li>
                <li>⏱️ show scale degrees relative to the parent scale</li>
              </ul>
            </li>
            <li>
              ✅ Ability to select scales
              <ul className="list-disc pl-4">
                <li>✅ Major</li>
                <li>⏱️ Natural minor</li>
                <li>✅ Pentatonic major</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>⏱️ Mobile support</li>
      </ul>
    </div>
  );
}
