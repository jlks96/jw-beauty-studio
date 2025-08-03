
export interface Service {
    id: string;
    image: string;
    isPromo?: boolean;
    titleKey: string;
    descriptionKey: string;
    priceKey: string;
    oldPriceKey?: string;
    colSpan?: string;
}

export type Translations = Record<string, string>;

export interface TranslationSet {
  [key: string]: Translations;
}
