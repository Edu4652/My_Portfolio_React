'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon, IconName } from '@/components/atoms/Icon';
import { personalInfo } from '@/data/portfolio';
import { useFormSubmit } from '@/hooks';
import { initEmailJS, sendEmail } from '@/services/email.service';
import { ContactFormData } from '@/types';
import { createSlideUpVariant } from '@/utils/animation';

interface ContactInfoItemProps {
	readonly icon: IconName;
	readonly title: string;
	readonly content: string;
	readonly href?: string;
	readonly bgColor: string;
	readonly iconColor: string;
}

const ContactInfoItem = memo<ContactInfoItemProps>(({ icon, title, content, href, bgColor, iconColor }) => {
	const Component = href ? motion.a : motion.div;
	const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

	return (
		<Component
			{...props}
			whileHover={{ x: 10 }}
			className="flex items-center gap-4 p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-all border border-white/10"
		>
			<div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
				<Icon name={icon} size={24} className={iconColor} />
			</div>
			<div>
				<div className="text-white font-medium">{title}</div>
				<div className="text-gray-400 text-sm">{content}</div>
			</div>
		</Component>
	);
});

ContactInfoItem.displayName = 'ContactInfoItem';

interface SocialLinkProps {
	readonly href: string;
	readonly icon: IconName;
	readonly label: string;
}

const SocialLink = memo<SocialLinkProps>(({ href, icon, label }) => (
	<motion.a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		whileHover={{ scale: 1.1, y: -5 }}
		whileTap={{ scale: 0.95 }}
		className="w-12 h-12 bg-black/30 rounded-lg flex items-center justify-center hover:bg-black/40 transition-all border border-white/10"
		aria-label={label}
	>
		<Icon name={icon} size={24} />
	</motion.a>
));

SocialLink.displayName = 'SocialLink';

const ContactSection: React.FC = () => {
	const t = useTranslations('contact');
	const [formData, setFormData] = React.useState<ContactFormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	useEffect(() => {
		initEmailJS();
	}, []);

	const handleEmailSubmit = useCallback(
		async (data: ContactFormData) => {
			try {
				const result = await sendEmail({
					from_name: data.name,
					from_email: data.email,
					subject: data.subject,
					message: data.message,
				});

				if (!result.success) {
					return {
						success: false,
						message: t('form.error'),
					};
				}

				return {
					success: true,
					message: t('form.success'),
				};
			} catch {
				return {
					success: false,
					message: t('form.error'),
				};
			}
		},
		[t],
	);

	const { isSubmitting, status, handleSubmit } = useFormSubmit<ContactFormData>({
		onSubmit: handleEmailSubmit,
		onSuccess: () => {
			setFormData({ name: '', email: '', subject: '', message: '' });
		},
	});

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}, []);

	const onSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			await handleSubmit(formData);
		},
		[formData, handleSubmit],
	);

	return (
		<section id="contact" className="py-20 relative mb-20">
			<div className="container mx-auto px-4 relative z-10 mt-10">
				<motion.div
					variants={createSlideUpVariant()}
					initial="hidden"
					whileInView="visible"
					className="text-center mb-16 max-w-3xl mx-auto"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
						<span className="bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 bg-clip-text text-transparent [text-shadow:none]">
							{t('title')}
						</span>
					</h2>
					<p className="text-lg text-gray-500 leading-relaxed">{t('description')}</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="bg-black/35 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative"
					>
						{(isSubmitting || status.type) && (
							<div className="absolute inset-0 bg-black/20 rounded-2xl z-10" />
						)}

						<form
							onSubmit={onSubmit}
							className={`space-y-6 relative transition-all duration-300 ${isSubmitting || status.type ? 'blur-[2px]' : ''}`}
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
										{t('form.name')} *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required
										disabled={isSubmitting || !!status.type}
										className="w-full px-4 py-3 bg-black/25 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
										placeholder={t('form.namePlaceholder')}
										aria-required="true"
									/>
								</div>

								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
										{t('form.email')} *
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										disabled={isSubmitting || !!status.type}
										className="w-full px-4 py-3 bg-black/25 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
										placeholder={t('form.emailPlaceholder')}
										aria-required="true"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
									{t('form.subject')} *
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleInputChange}
									required
									disabled={isSubmitting || !!status.type}
									className="w-full px-4 py-3 bg-black/25 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
									placeholder={t('form.subjectPlaceholder')}
									aria-required="true"
								/>
							</div>

							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
									{t('form.message')} *
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={5}
									disabled={isSubmitting || !!status.type}
									className="w-full px-4 py-3 bg-black/25 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
									placeholder={t('form.messagePlaceholder')}
									aria-required="true"
								/>
							</div>

							<Button
								type="submit"
								variant="primary"
								size="lg"
								className="w-full"
								icon={<Icon name="mail" size={20} />}
								iconPosition="right"
								disabled={isSubmitting || !!status.type}
							>
								{isSubmitting ? t('form.sending') : t('form.send')}
							</Button>
						</form>

						<AnimatePresence>
							{isSubmitting && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 flex items-center justify-center z-20"
								>
									<motion.div
										animate={{
											scale: [1, 1.1, 1],
											opacity: [0.5, 1, 0.5],
										}}
										transition={{
											duration: 1.5,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
										className="w-16 h-16 border-4 border-white/40 rounded-full"
									/>
								</motion.div>
							)}

							{status.type && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="absolute inset-0 flex items-center justify-center z-20 p-8"
								>
									<motion.div
										initial={{ scale: 0.7, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										exit={{ scale: 0.7, opacity: 0 }}
										transition={{
											duration: 0.4,
											ease: [0.34, 1.56, 0.64, 1],
										}}
										className={`p-6 rounded-xl text-center shadow-2xl max-w-md ${
											status.type === 'success'
												? 'bg-green-500/90 text-white border-2 border-green-400'
												: 'bg-red-500/90 text-white border-2 border-red-400'
										}`}
										role="alert"
									>
										<p className="text-lg font-semibold">{status.message}</p>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl font-bold text-white mb-4">{t('info.title')}</h3>
							<p className="text-gray-500 leading-relaxed mb-6">{t('info.subtitle')}</p>
						</div>

						<div className="space-y-6">
							<ContactInfoItem
								icon="mail"
								title={t('info.email')}
								content={personalInfo.email}
								href={`mailto:${personalInfo.email}`}
								bgColor="bg-blue-500/40"
								iconColor="text-blue-400"
							/>
							<ContactInfoItem
								icon="mapPin"
								title={t('info.location')}
								content={personalInfo.location}
								bgColor="bg-purple-500/40"
								iconColor="text-purple-400"
							/>
						</div>

						<div>
							<h4 className="text-lg font-semibold text-white mb-4">{t('info.social')}</h4>
							<div className="flex gap-4">
								<SocialLink href={personalInfo.github} icon="github" label="GitHub" />
								<SocialLink href={personalInfo.linkedin} icon="linkedin" label="LinkedIn" />
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default memo(ContactSection);
export { ContactSection };
