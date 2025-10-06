import { motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { memo } from 'react';

const GRID_SIZE = '50px';

const ScrollReactiveGrid: React.FC = () => {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -400]);

	return (
		<motion.div
			className="absolute inset-0 opacity-5"
			style={{
				y,
				backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
				backgroundSize: `${GRID_SIZE} ${GRID_SIZE}`,
			}}
		/>
	);
};

export default memo(ScrollReactiveGrid);
export { ScrollReactiveGrid };
