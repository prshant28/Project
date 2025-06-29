import { useEffect, useState } from 'react';

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

const TypingEffect = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 1500,
  className = ""
}: TypingEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const currentFullText = texts[currentTextIndex];
    const currentDisplayLength = displayText.length;
    
    if (!isDeleting && displayText === currentFullText) {
      // Full text is typed, wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
    } else if (isDeleting && displayText === '') {
      // Text is fully deleted, move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else {
      // Either typing or deleting
      timeout = setTimeout(() => {
        if (isDeleting) {
          // Delete one character
          setDisplayText(prev => prev.substring(0, prev.length - 1));
        } else {
          // Add one character
          setDisplayText(currentFullText.substring(0, currentDisplayLength + 1));
        }
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-0.5 h-6 ml-1 bg-primary ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
    </span>
  );
};

export default TypingEffect;