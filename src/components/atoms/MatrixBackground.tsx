'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Matrix Rain Background Effect
 * Creates the iconic falling code effect from The Matrix
 */
export function MatrixBackground({
	className = '',
	opacity = 0.1,
	speed = 50,
}: {
	className?: string;
	opacity?: number;
	speed?: number;
}) {
	const [columns, setColumns] = useState<
		Array<{
			chars: string[];
			positions: number[];
			speeds: number[];
		}>
	>([]);

	const chars =
		'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	useEffect(() => {
		const columnWidth = 20;
		const columnCount = Math.floor(window.innerWidth / columnWidth);
		const rowCount = Math.floor(window.innerHeight / 20);

		const newColumns = Array.from({ length: columnCount }, () => ({
			chars: Array.from({ length: rowCount }, () => chars[Math.floor(Math.random() * chars.length)]),
			positions: Array.from({ length: rowCount }, (_, i) => i),
			speeds: Array.from({ length: rowCount }, () => Math.random() * 0.5 + 0.1),
		}));

		setColumns(newColumns);

		const interval = setInterval(() => {
			setColumns((prev) =>
				prev.map((column) => ({
					...column,
					chars: [chars[Math.floor(Math.random() * chars.length)], ...column.chars.slice(0, -1)],
				})),
			);
		}, speed);

		return () => clearInterval(interval);
	}, [speed]);

	return (
		<div className={`fixed inset-0 overflow-hidden pointer-events-none z-5 ${className}`} style={{ opacity }}>
			{columns.map((column, colIndex) => (
				<div
					key={colIndex}
					className="absolute top-0 font-mono text-sm text-green-400"
					style={{ left: colIndex * 20 }}
				>
					{column.chars.map((char, rowIndex) => (
						<motion.div
							key={`${colIndex}-${rowIndex}`}
							className="h-5 leading-5"
							initial={{ opacity: 0 }}
							animate={{
								opacity: rowIndex === 0 ? 1 : Math.max(0.1, 1 - rowIndex * 0.1),
							}}
							transition={{ duration: 0.1 }}
						>
							{char}
						</motion.div>
					))}
				</div>
			))}
		</div>
	);
}
