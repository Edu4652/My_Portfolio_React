'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { Icon } from '@/components/atoms/Icon';
import { SkillCard } from '@/components/molecules/SkillCard';
import { skills } from '@/data/portfolio';
import { SkillCategory } from '@/types';
import { cn } from '@/utils';
import { createSlideUpVariant } from '@/utils/animation';

interface CategoryButtonProps {
	readonly category: string;
	readonly label: string;
	readonly isActive: boolean;
	readonly onClick: (category: string) => void;
}

const CategoryButton = memo<CategoryButtonProps>(({ category, label, isActive, onClick }) => (
	<motion.button
		onClick={() => onClick(category)}
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		className={cn(
			'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2',
			isActive
				? 'bg-blue-500 text-white shadow-lg'
				: 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white',
		)}
		aria-pressed={isActive}
	>
		{category === 'featured' && (
			<Icon name="star" size={16} className={cn(isActive ? 'text-yellow-300' : 'text-yellow-400')} />
		)}
		{label}
	</motion.button>
));

CategoryButton.displayName = 'CategoryButton';

const SkillsSection: React.FC = () => {
	const t = useTranslations('skills');
	const [activeCategory, setActiveCategory] = useState<string>('featured');

	const getCategoryLabel = useCallback(
		(category: string): string => {
			if (category === 'featured') return t('categories.featured', { default: 'Featured' });
			if (category === 'all') return t('categories.all');
			const categoryKey = category as keyof typeof SkillCategory;
			return t(`categories.${categoryKey}`, { default: category });
		},
		[t],
	);

	const categories = useMemo(() => {
		const uniqueCategories = new Set(skills.map((skill) => skill.category));
		return ['featured', 'all', ...Array.from(uniqueCategories)];
	}, []);

	const filteredSkills = useMemo(() => {
		if (activeCategory === 'featured') {
			return skills.filter((skill) => skill.featured);
		}
		return activeCategory === 'all' ? skills : skills.filter((skill) => skill.category === activeCategory);
	}, [activeCategory]);

	const handleCategoryChange = useCallback((category: string) => {
		setActiveCategory(category);
	}, []);

	return (
		<section id="skills" className="py-20 relative">
			<div className="container mx-auto px-4 relative z-10">
				<Reveal triggerOnce className="text-center mb-16 mt-10">
					<motion.div
						variants={createSlideUpVariant()}
						initial="hidden"
						whileInView="visible"
						className="max-w-3xl mx-auto"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
							<span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent [text-shadow:none]">
								{t('title')}
							</span>
						</h2>
						<p className="text-lg text-gray-500 leading-relaxed">{t('description')}</p>
					</motion.div>
				</Reveal>

				<Reveal triggerOnce className="mb-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-wrap justify-center gap-3"
						role="tablist"
					>
						{categories.map((category) => (
							<CategoryButton
								key={category}
								category={category}
								label={getCategoryLabel(category)}
								isActive={activeCategory === category}
								onClick={handleCategoryChange}
							/>
						))}
					</motion.div>
				</Reveal>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeCategory}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						role="tabpanel"
					>
						{filteredSkills.map((skill, index) => (
							<SkillCard key={`${activeCategory}-${skill.id}`} skill={skill} index={index} />
						))}
					</motion.div>
				</AnimatePresence>

				<Reveal triggerOnce>
					<motion.div
						variants={createSlideUpVariant()}
						initial="hidden"
						whileInView="visible"
						className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
					>
						<div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
							<div className="text-3xl font-bold text-blue-400 mb-2">{skills.length}+</div>
							<div className="text-gray-400">{t('stats.skills')}</div>
						</div>

						<div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
							<div className="text-3xl font-bold text-purple-400 mb-2">3+</div>
							<div className="text-gray-400">{t('stats.years')}</div>
						</div>
					</motion.div>
				</Reveal>
			</div>
		</section>
	);
};

export default memo(SkillsSection);
export { SkillsSection };
