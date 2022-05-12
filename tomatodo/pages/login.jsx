import React, { useEffect } from 'react';
import styles from '../components/Forms/styles/form.module.scss';
import clsx from "clsx";
import { useUserStore } from '../context/UserStore';
import { useRouter } from 'next/router';
import LoginForm from '../components/Forms/LoginForm';

const Login = () => {
	const { state, dispatch } = useUserStore();
	const { userInfo } = state;
  
	const router = useRouter();

	useEffect(() => {
		if (userInfo) {
		router.push('/');
		}
	}, [router, userInfo]);

  return (
    <div className={clsx(styles.loginPageWrapper)} >
		<LoginForm />
    </div>
  );
};

export default Login;
