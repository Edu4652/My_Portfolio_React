'use client';

import { type MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { memo, useMemo } from 'react';

interface ParticleTransform {
	readonly y: MotionValue<number>;
	readonly opacity: MotionValue<number>;
	readonly left: string;
	readonly top: string;
}

const PARTICLE_COUNT = 6;
const PARTICLE_BASE_DELAY = 2;
const PARTICLE_DELAY_INCREMENT = 0.1;

const particlePositions = [
	{ left: '15%', top: '20%' },
	{ left: '65%', top: '35%' },
	{ left: '25%', top: '60%' },
	{ left: '80%', top: '70%' },
	{ left: '45%', top: '15%' },
	{ left: '70%', top: '85%' },
] as const;

const ScrollParticleTrail: React.FC = () => {
	const { scrollYProgress } = useScroll();
	const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

	const particle0Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -110]);
	const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
	const particle3Y = useTransform(scrollYProgress, [0, 1], [0, -130]);
	const particle4Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
	const particle5Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

	const particleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 0.5, 0]);

	const particleTransforms: readonly ParticleTransform[] = useMemo(
		() => [
			{ y: particle0Y, opacity: particleOpacity, ...particlePositions[0] },
			{ y: particle1Y, opacity: particleOpacity, ...particlePositions[1] },
			{ y: particle2Y, opacity: particleOpacity, ...particlePositions[2] },
			{ y: particle3Y, opacity: particleOpacity, ...particlePositions[3] },
			{ y: particle4Y, opacity: particleOpacity, ...particlePositions[4] },
			{ y: particle5Y, opacity: particleOpacity, ...particlePositions[5] },
		],
		[particle0Y, particle1Y, particle2Y, particle3Y, particle4Y, particle5Y, particleOpacity],
	);

	return (
		<motion.div className="absolute inset-0" style={{ y: y1 }}>
			{particleTransforms.slice(0, PARTICLE_COUNT).map((transform, i) => (
				<motion.div
					key={`particle-${i}`}
					className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
					style={{
						left: transform.left,
						top: transform.top,
						y: transform.y,
						opacity: transform.opacity,
					}}
					animate={{
						scale: [0.5, 1, 0.5],
						opacity: [0.2, 0.8, 0.2],
					}}
					transition={{
						duration: PARTICLE_BASE_DELAY + i * PARTICLE_DELAY_INCREMENT,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>
			))}
		</motion.div>
	);
};

export default memo(ScrollParticleTrail);
export { ScrollParticleTrail };
