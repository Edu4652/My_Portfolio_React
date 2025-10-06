'use client';

import { useEffect, useState } from 'react';

interface UseActiveSectionOptions {
	sectionIds: string[];
	offset?: number;
}

export const useActiveSection = ({ sectionIds, offset = 100 }: UseActiveSectionOptions) => {
	const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + offset;

			for (const sectionId of sectionIds) {
				const element = document.getElementById(sectionId);
				if (!element) continue;

				const { offsetTop, offsetHeight } = element;
				if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
					setActiveSection(sectionId);
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [sectionIds, offset]);

	return activeSection;
};
