import { useRef, useEffect, useState, useCallback } from "react";

interface PinchZoomState {
  scale: number;
  translateX: number;
  translateY: number;
}

interface TouchPoint {
  x: number;
  y: number;
}

export function usePinchZoom(minScale = 0.5, maxScale = 2) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<PinchZoomState>({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });

  const initialDistanceRef = useRef<number>(0);
  const initialScaleRef = useRef<number>(1);
  const initialTouchCenterRef = useRef<TouchPoint>({ x: 0, y: 0 });

  const getDistance = (touches: TouchList): number => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touches: TouchList): TouchPoint => {
    if (touches.length < 2) {
      return { x: touches[0].clientX, y: touches[0].clientY };
    }
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      initialDistanceRef.current = getDistance(e.touches);
      initialScaleRef.current = state.scale;
      initialTouchCenterRef.current = getTouchCenter(e.touches);
    }
  }, [state.scale]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();

    const currentDistance = getDistance(e.touches);
    const scaleChange = currentDistance / initialDistanceRef.current;
    const newScale = Math.min(
      maxScale,
      Math.max(minScale, initialScaleRef.current * scaleChange)
    );

    setState((prev) => ({
      ...prev,
      scale: newScale,
    }));
  }, [minScale, maxScale]);

  const handleTouchEnd = useCallback(() => {
    // Reset initial values
    initialDistanceRef.current = 0;
  }, []);

  const resetZoom = useCallback(() => {
    setState({
      scale: 1,
      translateX: 0,
      translateY: 0,
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const style = {
    transform: `scale(${state.scale}) translate(${state.translateX}px, ${state.translateY}px)`,
    transformOrigin: "center center",
    transition: "transform 0.1s ease-out",
  };

  return {
    containerRef,
    style,
    scale: state.scale,
    resetZoom,
  };
}
