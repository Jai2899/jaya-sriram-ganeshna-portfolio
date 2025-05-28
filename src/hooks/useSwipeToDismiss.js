import { useEffect, useRef, useState } from 'react';

export const useSwipeToDismiss = ({ onDismiss, threshold = 0.3 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      startX.current = e.touches[0].clientX;
      currentX.current = 0;
      setIsDragging(true);
      element.style.transition = 'none';
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX.current;
      currentX.current = deltaX;
      
      // Only allow right swipe
      if (deltaX < 0) return;
      
      const opacity = Math.max(0, 1 - Math.abs(deltaX) / (element.offsetWidth * threshold));
      element.style.transform = `translateX(${deltaX}px)`;
      element.style.opacity = opacity;
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      element.style.transition = 'transform 0.2s ease, opacity 0.2s ease';

      if (currentX.current > element.offsetWidth * threshold) {
        element.style.transform = `translateX(${element.offsetWidth}px)`;
        element.style.opacity = '0';
        onDismiss();
      } else {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, onDismiss, threshold]);

  return {
    ref: elementRef,
    isDragging
  };
}; 