import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import PromoBanner from '../../components/PromoBanner';
import { LanguageProvider } from '../../context/LanguageContext';

describe('PromoBanner', () => {
    const setup = () => {
        const scrollToSection = vi.fn();
        render(
            <LanguageProvider>
                <PromoBanner scrollToSection={scrollToSection} />
            </LanguageProvider>
        );
        return { scrollToSection };
    };

    it('renders the promotion title and button (en)', () => {
        setup();
        
        expect(screen.getByText(/First Time Here/i)).toBeInTheDocument();
        expect(screen.getByText(/Enjoy a Special Welcome Offer/i)).toBeInTheDocument();
        expect(screen.getByText(/Claim Your Welcome Offer/i)).toBeInTheDocument();
    });

    it('triggers scrollToSection when button is clicked', () => {
        const { scrollToSection } = setup();
        
        const ctaButton = screen.getByText(/Claim Your Welcome Offer/i);
        fireEvent.click(ctaButton);
        
        expect(scrollToSection).toHaveBeenCalledWith('booking');
    });

    it('contains the promotion description with price', () => {
        setup();
        
        expect(screen.getByText((content) => content.includes('$68'))).toBeInTheDocument();
    });
});
