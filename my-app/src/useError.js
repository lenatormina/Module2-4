import { useState } from 'react';

const initialError = {
	emailError: null,
	passwordError: null,
	repeatPasswordError: null,
};

export const useError = () => {
	const [error, setError] = useState(initialError);

	return {
		getError: () => error,
		updateError: (fieldName, newValue) => {
			setError({ ...error, [fieldName]: newValue });
		},
		resetError() {
			setError(initialError);
		},
	};
};
