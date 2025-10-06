'use client';

import { animated, useSpring } from '@react-spring/web';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
	children: ReactNode;
	direction?: 'up' | 'down' | 'left' | 'right';
	delay?: number;
	distance?: number;
	duration?: number;
	className?: string;
}

/**
 * Advanced scroll reveal component with spring animations
 * Reveals content with smooth spring physics when scrolled into view
 */
export function ScrollReveal({
	children,
	direction = 'up',
	delay = 0,
	distance = 50,
	className = '',
}: Omit<ScrollRevealProps, 'duration'>) {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (inView && !hasAnimated) {
			setHasAnimated(true);
		}
	}, [inView, hasAnimated]);

	const getInitialTransform = () => {
		switch (direction) {
			case 'up':
				return `translateY(${distance}px)`;
			case 'down':
				return `translateY(-${distance}px)`;
			case 'left':
				return `translateX(${distance}px)`;
			case 'right':
				return `translateX(-${distance}px)`;
			default:
				return `translateY(${distance}px)`;
		}
	};

	const springProps = useSpring({
		from: {
			opacity: 0,
			transform: getInitialTransform(),
		},
		to: hasAnimated
			? {
					opacity: 1,
					transform: 'translateY(0px) translateX(0px)',
				}
			: {
					opacity: 0,
					transform: getInitialTransform(),
				},
		delay,
		config: {
			tension: 300,
			friction: 30,
			mass: 1,
		},
	});

	return (
		<animated.div ref={ref} className={className} style={springProps}>
			{children}
		</animated.div>
	);
}

/**
 * Staggered reveal for multiple children
 * Animates children with a staggered delay
 */
interface StaggeredRevealProps {
	children: ReactNode;
	delay?: number;
	className?: string;
}

export function StaggeredReveal({ children, delay = 100, className = '' }: StaggeredRevealProps) {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, y: 30 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
			transition={{
				duration: 0.6,
				delay: inView ? delay : 0,
				ease: 'easeOut',
			}}
		>
			{children}
		</motion.div>
	);
}

/**
 * Parallax scroll effect
 * Creates depth with different scroll speeds
 */
interface ParallaxProps {
	children: ReactNode;
	speed?: number;
	className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
	const [ref, inView] = useInView({
		threshold: 0,
		rootMargin: '-100px 0px',
	});

	const [{ y }, api] = useSpring(() => ({
		y: 0,
		config: { tension: 300, friction: 30 },
	}));

	useEffect(() => {
		const handleScroll = () => {
			if (inView) {
				const scrolled = window.pageYOffset;
				const rate = scrolled * -speed;
				api.start({ y: rate });
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [inView, speed, api]);

	return (
		<animated.div ref={ref} className={className} style={{ transform: y.to((y) => `translateY(${y}px)`) }}>
			{children}
		</animated.div>
	);
}

/**
 * Magnetic hover effect
 * Creates a magnetic attraction effect on hover
 */
interface MagneticProps {
	children: ReactNode;
	strength?: number;
	className?: string;
}

export function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
	const [ref, inView] = useInView({
		threshold: 0,
	});

	const [{ x }, api] = useSpring(() => ({
		x: 0,
		y: 0,
		config: { tension: 300, friction: 30 },
	}));

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!inView) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;

		api.start({ x: deltaX, y: deltaY });
	};

	const handleMouseLeave = () => {
		api.start({ x: 0, y: 0 });
	};

	return (
		<animated.div
			ref={ref}
			className={className}
			style={{ transform: x.to((x, y) => `translate(${x}px, ${y}px)`) }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</animated.div>
	);
}
