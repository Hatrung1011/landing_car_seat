import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  words: string[];
  className?: string;
  interval?: number;
  onWordChange?: (word: string, index: number) => void;
}

const RotatingText = React.forwardRef<HTMLSpanElement, RotatingTextProps>(
  ({ words, className, interval = 2000, onWordChange }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, interval);
      return () => clearInterval(timer);
    }, [words.length, interval]);

    const onWordChangeRef = React.useRef(onWordChange);
    React.useLayoutEffect(() => {
      onWordChangeRef.current = onWordChange;
    });

    const prevIndexRef = React.useRef(currentIndex);
    React.useLayoutEffect(() => {
      if (prevIndexRef.current === currentIndex) return;
      prevIndexRef.current = currentIndex;
      onWordChangeRef.current?.(words[currentIndex] ?? "", currentIndex);
    }, [currentIndex, words]);

    return (
      <span
        ref={ref}
        className={cn("relative inline-flex overflow-hidden align-baseline", className)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="inline-block whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  },
);
RotatingText.displayName = "RotatingText";

export { RotatingText };
