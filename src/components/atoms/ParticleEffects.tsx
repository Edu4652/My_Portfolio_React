'use client';

import { animated, useSpring, useTrail } from '@react-spring/web';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

interface Particle {
	id: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	color: string;
	life: number;
	maxLife: number;
}

/**
 * Interactive Particle System
 * Creates dynamic particle effects that respond to mouse movement
 */
export function InteractiveParticles() {
	const [particles, setParticles] = useState<Particle[]>([]);
	const [_mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [_isMouseMoving, setIsMouseMoving] = useState(false);

	const colors = [
		'#3b82f6', // blue-500
		'#8b5cf6', // violet-500
		'#ec4899', // pink-500
		'#06b6d4', // cyan-500
		'#10b981', // emerald-500
	];

	const createParticle = useCallback((x: number, y: number): Particle => {
		return {
			id: Math.random(),
			x,
			y,
			vx: (Math.random() - 0.5) * 2,
			vy: (Math.random() - 0.5) * 2,
			size: Math.random() * 4 + 1,
			color: colors[Math.floor(Math.random() * colors.length)],
			life: 1,
			maxLife: Math.random() * 60 + 30,
		};
	}, []);

	const updateParticles = useCallback(() => {
		setParticles((prev) => {
			return prev
				.map((particle) => ({
					...particle,
					x: particle.x + particle.vx,
					y: particle.y + particle.vy,
					vx: particle.vx * 0.99,
					vy: particle.vy * 0.99,
					life: particle.life - 1 / particle.maxLife,
				}))
				.filter((particle) => particle.life > 0);
		});
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePos({ x: e.clientX, y: e.clientY });
			setIsMouseMoving(true);

			// Create particles on mouse movement
			if (Math.random() > 0.7) {
				setParticles((prev) => [
					...prev.slice(-50), // Keep only last 50 particles
					createParticle(e.clientX, e.clientY),
				]);
			}
		};

		const handleMouseStop = () => {
			setIsMouseMoving(false);
		};

		let mouseStopTimer: NodeJS.Timeout;
		const handleMouseMoveWithTimer = (e: MouseEvent) => {
			handleMouseMove(e);
			clearTimeout(mouseStopTimer);
			mouseStopTimer = setTimeout(handleMouseStop, 100);
		};

		window.addEventListener('mousemove', handleMouseMoveWithTimer);

		const animationFrame = setInterval(updateParticles, 16);

		return () => {
			window.removeEventListener('mousemove', handleMouseMoveWithTimer);
			clearInterval(animationFrame);
			clearTimeout(mouseStopTimer);
		};
	}, [createParticle, updateParticles]);

	return (
		<div className="fixed inset-0 pointer-events-none z-30">
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="absolute rounded-full"
					style={{
						left: particle.x - particle.size / 2,
						top: particle.y - particle.size / 2,
						width: particle.size,
						height: particle.size,
						backgroundColor: particle.color,
						opacity: particle.life * 0.6,
						filter: `blur(${(1 - particle.life) * 2}px)`,
					}}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0 }}
				/>
			))}
		</div>
	);
}

/**
 * Matrix Rain Effect
 * Creates falling code-like animation
 */
export function MatrixRain({ className = '' }: { className?: string }) {
	const [columns, setColumns] = useState<string[][]>([]);

	const chars =
		'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	useEffect(() => {
		const columnCount = Math.floor(window.innerWidth / 20);
		const newColumns = Array.from({ length: columnCount }, () =>
			Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]),
		);
		setColumns(newColumns);

		const interval = setInterval(() => {
			setColumns((prev) =>
				prev.map((column) => [chars[Math.floor(Math.random() * chars.length)], ...column.slice(0, -1)]),
			);
		}, 100);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={`fixed inset-0 overflow-hidden pointer-events-none z-10 ${className}`}>
			{columns.map((column, colIndex) => (
				<div
					key={colIndex}
					className="absolute top-0 text-green-400 font-mono text-sm"
					style={{ left: colIndex * 20 }}
				>
					{column.map((char, rowIndex) => (
						<motion.div
							key={`${colIndex}-${rowIndex}`}
							initial={{ opacity: 0 }}
							animate={{
								opacity: rowIndex === 0 ? 1 : 0.1 + (0.9 * (column.length - rowIndex)) / column.length,
							}}
							transition={{ duration: 0.1 }}
							style={{ lineHeight: '20px' }}
						>
							{char}
						</motion.div>
					))}
				</div>
			))}
		</div>
	);
}

/**
 * Constellation Network
 * Creates connected dots that form a network pattern
 */
