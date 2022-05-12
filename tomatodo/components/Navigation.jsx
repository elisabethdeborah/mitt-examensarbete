import React, { useState, useEffect, useRef } from 'react';
import clsx from "clsx";
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navigation.module.scss';
import { useUserStore } from '../context/UserStore';
import User from './User';
import Cookies from 'js-cookie';

const Navigation = ({ navIsOpen, setNavIsOpen, width }) => {
	const router = useRouter();
	const { state, dispatch } = useUserStore();
	const { userInfo } = state;

	const logOut = () => {
		dispatch({ type: 'USER_LOGOUT' });
		Cookies.remove('userInfo');
	};

	return (
		<nav className={clsx(styles.navContainer, {[styles.navIsOpen]: navIsOpen})}>
			<ul onClick={() => setNavIsOpen()} className={styles.list}>
				<li className={clsx(styles.navLink, {[styles.active]: router.pathname=='/start'})}>
					<Link href='/start'>Start</Link>
				</li>
				<li className={clsx(styles.navLink, {[styles.active]: router.pathname=='/timer'})}>
					<Link href='/timer'>Timer</Link>
				</li>
				<li className={clsx(styles.navLink, {[styles.active]: router.pathname=='/stopwatch'})}>
					<Link href='/stopwatch'>Stopwatch</Link>
				</li>
				<li className={clsx(styles.navLink, {[styles.active]: router.pathname=='/mina-tomater'})}>
					<Link href='/mina-tomater'>Mina tomater</Link>
				</li>
				<li className={clsx(styles.navLink, {[styles.active]: router.pathname=='/mina-todos'})}>
					<Link href='/mina-todos'>Mina todos</Link>
				</li>
				<li className={clsx(styles.navLink, {[styles.active]: router.pathname=='/sparade-listor'})}>
					<Link href='/mina-sparade-listor'>Mina sparade listor</Link>
				</li>
			</ul>
			{width < 600 && (
				<li className={styles.navLink}>
					<User userInfo={userInfo} logOut={logOut} />
				</li>
			)}
		</nav>
	)
};

export default Navigation;