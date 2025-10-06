'use client';

import { animated, useSpring } from '@react-spring/web';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';
import { AnimatedBackground, FloatingShapes } from '@/components/atoms/AnimatedBackground';
import { FloatingElement, GlitchText, MagneticButton } from '@/components/atoms/AnimationComponents';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import FluidSimulation from '@/components/atoms/FluidSimulation';
import { Icon } from '@/components/atoms/Icon';
import { ConstellationNetwork, LiquidBlob } from '@/components/atoms/ParticleEffects';
import { personalInfo } from '@/data/portfolio';

/**
 * Hero section component with animated introduction
 * Features gradient text, animated badges, and call-to-action buttons
 */
const HeroSection: React.FC = () => {
	const t = useTranslations('hero');

	const titleAnimation = useSpring({
		from: { opacity: 0, y: 50, scale: 0.8 },
		to: { opacity: 1, y: 0, scale: 1 },
		config: { tension: 300, friction: 30 },
		delay: 500,
	});

	const subtitleAnimation = useSpring({
		from: { opacity: 0, y: 30 },
		to: { opacity: 1, y: 0 },
		config: { tension: 300, friction: 30 },
		delay: 800,
	});

	const descriptionAnimation = useSpring({
		from: { opacity: 0, y: 20 },
		to: { opacity: 1, y: 0 },
		config: { tension: 300, friction: 30 },
		delay: 1100,
	});

	// Animation variants for staggered content
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<section id="home" className="hero-section-adaptive flex items-center justify-center relative overflow-hidden">
			{/* Background effects - siempre al fondo */}
			<ConstellationNetwork />
			<AnimatedBackground />
			<FloatingShapes />

			{/* WebGL Effects */}
			<FluidSimulation />

			{/* Liquid blobs */}
			<LiquidBlob size={300} color="rgba(59, 130, 246, 0.05)" className="top-20 left-10" />
			<LiquidBlob size={200} color="rgba(139, 92, 246, 0.05)" className="bottom-20 right-20" />

			{/* Morphing shapes */}
			<div className="absolute top-1/3 left-5 opacity-20" />

			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5" />

			<div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6"
				>
					{/* Greeting badge */}
					<motion.div variants={itemVariants} className="mb-3 sm:mb-6">
						<Badge variant="glass" size="lg" animated>
							<Icon name="heart" size={16} className="mr-2" />
							{t('greeting')}
						</Badge>
					</motion.div>

					{/* Main heading with advanced animations */}
					<FloatingElement delay={0.2} distance={5}>
						<div className="inline-block">
							<animated.h1
								style={titleAnimation}
								className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-6 mt-4"
							>
								<GlitchText text={personalInfo.name} className="text-blue-400" />
							</animated.h1>
						</div>
					</FloatingElement>

					{/* Subtitle with spring animation */}
					<animated.h2
						style={subtitleAnimation}
						className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-2 sm:mb-4"
					>
						{t('title')}
					</animated.h2>

					{/* Description with spring animation */}
					<animated.p
						style={descriptionAnimation}
						className="text-base sm:text-lg text-gray-500 mb-4 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
					>
						{t('description')}
					</animated.p>

					{/* Technology badges */}
					<motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-6 sm:mb-12">
						{['React', 'TypeScript', 'Node.js', 'Next.js'].map((tech, index) => (
							<motion.div
								key={tech}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 1 + index * 0.1 }}
							>
								<Badge variant="glass" size="md" animated>
									{tech}
								</Badge>
							</motion.div>
						))}
					</motion.div>

					{/* Action buttons with advanced effects */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row gap-4 sm:gap-12 justify-center items-center px-4"
					>
						<MagneticButton strength={0.4}>
							<Button
								variant="primary"
								size="lg"
								icon={<Icon name="code" size={20} />}
								iconPosition="right"
								className="w-full sm:min-w-[200px] backdrop-blur-sm bg-gradient-to-r from-blue-500/80 to-purple-500/80 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
								onClick={() => {
									const element = document.getElementById('projects');
									if (element) {
										element.scrollIntoView({ behavior: 'smooth' });
									}
								}}
							>
								{t('cta.viewProjects')}
							</Button>
						</MagneticButton>

						<MagneticButton strength={0.4}>
							<Button
								variant="secondary"
								size="lg"
								icon={<Icon name="mail" size={20} />}
								className="w-full sm:min-w-[200px] backdrop-blur-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
								onClick={() => {
									const element = document.getElementById('contact');
									if (element) {
										element.scrollIntoView({ behavior: 'smooth' });
									}
								}}
							>
								{t('cta.contact')}
							</Button>
						</MagneticButton>
					</motion.div>

					{/* Social links */}
					<motion.div variants={itemVariants} className="flex justify-center gap-6 mt-12">
						<motion.a
							href={personalInfo.github}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.2, y: -5 }}
							whileTap={{ scale: 0.95 }}
							className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
						>
							<Icon name="github" size={24} />
						</motion.a>

						<motion.a
							href={personalInfo.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.2, y: -5 }}
							whileTap={{ scale: 0.95 }}
							className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
						>
							<Icon name="linkedin" size={24} />
						</motion.a>
					</motion.div>
				</motion.div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 2, duration: 0.5 }}
				className="absolute bottom-8 left-1/8 transform -translate-x-1/2 w-full flex justify-center"
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="flex flex-col items-center text-gray-400 text-center"
				>
					<span className="text-sm mb-2">{t('scroll')}</span>
					<Icon name="chevronRight" size={24} className="rotate-90" />
				</motion.div>
			</motion.div>
		</section>
	);
};

export { HeroSection };
