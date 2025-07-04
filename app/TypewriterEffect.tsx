import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({ text, delay = 0.05, startDelay = 0 }: { text: string; delay?: number; startDelay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay * 1000);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, delay, text]);

  // Reset animation when text changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedText("");
      setCurrentIndex(0);
      setIsComplete(false);
    }, startDelay * 1000);
    
    return () => clearTimeout(timer);
  }, [text, startDelay]);

  return (
    <>
      {displayedText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
      {!isComplete && <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-0.5 inline-block w-2 h-6 bg-[#FF5500]"
      />}
    </>
  );
};