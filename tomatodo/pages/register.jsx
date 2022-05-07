import React, { useEffect, useState } from 'react';
import styles from '../components/Forms/styles/form.module.scss';
import clsx from "clsx";
import { useUpdateContext, useTodoContext } from "../context/TodoContext";
import { useUserStore } from '../context/UserStore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import axios from 'axios';

const Register = () => {
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

	const { redirect } = router.query;

  //OM REDAN INLOGGAD, REDIRECT ISTÄLLET FÖR ATT VISA DENNA SIDA
  useEffect(() => {
		if(userInfo) {
			console.log('userInfo: ', JSON.parse(userInfo))
			router.push(redirect || '/');
		}
  	}, [router, userInfo, redirect]);

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

  const submitHandler = async ( name, email, password ) => {
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

  return (
    <div className={clsx(styles.loginPageWrapper)} >
      	<section className={clsx(styles.formContainer, styles.formIsVisible)}>
			<h1 className={styles.formHeader}>
			Ny användare
			</h1>
			<input
				name="name"
				type={'text'}
				id="name"
				label="Name"
				placeholder='namn'
				onChange={(e) => setUserNameInput(e.target.value)}
				className={clsx(styles.input, styles.textInput)}
			/>
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
			<input
				name={'password'}
				type={'password'}
				id="password-2"
				label="lösenord"
				placeholder='upprepa lösenord'	
				onChange={(e) => setRepeatPasswordInput(e.target.value)}
				className={clsx(styles.input, styles.textInput)}
			/>
			<div className={styles.btnContainer}>
				<button type="button" onClick={() => submitHandler(userNameInput, userEmailInput, userPasswordInput)} className={styles.addBtn}>
					Skapa konto
				</button>
			</div>
            <Link href={`/login?redirect=${redirect || '/'}`} passHref>
				Har du redan ett konto?
            </Link>
			{errMessage}
      	</section>
    </div>
  );
}

export default Register;
