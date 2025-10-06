'use client';

import { animated, useSpring } from '@react-spring/web';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
	children: ReactNode;
	className?: string;
}

/**
 * Advanced page transition component
 * Creates smooth transitions between page states
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
	const [_isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const pageVariants = {
		initial: {
			opacity: 0,
			y: 50,
			scale: 0.95,
		},
		in: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
		out: {
			opacity: 0,
			y: -50,
			scale: 1.05,
		},
	};

	const pageTransition = {
		type: 'tween' as const,
		ease: 'anticipate' as const,
		duration: 0.6,
	};

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial="initial"
				animate="in"
				exit="out"
				variants={pageVariants}
				transition={pageTransition}
				className={className}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

/**
 * Loading overlay with advanced animations
 * Shows during page transitions
 */
export function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
	const overlayAnimation = useSpring({
		from: { opacity: 0 },
		to: { opacity: isLoading ? 1 : 0 },
		config: { tension: 300, friction: 30 },
	});

	const spinnerAnimation = useSpring({
		from: { rotate: 0, scale: 0.8 },
		to: { rotate: 360, scale: 1 },
		loop: true,
		config: { duration: 1000 },
	});

	if (!isLoading) return null;

	return (
		<animated.div
			className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
			style={{ opacity: overlayAnimation.opacity }}
		>
			<div className="text-center">
				<animated.div
					className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
					style={{
						transform: spinnerAnimation.rotate.to((r) => `rotate(${r}deg)`),
						scale: spinnerAnimation.scale,
					}}
				/>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="text-white text-lg"
				>
					Cargando...
				</motion.p>
			</div>
		</animated.div>
	);
}

/**
 * Smooth scroll to element
 * Creates smooth scrolling animations
 */
export function SmoothScroll({
	to,
	children,
	className = '',
}: {
	to: string;
	children: ReactNode;
	className?: string;
}) {
	const handleClick = () => {
		const element = document.querySelector(to);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	return (
		<motion.div
			onClick={handleClick}
			className={`cursor-pointer ${className}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			{children}
		</motion.div>
	);
}

/**
 * Reveal animation on scroll
 * Advanced scroll-triggered animations
 */
interface RevealOnScrollProps {
	children: ReactNode;
	direction?: 'up' | 'down' | 'left' | 'right';
	delay?: number;
	className?: string;
}

export function RevealOnScroll({ children, direction = 'up', delay = 0, className = '' }: RevealOnScrollProps) {
	const [setRef, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const getInitialTransform = () => {
		switch (direction) {
			case 'up':
				return 'translateY(50px)';
			case 'down':
				return 'translateY(-50px)';
			case 'left':
				return 'translateX(50px)';
			case 'right':
				return 'translateX(-50px)';
			default:
				return 'translateY(50px)';
		}
	};

	return (
		<motion.div
			ref={setRef}
			className={className}
			initial={{
				opacity: 0,
				transform: getInitialTransform(),
			}}
			animate={
				inView
					? {
							opacity: 1,
							transform: 'translateY(0px) translateX(0px)',
						}
					: {
							opacity: 0,
							transform: getInitialTransform(),
						}
			}
			transition={{
				duration: 0.6,
				delay,
				ease: 'easeOut',
			}}
		>
			{children}
		</motion.div>
	);
}

// Hook for intersection observer
function useInView(options = {}) {
	const [ref, setRef] = useState<HTMLElement | null>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		if (!ref) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
			}
		}, options);

		observer.observe(ref);

		return () => {
			observer.unobserve(ref);
		};
	}, [ref, options]);

	return [setRef as unknown as (node: HTMLElement | null) => void, inView] as const;
}
