import { Variants } from 'framer-motion';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '@/constants/animations';

export const randomDelay = (min: number = 0.1, max: number = 0.5): number => {
	return Math.random() * (max - min) + min;
};

export const createFadeInVariant = (delay: number = 0, duration: number = ANIMATION_DURATIONS.normal): Variants => ({
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration, delay },
	},
});

export const createSlideUpVariant = (
	delay: number = 0,
	duration: number = ANIMATION_DURATIONS.normal,
	distance: number = 30,
): Variants => ({
	hidden: { opacity: 0, y: distance },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration, delay },
	},
});

export const createScaleVariant = (delay: number = 0, duration: number = ANIMATION_DURATIONS.normal): Variants => ({
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration, delay },
	},
});

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: ANIMATION_DELAYS.short,
		},
	},
};
