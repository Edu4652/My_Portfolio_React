'use client';

import { animated, useSpring } from '@react-spring/web';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashEffect {
	id: number;
	x: number;
	y: number;
	timestamp: number;
}

/**
 * Advanced Splash Cursor Effect
 * Creates beautiful splash animations when clicking with fluid-like trails
 */
export function SplashCursor() {
	const [splashes, setSplashes] = useState<SplashEffect[]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isClicking, setIsClicking] = useState(false);
	const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

	// Smooth cursor following animation
	const cursorSpring = useSpring({
		transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
		config: { tension: 300, friction: 30 },
	});

	useEffect(() => {
		// Hide default cursor
		document.body.style.cursor = 'none';

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });

			// Add trail point
			setTrail((prev) => {
				const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }];
				return newTrail;
			});
		};

		const handleClick = (e: MouseEvent) => {
			// Create splash effect
			const newSplash: SplashEffect = {
				id: Date.now() + Math.random(),
				x: e.clientX,
				y: e.clientY,
				timestamp: Date.now(),
			};

			setSplashes((prev) => [...prev, newSplash]);

			// Remove splash after animation
			setTimeout(() => {
				setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id));
			}, 1200);
		};

		const handleMouseDown = () => {
			setIsClicking(true);
		};

		const handleMouseUp = () => {
			setIsClicking(false);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('click', handleClick);
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.body.style.cursor = 'auto';
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('click', handleClick);
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	// Clear old trail points
	useEffect(() => {
		const interval = setInterval(() => {
			setTrail((prev) => prev.slice(-5));
		}, 100);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{/* Colorful Trail Effect */}
			{trail.map((point, index) => (
				<motion.div
					key={point.id}
					className="fixed pointer-events-none z-[9997]"
					style={{
						left: point.x,
						top: point.y,
					}}
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						scale: [0, 0.5, 0],
						opacity: [0, 0.8, 0],
					}}
					transition={{
						duration: 0.6,
						ease: 'easeOut',
					}}
				>
					<div
						className="w-8 h-8 rounded-full blur-sm -translate-x-1/2 -translate-y-1/2"
						style={{
							background: `radial-gradient(circle, 
                hsl(${(index * 45 + Date.now() * 0.01) % 360}, 70%, 60%) 0%, 
                hsl(${(index * 45 + Date.now() * 0.01 + 60) % 360}, 80%, 70%) 50%, 
                transparent 80%)`,
						}}
					/>
				</motion.div>
			))}

			{/* Custom Cursor */}
			<animated.div
				className="fixed top-0 left-0 pointer-events-none z-[9999]"
				style={{
					...cursorSpring,
					left: -6,
					top: -6,
				}}
			>
				<motion.div
					className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"
					animate={{
						scale: isClicking ? 1.5 : 1,
						opacity: isClicking ? 1 : 0.9,
					}}
					transition={{
						duration: 0.1,
						ease: 'easeOut',
					}}
				/>
			</animated.div>

			{/* Advanced Splash Effects */}
			<AnimatePresence>
				{splashes.map((splash) => (
					<motion.div
						key={splash.id}
						className="fixed pointer-events-none z-[9998]"
						style={{
							left: splash.x,
							top: splash.y,
						}}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{
							duration: 1.2,
							ease: [0.23, 1, 0.32, 1],
						}}
					>
						{/* Main fluid splash with dynamic gradient */}
						<motion.div
							className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
							initial={{ scale: 0, opacity: 0 }}
							animate={{
								scale: [0, 2, 3.5],
								opacity: [0, 0.9, 0],
							}}
							transition={{
								duration: 1.0,
								times: [0, 0.3, 1],
								ease: [0.23, 1, 0.32, 1],
							}}
							style={{
								background: `radial-gradient(circle, 
                  rgba(59, 130, 246, 0.8) 0%, 
                  rgba(139, 92, 246, 0.6) 30%, 
                  rgba(236, 72, 153, 0.4) 60%, 
                  transparent 80%)`,
							}}
						/>

						{/* Outer ripple rings */}
						{[...Array(3)].map((_, i) => (
							<motion.div
								key={`ring-${i}`}
								className="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full"
								style={{
									width: `${32 + i * 16}px`,
									height: `${32 + i * 16}px`,
									borderColor: `hsl(${220 + i * 30}, 70%, 60%)`,
									borderWidth: `${2 - i * 0.5}px`,
								}}
								initial={{ scale: 0, opacity: 0 }}
								animate={{
									scale: [0, 2.5 + i * 0.5],
									opacity: [0, 0.8 - i * 0.2, 0],
								}}
								transition={{
									duration: 0.9 + i * 0.1,
									delay: i * 0.05,
									ease: [0.23, 1, 0.32, 1],
								}}
							/>
						))}

						{/* Inner bright core */}
						<motion.div
							className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg"
							initial={{ scale: 0, opacity: 0 }}
							animate={{
								scale: [0, 1.5, 0],
								opacity: [0, 1, 0],
							}}
							transition={{
								duration: 0.5,
								times: [0, 0.4, 1],
								ease: [0.23, 1, 0.32, 1],
							}}
						/>

						{/* Particle explosion */}
						{[...Array(12)].map((_, i) => {
							const angle = i * 30 * (Math.PI / 180);
							const distance = 40 + i * 3;
							const x = Math.cos(angle) * distance;
							const y = Math.sin(angle) * distance;

							return (
								<motion.div
									key={`particle-${i}`}
									className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
									style={{
										backgroundColor: `hsl(${(i * 30 + 180) % 360}, 80%, 65%)`,
									}}
									initial={{
										x: 0,
										y: 0,
										scale: 0,
										opacity: 0,
									}}
									animate={{
										x: x,
										y: y,
										scale: [0, 1.2, 0],
										opacity: [0, 1, 0],
									}}
									transition={{
										duration: 0.8,
										delay: i * 0.03,
										ease: [0.23, 1, 0.32, 1],
									}}
								/>
							);
						})}

						{/* Secondary particle layer */}
						{[...Array(8)].map((_, i) => {
							const angle = (i * 45 + 22.5) * (Math.PI / 180);
							const distance = 60 + i * 4;
							const x = Math.cos(angle) * distance;
							const y = Math.sin(angle) * distance;

							return (
								<motion.div
									key={`secondary-particle-${i}`}
									className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
									style={{
										backgroundColor: `hsl(${(i * 45 + 270) % 360}, 90%, 70%)`,
									}}
									initial={{
										x: 0,
										y: 0,
										scale: 0,
										opacity: 0,
									}}
									animate={{
										x: x,
										y: y,
										scale: [0, 1, 0],
										opacity: [0, 0.8, 0],
									}}
									transition={{
										duration: 0.9,
										delay: 0.1 + i * 0.04,
										ease: [0.23, 1, 0.32, 1],
									}}
								/>
							);
						})}
					</motion.div>
				))}
			</AnimatePresence>
		</>
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
 * Morphing Shape Effect
 * Creates dynamic shape morphing
 */
