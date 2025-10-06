'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { memo, useEffect, useRef } from 'react';
import { LanguageSwitcher } from '@/components/atoms';
import { personalInfo } from '@/data/portfolio';
import { useActiveSection, useScrollEffect, useScrollSection, useToggle } from '@/hooks';
import { cn } from '@/utils';

const DEFAULT_LOGO_LABEL = 'Portfolio Logo';

const NavigationLogo = memo(() => {
	const logoLabel = personalInfo.name?.trim() ? `${personalInfo.name.trim()} Logo` : DEFAULT_LOGO_LABEL;

	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 1200 1200"
			xmlns="http://www.w3.org/2000/svg"
			className="text-white fill-current"
			aria-label={logoLabel}
		>
			<g transform="scale(12.242726355428163) translate(-1.7698766920301665, -1.3567287656996072)">
				<g fill="currentColor">
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M67.539,22.815H20.016c-1.04,0-1.884-0.844-1.884-1.885c0-1.041,0.844-1.885,1.884-1.885h47.523   c1.04,0,1.885,0.844,1.885,1.885C69.424,21.972,68.579,22.815,67.539,22.815z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M38.493,34.586H20.016c-1.04,0-1.884-0.844-1.884-1.885c0-1.042,0.844-1.886,1.884-1.886h18.477   c1.042,0,1.885,0.844,1.885,1.886C40.378,33.742,39.534,34.586,38.493,34.586z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M54.605,58.169h-34.59c-1.04,0-1.884-0.843-1.884-1.885c0-1.04,0.844-1.885,1.884-1.885h34.59   c1.042,0,1.887,0.845,1.887,1.885C56.492,57.326,55.647,58.169,54.605,58.169z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M83.118,58.169H63.503c-1.04,0-1.884-0.843-1.884-1.885c0-1.04,0.844-1.885,1.884-1.885h19.615   c1.041,0,1.885,0.845,1.885,1.885C85.003,57.326,84.159,58.169,83.118,58.169z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M82.701,46.36H20.016c-1.04,0-1.884-0.844-1.884-1.885c0-1.042,0.844-1.884,1.884-1.884h62.686   c1.041,0,1.886,0.843,1.886,1.884C84.587,45.517,83.742,46.36,82.701,46.36z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M12.909,27.367c-0.496,0-0.991-0.194-1.361-0.582l-4.355-4.552c-0.694-0.726-0.697-1.87-0.005-2.6   l4.297-4.535c0.717-0.756,1.91-0.787,2.666-0.071c0.754,0.716,0.788,1.909,0.072,2.665l-3.064,3.232l3.115,3.254   c0.718,0.753,0.691,1.946-0.06,2.666C13.847,27.193,13.378,27.367,12.909,27.367z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M12.909,74.438c-0.496,0-0.991-0.193-1.361-0.581l-4.355-4.552c-0.694-0.729-0.697-1.872-0.005-2.602   l4.297-4.531c0.718-0.755,1.91-0.787,2.666-0.071c0.754,0.717,0.787,1.907,0.072,2.663l-3.064,3.23l3.115,3.254   c0.718,0.754,0.691,1.946-0.06,2.664C13.847,74.264,13.378,74.438,12.909,74.438z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M71.189,86.221c-0.466,0-0.933-0.172-1.297-0.518c-0.756-0.715-0.787-1.909-0.071-2.665l3.063-3.229   l-3.113-3.258c-0.721-0.752-0.693-1.944,0.06-2.665c0.752-0.719,1.944-0.692,2.665,0.061l4.354,4.555   c0.694,0.726,0.696,1.869,0.006,2.599l-4.299,4.534C72.187,86.022,71.688,86.221,71.189,86.221z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M88.704,62.324c-0.466,0-0.932-0.171-1.297-0.517c-0.756-0.716-0.788-1.909-0.072-2.665l3.063-3.232   l-3.112-3.253c-0.72-0.752-0.692-1.945,0.059-2.666c0.751-0.718,1.945-0.693,2.665,0.06l4.354,4.551   c0.694,0.725,0.697,1.869,0.006,2.599l-4.297,4.534C89.702,62.128,89.203,62.324,88.704,62.324z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M44.114,69.901H20.016c-1.04,0-1.884-0.842-1.884-1.885c0-1.04,0.844-1.884,1.884-1.884h24.098   c1.041,0,1.885,0.844,1.885,1.884C45.999,69.06,45.154,69.901,44.114,69.901z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M82.701,69.895H52.978c-1.041,0-1.885-0.844-1.885-1.884c0-1.044,0.844-1.886,1.885-1.886h29.724   c1.041,0,1.886,0.842,1.886,1.886C84.587,69.051,83.742,69.895,82.701,69.895z" />
					</g>
					<g xmlns="http://www.w3.org/2000/svg">
						<path d="M65.816,81.679H20.016c-1.04,0-1.884-0.845-1.884-1.886c0-1.042,0.844-1.886,1.884-1.886h45.801   c1.042,0,1.886,0.844,1.886,1.886C67.702,80.834,66.858,81.679,65.816,81.679z" />
					</g>
				</g>
			</g>
		</svg>
	);
});

