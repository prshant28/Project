import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useMousePosition } from '@/hooks/use-mouse-position';
import CursorEffect from './CursorEffect';

interface MouseContextType {
  hoveredElement: string | null;
  setHoveredElement: (id: string | null) => void;
  updateElementPosition: (el: HTMLElement, mouseX: number, mouseY: number, strength?: number) => void;
  activateCursor: () => void;
  deactivateCursor: () => void;
  setLinkHover: (isHovering: boolean) => void;
  isLinkHovered: boolean;
  isActive: boolean;
}

const MouseContext = createContext<MouseContextType>({
  hoveredElement: null,
  setHoveredElement: () => {},
  updateElementPosition: () => {},
  activateCursor: () => {},
  deactivateCursor: () => {},
  setLinkHover: () => {},
  isLinkHovered: false,
  isActive: false,
});

export const useMouseInteraction = () => useContext(MouseContext);

interface Props {
  children: ReactNode;
}

export const MouseInteractionProvider: React.FC<Props> = ({ children }) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const mousePosition = useMousePosition();
  
  // Function to update element position based on mouse (magnetic effect)
  const updateElementPosition = (
    element: HTMLElement, 
    mouseX: number, 
    mouseY: number,
    strength = 30
  ) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    
    // Calculate movement (stronger when closer to center)
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = Math.max(rect.width, rect.height) * 2;
    const force = Math.max(0, 1 - distance / maxDistance);
    
    // Apply transformation
    const moveX = distanceX * force * (strength / 100);
    const moveY = distanceY * force * (strength / 100);
    
    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };
  
  // Update glow effect position on elements with the glow-on-hover class
  useEffect(() => {
    const glowElements = document.querySelectorAll('.glow-on-hover');
    const interactiveBgs = document.querySelectorAll('.interactive-bg');
    
    glowElements.forEach(element => {
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect();
        const x = ((mousePosition.x - rect.left) / rect.width) * 100;
        const y = ((mousePosition.y - rect.top) / rect.height) * 100;
        
        element.style.setProperty('--mouse-x', `${x}%`);
        element.style.setProperty('--mouse-y', `${y}%`);
      }
    });
    
    interactiveBgs.forEach(element => {
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect();
        const x = ((mousePosition.x - rect.left) / rect.width) * 100;
        const y = ((mousePosition.y - rect.top) / rect.height) * 100;
        
        element.style.setProperty('--mouse-x', `${x}%`);
        element.style.setProperty('--mouse-y', `${y}%`);
      }
    });
  }, [mousePosition]);
  
  // Add event listeners to hoverable elements
  useEffect(() => {
    const handleLinkHover = () => setIsLinkHovered(true);
    const handleLinkLeave = () => setIsLinkHovered(false);
    
    const handleButtonDown = () => setIsActive(true);
    const handleButtonUp = () => setIsActive(false);
    
    // Handle magnetic elements
    const magneticElements = document.querySelectorAll('.magnetic-effect');
    
    const handleMagneticHover = (e: Event) => {
      if (!(e instanceof MouseEvent)) return;
      const element = e.currentTarget as HTMLElement;
      
      const moveHandler = (moveEvent: MouseEvent) => {
        updateElementPosition(element, moveEvent.clientX, moveEvent.clientY);
      };
      
      document.addEventListener('mousemove', moveHandler);
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
        document.removeEventListener('mousemove', moveHandler);
      }, { once: true });
    };
    
    // Add event listeners
    const links = document.querySelectorAll('a, button, .hoverable');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover as EventListener);
      link.addEventListener('mouseleave', handleLinkLeave as EventListener);
    });
    
    magneticElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMagneticHover as EventListener);
    });
    
    document.addEventListener('mousedown', handleButtonDown);
    document.addEventListener('mouseup', handleButtonUp);
    
    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover as EventListener);
        link.removeEventListener('mouseleave', handleLinkLeave as EventListener);
      });
      
      magneticElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMagneticHover as EventListener);
      });
      
      document.removeEventListener('mousedown', handleButtonDown);
      document.removeEventListener('mouseup', handleButtonUp);
    };
  }, []);
  
  return (
    <MouseContext.Provider
      value={{
        hoveredElement,
        setHoveredElement,
        updateElementPosition,
        activateCursor: () => setIsActive(true),
        deactivateCursor: () => setIsActive(false),
        setLinkHover: setIsLinkHovered,
        isLinkHovered,
        isActive
      }}
    >
      {children}
      <CursorEffect />
    </MouseContext.Provider>
  );
};

export default MouseInteractionProvider;