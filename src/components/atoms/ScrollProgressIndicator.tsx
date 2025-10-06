import { motion, useScroll } from 'framer-motion';
import type React from 'react';
import { memo } from 'react';

const ScrollProgressIndicator: React.FC = () => {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
			style={{
				scaleX: scrollYProgress,
			}}
		/>
	);
};

export default memo(ScrollProgressIndicator);
export { ScrollProgressIndicator };
