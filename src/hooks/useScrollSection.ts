'use client';

import { useCallback } from 'react';

interface UseScrollSectionOptions {
	behavior?: ScrollBehavior;
	offset?: number;
}

export const useScrollSection = (options: UseScrollSectionOptions = {}) => {
	const { behavior = 'smooth', offset = 0 } = options;

	const scrollToSection = useCallback(
		(sectionId: string) => {
			const element = document.getElementById(sectionId);
			if (!element) return;

			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior,
			});
		},
		[behavior, offset],
	);

	return { scrollToSection };
};