NavigationLogo.displayName = 'NavigationLogo';

interface NavigationItemProps {
	readonly label: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
}

const NavigationItem = memo<NavigationItemProps>(({ label, isActive, onClick }) => (
	<motion.button
		onClick={onClick}
		className={cn(
			'text-sm font-medium transition-colors duration-200 relative',
			isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white',
		)}
		whileHover={{ y: -2 }}
		aria-current={isActive ? 'page' : undefined}
	>
		{label}
		{isActive && (
			<motion.div
				layoutId="activeIndicator"
				className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
			/>
		)}
	</motion.button>
));

NavigationItem.displayName = 'NavigationItem';

interface MobileNavigationItemProps {
	readonly label: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
}

const MobileNavigationItem = memo<MobileNavigationItemProps>(({ label, isActive, onClick }) => (
	<motion.button
		onClick={onClick}
		className={cn(
			'block w-full text-left py-2 text-sm font-medium transition-colors',
			isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white',
		)}
		whileHover={{ x: 10 }}
		aria-current={isActive ? 'page' : undefined}
	>
		{label}
	</motion.button>
));

MobileNavigationItem.displayName = 'MobileNavigationItem';

const Header: React.FC = () => {
	const t = useTranslations('nav');
	const isScrolled = useScrollEffect({ threshold: 50 });
	const [isMobileMenuOpen, toggleMobileMenu, setIsMobileMenuOpen] = useToggle(false);
	const headerRef = useRef<HTMLDivElement>(null);

	const navigationItems = [
		{ id: 'home', label: t('home'), href: '#home' },
		{ id: 'projects', label: t('projects'), href: '#projects' },
		{ id: 'skills', label: t('skills'), href: '#skills' },
		{ id: 'experience', label: t('experience'), href: '#experience' },
		{ id: 'contact', label: t('contact'), href: '#contact' },
	];

	const sectionIds = navigationItems.map((item) => item.id);
	const activeSection = useActiveSection({ sectionIds, offset: 100 });
	const { scrollToSection } = useScrollSection({ offset: 80 });

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isMobileMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
				setIsMobileMenuOpen(false);
			}
		};

		const handleScroll = () => {
			if (isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isMobileMenuOpen, setIsMobileMenuOpen]);

	const handleDesktopNavigationClick = (sectionId: string) => {
		scrollToSection(sectionId);
	};

	const handleMobileNavigationClick = (sectionId: string) => {
		setIsMobileMenuOpen(false);
		setTimeout(() => {
			scrollToSection(sectionId);
		}, 1);
	};

	return (
		<motion.header
			ref={headerRef}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
			className="fixed top-0 left-0 right-0 z-50"
			role="banner"
		>
			<div
				className={cn(
					'w-full transition-all duration-300',
					isScrolled || isMobileMenuOpen
						? 'bg-black/70 backdrop-blur-md border-b border-white/10'
						: 'bg-transparent',
				)}
			>
				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">
					<div className="flex items-center justify-between">
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="text-2xl font-bold text-white w-[62.54px] flex items-center justify-center"
						>
							<Link
								href="#home"
								onClick={() => handleDesktopNavigationClick('home')}
								aria-label="Ir al inicio"
							>
								<NavigationLogo />
							</Link>
						</motion.div>

						<nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
							{navigationItems.map((item) => (
								<NavigationItem
									key={item.id}
									label={item.label}
									isActive={activeSection === item.id}
									onClick={() => handleDesktopNavigationClick(item.id)}
								/>
							))}
						</nav>

						<div className="hidden md:flex items-center gap-4">
							<LanguageSwitcher />
						</div>

						<div className="md:hidden flex items-center gap-2">
							<LanguageSwitcher />
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={toggleMobileMenu}
								className="p-2 text-white relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
								aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
								aria-expanded={isMobileMenuOpen}
							>
								<motion.span
									animate={
										isMobileMenuOpen
											? { rotate: 45, y: 8, backgroundColor: '#fff' }
											: { rotate: 0, y: 0, backgroundColor: '#fff' }
									}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
									className="w-6 h-0.5 rounded-full"
								/>
								<motion.span
									animate={isMobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
									className="w-6 h-0.5 bg-white rounded-full"
								/>
								<motion.span
									animate={
										isMobileMenuOpen
											? { rotate: -45, y: -8, backgroundColor: '#fff' }
											: { rotate: 0, y: 0, backgroundColor: '#fff' }
									}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
									className="w-6 h-0.5 rounded-full"
								/>
							</motion.button>
						</div>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ height: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
						animate={{ height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
						exit={{ height: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
						transition={{ duration: 0.3 }}
						className="md:hidden backdrop-blur-md border-t border-white/10 overflow-hidden"
					>
						<nav className="w-full max-w-7xl mx-auto px-4 py-4 space-y-4" aria-label="Navegación móvil">
							{navigationItems.map((item) => (
								<MobileNavigationItem
									key={item.id}
									label={item.label}
									isActive={activeSection === item.id}
									onClick={() => handleMobileNavigationClick(item.id)}
								/>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
};

export default memo(Header);
export { Header };
