import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport using the browser IntersectionObserver API.
 * Ideal for scroll-triggered entrance animations, lazy loading, and progress indicators.
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = { threshold: 0.15, freezeOnceVisible: true }
): [RefObject<HTMLDivElement | null>, boolean] {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      const isElementVisible = entry.isIntersecting;
      if (isElementVisible) {
        setIsVisible(true);
        if (options.freezeOnceVisible) {
          observer.unobserve(node);
        }
      } else if (!options.freezeOnceVisible) {
        setIsVisible(false);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin, options.freezeOnceVisible]);

  return [elementRef, isVisible];
}
