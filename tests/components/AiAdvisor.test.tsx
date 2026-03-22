import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AiAdvisor from '../../components/AiAdvisor';
import { LanguageProvider } from '../../context/LanguageContext';
import React from 'react';

// Mock the translations and icons
vi.mock('../../hooks/useTranslations', () => ({
    useTranslations: () => ({
        aiAdvisorTitle: 'AI Skincare Advisor',
        aiAdvisorSubtitle: 'Ask me anything',
        aiWelcomeMessage: 'Welcome',
        aiWelcomeExample: 'Example',
        aiInputPlaceholder: 'Type here...',
        aiError: 'Error'
    })
}));

vi.mock('../../components/common/Icons', () => ({
    SendIcon: () => <div data-testid="send-icon" />,
    UserIcon: () => <div data-testid="user-icon" />,
    SparklesIcon: () => <div data-testid="sparkles-icon" />
}));

// Mock GoogleGenAI
vi.mock('@google/genai', () => ({
    GoogleGenAI: vi.fn()
}));

describe('AiAdvisor', () => {
    beforeEach(() => {
        // Mock scrollIntoView
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    it('renders without crashing', () => {
        render(
            <LanguageProvider>
                <AiAdvisor />
            </LanguageProvider>
        );
        expect(document.body).toBeDefined();
    });

    it('does not call scrollIntoView on initial mount', () => {
        const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
        
        render(
            <LanguageProvider>
                <AiAdvisor />
            </LanguageProvider>
        );

        // Should NOT be called on mount (prevents strict mode double-mount scroll bugs)
        expect(scrollSpy).not.toHaveBeenCalled();
    });

    it('scrolls into view after messages are added', async () => {
        const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
        
        const { getByRole, getByPlaceholderText } = render(
            <LanguageProvider>
                <AiAdvisor />
            </LanguageProvider>
        );

        // Initial mount should not trigger scroll
        expect(scrollSpy).not.toHaveBeenCalled();

        // Simulate sending a message
        const input = getByPlaceholderText('Type here...');
        const button = getByRole('button', { name: /Send message/i });

        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(button);

        // Wait for the AI's empty placeholder message to be added to state
        await waitFor(() => {
            // Once the message state is updated (messages > 0), the effect should trigger scrollIntoView
            expect(scrollSpy).toHaveBeenCalled();
        });
    });
});
