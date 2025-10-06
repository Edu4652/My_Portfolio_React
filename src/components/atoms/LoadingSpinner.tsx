'use client';

import { animated, useSpring, useTrail } from '@react-spring/web';
import { useState } from 'react';

interface LoadingSpinnerProps {
	size?: number;
	color?: string;
	className?: string;
}

/**
 * Advanced loading spinner with spring animations
 * Creates a sophisticated loading animation
 */
export function LoadingSpinner({ size = 40, color = '#3b82f6', className = '' }: LoadingSpinnerProps) {
	const [_isVisible, _setIsVisible] = useState(true);

	const spinnerAnimation = useSpring({
		from: { rotate: 0 },
		to: { rotate: 360 },
		loop: true,
		config: { duration: 1000 },
	});

	const pulseAnimation = useSpring({
		from: { scale: 0.8, opacity: 0.5 },
		to: { scale: 1.2, opacity: 1 },
		loop: { reverse: true },
		config: { duration: 1500 },
	});

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<animated.div
				style={{
					width: size,
					height: size,
					border: `3px solid ${color}20`,
					borderTop: `3px solid ${color}`,
					borderRadius: '50%',
					transform: spinnerAnimation.rotate.to((r) => `rotate(${r}deg)`),
				}}
			/>
			<animated.div
				className="absolute"
				style={{
					width: size * 0.6,
					height: size * 0.6,
					border: `2px solid ${color}40`,
					borderTop: `2px solid ${color}`,
					borderRadius: '50%',
					transform: spinnerAnimation.rotate.to((r) => `rotate(-${r}deg)`),
					scale: pulseAnimation.scale,
					opacity: pulseAnimation.opacity,
				}}
			/>
		</div>
	);
}

/**
 * Dot loading animation
 * Creates a bouncing dots effect
 */
export function DotLoader({ className = '' }: { className?: string }) {
	const dots = [0, 1, 2];

	const trail = useTrail(dots.length, {
		from: { scale: 0, opacity: 0 },
		to: { scale: 1, opacity: 1 },
		loop: { reverse: true },
		config: { duration: 600 },
	});

	return (
		<div className={`flex space-x-2 ${className}`}>
			{trail.map((style, index) => (
				<animated.div
					key={index}
					className="w-3 h-3 bg-blue-500 rounded-full"
					style={{
						...style,
						animationDelay: `${index * 0.2}s`,
					}}
				/>
			))}
		</div>
	);
}

/**
 * Skeleton loading component
 * Creates placeholder content while loading
 */
interface SkeletonProps {
	width?: string;
	height?: string;
	className?: string;
	lines?: number;
}

export function Skeleton({ width = '100%', height = '20px', className = '', lines = 1 }: SkeletonProps) {
	const shimmerAnimation = useSpring({
		from: { x: '-100%' },
		to: { x: '100%' },
		loop: true,
		config: { duration: 1500 },
	});

	return (
		<div className={className}>
			{Array.from({ length: lines }).map((_, index) => (
				<div
					key={index}
					className="relative overflow-hidden bg-gray-200 rounded"
					style={{ width, height: index === lines - 1 ? height : '16px' }}
				>
					<animated.div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
						style={{
							transform: shimmerAnimation.x.to((x) => `translateX(${x})`),
						}}
					/>
				</div>
			))}
		</div>
	);
}

/**
 * Progress bar with animation
 * Shows progress with smooth animations
 */
interface ProgressBarProps {
	progress: number;
	color?: string;
	className?: string;
	showPercentage?: boolean;
}

export function ProgressBar({ progress, color = '#3b82f6', className = '', showPercentage = false }: ProgressBarProps) {
	const progressAnimation = useSpring({
		from: { width: '0%' },
		to: { width: `${Math.min(100, Math.max(0, progress))}%` },
		config: { tension: 300, friction: 30 },
	});

	return (
		<div className={`w-full ${className}`}>
			<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
				<animated.div
					className="h-full rounded-full transition-all duration-300"
					style={{
						width: progressAnimation.width,
						backgroundColor: color,
					}}
				/>
			</div>
			{showPercentage && <div className="text-sm text-gray-600 mt-1">{Math.round(progress)}%</div>}
		</div>
	);
}

/**
 * Morphing loader
 * Creates a morphing shape animation
 */
export function MorphingLoader({ className = '' }: { className?: string }) {
	const morphAnimation = useSpring({
		from: {
			borderRadius: '50%',
			rotate: 0,
			scale: 1,
		},
		to: {
			borderRadius: '10%',
			rotate: 180,
			scale: 1.2,
		},
		loop: { reverse: true },
		config: { duration: 2000 },
	});

	return (
		<animated.div
			className={`bg-gradient-to-r from-blue-500 to-purple-500 ${className}`}
			style={{
				width: 40,
				height: 40,
				borderRadius: morphAnimation.borderRadius,
				transform: morphAnimation.rotate.to((r) => `rotate(${r}deg) scale(${morphAnimation.scale.get()})`),
			}}
		/>
	);
}
