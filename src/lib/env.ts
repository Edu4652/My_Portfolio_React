export const env = {
	personalInfo: {
		name: process.env.NEXT_PUBLIC_PERSONAL_NAME || '',
		fullName: process.env.NEXT_PUBLIC_PERSONAL_FULL_NAME || '',
		title: process.env.NEXT_PUBLIC_PERSONAL_TITLE || '',
		email: process.env.NEXT_PUBLIC_PERSONAL_EMAIL || '',
		location: process.env.NEXT_PUBLIC_PERSONAL_LOCATION || '',
		websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || '#',
	},
	socialMedia: {
		github: process.env.NEXT_PUBLIC_GITHUB_URL || '#',
		linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
	},
	emailjs: {
		serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
		templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
		publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
		contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
	},
} as const;
