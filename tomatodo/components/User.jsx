import React, { useEffect, useState } from 'react';
import styles from '../styles/user.module.scss';
import clsx from "clsx";
import Link from 'next/link';
import { useRouter } from 'next/router';

const User = ({userInfo, logOut}) => {
	const router = useRouter();

	const handleUserClick = (action) => {
		userInfo ? logOut() : router.push(`/${action}`);
	};
	

	useEffect(() => {
		console.log(userInfo)
	}, [userInfo]);

	return (
		<div className={styles.userContainer}>
			{ userInfo ? ( 
				<section className={styles.textContent}>
					<p className={styles.inloggad}>Inloggad:</p>
					<p className={styles.userName}>{userInfo.name}</p>
				</section>
			) : (
				<button onClick={() => handleUserClick('register')}>
					skapa användare
				</button>
			)}
			<button onClick={() => handleUserClick('login')}>			{userInfo ? 'logga ut' : 'logga in'}
			</button>
		</div>
	);
};

export default User;