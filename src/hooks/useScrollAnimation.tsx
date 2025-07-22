
import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (screenHeight = 0, enabled = true) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current || screenHeight == 0) return;
    console.log('curr element height: ', ref.current.getBoundingClientRect().height);
    const currElmHeight = ref.current.getBoundingClientRect().height;

    const threshold = screenHeight < currElmHeight ? ((screenHeight / ref.current.getBoundingClientRect().height) / 10) : 1.0;
    console.log('threshold: ', threshold);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [enabled]);

  return { ref, isVisible };
};

