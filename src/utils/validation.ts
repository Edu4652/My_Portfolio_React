export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

export const isEmpty = (value: string | null | undefined): boolean => {
	return !value || value.trim().length === 0;
};

export const validateContactForm = (data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): { isValid: boolean; errors: Record<string, string> } => {
	const errors: Record<string, string> = {};

	if (isEmpty(data.name)) {
		errors.name = 'El nombre es requerido';
	}

	if (isEmpty(data.email)) {
		errors.email = 'El email es requerido';
	} else if (!isValidEmail(data.email)) {
		errors.email = 'El email no es válido';
	}

	if (isEmpty(data.subject)) {
		errors.subject = 'El asunto es requerido';
	}

	if (isEmpty(data.message)) {
		errors.message = 'El mensaje es requerido';
	} else if (data.message.trim().length < 10) {
		errors.message = 'El mensaje debe tener al menos 10 caracteres';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
};
