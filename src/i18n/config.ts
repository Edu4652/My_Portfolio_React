export const locales = ['en', 'es', 'fr', 'pt', 'ca'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
	en: 'English',
	es: 'Español',
	fr: 'Français',
	pt: 'Português',
	ca: 'Català',
};
