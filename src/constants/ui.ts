export const SCROLL_OFFSET = {
	header: 100,
	section: 50,
} as const;

export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const;

export const Z_INDEX = {
	background: 0,
	content: 10,
	header: 50,
	modal: 100,
	tooltip: 200,
} as const;

export const VIEWPORT_HEIGHT = {
	hero: 'min-h-screen',
	section: 'min-h-[600px]',
} as const;
