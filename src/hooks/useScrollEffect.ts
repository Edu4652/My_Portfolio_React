'use client';

import { useEffect, useState } from 'react';

interface UseScrollEffectOptions {
	threshold?: number;
}

export const useScrollEffect = (options: UseScrollEffectOptions = {}) => {
	const { threshold = 50 } = options;
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > threshold);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [threshold]);

	return isScrolled;
};
