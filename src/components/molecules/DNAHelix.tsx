import { motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { memo } from 'react';

const HELIX_STRAND_COUNT = 15;
const DNA_HELIX_HEIGHT = 72;
const ANIMATION_DURATION = 3;
const STRAND_DELAY_MULTIPLIER = 0.05;

interface DNAStrandProps {
	readonly progress: number;
	readonly y: number;
	readonly index: number;
	readonly side: 'left' | 'right';
}

const DNAStrand: React.FC<DNAStrandProps> = memo(({ progress, y, index, side }) => {
	const baseX = Math.sin(progress * Math.PI * 4);
	const xPosition = side === 'left' ? baseX * 20 + 15 : Math.sin(progress * Math.PI * 4 + Math.PI) * 20 + 15;
	const rotateY = side === 'left' ? progress * 360 * 2 : progress * 360 * 2 + 180;

	return (
		<motion.div
			className={`absolute w-2 h-2 rounded-full ${side === 'left' ? 'bg-blue-400' : 'bg-purple-400'}`}
			style={{ top: y }}
			animate={{
				x: xPosition,
				rotateY,
			}}
			transition={{
				duration: ANIMATION_DURATION,
				repeat: Number.POSITIVE_INFINITY,
				ease: 'linear',
				delay: index * STRAND_DELAY_MULTIPLIER,
			}}
		/>
	);
});

DNAStrand.displayName = 'DNAStrand';

const DNAHelix: React.FC = () => {
	const { scrollYProgress } = useScroll();

	const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

	return (
		<motion.div
			className="absolute top-1/4 right-10 opacity-20"
			style={{
				y,
				rotate,
				scale,
			}}
		>
			<div className={`relative h-${DNA_HELIX_HEIGHT} w-24`}>
				{Array.from({ length: HELIX_STRAND_COUNT }, (_, i) => {
					const progress = i / HELIX_STRAND_COUNT;
					const yPos = progress * 280;

					return (
						<div key={`helix-${i}`}>
							<DNAStrand progress={progress} y={yPos} index={i} side="left" />
							<DNAStrand progress={progress} y={yPos} index={i} side="right" />
						</div>
					);
				})}
			</div>
		</motion.div>
	);
};

export default memo(DNAHelix);
export { DNAHelix };
