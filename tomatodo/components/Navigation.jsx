
import clsx from "clsx";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navigation.module.scss';

const Navigation = ({navIsOpen, setNavIsOpen}) => {
	const router = useRouter();

	return (
		<nav className={clsx(styles.navContainer, {[styles.navIsOpen]: navIsOpen})}>
			<ul onClick={() => setNavIsOpen()} className={styles.list}>
				<li className={clsx(styles.navLink, {[styles.active]: router.pathname=='/'})}>
					<Link href='/'>Start</Link>
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
		</nav>
	)
};

export default Navigation;