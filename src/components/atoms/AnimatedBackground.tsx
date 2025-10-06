'use client';

import { animated, useSpring, useTrail } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface Particle {
	id: number;
	x: number;
	y: number;
	size: number;
	speed: number;
	opacity: number;
}

/**
 * Animated background component with floating particles
 * Creates a dynamic particle system with smooth animations
 */
export function AnimatedBackground() {
	const [particles, setParticles] = useState<Particle[]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	// Generate particles on mount
	useEffect(() => {
		const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 4 + 1,
			speed: Math.random() * 0.5 + 0.1,
			opacity: Math.random() * 0.5 + 0.1,
		}));
		setParticles(newParticles);
	}, []);

	// Mouse tracking for interactive effects
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	// Animate particles with spring physics
	const trail = useTrail(particles.length, {
		from: { opacity: 0, scale: 0 },
		to: { opacity: 1, scale: 1 },
		config: { tension: 300, friction: 30 },
	});

	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none">
			{particles.map((particle, index) => {
				const distance = Math.sqrt((particle.x - mousePosition.x) ** 2 + (particle.y - mousePosition.y) ** 2);
				const influence = Math.max(0, 1 - distance / 200);

				return (
					<animated.div
						key={particle.id}
						className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20"
						style={{
							left: particle.x,
							top: particle.y,
							width: particle.size * 3,
							height: particle.size * 3,
							opacity: trail[index].opacity.to((o) => o * particle.opacity * 0.3 * (1 + influence * 0.3)),
							transform: trail[index].scale.to((s) => `scale(${s * (1 + influence * 0.2)})`),
							filter: `blur(${influence * 1.5}px)`,
						}}
					/>
				);
			})}
		</div>
	);
}

/**
 * Floating geometric shapes component
 * Creates abstract geometric animations
 */
export function FloatingShapes() {
	const shapes = useSpring({
		from: { rotate: 0, scale: 0.8 },
		to: { rotate: 360, scale: 1.2 },
		loop: true,
		config: { duration: 20000 },
	});

	const shapes2 = useSpring({
		from: { rotate: 360, scale: 1.2 },
		to: { rotate: 0, scale: 0.8 },
		loop: true,
		config: { duration: 15000 },
	});

	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none">
			<animated.div
				className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-400/10 rounded-lg opacity-30"
				style={{
					transform: shapes.rotate.to((r) => `rotate(${r}deg)`),
					transformOrigin: 'center',
				}}
			/>
			<animated.div
				className="absolute top-40 right-32 w-24 h-24 border-2 border-purple-400/10 rounded-full opacity-25"
				style={{
					transform: shapes2.rotate.to((r) => `rotate(${r}deg)`),
					transformOrigin: 'center',
				}}
			/>
			<animated.div
				className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-pink-400/10 opacity-20"
				style={{
					transform: shapes.rotate.to((r) => `rotate(${r}deg) scale(${shapes.scale.get()})`),
					transformOrigin: 'center',
				}}
			/>
		</div>
	);
}

/**
 * Gradient mesh background
 * Creates a dynamic gradient mesh effect
 */
export function GradientMesh() {
	const meshAnimation = useSpring({
		from: {
			backgroundPosition: '0% 0%',
			opacity: 0.1,
		},
		to: {
			backgroundPosition: '100% 100%',
			opacity: 0.2,
		},
		loop: { reverse: true },
		config: { duration: 8000 },
	});

	return (
		<animated.div
			className="fixed inset-0 pointer-events-none"
			style={{
				background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `,
				backgroundSize: '400px 400px, 600px 600px, 300px 300px',
				backgroundPosition: meshAnimation.backgroundPosition,
				opacity: meshAnimation.opacity,
			}}
		/>
	);
}
