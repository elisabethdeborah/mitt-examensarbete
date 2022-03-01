
import clsx from "clsx";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navigation.module.scss';

const Navigation = ({navIsOpen, setNavIsOpen}) => {
	return (
		<nav className={clsx(styles.navContainer, {[styles.navIsOpen]: navIsOpen})}>
			<ul onClick={() => setNavIsOpen()} className={styles.list}>
				<li className={styles.navLink}><Link href='/' className>Start</Link></li>
				<li className={styles.navLink}><Link href='/sparade-listor'>Mina sparade listor</Link></li>
				<li className={styles.navLink}><Link href='/timer'>Timer</Link></li>
				<li className={styles.navLink}><Link href='/mina-tomater'>Mina tomater</Link></li>
				<li className={styles.navLink}><Link href='/mina-todos'>Mina todos</Link></li>
				<li className={styles.navLink}><Link href='/settings'>Inställningar</Link></li>
			</ul>
		</nav>
	)
};

export default Navigation;