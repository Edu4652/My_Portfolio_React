'use client';

import { useTranslations } from 'next-intl';
import React, { memo } from 'react';
import { personalInfo } from '@/data/portfolio';

const DEFAULT_NAME = 'Portfolio';

const Footer: React.FC = () => {
	const t = useTranslations('footer');
	const displayName = personalInfo.fullName?.trim() || personalInfo.name?.trim() || DEFAULT_NAME;

	return (
		<footer className="py-12 border-t border-white/10 relative group cursor-pointer">
			<div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

			<div className="container mx-auto px-4 text-center relative z-10">
				<p className="text-gray-400 mb-4 group-hover:text-white transition-colors duration-300">
					© {new Date().getFullYear()} {displayName} | {t('rights')}
				</p>
				<p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
					{t('builtWith')}
				</p>
			</div>

			<div className="fixed inset-0 backdrop-blur-none group-hover:backdrop-blur-md transition-all duration-500 pointer-events-none z-0" />

			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

			<div className="absolute inset-0 border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
		</footer>
	);
};

export default memo(Footer);
export { Footer };
