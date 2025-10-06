export enum ProjectCategory {
	Web = 'web',
	Mobile = 'mobile',
	Desktop = 'desktop',
	Security = 'security',
	Other = 'other',
}

export enum SkillCategory {
	Programming = 'programming',
	Frontend = 'frontend',
	Backend = 'backend',
	Security = 'security',
	Cloud = 'cloud',
	Tools = 'tools',
}

export enum SkillLevel {
	Beginner = 1,
	Intermediate = 2,
	Advanced = 3,
	Expert = 4,
	Master = 5,
}

export interface NavItem {
	readonly id: string;
	readonly label: string;
	readonly href: string;
	readonly icon?: string;
}

export interface Project {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly longDescription: string;
	readonly image: string;
	readonly technologies: readonly string[];
	readonly githubUrl?: string;
	readonly liveUrl?: string;
	readonly featured: boolean;
	readonly category: ProjectCategory;
}

export interface Skill {
	readonly id: string;
	readonly name: string;
	readonly level: SkillLevel;
	readonly category: SkillCategory;
	readonly icon?: string;
	readonly featured?: boolean;
}

export interface Experience {
	readonly id: string;
	readonly company: string;
	readonly position: string;
	readonly startDate: string;
	readonly endDate?: string;
	readonly description: readonly string[];
	readonly technologies: readonly string[];
	readonly current: boolean;
}

export interface ContactFormData extends Record<string, string> {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface ContactFormState {
	readonly isSubmitting: boolean;
	readonly status: {
		readonly type: 'success' | 'error' | null;
		readonly message: string;
	};
}

export interface PersonalInfo {
	readonly name: string;
	readonly fullName?: string;
	readonly title: string;
	readonly description: string;
	readonly email: string;
	readonly location: string;
	readonly github: string;
	readonly linkedin: string;
}

export interface AnimationVariant {
	readonly hidden: {
		readonly opacity: number;
		readonly y?: number;
		readonly x?: number;
		readonly scale?: number;
	};
	readonly visible: {
		readonly opacity: number;
		readonly y?: number;
		readonly x?: number;
		readonly scale?: number;
		readonly transition?: {
			readonly duration?: number;
			readonly delay?: number;
			readonly ease?: string | number[];
		};
	};
}

export interface ScrollOptions {
	readonly behavior?: ScrollBehavior;
	readonly offset?: number;
}

export interface EmailTemplateParams {
	readonly from_name: string;
	readonly from_email: string;
	readonly subject: string;
	readonly message: string;
}

export interface EmailResponse {
	readonly success: boolean;
	readonly message: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'glass' | 'purple';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right';
