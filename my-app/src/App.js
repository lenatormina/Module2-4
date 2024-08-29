import styles from './App.module.css';
import { useStore } from './useStore';
import { useError } from './useError';
import { useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

//! 1
const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState, resetState } = useStore();
	const { getError, updateError, resetError } = useError();
	const submitButtonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	const { email, password, repeatPassword } = getState();

	const { emailError, passwordError, repeatPasswordError } = getError();

	const onChange = ({ target }) => {
		updateState(target.name, target.value);

		if (target.name === 'email') {
			if (!/@/.test(target.value)) {
				updateError(
					'emailError',
					'Адрес электронной почты должен содержать символ "@"',
				);
			} else {
				updateError('emailError', null);
			}
		}

		if (target.name === 'password') {
			if (!/^[\w_]*$/.test(target.value)) {
				updateError(
					'passwordError',
					'Допустимые символы - буквы, цифры и нижнее подчёркивание',
				);
			} else {
				updateError('passwordError', null);
			}
			if (repeatPassword !== target.value) {
				updateError('repeatPasswordError', 'Пароли не совпадают');
			} else {
				updateError('repeatPasswordError', null);
			}
		}

		if (target.name === 'repeatPassword') {
			if (password !== target.value) {
				updateError('repeatPasswordError', 'Пароли не совпадают');
			} else {
				submitButtonRef.current?.focus();
				updateError('repeatPasswordError', null);
			}
		}
	};

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input
					name="email"
					type="email"
					placeholder="Введите почту"
					value={email}
					onChange={onChange}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onChange}
				/>
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повтор пароля"
					value={repeatPassword}
					onChange={onChange}
				/>
				<button
					ref={submitButtonRef}
					type="submit"
					disabled={
						emailError !== null ||
						passwordError !== null ||
						repeatPasswordError !== null
					}
				>
					Зарегистрироваться
				</button>
				<button
					type="button"
					onClick={() => {
						resetState();
						resetError();
					}}
				>
					Сброс
				</button>
			</form>
		</div>
	);
};
//!2
// const validationSchema = yup.object().shape({
// 	email: yup
// 		.string()
// 		.email('Адрес электронной почты должен содержать символ "@"')
// 		.required('Email обязателен'),
// 	password: yup
// 		.string()
// 		.matches(
// 			/^[\w_]*$/,
// 			'Пароль должен содержать только буквы, цифры и нижнее подчёркивание',
// 		)
// 		.required('Пароль обязателен'),
// 	repeatPassword: yup
// 		.string()
// 		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
// 		.required('Повторите пароль'),
// });

// const sendFormData = (formData) => {
// 	console.log(formData);
// };

// export const App = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors, isValid },
// 		reset,
// 	} = useForm({
// 		resolver: yupResolver(validationSchema),
// 		mode: 'all',
// 	});

// 	const onSubmit = (data) => {
// 		sendFormData(data);
// 	};

// 	return (
// 		<div className={styles.App}>
// 			<form onSubmit={handleSubmit(onSubmit)}>
// 				<input
// 					name="email"
// 					type="email"
// 					placeholder="Введите email"
// 					{...register('email')}
// 				/>
// 				{errors.email && (
// 					<div className={styles.errorLabel}>{errors.email.message}</div>
// 				)}

// 				{/* Поле ввода пароля */}
// 				<input
// 					name="password"
// 					type="password"
// 					placeholder="Пароль"
// 					{...register('password')}
// 				/>
// 				{errors.password && (
// 					<div className={styles.errorLabel}>{errors.password.message}</div>
// 				)}
// 				<input
// 					name="repeatPassword"
// 					type="password"
// 					placeholder="Повторите пароль"
// 					{...register('repeatPassword')}
// 				/>
// 				{errors.repeatPassword && (
// 					<div className={styles.errorLabel}>
// 						{errors.repeatPassword.message}
// 					</div>
// 				)}
// 				<button type="submit" disabled={!isValid}>
// 					Зарегистрироваться
// 				</button>
// 				<button type="button" onClick={() => reset()}>
// 					Сброс
// 				</button>
// 			</form>
// 		</div>
// 	);
// };
