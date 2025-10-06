import { useState, useEffect, useRef } from "react";

export default function QuizSectionTypewriterEffect({
    text = "",
    speed = 100,
    delay = 0, //  added delay prop for stagger
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [startTyping, setStartTyping] = useState(false);
    const [delayPassed, setDelayPassed] = useState(false);
    const elementRef = useRef(null);

    // Observe when element enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStartTyping(true);
                    observer.unobserve(elementRef.current); // stop observing after first trigger
                }
            },
            { threshold: 0.5 } // trigger when 50% visible
        );

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, []);

    // Handle delay (staggered effect)
    useEffect(() => {
        if (!startTyping) return;
        const timer = setTimeout(() => setDelayPassed(true), delay);
        return () => clearTimeout(timer);
    }, [startTyping, delay]);

    // Reset when text changes
    useEffect(() => {
        setDisplayedText("");
        setIndex(0);
    }, [text]);

    // Typing effect logic
    useEffect(() => {
        if (!startTyping || !delayPassed) return; // wait until visible AND delay is done
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [index, text, speed, startTyping, delayPassed]);

    return (
        <div ref={elementRef} className="text-sm text-left">
            {displayedText}
            <span className="animate-pulse">|</span>
        </div>
    );
}
