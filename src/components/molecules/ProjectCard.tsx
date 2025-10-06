'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Project } from '@/types';
import { cn } from '@/utils';

interface ProjectCardProps {
	readonly project: Project;
	readonly index?: number;
	readonly className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0, className }) => {
	const t = useTranslations('projects');
	const tItems = useTranslations('projects.items');

	const getProjectTitle = (projectId: string): string => {
		const key = projectId.replace(/-/g, '');
		return tItems(`${key}.title`);
	};

	const getProjectDescription = (projectId: string): string => {
		const key = projectId.replace(/-/g, '');
		return tItems(`${key}.description`);
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className={cn(
				'group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10',
				'hover:bg-white/10 hover:border-white/20 transition-all duration-300',
				className,
			)}
		>
			<div className="relative h-48 overflow-hidden">
				<Image
					src={project.image}
					alt={project.title}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

				{project.featured && (
					<div className="absolute top-4 left-4">
						<Badge variant="purple" animated>
							<Icon name="star" size={12} className="mr-1" />
							{t('featured')}
						</Badge>
					</div>
				)}
			</div>

			<div className="p-6">
				<div className="mb-4">
					<h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
						{getProjectTitle(project.id)}
					</h3>
					<p className="text-gray-300 text-sm leading-relaxed">{getProjectDescription(project.id)}</p>
				</div>

				<div className="flex flex-wrap gap-2 mb-6">
					{project.technologies.slice(0, 4).map((tech, techIndex) => (
						<Badge
							key={tech}
							variant="glass"
							size="sm"
							animated
							style={{ animationDelay: `${techIndex * 0.1}s` }}
						>
							{tech}
						</Badge>
					))}
					{project.technologies.length > 4 && (
						<Badge variant="glass" size="sm">
							+{project.technologies.length - 4}
						</Badge>
					)}
				</div>

				<div className="flex gap-3 items-center">
					{project.liveUrl && (
						<Link
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex-1 h-10 px-3 py-1.5 text-sm inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl gap-2"
						>
							{t('viewLive')}
							<Icon name="externalLink" size={16} />
						</Link>
					)}

					{project.githubUrl && (
						<Link
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="h-10 px-3 py-1.5 text-sm inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 gap-2"
						>
							<Icon name="github" size={16} />
							{t('viewCode')}
						</Link>
					)}
				</div>
			</div>

			<div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
		</motion.div>
	);
};

export default memo(ProjectCard);
export { ProjectCard };
export type { ProjectCardProps };
