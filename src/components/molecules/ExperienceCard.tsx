'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import React, { memo } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Experience } from '@/types';
import { cn, formatDate } from '@/utils';

interface ExperienceCardProps {
	readonly experience: Experience;
	readonly index?: number;
	readonly className?: string;
}

const DescriptionItem = memo<{ readonly item: string; readonly delay: number }>(({ item, delay }) => (
	<motion.li
		initial={{ opacity: 0, x: -10 }}
		animate={{ opacity: 1, x: 0 }}
		transition={{ duration: 0.3, delay }}
		className="flex items-start gap-3 text-gray-300"
	>
		<div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
		<span className="text-sm leading-relaxed">{item}</span>
	</motion.li>
));

DescriptionItem.displayName = 'DescriptionItem';

const TechnologyBadge = memo<{ readonly tech: string; readonly delay: number }>(({ tech, delay }) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.8 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.3, delay }}
	>
		<Badge variant="glass" size="sm" animated>
			{tech}
		</Badge>
	</motion.div>
));

TechnologyBadge.displayName = 'TechnologyBadge';

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index = 0, className }) => {
	const t = useTranslations('experience');
	const tItems = useTranslations('experience.items');
	const currentLocale = useLocale();

	const localeMap: Record<string, string> = {
		en: 'en-US',
		es: 'es-ES',
		fr: 'fr-FR',
		pt: 'pt-PT',
		ca: 'ca-ES',
	};

	const locale = localeMap[currentLocale] || 'es-ES';

	const getCompanyName = (experienceId: string): string => {
		const key = experienceId.replace(/-/g, '');
		return tItems(`${key}.company`);
	};

	const getPosition = (experienceId: string): string => {
		const key = experienceId.replace(/-/g, '');
		return tItems(`${key}.position`);
	};

	const getDescription = (experienceId: string): string[] => {
		const key = experienceId.replace(/-/g, '');
		return tItems.raw(`${key}.description`) as string[];
	};
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className={cn(
				'relative pl-8 pb-8 border-l-2 border-blue-500/30',
				'before:absolute before:left-[-8px] before:top-0 before:w-4 before:h-4 before:bg-blue-500 before:rounded-full',
				'after:absolute after:left-[-2px] after:top-4 after:w-1 after:h-full after:bg-gradient-to-b after:from-blue-500/50 after:to-transparent',
				className,
			)}
		>
			<div className="mb-4">
				<div className="flex items-center gap-3 mb-2">
					<h3 className="text-xl font-bold text-white">{getPosition(experience.id)}</h3>
					{experience.current && (
						<Badge variant="success" animated>
							<Icon name="heart" size={12} className="mr-1" />
							{t('current')}
						</Badge>
					)}
				</div>

				<div className="flex items-center gap-2 text-blue-300 mb-2">
					<Icon name="code" size={16} />
					<span className="font-semibold">{getCompanyName(experience.id)}</span>
				</div>

				<div className="flex items-center gap-2 text-gray-400 text-sm">
					<Icon name="mapPin" size={14} />
					<span>
						{formatDate(experience.startDate, locale)} -{' '}
						{experience.endDate && experience.endDate !== 'present'
							? formatDate(experience.endDate, locale)
							: t('present')}
					</span>
				</div>
			</div>

			<div className="mb-6">
				<ul className="space-y-2">
					{getDescription(experience.id).map((item, itemIndex) => (
						<DescriptionItem key={itemIndex} item={item} delay={index * 0.1 + itemIndex * 0.1} />
					))}
				</ul>
			</div>

			<div>
				<div className="flex flex-wrap gap-2">
					{experience.technologies.map((tech, techIndex) => (
						<TechnologyBadge key={tech} tech={tech} delay={index * 0.1 + techIndex * 0.05} />
					))}
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				whileHover={{ opacity: 1 }}
				className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg pointer-events-none"
			/>
		</motion.div>
	);
};

export default memo(ExperienceCard);
export { ExperienceCard };
export type { ExperienceCardProps };
