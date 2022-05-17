import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../../context/TodoContext";
import { useUserStore } from '../../context/UserStore';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';

const Form = () => {
	const todoState = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = todoState.fetchTodos;
	const [errMessage, setErrMessage] = useState('');
	const [userNameInput, setUserNameInput] = useState('');
	const [userEmailInput, setUserEmailInput] = useState('');
	const [userPasswordInput, setUserPasswordInput] = useState('');
	const [repeatPasswordInput, setRepeatPasswordInput] = useState('');

	const { state, dispatch } = useUserStore();
	const { userInfo } = state;
  
	const router = useRouter();
	const path = router.pathname;

	//OM REDAN INLOGGAD, REDIRECT ISTÄLLET FÖR ATT VISA DENNA SIDA
	useEffect(() => {
		if(userInfo) {
			console.log('register page userInfo: ', userInfo)
			router.push('/');
		}
  	}, [router, userInfo]);

	useEffect(() => {
		setErrMessage('')
	}, [userEmailInput, userPasswordInput]);

	const validateRepeat = () => {
		const numberOfChars = repeatPasswordInput.split('').length;
		const checkNumber = userPasswordInput.split('').slice(0, numberOfChars).join('');
		repeatPasswordInput !== checkNumber ? setErrMessage('Inte samma.') : setErrMessage('');
	};

	useEffect(() => {
		setErrMessage('')
		validateRepeat();
	}, [repeatPasswordInput]);

	const submitRegisterHandler = async ( name, email, password ) => {
		if (!userNameInput || !userNameInput.length > 1) {
			setErrMessage("Namnet måste vara minst 2 tecken långt.");
		} else if ( !userEmailInput.includes('@') || 
			userEmailInput[0] === '@' ||
			!userEmailInput.split('').slice(userEmailInput.split('').findIndex(x => x === '@')).includes('.') 
			|| userEmailInput.split('').slice(userEmailInput.split('').findIndex(x => x === '@')).reverse().join('').slice(0, 2).includes('.') ) {
				setErrMessage("Inte giltig emailadress.");
			} else if ( userPasswordInput.length < 6 ) {
				setErrMessage("Lösenordet måste vara minst 6 tecken långt och innehålla minst 1 siffra.");
			} else {
				try {
					const { data } = await axios.post('/api/users/register', {
					  name,
					  email,
					  password,
					});
					dispatch({ type: 'USER_LOGIN', payload: data });
					jsCookie.set('userInfo', JSON.stringify(data));
					router.push(redirect || '/');
				}  catch (error) {
					console.log('error in page:', error);
				}
			};
		};

		const submitLoginHandler = async ( email, password ) => {
			try {
				const { data } = await axios.post('/api/users/login', {
					email,
					password,
				});
				dispatch({ type: 'USER_LOGIN', payload: data });
				jsCookie.set('userInfo', JSON.stringify(data));
				router.push(redirect || '/');
			}  catch (error) {
				console.log('error in page:', error);
			}
		};

	return (	
		<section className={clsx(styles.formContainer, styles.formIsVisible, {
			[styles.userForm]: path === '/register' || path === '/login'})}>
			{path === '/register' && (
			<input
				name="name"
				type={'text'}
				id="name"
				label="Name"
				placeholder='namn'
				onChange={(e) => setUserNameInput(e.target.value)}
				className={clsx(styles.input, styles.textInput)}
			/>
			)}
			<input
				name="email"
				type={'email'}
				id="email"
				label="Email"
				placeholder='emailadress'
				onChange={(e) => setUserEmailInput(e.target.value)}
				className={clsx(styles.input, styles.textInput)}
			/>
			<input
				name={'password'}
				type={'password'}
				id="password"
				label="lösenord"
				placeholder='lösenord'	
				onChange={(e) => setUserPasswordInput(e.target.value)}
				className={clsx(styles.input, styles.textInput)}
			/>
			{path === '/register' && (
			<input
				name={'password'}
				type={'password'}
				id="password-2"
				label="lösenord"
				placeholder='upprepa lösenord'	
				onChange={(e) => setRepeatPasswordInput(e.target.value)}
				className={clsx(styles.input, styles.textInput)}
			/>
			)}
			<div className={styles.errMessageContainer}>
				<p className={styles.errMessage}>{errMessage}</p>
			</div>
			<div className={styles.btnContainer}>
				<button 
					type="button" 
					onClick={path === '/register' ? 
					() => submitRegisterHandler(userNameInput, userEmailInput, userPasswordInput) : 
					() => submitLoginHandler(userEmailInput, userPasswordInput)} 
					className={styles.addBtn}
				>
					{path === '/register' ? 'Skapa konto' : 'Logga in'}
				</button>
			</div>
			<Link href={path === '/register' ? '/login' : '/register'} passHref>
			{path === '/register' ? 'Har du redan ett konto?' : 'Har du inget konto? '}
			</Link>
		</section>
	);
};

export default Form;

