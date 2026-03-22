import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number; // ms per character
    className?: string;
    animate?: boolean;
    onType?: () => void;
    onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
    text, 
    speed = 20, 
    className = "", 
    animate = true,
    onType,
    onComplete 
}) => {
    const [displayedText, setDisplayedText] = useState(animate ? '' : text);
    const [currentIndex, setCurrentIndex] = useState(animate ? 0 : text.length);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Initial sync and handling animate toggle
    useEffect(() => {
        if (!animate) {
            setDisplayedText(text);
            setCurrentIndex(text.length);
        }
    }, [animate, text]);

    // Handle text resets or replacements
    useEffect(() => {
        if (text && !text.startsWith(displayedText) && animate) {
             setDisplayedText('');
             setCurrentIndex(0);
        }
    }, [text, displayedText, animate]);

    // Main animation loop
    useEffect(() => {
        if (!animate) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        if (currentIndex < text.length) {
            // Use a dynamic interval for catch-up logic
            const gap = text.length - currentIndex;
            const currentInterval = gap > 20 ? 5 : speed;

            intervalRef.current = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    if (prevIndex >= text.length) {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        return prevIndex;
                    }

                    const gap = text.length - prevIndex;
                    const charsToAdd = gap > 50 ? 10 : (gap > 20 ? 5 : 1);
                    const nextIndex = Math.min(prevIndex + charsToAdd, text.length);
                    
                    setDisplayedText(text.slice(0, nextIndex));
                    if (onType) onType();
                    
                    if (nextIndex === text.length && onComplete) {
                        onComplete();
                    }
                    
                    return nextIndex;
                });
            }, currentInterval);
        } else if (currentIndex === text.length && text.length > 0 && onComplete) {
            // Already finished
            onComplete();
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, speed, animate, onType, onComplete, (currentIndex < text.length)]); // Re-run if we need to start or restart the loop

    return (
        <p className={className} style={{ whiteSpace: 'pre-wrap' }}>
            {displayedText}
            {animate && currentIndex < text.length && (
                <span
                    aria-hidden="true"
                    style={{
                        display: 'inline-block',
                        width: 6,
                        height: 16,
                        marginLeft: 2,
                        backgroundColor: '#E29578',
                        verticalAlign: 'middle',
                        animation: 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite',
                    }}
                />
            )}
        </p>
    );
};

export default Typewriter;
