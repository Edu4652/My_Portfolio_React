'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';
import { localeNames } from '@/i18n/config';

export const LanguageSwitcher = () => {
	const t = useTranslations('common');
	const locale = useLocale() as Locale;
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('[data-language-switcher]')) {
				setIsOpen(false);
			}
		};

		const handleScroll = () => {
			setIsOpen(false);
		};

		document.addEventListener('click', handleClickOutside);
		window.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isOpen]);

	const handleLocaleChange = (newLocale: Locale) => {
		if (newLocale === locale) {
			setIsOpen(false);
			return;
		}

		const segments = pathname.split('/');
		segments[1] = newLocale;
		const newPath = segments.join('/') || `/${newLocale}`;
		window.location.href = newPath;
	};

	return (
		<div className="relative" data-language-switcher>
			<motion.button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 transition-all duration-200"
				aria-label={t('selectLanguage')}
			>
				<Globe className="w-4 h-4" />
				<span className="uppercase">{locale}</span>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className="absolute right-0 mt-2 w-52 z-50 bg-gray-900/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl overflow-hidden"
					>
						{(Object.keys(localeNames) as Locale[]).map((loc, index) => (
							<motion.button
								key={loc}
								type="button"
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05, duration: 0.2 }}
								whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
								onClick={() => handleLocaleChange(loc)}
								className={`w-full px-5 py-3 text-left text-sm transition-colors duration-150 rounded-md ${
									locale === loc
										? 'bg-blue-600/20 text-blue-400 font-semibold'
										: 'text-white/80 hover:text-white'
								}`}
							>
								<div className="flex items-center justify-between">
									<span>{localeNames[loc]}</span>
									<span className="text-xs uppercase opacity-60">{loc}</span>
								</div>
							</motion.button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
