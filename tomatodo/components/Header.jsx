import React, { useState } from 'react';
import clsx from "clsx";
import styles from '../styles/Header.module.scss';
import Navigation from './Navigation';
import Hamburger from '../svgAssets/hamburger.svg';
import CloseNav from '../svgAssets/closeNav.svg';
import Logo from '../assets/svg/logo-header.svg';
const Header = () => {
	const [navIsOpen, setNavIsOpen] = useState(false);
	return (
		<header className={styles.header}>
		<CloseNav className={clsx(styles.closeNavBtn, {[styles.showClosebtn]: navIsOpen})} onClick={() => setNavIsOpen(false)} />
		<Hamburger className={clsx(styles.hamburger, {[styles.showHamburger]: !navIsOpen})} onClick={() => setNavIsOpen(true)} />
			<section className={clsx(styles.logoContainer, {[styles.navIsOpen]: navIsOpen})} />
			<Navigation navIsOpen={navIsOpen} setNavIsOpen={setNavIsOpen} />
		</header>
	)
};
export default Header;