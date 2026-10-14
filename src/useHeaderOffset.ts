import { useLayoutEffect, useRef } from 'react';

// Measure the masthead, excluding the temporary expanded navigation menu.
export function useHeaderOffset() {
  const headerBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = headerBarRef.current;
    if (!bar) return;
    const root = document.documentElement;
    const previousOffset = root.style.getPropertyValue('--header-offset');
    const measure = () => {
      root.style.setProperty('--header-offset', `${Math.ceil(bar.getBoundingClientRect().height) + 9}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      if (previousOffset) root.style.setProperty('--header-offset', previousOffset);
      else root.style.removeProperty('--header-offset');
    };
  }, []);

  return headerBarRef;
}
