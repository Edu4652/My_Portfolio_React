'use client';

import { animated, useSpring } from '@react-spring/web';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Floating Element Effect
 * Creates gentle floating animation
 */
export function FloatingElement({
	children,
	delay = 0,
	distance = 10,
}: {
	children: React.ReactNode;
	delay?: number;
	distance?: number;
}) {
	const floatAnimation = useSpring({
		from: { transform: `translateY(0px)` },
		to: async (next) => {
			while (true) {
				await next({ transform: `translateY(-${distance}px)` });
				await next({ transform: `translateY(${distance}px)` });
			}
		},
		config: { tension: 120, friction: 40 },
		delay: delay * 1000,
	});

	return <animated.div style={floatAnimation}>{children}</animated.div>;
}

/**
 * Glitch Text Effect
 * Creates glitch animation for text
 */
export function GlitchText({ text, className = '' }: { text: string; className?: string }) {
	const [isGlitching, setIsGlitching] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsGlitching(true);
			setTimeout(() => setIsGlitching(false), 200);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<motion.span
			className={`relative inline-block ${className}`}
			animate={
				isGlitching
					? {
							x: [0, -2, 2, -1, 1, 0],
							textShadow: [
								'0 0 0 transparent',
								'2px 0 0 #ff0000, -2px 0 0 #00ffff',
								'-2px 0 0 #ff0000, 2px 0 0 #00ffff',
								'1px 0 0 #ff0000, -1px 0 0 #00ffff',
								'0 0 0 transparent',
							],
						}
					: {}
			}
			transition={{
				duration: 0.2,
				ease: 'easeInOut',
			}}
		>
			{text}
		</motion.span>
	);
}

/**
 * Magnetic Button Effect
 * Creates magnetic attraction on hover
 */
export function MagneticButton({
	children,
	className = '',
	strength = 0.3,
}: {
	children: React.ReactNode;
	className?: string;
	strength?: number;
}) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const springConfig = useSpring({
		transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.05 : 1})`,
		config: { tension: 300, friction: 40 },
	});

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const x = (e.clientX - centerX) * strength;
		const y = (e.clientY - centerY) * strength;

		setPosition({ x, y });
	};

	const handleMouseLeave = () => {
		setPosition({ x: 0, y: 0 });
		setIsHovered(false);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	return (
		<animated.div
			style={springConfig}
			className={className}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
		>
			{children}
		</animated.div>
	);
}
