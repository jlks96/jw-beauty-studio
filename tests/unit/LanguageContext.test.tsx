import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';

describe('LanguageContext', () => {
    it('should provide default language as "en"', () => {
        const TestComponent = () => {
            const { language } = useLanguage();
            return <div>{language}</div>;
        };

        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        expect(screen.getByText('en')).toBeInTheDocument();
    });

    it('should toggle language from "en" to "zh"', () => {
        const TestComponent = () => {
            const { language, toggleLanguage } = useLanguage();
            return (
                <div>
                    <span>{language}</span>
                    <button onClick={toggleLanguage}>Toggle</button>
                </div>
            );
        };

        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        const button = screen.getByText('Toggle');
        expect(screen.getByText('en')).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.getByText('zh')).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.getByText('en')).toBeInTheDocument();
    });

    it('should throw error if useLanguage is used outside LanguageProvider', () => {
        // Suppress console.error for this test as it's expected
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        const TestComponent = () => {
            useLanguage();
            return null;
        };

        expect(() => render(<TestComponent />)).toThrow('useLanguage must be used within a LanguageProvider');
        
        consoleSpy.mockRestore();
    });
});
