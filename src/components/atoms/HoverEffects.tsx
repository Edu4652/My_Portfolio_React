'use client';

import { animated, useSpring as useReactSpring } from '@react-spring/web';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

/**
 * Tilt Card Effect
 * Creates 3D tilt effect on hover with light reflection
 */
interface TiltCardProps {
	children: React.ReactNode;
	className?: string;
	tiltMaxAngle?: number;
}

export function TiltCard({ children, className = '', tiltMaxAngle = 15 }: TiltCardProps) {
	const ref = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);

	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]);
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;

		x.set(xPct);
		y.set(yPct);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			className={`relative transform-gpu ${className}`}
			style={{
				rotateX,
				rotateY,
				transformStyle: 'preserve-3d',
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			whileHover={{ scale: 1.05 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
		>
			<div style={{ transform: 'translateZ(50px)' }}>{children}</div>

			{/* Light reflection overlay */}
			<motion.div
				className="absolute inset-0 opacity-0 pointer-events-none"
				style={{
					background: `radial-gradient(circle at ${useTransform(
						mouseXSpring,
						[-0.5, 0.5],
						[0, 100],
					)}% ${useTransform(
						mouseYSpring,
						[-0.5, 0.5],
						[0, 100],
					)}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
				}}
				whileHover={{ opacity: 1 }}
			/>
		</motion.div>
	);
}

/**
 * Magnetic Hover Effect
 * Elements are attracted to cursor with spring physics
 */
interface MagneticHoverProps {
	children: React.ReactNode;
	className?: string;
	strength?: number;
	springConfig?: { tension: number; friction: number };
}

export function MagneticHover({
	children,
	className = '',
	strength = 0.3,
	springConfig = { tension: 300, friction: 30 },
}: MagneticHoverProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const springProps = useReactSpring({
		transform: isHovered
			? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
			: 'translate3d(0px, 0px, 0)',
		scale: isHovered ? 1.05 : 1,
		config: springConfig,
	});

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;

		setMousePosition({ x: deltaX, y: deltaY });
	};

	return (
		<animated.div
			className={`cursor-pointer ${className}`}
			style={springProps}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onMouseMove={handleMouseMove}
		>
			{children}
		</animated.div>
	);
}

/**
 * Ripple Effect
 * Creates expanding ripple on click
 */
interface RippleEffectProps {
	children: React.ReactNode;
	className?: string;
	rippleColor?: string;
}

export function RippleEffect({ children, className = '', rippleColor = 'rgba(59, 130, 246, 0.3)' }: RippleEffectProps) {
	const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

	const handleClick = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const newRipple = { x, y, id: Date.now() };
		setRipples((prev) => [...prev, newRipple]);

		setTimeout(() => {
			setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
		}, 600);
	};

	return (
		<div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
			{children}

			{ripples.map((ripple) => (
				<motion.div
					key={ripple.id}
					className="absolute rounded-full pointer-events-none"
					style={{
						left: ripple.x - 25,
						top: ripple.y - 25,
						width: 50,
						height: 50,
						backgroundColor: rippleColor,
					}}
					initial={{ scale: 0, opacity: 1 }}
					animate={{ scale: 4, opacity: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				/>
			))}
		</div>
	);
}

/**
 * Glow Effect
 * Creates animated glow on hover
 */
interface GlowEffectProps {
	children: React.ReactNode;
	className?: string;
	glowColor?: string;
	intensity?: number;
}

export function GlowEffect({ children, className = '', glowColor = '#3b82f6', intensity = 20 }: GlowEffectProps) {
	const [isHovered, setIsHovered] = useState(false);

	const glowAnimation = useReactSpring({
		boxShadow: isHovered
			? `0 0 ${intensity}px ${glowColor}, 0 0 ${intensity * 2}px ${glowColor}40`
			: '0 0 0px transparent',
		config: { tension: 300, friction: 30 },
	});

	return (
		<animated.div
			className={`transition-all duration-300 ${className}`}
			style={glowAnimation}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
		</animated.div>
	);
}

/**
 * Morphing Button
 * Button that morphs shape on hover
 */
interface MorphingButtonProps {
	children: React.ReactNode;
	className?: string;
	morphScale?: number;
}

export function MorphingButton({ children, className = '', morphScale = 1.1 }: MorphingButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	const morphAnimation = useReactSpring({
		transform: isHovered ? `scale(${morphScale})` : 'scale(1)',
		borderRadius: isHovered ? '25px' : '8px',
		background: isHovered
			? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
			: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
		config: { tension: 300, friction: 30 },
	});

	return (
		<animated.button
			className={`px-6 py-3 text-white font-semibold cursor-pointer border-none outline-none ${className}`}
			style={morphAnimation}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
		</animated.button>
	);
}

/**
 * Parallax Hover
 * Creates parallax effect with multiple layers on hover
 */
interface ParallaxHoverProps {
	children: React.ReactNode;
	className?: string;
	depth?: number;
}

export function ParallaxHover({ children, className = '', depth = 20 }: ParallaxHoverProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const deltaX = (e.clientX - centerX) / rect.width;
		const deltaY = (e.clientY - centerY) / rect.height;

		setMousePosition({ x: deltaX * depth, y: deltaY * depth });
	};

	const handleMouseLeave = () => {
		setMousePosition({ x: 0, y: 0 });
	};

	const parallaxAnimation = useReactSpring({
		transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
		config: { tension: 300, friction: 30 },
	});

	return (
		<div className={`relative ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			<animated.div style={parallaxAnimation}>{children}</animated.div>
		</div>
	);
}

/**
 * Elastic Hover
 * Creates elastic bounce effect on hover
 */
interface ElasticHoverProps {
	children: React.ReactNode;
	className?: string;
	elasticity?: number;
}

export function ElasticHover({ children, className = '', elasticity = 1.2 }: ElasticHoverProps) {
	return (
		<motion.div
			className={`cursor-pointer ${className}`}
			whileHover={{
				scale: elasticity,
				transition: {
					type: 'spring',
					stiffness: 400,
					damping: 10,
				},
			}}
			whileTap={{ scale: 0.95 }}
		>
			{children}
		</motion.div>
	);
}
