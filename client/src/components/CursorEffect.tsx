import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useMouseInteraction } from './MouseInteractionProvider';

const CursorEffect = () => {
  const mousePosition = useMousePosition();
  const { isLinkHovered, isActive } = useMouseInteraction();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; opacity: number }>>([]);
  
  // Create the trails array
  useEffect(() => {
    const initialTrails = Array(10).fill(null).map((_, i) => ({ 
      x: 0, 
      y: 0, 
      opacity: 1 - (i * 0.1)
    }));
    setTrails(initialTrails);
    
    // Create refs for each trail
    cursorTrailsRef.current = initialTrails.map(() => null);
  }, []);
  
  // Handle cursor visibility
  useEffect(() => {
    const handleMouseEnter = () => setIsCursorVisible(true);
    const handleMouseLeave = () => setIsCursorVisible(false);
    
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Update cursor and trails position
  useEffect(() => {
    if (!isCursorVisible) return;
    
    const updateTrailPositions = () => {
      // Create a new trails array with updated positions
      let newTrails = [...trails];
      
      // Update first trail to follow cursor directly
      if (newTrails.length > 0) {
        newTrails[0] = { 
          x: mousePosition.x, 
          y: mousePosition.y, 
          opacity: 1 
        };
      }
      
      // Update rest of trails to follow the one ahead of them
      for (let i = newTrails.length - 1; i > 0; i--) {
        const prevTrail = newTrails[i - 1];
        newTrails[i] = { 
          x: prevTrail.x, 
          y: prevTrail.y, 
          opacity: 1 - (i * 0.1) 
        };
      }
      
      setTrails(newTrails);
    };
    
    const animationFrame = requestAnimationFrame(updateTrailPositions);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, trails, isCursorVisible]);
  
  // Handle cursor state classes
  const cursorClasses = `cursor ${isActive ? 'active' : ''} ${isLinkHovered ? 'link-hover' : ''} ${!isCursorVisible ? 'hidden' : ''}`;
  
  return (
    <>
      {/* Main cursor */}
      <motion.div 
        ref={cursorRef}
        className={cursorClasses}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={`trail-${index}`}
          ref={(el) => cursorTrailsRef.current[index] = el}
          className="cursor-trail"
          style={{
            left: 0,
            top: 0,
            opacity: trail.opacity,
            scale: 1 - (index * 0.08),
            x: trail.x - 16,
            y: trail.y - 16,
            backgroundColor: `hsla(var(--secondary), ${0.2 - (index * 0.02)})`,
          }}
          transition={{
            duration: 0.08,
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;