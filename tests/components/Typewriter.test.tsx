import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Typewriter from '../../components/common/Typewriter';
import React from 'react';

describe('Typewriter Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders empty text initially if animate is true', () => {
        render(<Typewriter text="Hello" animate={true} />);
        expect(screen.queryByText(/H/)).toBeNull();
    });

    it('renders full text immediately if animate is false', () => {
        render(<Typewriter text="Hello" animate={false} />);
        expect(screen.getByText(/Hello/)).toBeInTheDocument();
    });

    it('animates text character by character', async () => {
        await act(async () => {
            render(<Typewriter text="Hi" speed={10} animate={true} />);
        });
        
        await act(async () => {
             vi.advanceTimersByTime(11);
        });
        expect(screen.getByText(/H/)).toBeInTheDocument();

        await act(async () => {
             vi.advanceTimersByTime(11);
        });
        expect(screen.getByText(/Hi/)).toBeInTheDocument();
    });

    it('handles text updates by continuing animation', async () => {
        let result: any;
        await act(async () => {
            result = render(<Typewriter text="Hello" speed={10} animate={true} />);
        });
        const { rerender } = result;
        
        await act(async () => {
            vi.advanceTimersByTime(21);
        });
        expect(screen.getByText(/He/)).toBeInTheDocument();

        // Update text
        await act(async () => {
            rerender(<Typewriter text="Hello World" speed={10} animate={true} />);
        });
        
        await act(async () => {
            vi.advanceTimersByTime(11);
        });
        expect(screen.getByText(/Hel/)).toBeInTheDocument();
        
        await act(async () => {
            vi.runAllTimers();
        });
        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    });

    it('resets animation if text becomes non-matching', async () => {
        let result: any;
        await act(async () => {
            result = render(<Typewriter text="Hello" speed={10} animate={true} />);
        });
        const { rerender } = result;
        
        await act(async () => {
            vi.advanceTimersByTime(21);
        });
        
        await act(async () => {
            rerender(<Typewriter text="Bye" speed={10} animate={true} />);
        });
        
        await act(async () => {
            vi.advanceTimersByTime(21);
        });
        expect(screen.getByText(/B/)).toBeInTheDocument();
    });

    it('calls onComplete when finished', async () => {
        const onComplete = vi.fn();
        await act(async () => {
            render(<Typewriter text="Ok" speed={10} animate={true} onComplete={onComplete} />);
        });
        
        await act(async () => {
            vi.runAllTimers();
        });
        
        expect(onComplete).toHaveBeenCalled();
    });
});
