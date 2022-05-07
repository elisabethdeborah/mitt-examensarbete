import React, { useContext, useEffect, useState } from 'react';
import styles from '../components/Forms/styles/form.module.scss';
import clsx from "clsx";
import {useUserContext, useUpdateContext, useTodoContext} from "../context/TodoContext";

import Link from 'next/link';

import { useRouter } from 'next/router';



const Login = () => {
	const todoState = useTodoContext();
	const loggedInUserState = useUserContext();
	const currentState = useUpdateContext();
	const fetchAllLists = todoState.fetchTodos;
	const [errMessage, setErrMessage] = useState('');
	const [userEmailInput, setUserEmailInput] = useState('');
	const [userPasswordInput, setUserPasswordInput] = useState('');

	
  const userInfo = loggedInUserState;
  const router = useRouter();

  const redirect = `/start/${userInfo.user}`;

  useEffect(() => {
    if (userInfo.user) {
      router.push(redirect || '/');
    }
  }, [router, userInfo, redirect]);

  useEffect(() => {
    setErrMessage('')
  }, [userEmailInput, userPasswordInput]);


  const submitHandler = async () => {
	if ( !userEmailInput.includes('@') || 
		!userEmailInput.split('').slice(userEmailInput.split('').findIndex(x => x === '@')).includes('.') || 
		userEmailInput.split('').reverse().slice((userEmailInput.split('').reverse().slice(x => x === '.'))).join('').length <5 && userEmailInput.split('').reverse().slice((userEmailInput.split('').reverse().slice(x => x === '.')))
		) {
		console.log(
			userEmailInput.includes('@'),
			userEmailInput.split('').slice(userEmailInput.split('').findIndex(x => x === '@')).includes('.'), 
			userEmailInput.split('').reverse().slice(userEmailInput.split('').findIndex(x => x === '.')).join('').length > -1, 
			userEmailInput.split('').reverse().slice(userEmailInput.split('').findIndex(x => x === '.')).findIndex(x => Number(x) > -1))

		setErrMessage("Inte giltig emailadress.");
		} else if (userPasswordInput.length < 6 || userPasswordInput.split('').findIndex(x => Number(x) > -1) || userPasswordInput.split('').findIndex(x => typeof x === 'string')) {
			userPasswordInput.split('').map(x => console.log(typeof x, userPasswordInput.split('').findIndex(x => Number(x) > -1)))
				setErrMessage("Lösenordet måste vara minst 6 tecken långt och innehålla minst 1 siffra.");
		} else {
			await fetch('api/users/login', {
				method: 'POST',
				body: JSON.stringify({
						email: userEmailInput,
						password: userPasswordInput,
					})
			})
			.then((response) => todoState.setFetchRes && todoState.setFetchRes({show: true, title: userEmailInput, action: 'inloggad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
		}
	};

  return (
    <div className={clsx(styles.loginPageWrapper)} >
      	<section onSubmit={() => handleSubmit(submitHandler)} className={clsx(styles.formContainer, styles.formIsVisible)}>
			<h1 className={styles.formHeader}>
			Logga in
			</h1>
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
			<div className={styles.btnContainer}>
				<button type="submit" onClick={() => submitHandler()} className={styles.addBtn}>
					Logga in
				</button>
			</div>
			Har du inget konto?{' '}
			<Link href={`/register`} passHref>Skapa konto
			</Link>
			{errMessage}
      	</section>
    </div>
  );
}

export default Login;


