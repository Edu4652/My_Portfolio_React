import dynamic from 'next/dynamic';
import type React from 'react';
import { Suspense } from 'react';
import { LoadingFallback, PageTransition } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { Footer, MainLayout } from '@/components/templates';
import { locales } from '@/i18n/config';

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

const HeroSection = dynamic(
	() => import('@/components/organisms/HeroSection').then((mod) => ({ default: mod.HeroSection })),
	{
		ssr: true,
	},
);

const ProjectsSection = dynamic(
	() => import('@/components/organisms/ProjectsSection').then((mod) => ({ default: mod.ProjectsSection })),
	{
		ssr: true,
	},
);

const SkillsSection = dynamic(
	() => import('@/components/organisms/SkillsSection').then((mod) => ({ default: mod.SkillsSection })),
	{
		ssr: true,
	},
);

const ExperienceSection = dynamic(
	() => import('@/components/organisms/ExperienceSection').then((mod) => ({ default: mod.ExperienceSection })),
	{
		ssr: true,
	},
);

const ContactSection = dynamic(
	() => import('@/components/organisms/ContactSection').then((mod) => ({ default: mod.ContactSection })),
	{
		ssr: true,
	},
);

const HomePage: React.FC = () => {
	return (
		<MainLayout>
			<PageTransition>
				<Header />

				<Suspense fallback={<LoadingFallback />}>
					<HeroSection />
				</Suspense>

				<Suspense fallback={<LoadingFallback />}>
					<ProjectsSection />
				</Suspense>

				<Suspense fallback={<LoadingFallback />}>
					<SkillsSection />
				</Suspense>

				<Suspense fallback={<LoadingFallback />}>
					<ExperienceSection />
				</Suspense>

				<Suspense fallback={<LoadingFallback />}>
					<ContactSection />
				</Suspense>

				<Footer />
			</PageTransition>
		</MainLayout>
	);
};

export default HomePage;
