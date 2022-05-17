import React, { useEffect } from 'react';
import styles from '../components/Forms/styles/form.module.scss';
import clsx from "clsx";
import { useUserStore } from '../context/UserStore';
import { useRouter } from 'next/router';
import LoginForm from '../components/Forms/LoginForm';
import Blast from '../svgAssets/newtomato-whiteborder-blast3.svg';

const Register = () => {
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
		<div className={styles.loginContainer}>
			<Blast className={styles.blast} />
			<section className={styles.headerTextContainer}>
				<h1 className={clsx(styles.logoHeader, styles.partOne)}>toma</h1>
				<h1 className={clsx(styles.logoHeader, styles.partTwo)}>todo</h1>
			</section>
			<LoginForm />
		</div>

		
    </div>
	);
};

export default Register;
