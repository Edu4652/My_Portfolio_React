import { env } from '@/lib/env';
import { Experience, NavItem, PersonalInfo, Project, ProjectCategory, Skill, SkillCategory, SkillLevel } from '@/types';

export const navigationItems: readonly NavItem[] = [
	{ id: 'home', label: 'Inicio', href: '#home' },
	{ id: 'projects', label: 'Proyectos', href: '#projects' },
	{ id: 'skills', label: 'Habilidades', href: '#skills' },
	{ id: 'experience', label: 'Experiencia', href: '#experience' },
	{ id: 'contact', label: 'Contacto', href: '#contact' },
] as const;

export const projects: readonly Project[] = [
	{
		id: 'portfolio-website',
		title: 'Portfolio Personal',
		description:
			'Sitio web personal desarrollado con React, TypeScript y Next.js. Incluye animaciones avanzadas, efectos de partículas, cursor personalizado y diseño responsive.',
		longDescription:
			'Sitio web personal desarrollado con React, TypeScript y Next.js. Incluye animaciones avanzadas, efectos de partículas, cursor personalizado y diseño responsive. Demuestra mis habilidades en desarrollo frontend moderno con una experiencia de usuario fluida e interactiva. Implementa WebGL para efectos visuales, animaciones con Framer Motion y un diseño completamente responsive.',
		image: '/images/projects/portfolio-screenshot.png',
		technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
		liveUrl: env.personalInfo.websiteUrl,
		githubUrl: `${env.socialMedia.github}/My_Portfolio_React`,
		featured: true,
		category: ProjectCategory.Web,
	},
] as const;

export const skills: readonly Skill[] = [
	{
		id: 'sql',
		name: 'SQL',
		level: SkillLevel.Master,
		category: SkillCategory.Backend,
		icon: 'database',
	},
	{
		id: 'devops',
		name: 'DevOps',
		level: SkillLevel.Advanced,
		category: SkillCategory.Cloud,
		icon: 'server',
		featured: true,
	},
	{
		id: 'angularjs',
		name: 'AngularJS',
		level: SkillLevel.Expert,
		category: SkillCategory.Frontend,
		icon: 'code',
	},
	{
		id: 'web-development',
		name: 'Desarrollo Web',
		level: SkillLevel.Master,
		category: SkillCategory.Frontend,
		icon: 'code',
		featured: true,
	},
	{
		id: 'reactjs',
		name: 'React.js',
		level: SkillLevel.Expert,
		category: SkillCategory.Frontend,
		icon: 'react',
	},
	{
		id: 'typescript',
		name: 'TypeScript',
		level: SkillLevel.Expert,
		category: SkillCategory.Frontend,
		icon: 'code',
	},
	{
		id: 'application-development',
		name: 'Desarrollo de Aplicaciones',
		level: SkillLevel.Expert,
		category: SkillCategory.Programming,
		icon: 'code',
		featured: true,
	},
	{
		id: 'python',
		name: 'Python',
		level: SkillLevel.Expert,
		category: SkillCategory.Programming,
		icon: 'python',
	},
	{
		id: 'blockchain',
		name: 'Blockchain',
		level: SkillLevel.Advanced,
		category: SkillCategory.Security,
		icon: 'link',
		featured: true,
	},
	{
		id: 'cybersecurity',
		name: 'Ciberseguridad',
		level: SkillLevel.Master,
		category: SkillCategory.Security,
		icon: 'shield',
		featured: true,
	},
	{
		id: 'cryptography',
		name: 'Criptografía',
		level: SkillLevel.Expert,
		category: SkillCategory.Security,
		icon: 'key',
	},
	{
		id: 'big-data',
		name: 'Big Data',
		level: SkillLevel.Expert,
		category: SkillCategory.Tools,
		icon: 'database',
		featured: true,
	},
	{
		id: 'spl',
		name: 'SPL',
		level: SkillLevel.Expert,
		category: SkillCategory.Tools,
		icon: 'code',
	},
	{
		id: 'splunk',
		name: 'Splunk',
		level: SkillLevel.Expert,
		category: SkillCategory.Tools,
		icon: 'database',
	},
	{
		id: 'tableau',
		name: 'Tableau',
		level: SkillLevel.Expert,
		category: SkillCategory.Tools,
		icon: 'chart',
	},
] as const;

export const experiences: readonly Experience[] = [
	{
		id: 'gainkode-software-engineer',
		company: 'GAINKODE',
		position: 'Software Engineer',
		startDate: '2025-07',
		endDate: 'present',
		description: [
			'Desarrollo de aplicaciones web utilizando tecnologías modernas',
			'Implementación de soluciones frontend con AngularJS',
			'Trabajo presencial en equipo de desarrollo full-time',
			'Aplicación de mejores prácticas en desarrollo de software',
		],
		technologies: ['Web Development', 'AngularJS'],
		current: true,
	},
	{
		id: 'andorra-telecom-data-scientist',
		company: 'Andorra Telecom',
		position: 'Data Scientist',
		startDate: '2022-10',
		endDate: '2025-07',
		description: [
			'Análisis y procesamiento de grandes volúmenes de datos',
			'Implementación de soluciones de business intelligence',
			'Desarrollo de modelos de datos y análisis predictivo',
			'Trabajo con herramientas de monitoreo y análisis de logs',
			'Colaboración en proyectos de transformación digital',
		],
		technologies: [
			'SQL',
			'Splunk',
			'Data Science',
			'Business Intelligence',
			'Python',
			'Data Analysis',
			'Machine Learning',
			'Statistics',
			'Data Visualization',
			'Big Data',
		],
		current: false,
	},
	{
		id: 'freemindtronic-junior-developer',
		company: 'Freemindtronic SL',
		position: 'Junior Software Developer',
		startDate: '2022-04',
		endDate: '2022-06',
		description: [
			'Desarrollo de aplicaciones con enfoque en seguridad y criptografía',
			'Implementación de interfaces de usuario con React.js',
			'Participación en proyectos de innovación tecnológica',
			'Aplicación de principios de desarrollo seguro',
			'Trabajo en equipo en entorno de prácticas profesionales',
		],
		technologies: [
			'Cryptography',
			'React.js',
			'JavaScript',
			'Security',
			'Software Development',
			'Frontend Development',
		],
		current: false,
	},
] as const;

export const personalInfo: PersonalInfo = {
	name: env.personalInfo.name,
	fullName: env.personalInfo.fullName,
	title: env.personalInfo.title,
	description:
		'Software Engineer with advanced training in Cybersecurity and experience in Data Science. Specialized in web development, data analysis, and information security. Passionate about creating modern, performant, and accessible web applications.',
	email: env.personalInfo.email,
	location: env.personalInfo.location,
	github: env.socialMedia.github,
	linkedin: env.socialMedia.linkedin,
};
