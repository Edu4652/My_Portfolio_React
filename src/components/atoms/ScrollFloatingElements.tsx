import type React from 'react';
import { memo } from 'react';
import { DNAHelix } from '../molecules/DNAHelix';
import { ScrollConstellation } from '../molecules/ScrollConstellation';

const ScrollFloatingElements: React.FC = () => {
	return (
		<div className="fixed inset-0 pointer-events-none">
			<DNAHelix />
			<ScrollConstellation />
		</div>
	);
};

export default memo(ScrollFloatingElements);
export { ScrollFloatingElements };
