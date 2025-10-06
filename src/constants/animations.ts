export const ANIMATION_DURATIONS = {
	fast: 0.2,
	normal: 0.3,
	slow: 0.5,
	verySlow: 0.8,
} as const;

export const ANIMATION_DELAYS = {
	none: 0,
	short: 0.1,
	medium: 0.2,
	long: 0.3,
} as const;

export const STAGGER_CHILDREN = {
	fast: 0.1,
	normal: 0.2,
	slow: 0.3,
} as const;

export const SPRING_CONFIG = {
	default: { tension: 300, friction: 30 },
	stiff: { tension: 400, friction: 40 },
	gentle: { tension: 200, friction: 25 },
} as const;

export const TRANSITION_EASE = {
	easeInOut: [0.6, -0.05, 0.01, 0.99],
	easeOut: [0.6, 0.01, -0.05, 0.9],
	easeIn: [0.6, -0.28, 0.735, 0.045],
} as const;