export function ConstellationNetwork({ className = '' }: { className?: string }) {
	const [nodes, setNodes] = useState<
		Array<{
			x: number;
			y: number;
			id: number;
			baseX: number;
			baseY: number;
			radiusX: number;
			radiusY: number;
			speed: number;
			phase: number;
		}>
	>([]);

	// Cache optimizado para conexiones limitadas
	const [connectionsCache, setConnectionsCache] = useState<
		Array<{
			i: number;
			j: number;
			shouldConnect: boolean;
			opacity1: number;
			opacity2: number;
		}>
	>([]);

	useEffect(() => {
		// Calcular parámetros basados en el tamaño de pantalla
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		const screenArea = screenWidth * screenHeight;

		// Número de nodos adaptativo
		const nodeCount = Math.min(
			Math.max(15, Math.floor(screenArea / 50000)), // Entre 15 y 30 nodos
			30,
		);

		// Distancia máxima adaptativa (más pequeña en móvil)
		const maxDistance = screenWidth < 768 ? 150 : 250; // 150px en móvil, 250px en desktop

		// Máximo de conexiones por nodo adaptativo
		const maxConnectionsPerNode = screenWidth < 768 ? 3 : 4; // 3 en móvil, 4 en desktop

		const newNodes = Array.from({ length: nodeCount }, (_, i) => {
			const baseX = Math.random() * screenWidth;
			const baseY = Math.random() * screenHeight;
			const phase = Math.random() * Math.PI * 2;
			const radiusX = 15 + Math.random() * 25;
			const radiusY = 15 + Math.random() * 25;

			return {
				id: i,
				baseX,
				baseY,
				// Posición inicial basada en la animación
				x: baseX + Math.sin(phase) * radiusX,
				y: baseY + Math.cos(phase * 0.7) * radiusY,
				radiusX: 15 + Math.random() * 25, // Radio de movimiento más pequeño
				radiusY: 15 + Math.random() * 25, // Radio de movimiento más pequeño
				speed: 0.00008 + Math.random() * 0.0005,
				phase, // Fase inicial aleatoria
			};
		});
		setNodes(newNodes);

		// Sistema optimizado: conexiones adaptativas
		const connections: Array<{
			i: number;
			j: number;
			shouldConnect: boolean;
			opacity1: number;
			opacity2: number;
		}> = [];

		for (let i = 0; i < newNodes.length; i++) {
			// Crear lista de nodos candidatos (excluyendo el nodo actual)
			const candidates = [];
			for (let j = 0; j < newNodes.length; j++) {
				if (i !== j) {
					const distance = Math.sqrt(
						(newNodes[i].x - newNodes[j].x) ** 2 + (newNodes[i].y - newNodes[j].y) ** 2,
					);
					candidates.push({ j, distance });
				}
			}

			// Ordenar por distancia (más cercanos primero)
			candidates.sort((a, b) => a.distance - b.distance);

			// Seleccionar máximo de conexiones más cercanas
			const selectedConnections = candidates.slice(0, maxConnectionsPerNode);

			selectedConnections.forEach(({ j, distance }) => {
				if (i < j) {
					// Evitar duplicados
					// Solo conectar si están suficientemente cerca (distancia adaptativa)
					const shouldConnect = distance < maxDistance && Math.random() < 0.8; // 80% de probabilidad si están cerca
					const opacity1 = 0.1 + Math.random() * 0.2; // Opacidad más sutil para glow
					const opacity2 = 0.2 + Math.random() * 0.3; // Opacidad más sutil para línea principal
					connections.push({ i, j, shouldConnect, opacity1, opacity2 });
				}
			});
		}

		setConnectionsCache(connections);
	}, []);

	// Recalcular cuando cambie el tamaño de pantalla
	useEffect(() => {
		const handleResize = () => {
			// Recalcular parámetros cuando cambie el tamaño de pantalla
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;
			const screenArea = screenWidth * screenHeight;

			const nodeCount = Math.min(Math.max(15, Math.floor(screenArea / 50000)), 30);

			const maxDistance = screenWidth < 768 ? 150 : 250;
			const _maxConnectionsPerNode = screenWidth < 768 ? 3 : 4;

			// Solo recalcular si los parámetros han cambiado significativamente
			if (nodeCount !== nodes.length || maxDistance !== (screenWidth < 768 ? 150 : 250)) {
				// Forzar recálculo completo
				window.location.reload();
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [nodes.length]);

	// Animación continua de movimiento muy lento usando requestAnimationFrame
	useEffect(() => {
		let animationFrame: number;

		const animateNodes = () => {
			const currentTime = Date.now();

			setNodes((prevNodes) =>
				prevNodes.map((node) => {
					// Movimiento extremadamente lento con múltiples ondas superpuestas
					const time = currentTime * node.speed;
					const slowWave1 = Math.sin(time + node.phase) * 0.6;
					const slowWave2 = Math.sin(time * 0.7 + node.phase * 1.3) * 0.4;
					const slowWave3 = Math.cos(time * 0.5 + node.phase * 0.8) * 0.3;
					const slowWave4 = Math.cos(time * 1.1 + node.phase * 0.6) * 0.3;

					return {
						...node,
						x: node.baseX + (slowWave1 + slowWave2) * node.radiusX,
						y: node.baseY + (slowWave3 + slowWave4) * node.radiusY,
					};
				}),
			);

			animationFrame = requestAnimationFrame(animateNodes);
		};

		// Inicia la animación solo si hay nodos
		if (nodes.length > 0) {
			animationFrame = requestAnimationFrame(animateNodes);
		}

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [nodes.length]); // Se re-ejecuta cuando se cargan los nodos

	const trail = useTrail(nodes.length, {
		from: { opacity: 0, scale: 0 },
		to: { opacity: 1, scale: 1 },
		config: { tension: 300, friction: 30 },
	});

	return (
		<div
			className={`fixed inset-0 pointer-events-none z-10 constellation-blur-target ${className}`}
			style={{ touchAction: 'none' }}
		>
			<svg className="w-full h-full" style={{ touchAction: 'none' }}>
				{/* Draw connections - sistema optimizado con máximo 4 conexiones por nodo */}
				{connectionsCache.map(({ i, j, shouldConnect, opacity1, opacity2 }) => {
					const node = nodes[i];
					const otherNode = nodes[j];

					if (!node || !otherNode) return null;

					// Usar la decisión pre-calculada - conexiones estables
					if (shouldConnect) {
						return (
							<g key={`${i}-${j}`}>
								{/* Línea con efecto de brillo */}
								<motion.line
									x1={node.x}
									y1={node.y}
									x2={otherNode.x}
									y2={otherNode.y}
									stroke="rgba(99, 102, 241, 0.15)" // Efecto de glow más sutil
									strokeWidth="2"
									initial={{ pathLength: 0, opacity: 0 }}
									animate={{
										pathLength: 1,
										opacity: opacity1 * 0.6, // Reducir opacidad del glow
									}}
									transition={{ duration: 1.5, delay: i * 0.02 }}
								/>
								{/* Línea principal más sutil */}
								<motion.line
									x1={node.x}
									y1={node.y}
									x2={otherNode.x}
									y2={otherNode.y}
									stroke="rgba(99, 102, 241, 0.4)" // Líneas más sutiles
									strokeWidth="1.2"
									initial={{ pathLength: 0, opacity: 0 }}
									animate={{
										pathLength: 1,
										opacity: opacity2 * 0.7, // Reducir opacidad de las líneas
									}}
									transition={{ duration: 1.5, delay: i * 0.02 }}
								/>
							</g>
						);
					}
					return null;
				})}

				{/* Draw nodes */}
				{trail.map((style, i) => (
					<g key={nodes[i]?.id}>
						{/* Glow effect más sutil */}
						<animated.circle
							cx={nodes[i]?.x}
							cy={nodes[i]?.y}
							r="4"
							fill="rgba(99, 102, 241, 0.1)"
							style={style}
						/>
						{/* Main node más sutil */}
						<animated.circle
							cx={nodes[i]?.x}
							cy={nodes[i]?.y}
							r="2.5"
							fill="rgba(99, 102, 241, 0.5)"
							style={style}
						/>
						{/* Inner bright core más sutil */}
						<animated.circle
							cx={nodes[i]?.x}
							cy={nodes[i]?.y}
							r="1"
							fill="rgba(147, 197, 253, 0.6)"
							style={style}
						/>
					</g>
				))}
			</svg>
		</div>
	);
}

/**
 * Liquid Blob
 * Creates animated liquid-like blob shapes
 */
export function LiquidBlob({
	size = 200,
	color = 'rgba(59, 130, 246, 0.1)',
	className = '',
}: {
	size?: number;
	color?: string;
	className?: string;
}) {
	const blobAnimation = useSpring({
		from: {
			borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
			transform: 'rotate(0deg) scale(1)',
		},
		to: async (next) => {
			while (true) {
				await next({
					borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
					transform: 'rotate(60deg) scale(1.1)',
				});
				await next({
					borderRadius: '50% 50% 50% 50% / 60% 40% 60% 40%',
					transform: 'rotate(120deg) scale(0.9)',
				});
				await next({
					borderRadius: '40% 60% 60% 40% / 40% 60% 40% 60%',
					transform: 'rotate(180deg) scale(1.05)',
				});
				await next({
					borderRadius: '60% 40% 40% 60% / 50% 50% 50% 50%',
					transform: 'rotate(240deg) scale(0.95)',
				});
				await next({
					borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
					transform: 'rotate(360deg) scale(1)',
				});
			}
		},
		config: { duration: 30000 },
	});

	return (
		<animated.div
			className={`absolute ${className}`}
			style={{
				width: size,
				height: size,
				background: color,
				...blobAnimation,
			}}
		/>
	);
}
