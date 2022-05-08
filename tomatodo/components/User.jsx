import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/user.module.scss';
import clsx from "clsx";
import Link from 'next/link';
import Resize from './Resize';
import { useRouter } from 'next/router';

const User = ({userInfo, logOut}) => {
	const router = useRouter();
	const [width, setWidth] = useState(); 
	const sectionRef = useRef();
	
	const handleUserClick = (action) => {
		userInfo ? logOut() : router.push(`/${action}`);
	};
	

	useEffect(() => {
		console.log(userInfo)
	}, [userInfo]);

	return (
		<>
		<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
		<div className={clsx(styles.userContainer, { [styles.mobile]: width < 600})} ref={sectionRef}>
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
			<button onClick={() => handleUserClick('login')}>
				{userInfo ? 'logga ut' : 'logga in'}
			</button>
		</div>
		</>
		
	);
};

export default User;