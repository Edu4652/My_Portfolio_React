import type React from 'react';
import { memo } from 'react';
import { FloatingGeometricShapes } from './FloatingGeometricShapes';
import { MorphingBlob } from './MorphingBlob';
import { ScrollGradientMesh } from './ScrollGradientMesh';
import { ScrollParticleTrail } from './ScrollParticleTrail';
import { ScrollReactiveGrid } from './ScrollReactiveGrid';

const ScrollAnimatedBackground: React.FC = () => {
	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden">
			<ScrollGradientMesh />
			<FloatingGeometricShapes />
			<ScrollParticleTrail />
			<ScrollReactiveGrid />
			<MorphingBlob position="top-left" size="lg" duration={8} />
			<MorphingBlob position="bottom-right" size="md" duration={6} delay={1} />
		</div>
	);
};

export default memo(ScrollAnimatedBackground);
export { ScrollAnimatedBackground };
