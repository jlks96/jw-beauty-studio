import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import BookingForm from '../../components/BookingForm';
import { LanguageProvider } from '../../context/LanguageContext';

// Mock browser globals
const mockOpen = vi.fn();
window.open = mockOpen;

const mockFetch = vi.fn(() => Promise.resolve({ ok: true } as Response));
global.fetch = mockFetch;

describe('BookingForm Integration', () => {
    const defaultProps = {
        showModalAlert: vi.fn(),
        setIsLoading: vi.fn(),
        initialServiceId: '',
        setInitialServiceId: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const setup = (props = {}) => {
        render(
            <LanguageProvider>
                <BookingForm {...defaultProps} {...props} />
            </LanguageProvider>
        );
    };

    it('renders all form fields correctly', () => {
        setup();
        
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Select Service/i)).toBeInTheDocument();
        // Preferred Date and Time Slot don't have htmlFor/id associations, so we use getByText
        expect(screen.getByText(/Preferred Date/i)).toBeInTheDocument();
        expect(screen.getByText(/Preferred Time Slot/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Request on WhatsApp/i })).toBeInTheDocument();
    });

    it('pre-fills the service when initialServiceId is provided', () => {
        setup({ initialServiceId: 'collagen' });
        
        const serviceSelect = screen.getByLabelText(/Select Service/i) as HTMLSelectElement;
        // Service title in en.ts: "New Customer Special: Collagen Plus Treatment"
        expect(serviceSelect.value).toContain('Collagen Plus');
        expect(defaultProps.setInitialServiceId).toHaveBeenCalledWith('');
    });

    it('submits the form and triggers Google Script and WhatsApp', async () => {
        setup();

        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '91234567' } });
        fireEvent.change(screen.getByLabelText(/Select Service/i), { target: { value: 'New Customer Special: Collagen Plus Treatment' } });
        fireEvent.click(screen.getByText(/Morning/i));

        const submitButton = screen.getByRole('button', { name: /Request on WhatsApp/i });
        fireEvent.click(submitButton);

        expect(defaultProps.setIsLoading).toHaveBeenCalledWith(true);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalled();
        });
        
        // Proper casting to resolve IDE feedback
        const calls = mockFetch.mock.calls as unknown as [string, RequestInit][];
        const [url, options] = calls[0];
        expect(url).toContain('script.google.com');
        
        const body = JSON.parse(options?.body as string);
        expect(body.name).toBe('John Doe');

        expect(mockOpen).toHaveBeenCalled();
        const whatsappUrl = mockOpen.mock.calls[0][0];
        expect(whatsappUrl).toContain('wa.me');
    });

    it('shows feedback message during processing', async () => {
        setup();
        
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '91234567' } });
        fireEvent.change(screen.getByLabelText(/Select Service/i), { target: { value: 'New Customer Special: Collagen Plus Treatment' } });
        fireEvent.click(screen.getByText(/Morning/i));

        const submitButton = screen.getByRole('button', { name: /Request on WhatsApp/i });
        fireEvent.click(submitButton);

        // Success message should appear after form logic starts/finishes fetch
        expect(await screen.findByText(/Request sent/i)).toBeInTheDocument();
    });
});
