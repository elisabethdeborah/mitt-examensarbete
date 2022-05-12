import React from 'react';
import styles from '../styles/Home.module.scss';
import clsx from "clsx";
import LoginForm from '../components/Forms/LoginForm';

const Register = () => (
    <div className={clsx(styles.loginPageWrapper)} >
		<LoginForm />
    </div>
);

export default Register;
