'use client';

import { useCallback, useState } from 'react';

interface UseFormSubmitOptions<T> {
	onSubmit: (data: T) => Promise<{ success: boolean; message: string }>;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

interface FormState {
	isSubmitting: boolean;
	status: {
		type: 'success' | 'error' | null;
		message: string;
	};
}

export const useFormSubmit = <T extends Record<string, unknown>>({
	onSubmit,
	onSuccess,
	onError,
}: UseFormSubmitOptions<T>) => {
	const [formState, setFormState] = useState<FormState>({
		isSubmitting: false,
		status: { type: null, message: '' },
	});

	const handleSubmit = useCallback(
		async (data: T) => {
			setFormState({
				isSubmitting: true,
				status: { type: null, message: '' },
			});

			try {
				const result = await onSubmit(data);

				setFormState({
					isSubmitting: false,
					status: {
						type: result.success ? 'success' : 'error',
						message: result.message,
					},
				});

				if (result.success && onSuccess) {
					onSuccess();
				}

				return result;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'An error occurred';

				setFormState({
					isSubmitting: false,
					status: {
						type: 'error',
						message: errorMessage,
					},
				});

				if (onError) {
					onError(error as Error);
				}

				return { success: false, message: errorMessage };
			}
		},
		[onSubmit, onSuccess, onError],
	);

	const resetForm = useCallback(() => {
		setFormState({
			isSubmitting: false,
			status: { type: null, message: '' },
		});
	}, []);

	return {
		...formState,
		handleSubmit,
		resetForm,
	};
};
