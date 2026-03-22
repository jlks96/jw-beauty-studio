import { describe, it, expect } from 'vitest';
import { services, aboutCarouselImages, STUDIO_WHATSAPP_NUMBER } from '../../constants';
import { translations } from '../../locales';

describe('Constants', () => {
    it('should have a valid WhatsApp number', () => {
        expect(STUDIO_WHATSAPP_NUMBER).toBeDefined();
        expect(typeof STUDIO_WHATSAPP_NUMBER).toBe('string');
        expect(STUDIO_WHATSAPP_NUMBER.length).toBeGreaterThan(0);
    });

    it('should define a list of services with required properties', () => {
        expect(services).toBeInstanceOf(Array);
        expect(services.length).toBeGreaterThan(0);
        
        services.forEach(service => {
            expect(service.id).toBeDefined();
            expect(service.titleKey).toBeDefined();
            expect(service.priceKey).toBeDefined();
        });
    });

    it('should define carousel images', () => {
        expect(aboutCarouselImages).toBeInstanceOf(Array);
        expect(aboutCarouselImages.length).toBeGreaterThan(0);
        expect(aboutCarouselImages[0]).toHaveProperty('src');
        expect(aboutCarouselImages[0]).toHaveProperty('alt');
    });

    it('should have English and Chinese translations', () => {
        expect(translations).toHaveProperty('en');
        expect(translations).toHaveProperty('zh');
        
        expect(translations.en.navHome).toBeDefined();
        expect(translations.zh.navHome).toBeDefined();
    });
});
