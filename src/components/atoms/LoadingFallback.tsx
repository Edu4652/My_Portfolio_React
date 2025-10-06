import type React from 'react';
import { memo } from 'react';

interface LoadingFallbackProps {
	readonly size?: 'sm' | 'md' | 'lg';
	readonly minHeight?: string;
	readonly text?: string;
}

const sizeMap = {
	sm: 'w-4 h-4 border',
	md: 'w-8 h-8 border-2',
	lg: 'w-12 h-12 border-4',
} as const;

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ size = 'md', minHeight = '400px', text }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-4" style={{ minHeight }}>
			<div className={`${sizeMap[size]} border-blue-500 border-t-transparent rounded-full animate-spin`} />
			{text && <p className="text-sm text-slate-400 animate-pulse">{text}</p>}
		</div>
	);
};

export default memo(LoadingFallback);
export { LoadingFallback };
