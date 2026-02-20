import { useEffect, useCallback } from "react";
import type { AllKeys, CAGED, Scales } from "../types";
import { CAGED_NOTES, SCALES } from "../constants";

const NATURAL_KEYS: AllKeys[] = ["C", "G", "D", "A", "E", "B"];
const FLAT_KEYS: AllKeys[] = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];
const ALL_KEYS: AllKeys[] = [...NATURAL_KEYS, ...FLAT_KEYS];

interface KeyboardShortcutsOptions {
  activeKey: AllKeys | "";
  setActiveKey: (key: AllKeys | "") => void;
  activeShape: CAGED | "all" | "";
  setActiveShape: (shape: CAGED | "all" | "") => void;
  activeScale: Scales;
  setActiveScale: (scale: Scales) => void;
  triadMode: boolean;
  setTriadMode: (mode: boolean) => void;
  intervalMode: boolean;
  setIntervalMode: (mode: boolean) => void;
}

export function useKeyboardShortcuts({
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
}: KeyboardShortcutsOptions) {
  const cycleKey = useCallback(
    (direction: 1 | -1) => {
      if (!activeKey) {
        setActiveKey(ALL_KEYS[0]);
        return;
      }
      const currentIndex = ALL_KEYS.indexOf(activeKey);
      const newIndex =
        (currentIndex + direction + ALL_KEYS.length) % ALL_KEYS.length;
      setActiveKey(ALL_KEYS[newIndex]);
    },
    [activeKey, setActiveKey]
  );

  const cycleShape = useCallback(
    (direction: 1 | -1) => {
      const shapes: (CAGED | "all")[] = ["all", ...CAGED_NOTES];
      const currentIndex =
        activeShape === "" ? 0 : shapes.indexOf(activeShape as CAGED | "all");
      const newIndex =
        (currentIndex + direction + shapes.length) % shapes.length;
      setActiveShape(shapes[newIndex]);
    },
    [activeShape, setActiveShape]
  );

  const cycleScale = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = SCALES.indexOf(activeScale);
      const newIndex =
        (currentIndex + direction + SCALES.length) % SCALES.length;
      setActiveScale(SCALES[newIndex]);
    },
    [activeScale, setActiveScale]
  );

  const selectShapeByNumber = useCallback(
    (num: number) => {
      if (num === 0) {
        setActiveShape("all");
      } else if (num >= 1 && num <= 5) {
        setActiveShape(CAGED_NOTES[num - 1]);
      }
    },
    [setActiveShape]
  );

  const clearSelection = useCallback(() => {
    setActiveKey("");
    setActiveShape("");
  }, [setActiveKey, setActiveShape]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      const isShift = e.shiftKey;

      switch (key) {
        case "k":
          e.preventDefault();
          cycleKey(isShift ? -1 : 1);
          break;
        case "s":
          e.preventDefault();
          cycleShape(isShift ? -1 : 1);
          break;
        case "m":
          e.preventDefault();
          cycleScale(isShift ? -1 : 1);
          break;
        case "t":
          e.preventDefault();
          setTriadMode(!triadMode);
          break;
        case "i":
          e.preventDefault();
          setIntervalMode(!intervalMode);
          break;
        case "escape":
          e.preventDefault();
          clearSelection();
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          e.preventDefault();
          selectShapeByNumber(parseInt(key, 10));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    cycleKey,
    cycleShape,
    cycleScale,
    selectShapeByNumber,
    clearSelection,
    triadMode,
    setTriadMode,
    intervalMode,
    setIntervalMode,
  ]);
}
