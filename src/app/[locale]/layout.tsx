import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { env } from '@/lib/env';
import '../globals.css';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

function isValidLocale(locale: string): locale is Locale {
	return locales.includes(locale as Locale);
}

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'metadata' });

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		authors: [{ name: env.personalInfo.fullName }],
		creator: env.personalInfo.fullName,
		icons: {
			icon: [
				{ url: '/favicon.svg', type: 'image/svg+xml' },
				{ url: '/favicon.ico', sizes: '32x32' },
			],
			apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
		},
		openGraph: {
			type: 'website',
			locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
			url: env.personalInfo.websiteUrl,
			title: t('title'),
			description: t('description'),
			siteName: t('title'),
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!isValidLocale(locale)) {
		notFound();
	}

	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<html lang={locale} className={inter.variable}>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
				/>
				<meta name="theme-color" content="#1e3a8a" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
			</head>
			<body className={`${inter.className} antialiased`}>
				<div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />

				<div className="fixed inset-0 overflow-hidden pointer-events-none">
					<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
				</div>

				<div className="relative z-10">
					<NextIntlClientProvider messages={messages} locale={locale}>
						{children}
					</NextIntlClientProvider>
				</div>
			</body>
		</html>
	);
}
