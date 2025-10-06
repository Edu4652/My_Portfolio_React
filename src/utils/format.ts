export const formatDate = (date: Date | string, locale: string = 'es-ES'): string => {
	if (date === 'present' || date === 'Present') {
		return date as string;
	}

	try {
		return new Intl.DateTimeFormat(locale, {
			year: 'numeric',
			month: 'long',
		}).format(new Date(date));
	} catch {
		return String(date);
	}
};

export const formatDateRange = (startDate: string, endDate?: string, locale: string = 'es-ES'): string => {
	const start = formatDate(startDate, locale);
	const end = endDate ? formatDate(endDate, locale) : 'Present';
	return `${start} - ${end}`;
};

export const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength).trim()}...`;
};

export const capitalizeFirstLetter = (text: string): string => {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
