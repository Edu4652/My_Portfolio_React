import emailjs from '@emailjs/browser';
import { env } from '@/lib/env';
import type { EmailResponse, EmailTemplateParams } from '@/types';

const isConfigured = (): boolean => {
	return Boolean(env.emailjs.serviceId && env.emailjs.templateId && env.emailjs.publicKey);
};

export const initEmailJS = (): void => {
	if (isConfigured()) {
		emailjs.init(env.emailjs.publicKey);
	}
};

export const sendEmail = async (templateParams: EmailTemplateParams): Promise<EmailResponse> => {
	if (!isConfigured()) {
		return { success: false, message: 'EmailJS not configured' };
	}

	try {
		const formattedParams = {
			title: `Nuevo mensaje desde portafolio: ${templateParams.subject}`,
			name: templateParams.from_name,
			email: templateParams.from_email,
			time: new Date().toLocaleString('es-ES', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			}),
			message: templateParams.message,
		};

		const _result = await emailjs.send(
			env.emailjs.serviceId,
			env.emailjs.templateId,
			formattedParams,
			env.emailjs.publicKey,
		);
		return { success: true, message: 'Email sent successfully' };
	} catch (_error) {
		return { success: false, message: 'Failed to send email' };
	}
};

export const openMailtoFallback = (formData: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): void => {
	const recipient = env.emailjs.contactEmail || env.personalInfo.email;
	const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
	const body = encodeURIComponent(
		`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
	);

	const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
	window.open(mailtoLink);
};
