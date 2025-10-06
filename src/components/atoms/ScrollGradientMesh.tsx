import { motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { memo } from 'react';

const ScrollGradientMesh: React.FC = () => {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.1]);

	return (
		<motion.div
			className="absolute inset-0"
			style={{
				y,
				opacity,
				background: `
          radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
        `,
			}}
		/>
	);
};

export default memo(ScrollGradientMesh);
export { ScrollGradientMesh };
