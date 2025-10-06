'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo, useCallback } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ExperienceCard } from '@/components/molecules/ExperienceCard';
import { experiences } from '@/data/portfolio';
import { useScrollSection } from '@/hooks';
import { createSlideUpVariant } from '@/utils/animation';

const ExperienceSection: React.FC = () => {
	const t = useTranslations('experience');
	const tContact = useTranslations('hero.cta');
	const { scrollToSection } = useScrollSection();

	const handleContactClick = useCallback(() => {
		scrollToSection('contact');
	}, [scrollToSection]);

	return (
		<section id="experience" className="py-20 relative">
			<div className="container mx-auto px-4 relative z-10 mt-10">
				<motion.div
					variants={createSlideUpVariant()}
					initial="hidden"
					whileInView="visible"
					className="text-center mb-16 max-w-3xl mx-auto"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
						<span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent [text-shadow:none]">
							{t('title')}
						</span>
					</h2>
					<p className="text-lg text-gray-500 leading-relaxed">{t('subtitle')}</p>
				</motion.div>

				<div className="max-w-4xl mx-auto">
					<div className="space-y-8">
						{experiences.map((experience, index) => (
							<ExperienceCard key={experience.id} experience={experience} index={index} />
						))}
					</div>
				</div>

				<Reveal triggerOnce>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mt-16"
					>
						<motion.div
							variants={createSlideUpVariant()}
							initial="hidden"
							whileInView="visible"
							className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20"
						>
							<h3 className="text-2xl font-bold mb-4">
								<span className="text-green-400">{t('readyTitle')}</span>
							</h3>
							<p className="text-gray-500 mb-6 max-w-2xl mx-auto">{t('readyDescription')}</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									variant="primary"
									size="lg"
									icon={<Icon name="mail" size={20} />}
									iconPosition="right"
									onClick={handleContactClick}
								>
									{tContact('contact')}
								</Button>
							</div>
						</motion.div>
					</motion.div>
				</Reveal>
			</div>
		</section>
	);
};

export default memo(ExperienceSection);
export { ExperienceSection };
