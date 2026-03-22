
import { Service, TranslationSet } from './types';

export const GOOGLE_APP_SCRIPT_URL = process.env.GOOGLE_APP_SCRIPT_URL || '';
export const STUDIO_WHATSAPP_NUMBER = process.env.STUDIO_WHATSAPP_NUMBER || '';

export const services: Service[] = [
    {
        id: 'collagen',
        isPromo: true,
        image: 'https://www.wearebodybeautiful.com/wp-content/uploads/2020/02/Ultrasound-phonophoresis-facials-101.jpg',
        titleKey: 'service1Title',
        descriptionKey: 'service1Desc',
        priceKey: 'service1PriceNew',
        oldPriceKey: 'service1PriceOld',
    },
    {
        id: 'purifying',
        image: 'https://www.glam.com/img/gallery/are-extractions-a-must-for-healthy-skin-heres-what-we-know/intro-1678298204.jpg',
        titleKey: 'service2Title',
        descriptionKey: 'service2Desc',
        priceKey: 'service2Price',
    },
    {
        id: 'hydrating',
        image: 'https://i.postimg.cc/HnNJgvG9/513abf82-5406-40dd-aa9c-9f19ee313d18.jpg',
        titleKey: 'service3Title',
        descriptionKey: 'service3Desc',
        priceKey: 'service3Price',
    },
    {
        id: 'whitening',
        image: 'https://skintrends.ph/cdn/shop/products/WhiteningFacial.jpg?v=1621581601',
        titleKey: 'service4Title',
        descriptionKey: 'service4Desc',
        priceKey: 'service4Price',
    },
    {
        id: 'acne',
        image: 'https://i.postimg.cc/SxcxbyhT/531ba73c-92fc-45aa-a1fb-9c085dce310b.jpg',
        titleKey: 'service5Title',
        descriptionKey: 'service5Desc',
        priceKey: 'service5Price',
    },
    {
        id: 'rf',
        image: 'https://pica.zhimg.com/v2-d02188510f60bce633ee4da8f7c834b8_1440w.jpg',
        titleKey: 'service6Title',
        descriptionKey: 'service6Desc',
        priceKey: 'service6Price',
    },
     {
        id: 'detox',
        image: 'https://nasiedu.com/wp-content/uploads/2018/05/service_antiage-750x500-1.jpeg',
        titleKey: 'service7Title',
        descriptionKey: 'service7Desc',
        priceKey: 'service7Price',
        colSpan: 'md:col-span-2 lg:col-span-3',
    },
];

export type CarouselImage = { src: string; alt: string };

export const aboutCarouselImages: CarouselImage[] = [
    { src: 'https://i.postimg.cc/3NVkV67g/Whats-App-Image-2025-05-12-at-10-35-29-PM-2.jpg', alt: 'Beautiful and relaxing treatment room at JW Beauty Studio' },
    { src: 'https://i.postimg.cc/brsG68Xy/Whats-App-Image-2025-05-12-at-10-35-29-PM.jpg', alt: 'Premium skincare products and tools' },
    { src: 'https://i.postimg.cc/NFMXWmXw/Whats-App-Image-2025-05-12-at-10-35-28-PM.jpg', alt: 'Comfortable client consultation area' },
    { src: 'https://i.postimg.cc/tTJNWKgb/Whats-App-Image-2025-05-12-at-10-06-55-PM.jpg', alt: 'Professional facial equipment' },
    { src: 'https://i.postimg.cc/FRPdgzBC/Whats-App-Image-2025-05-12-at-10-35-29-PM-1.jpg', alt: 'Relaxing ambiance prepared for treatment' },
];