export function MorphingShape({ className = '' }: { className?: string }) {
	const morphAnimation = useSpring({
		from: {
			borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
			transform: 'rotate(0deg) scale(1)',
		},
		to: async (next) => {
			while (true) {
				await next({
					borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
					transform: 'rotate(90deg) scale(1.1)',
				});
				await next({
					borderRadius: '70% 30% 40% 60% / 40% 70% 60% 30%',
					transform: 'rotate(180deg) scale(0.9)',
				});
				await next({
					borderRadius: '40% 70% 60% 30% / 70% 40% 50% 70%',
					transform: 'rotate(270deg) scale(1.05)',
				});
				await next({
					borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
					transform: 'rotate(360deg) scale(1)',
				});
			}
		},
		config: { tension: 80, friction: 60 },
	});

	return (
		<animated.div
			style={morphAnimation}
			className={`bg-gradient-to-r from-blue-500/20 to-purple-500/20 ${className}`}
		/>
	);
}

/**
 * Text Wave Effect
 * Creates wave animation for text
 */
export function TextWave({ text, className = '' }: { text: string; className?: string }) {
	const letters = text.split('');

	return (
		<span className={className}>
			{letters.map((letter, index) => (
				<motion.span
					key={index}
					className="inline-block"
					animate={{
						y: [0, -10, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						delay: index * 0.1,
						ease: 'easeInOut',
					}}
				>
					{letter === ' ' ? '\u00A0' : letter}
				</motion.span>
			))}
		</span>
	);
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
