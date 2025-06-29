import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

// Hook to get and track mouse position
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0
  });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}

// Hook to create parallax effect based on mouse movement
export function useParallaxEffect(strength: number = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      // Calculate mouse position as a percentage of the screen
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate offset (from center)
      const centerX = windowSize.width / 2;
      const centerY = windowSize.height / 2;
      
      // Calculate movement
      const moveX = ((mouseX - centerX) / centerX) * strength;
      const moveY = ((mouseY - centerY) / centerY) * strength;
      
      setPosition({ x: moveX, y: moveY });
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength, windowSize]);
  
  return position;
}

// Hook to get all hover-capable elements for interaction
export function useHoverableElements() {
  const [hoverElements, setHoverElements] = useState<HTMLElement[]>([]);
  
  useEffect(() => {
    // Get all interactive elements
    const elements = document.querySelectorAll<HTMLElement>('a, button, .hoverable, .magnetic-effect');
    setHoverElements(Array.from(elements));
  }, []);
  
  return hoverElements;
}