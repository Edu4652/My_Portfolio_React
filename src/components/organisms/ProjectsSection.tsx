'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo, useCallback, useMemo } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { Button } from '@/components/atoms/Button';
import { Icon, IconName } from '@/components/atoms/Icon';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { personalInfo, projects } from '@/data/portfolio';
import { createSlideUpVariant } from '@/utils/animation';

const RotatingIcon = memo<{ name: IconName; size: number; className: string }>(({ name, size, className }) => (
	<motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
		<Icon name={name} size={size} className={className} />
	</motion.div>
));

RotatingIcon.displayName = 'RotatingIcon';

const PulsingIcon = memo<{ name: IconName; size: number; className: string }>(({ name, size, className }) => (
	<motion.div
		animate={{
			scale: [1, 1.2, 1],
			rotate: [0, 5, -5, 0],
		}}
		transition={{
			duration: 2,
			repeat: Infinity,
			ease: 'easeInOut',
		}}
	>
		<Icon name={name} size={size} className={className} />
	</motion.div>
));

PulsingIcon.displayName = 'PulsingIcon';

const ProjectsSection: React.FC = () => {
	const t = useTranslations('projects');
	const featuredProjects = useMemo(() => projects.filter((project) => project.featured), []);

	const handleGitHubClick = useCallback(() => {
		window.open(personalInfo.github, '_blank', 'noopener,noreferrer');
	}, []);

	return (
		<section id="projects" className="py-20 relative">
			<div className="container mx-auto px-4 relative z-10 mt-10">
				<Reveal triggerOnce className="text-center mb-16">
					<motion.div
						variants={createSlideUpVariant()}
						initial="hidden"
						whileInView="visible"
						className="max-w-3xl mx-auto"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
							<span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent [text-shadow:none]">
								{t('title')}
							</span>
						</h2>
						<p className="text-lg text-gray-500 leading-relaxed">{t('description')}</p>
					</motion.div>
				</Reveal>

				<ScrollReveal direction="up" delay={200}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-16"
					>
						<div className="flex items-center gap-4 mb-8">
							<RotatingIcon name="star" size={24} className="text-yellow-400" />
							<h3 className="text-2xl font-bold">
								<span className="text-white">{t('featuredProjects')}</span>
							</h3>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{featuredProjects.map((project, index) => (
								<motion.div
									key={project.id}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.2,
									}}
									viewport={{ once: true }}
								>
									<ProjectCard project={project} index={index} className="lg:col-span-1" />
								</motion.div>
							))}
						</div>
					</motion.div>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={400}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-12"
					>
						<div className="flex items-center justify-between mb-8">
							<div className="flex items-center gap-4">
								<PulsingIcon name="code" size={24} className="text-blue-400" />
								<h3 className="text-2xl font-bold">
									<span className="text-white">{t('allProjects')}</span>
								</h3>
							</div>

							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button
									variant="secondary"
									size="sm"
									icon={<Icon name="github" size={16} />}
									iconPosition="right"
									onClick={handleGitHubClick}
								>
									{t('viewGitHub')}
								</Button>
							</motion.div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{projects.map((project, index) => (
								<motion.div
									key={project.id}
									whileHover={{
										y: -10,
										transition: { duration: 0.3 },
									}}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
								>
									<ProjectCard project={project} index={index} />
								</motion.div>
							))}
						</div>
					</motion.div>
				</ScrollReveal>

				<Reveal triggerOnce>
					<motion.div
						variants={createSlideUpVariant()}
						initial="hidden"
						whileInView="visible"
						className="text-center relative overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl" />
						<div className="absolute inset-0 backdrop-blur-sm" />

						<div className="relative bg-black/30 rounded-2xl p-8 border border-white/10 border-dashed">
							<div className="flex items-center justify-center gap-3 mb-4">
								<Icon name="info" size={24} className="text-blue-400" />
								<h3 className="text-xl font-semibold">
									<span className="text-blue-400">{t('portfolioConstruction')}</span>
								</h3>
							</div>

							<p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{t('comingSoon')}</p>

							<motion.div
								className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400"
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
							>
								<Icon name="clock" size={16} />
								<span>{t('updatesComingSoon')}</span>
							</motion.div>
						</div>
					</motion.div>
				</Reveal>
			</div>
		</section>
	);
};

export default memo(ProjectsSection);
export { ProjectsSection };
