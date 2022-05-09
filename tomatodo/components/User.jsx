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
				<>
				<section className={styles.textContent}>
					<p className={styles.inloggad}>Inloggad:</p>
					<p className={styles.userName}>{userInfo.name}</p>
				</section>
				<article  className={styles.settingsBtn}>
				<Link href='#' passHref> </Link>
				</article>
				</>
			) : (
				<button onClick={() => handleUserClick('register')}>
					skapa användare
				</button>
			)}
			<button className={clsx(styles.userClickBtn, {[styles.logoutBtn]: userInfo, [styles.login]: !userInfo})} onClick={() => handleUserClick('login')}>
				{userInfo ? '' : 'logga in'}
			</button>
		</div>
		</>
		
	);
};

export default User;