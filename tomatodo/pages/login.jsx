import React, { useEffect, useState } from 'react';
import styles from '../components/Forms/styles/form.module.scss';
import clsx from "clsx";
import { useUpdateContext, useTodoContext } from "../context/TodoContext";
import { useUserStore } from '../context/UserStore';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';

const Login = () => {
	const todoState = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = todoState.fetchTodos;
	const [errMessage, setErrMessage] = useState('');
	const [userEmailInput, setUserEmailInput] = useState('');
	const [userPasswordInput, setUserPasswordInput] = useState('');

	const { state, dispatch } = useUserStore();
	const { userInfo } = state;
  
	const router = useRouter();

  	const { redirect } = router.query;
	//const redirect = `/${userInfo}`;

	useEffect(() => {
		if (userInfo) {
		router.push(redirect || '/');
		}
	}, [router, userInfo, redirect]);

  	const submitHandler = async ( email, password ) => {
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
				<button type="submit" onClick={() => submitHandler(userEmailInput, userPasswordInput)} className={styles.addBtn}>
					Logga in
				</button>
			</div>
			Har du inget konto?{' '}
			<Link href={`/register?redirect=${redirect || '/'}`} passHref>
			{/* <Link href={`/register`} passHref> */}
				Skapa konto
			</Link>
			{errMessage}
      	</section>
    </div>
  );
};

export default Login;
