import {
	BarChart3,
	ChevronRight,
	Clock,
	Cloud,
	Code,
	Code2,
	Container,
	Database,
	ExternalLink,
	FileCode,
	GitBranch,
	Github,
	Globe,
	Heart,
	Info,
	Key,
	Layers,
	Link,
	Linkedin,
	Mail,
	MapPin,
	Palette,
	Phone,
	Server,
	Shield,
	Star,
	Terminal,
	Zap,
} from 'lucide-react';
import React from 'react';
import { cn } from '@/utils';

/**
 * Icon component mapping for consistent icon usage
 * Centralized icon management with TypeScript support
 */
const iconMap = {
	github: Github,
	linkedin: Linkedin,
	mail: Mail,
	phone: Phone,
	mapPin: MapPin,
	externalLink: ExternalLink,
	chevronRight: ChevronRight,
	star: Star,
	code: Code,
	database: Database,
	server: Server,
	palette: Palette,
	zap: Zap,
	shield: Shield,
	heart: Heart,
	key: Key,
	link: Link,
	chart: BarChart3,
	clock: Clock,
	info: Info,
	// Technology icons
	react: FileCode,
	typescript: Code2,
	nextjs: Globe,
	tailwind: Palette,
	vue: Layers,
	nodejs: Server,
	python: Terminal,
	postgresql: Database,
	mongodb: Database,
	git: GitBranch,
	docker: Container,
	aws: Cloud,
	javascript: Code,
} as const;

// Icon name type for TypeScript autocomplete
export type IconName = keyof typeof iconMap;

// Icon component props interface
interface IconProps {
	name: IconName;
	size?: number | string;
	className?: string;
	color?: string;
}

/**
 * Reusable Icon component with consistent sizing and styling
 * Provides type-safe icon usage throughout the application
 */
const Icon: React.FC<IconProps> = ({ name, size = 24, className, color }) => {
	const IconComponent = iconMap[name];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent size={size} className={cn('inline-block', className)} color={color} />;
};

export { Icon };
export type { IconProps };
