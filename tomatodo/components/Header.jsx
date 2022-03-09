import React, { useState } from 'react';
import clsx from "clsx";
import styles from '../styles/Header.module.scss';
import Navigation from './Navigation';
import Hamburger from '../svgAssets/hamburger.svg';
import CloseNav from '../svgAssets/deleteTomatoWhiteNew.svg';
const Header = () => {
	const [navIsOpen, setNavIsOpen] = useState(false);
	return (
		<header className={styles.header}>
		<CloseNav className={clsx(styles.closeNavBtn, {[styles.showClosebtn]: navIsOpen})} onClick={() => setNavIsOpen(false)} />
		<Hamburger className={clsx(styles.hamburger, {[styles.showHamburger]: !navIsOpen})} onClick={() => setNavIsOpen(true)} />
			<section className={clsx(styles.logoContainer, {[styles.navIsOpen]: navIsOpen})} />
			<section className={styles.headerTextContainer}>
				<h1 className={clsx(styles.logoHeader, styles.partOne)}>toma</h1>
				<h1 className={clsx(styles.logoHeader, styles.partTwo)}>todo</h1>
			</section>
			<Navigation navIsOpen={navIsOpen} setNavIsOpen={setNavIsOpen} />
		</header>
	)
};
export default Header;