'use client';

import { animated, useSpring } from '@react-spring/web';
import { type MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';

interface MousePosition {
	readonly x: number;
	readonly y: number;
}

interface ShapeTransform {
	readonly y: MotionValue<number>;
	readonly rotate: MotionValue<number>;
	readonly opacity: MotionValue<number>;
}

const SQUARE_COUNT = 6;

const FloatingGeometricShapes: React.FC = () => {
	const { scrollYProgress } = useScroll();
	const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

	const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
	const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.1]);

	const squareY0 = useTransform(scrollYProgress, [0, 1], [0, -50]);
	const squareY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const squareY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
	const squareY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const squareY4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
	const squareY5 = useTransform(scrollYProgress, [0, 1], [0, -300]);

	const squareRotateOdd = useTransform(scrollYProgress, [0, 1], [0, 180]);
	const squareRotateEven = useTransform(scrollYProgress, [0, 1], [0, -180]);
	const squareOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0]);

	const squareTransforms: readonly ShapeTransform[] = useMemo(
		() => [
			{ y: squareY0, rotate: squareRotateEven, opacity: squareOpacity },
			{ y: squareY1, rotate: squareRotateOdd, opacity: squareOpacity },
			{ y: squareY2, rotate: squareRotateEven, opacity: squareOpacity },
			{ y: squareY3, rotate: squareRotateOdd, opacity: squareOpacity },
			{ y: squareY4, rotate: squareRotateEven, opacity: squareOpacity },
			{ y: squareY5, rotate: squareRotateOdd, opacity: squareOpacity },
		],
		[squareY0, squareY1, squareY2, squareY3, squareY4, squareY5, squareRotateEven, squareRotateOdd, squareOpacity],
	);

	const mouseSpring = useSpring({
		x: mousePosition.x * 0.02,
		y: mousePosition.y * 0.02,
		config: { tension: 300, friction: 50 },
	});

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent): void => {
			setMousePosition({
				x: e.clientX - window.innerWidth / 2,
				y: e.clientY - window.innerHeight / 2,
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<animated.div
			style={{
				transform: `translate3d(${mouseSpring.x}px, ${mouseSpring.y}px, 0)`,
			}}
		>
			<motion.div
				className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
				style={{
					y: y2,
					rotate: rotate1,
					scale,
					background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))',
					filter: 'blur(40px)',
				}}
			/>

			<motion.div
				className="absolute top-1/2 right-1/3 w-32 h-32"
				style={{
					y: y3,
					rotate: rotate2,
					opacity,
					clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
					background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.05))',
				}}
			/>

			{squareTransforms.slice(0, SQUARE_COUNT).map((transform, i) => (
				<motion.div
					key={`square-${i}`}
					className="absolute w-4 h-4 bg-blue-400/10"
					style={{
						left: `${20 + i * 15}%`,
						top: `${30 + (i % 2) * 40}%`,
						y: transform.y,
						rotate: transform.rotate,
						opacity: transform.opacity,
					}}
				/>
			))}
		</animated.div>
	);
};

export default memo(FloatingGeometricShapes);
export { FloatingGeometricShapes };
