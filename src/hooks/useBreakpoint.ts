import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints: Record<Breakpoint, number> = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("xs");
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWidth(w);

      if (w >= breakpoints.xl) {
        setCurrentBreakpoint("xl");
      } else if (w >= breakpoints.lg) {
        setCurrentBreakpoint("lg");
      } else if (w >= breakpoints.md) {
        setCurrentBreakpoint("md");
      } else if (w >= breakpoints.sm) {
        setCurrentBreakpoint("sm");
      } else {
        setCurrentBreakpoint("xs");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAtLeast = (bp: Breakpoint) => width >= breakpoints[bp];
  const isAtMost = (bp: Breakpoint) => width < breakpoints[bp];

  return {
    breakpoint: currentBreakpoint,
    width,
    isAtLeast,
    isAtMost,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
}
