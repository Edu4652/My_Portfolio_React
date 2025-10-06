'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo, useEffect, useRef } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Icon, type IconName } from '@/components/atoms/Icon';
import { Skill, SkillCategory } from '@/types';
import { cn } from '@/utils';

interface SkillCardProps {
	readonly skill: Skill;
	readonly index?: number;
	readonly className?: string;
}

const CATEGORY_STYLES: Record<SkillCategory, string> = {
	[SkillCategory.Frontend]: 'border-blue-500/50 bg-blue-500/10',
	[SkillCategory.Backend]: 'border-green-500/50 bg-green-500/10',
	[SkillCategory.Cloud]: 'border-orange-500/50 bg-orange-500/10',
	[SkillCategory.Security]: 'border-red-500/50 bg-red-500/10',
	[SkillCategory.Programming]: 'border-purple-500/50 bg-purple-500/10',
	[SkillCategory.Tools]: 'border-yellow-500/50 bg-yellow-500/10',
};

const CATEGORY_ICONS: Record<SkillCategory, IconName> = {
	[SkillCategory.Frontend]: 'palette',
	[SkillCategory.Backend]: 'database',
	[SkillCategory.Cloud]: 'server',
	[SkillCategory.Security]: 'shield',
	[SkillCategory.Programming]: 'code',
	[SkillCategory.Tools]: 'code',
};

const CATEGORY_COLORS: Record<SkillCategory, string> = {
	[SkillCategory.Frontend]: 'from-blue-500 to-cyan-500',
	[SkillCategory.Backend]: 'from-green-500 to-emerald-500',
	[SkillCategory.Cloud]: 'from-orange-500 to-red-500',
	[SkillCategory.Security]: 'from-red-500 to-pink-500',
	[SkillCategory.Programming]: 'from-purple-500 to-indigo-500',
	[SkillCategory.Tools]: 'from-yellow-500 to-orange-500',
};

const SkillCard: React.FC<SkillCardProps> = ({ skill, index = 0, className }) => {
	const tCategories = useTranslations('skills.categories');
	const tItems = useTranslations('skills.items');
	const controls = useAnimation();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, amount: 0.1, margin: '0px 0px 200px 0px' });

	useEffect(() => {
		if (isInView) {
			controls.start({ opacity: 1, scale: 1 });
		} else {
			controls.start({ opacity: 0, scale: 0.9 });
		}
	}, [isInView, controls]);

	const getCategoryLabel = (category: SkillCategory): string => {
		return tCategories(category);
	};

	const getSkillName = (skillId: string): string => {
		const key = skillId.replace(/-/g, '');
		return tItems(key);
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, scale: 0.9 }}
			animate={controls}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			whileHover={{ y: -5, transition: { duration: 0, ease: 'easeOut', delay: 0 } }}
			className={cn(
				'group relative p-6 rounded-xl border backdrop-blur-sm',
				'hover:shadow-lg hover:scale-[1.02] transition-all duration-150 ease-out',
				CATEGORY_STYLES[skill.category],
				className,
			)}
		>
			<div className="flex items-center gap-3 mb-4">
				{skill.icon && (
					<div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
						<Icon name={skill.icon as IconName} size={20} />
					</div>
				)}
				<div>
					<h3 className="text-lg font-semibold text-white">{getSkillName(skill.id)}</h3>
				</div>
			</div>

			<div className="flex justify-end">
				<Badge
					variant="glass"
					size="sm"
					className={cn('bg-gradient-to-r text-white border-0', CATEGORY_COLORS[skill.category])}
				>
					<Icon name={CATEGORY_ICONS[skill.category]} size={12} className="mr-1" />
					{getCategoryLabel(skill.category)}
				</Badge>
			</div>

			<div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
		</motion.div>
	);
};

export default memo(SkillCard);
export { SkillCard };
export type { SkillCardProps };
