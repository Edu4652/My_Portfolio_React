'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { memo, useEffect, useState } from 'react';

const STAR_COUNT = 12;
const BASE_DURATION = 2;
const DURATION_MULTIPLIER = 0.2;

interface Star {
	readonly x: number;
	readonly y: number;
	readonly id: string;
}

const ScrollConstellation: React.FC = () => {
	const { scrollYProgress } = useScroll();
	const [stars, setStars] = useState<readonly Star[]>([]);

	const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
	const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 0.6, 0.4, 0.2]);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const generatedStars = Array.from({ length: STAR_COUNT }, (_, i) => ({
			x: (i * 100 + 50) % window.innerWidth,
			y: (i * 150 + 100) % window.innerHeight,
			id: `star-${i}`,
		}));

		setStars(generatedStars);
	}, []);

	if (stars.length === 0) return null;

	return (
		<motion.div
			className="absolute inset-0"
			style={{
				y,
				opacity,
			}}
		>
			<svg className="w-full h-full">
				{stars.map((star, i) => (
					<motion.circle
						key={star.id}
						cx={star.x}
						cy={star.y}
						r="2"
						fill="rgba(59, 130, 246, 0.6)"
						animate={{
							opacity: [0.3, 0.8, 0.3],
							scale: [0.5, 1, 0.5],
						}}
						transition={{
							duration: BASE_DURATION + i * DURATION_MULTIPLIER,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'easeInOut',
						}}
					/>
				))}
			</svg>
		</motion.div>
	);
};

export default memo(ScrollConstellation);
export { ScrollConstellation };
