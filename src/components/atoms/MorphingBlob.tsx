import { motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { memo } from 'react';

interface MorphingBlobProps {
	readonly position: 'top-left' | 'bottom-right';
	readonly size: 'sm' | 'md' | 'lg';
	readonly duration?: number;
	readonly delay?: number;
}

const sizeMap = {
	sm: 'w-32 h-32',
	md: 'w-48 h-48',
	lg: 'w-72 h-72',
} as const;

const positionMap = {
	'top-left': 'top-20 left-10',
	'bottom-right': 'bottom-20 right-20',
} as const;

const borderRadiusSequence: Record<'top-left' | 'bottom-right', string[]> = {
	'top-left': [
		'60% 40% 30% 70% / 60% 30% 70% 40%',
		'30% 60% 70% 40% / 50% 60% 30% 60%',
		'50% 60% 30% 60% / 60% 30% 60% 40%',
		'60% 40% 30% 70% / 60% 30% 70% 40%',
	],
	'bottom-right': [
		'30% 70% 70% 30% / 30% 30% 70% 70%',
		'70% 30% 30% 70% / 70% 70% 30% 30%',
		'50% 50% 50% 50% / 60% 40% 60% 40%',
		'30% 70% 70% 30% / 30% 30% 70% 70%',
	],
};

const backgroundGradient = {
	'top-left': 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1))',
	'bottom-right': 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.1))',
} as const;

const MorphingBlob: React.FC<MorphingBlobProps> = ({ position, size, duration = 8, delay = 0 }) => {
	const { scrollYProgress } = useScroll();

	const y = useTransform(scrollYProgress, [0, 1], position === 'top-left' ? [0, -200] : [0, -100]);

	const rotate = useTransform(scrollYProgress, [0, 1], position === 'top-left' ? [0, 360] : [0, -180]);

	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

	return (
		<motion.div
			className={`absolute ${positionMap[position]}`}
			style={{
				y,
				rotate,
				scale,
			}}
		>
			<motion.div
				className={`${sizeMap[size]} opacity-10`}
				animate={{
					borderRadius: borderRadiusSequence[position],
				}}
				transition={{
					duration,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
					delay,
				}}
				style={{
					background: backgroundGradient[position],
				}}
			/>
		</motion.div>
	);
};

export default memo(MorphingBlob);
export { MorphingBlob };
