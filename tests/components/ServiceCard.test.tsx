import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ServiceCard from '../../components/ServiceCard';
import { LanguageProvider } from '../../context/LanguageContext';
import { Service } from '../../types';

const mockService: Service = {
    id: 'test-service',
    image: 'https://example.com/image.jpg',
    titleKey: 'service1Title',
    descriptionKey: 'service1Desc',
    priceKey: 'service1PriceNew',
    oldPriceKey: 'service1PriceOld',
    isPromo: true
};

const setup = (service = mockService) => {
    const onBookService = vi.fn();
    render(
        <LanguageProvider>
            <ServiceCard service={service} onBookService={onBookService} />
        </LanguageProvider>
    );
    return { onBookService };
};

describe('ServiceCard', () => {
    it('renders service details correctly in default language (en)', () => {
        setup();
        
        expect(screen.getByText(/New Customer Special/i)).toBeInTheDocument();
        expect(screen.getByText(/Revitalize your skin/i)).toBeInTheDocument();
        expect(screen.getByText('$68')).toBeInTheDocument();
        expect(screen.getByText('$88')).toBeInTheDocument();
        expect(screen.getByText(/Promo/i)).toBeInTheDocument();
    });

    it('calls onBookService when booking button is clicked', () => {
        const { onBookService } = setup();
        
        const bookButton = screen.getByRole('button', { name: /Book This Treatment/i });
        fireEvent.click(bookButton);
        
        expect(onBookService).toHaveBeenCalledWith('test-service');
    });

    it('renders without promo badge if isPromo is false', () => {
        const nonPromoService = { ...mockService, isPromo: false };
        setup(nonPromoService);
        
        expect(screen.queryByText(/Promo/i)).not.toBeInTheDocument();
    });
});
