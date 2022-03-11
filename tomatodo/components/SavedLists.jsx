import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/savedLists.module.scss';
import clsx from 'clsx';
import SmallListObj from './smallListObj';

const SavedLists = ({lista, setSideListsVisible, setOpen, open, page}) => {
	const [contentIsVisible, setContentIsVisible] = useState(false);
	const [popupIsOpen, setPoputIsOpen] = useState(false);

	const handleClick = (x) => {
		setOpen(x)
	}

	return (
		<div className={clsx(styles.savedLists, {[styles.showContent]: contentIsVisible,
			[styles.homePage]: page === 'home',
			[styles.todolistPage]: page === 'todo',
			[styles.savedListsPage]: page === 'saved'})}>
				
			<section className={styles.savedListsTop} onClick={() => setContentIsVisible(!contentIsVisible)}>
				<h4>Mina sparade listor</h4><p className={styles.arrowRight}  onClick={() => setSideListsVisible(false)}>&rarr;</p>
			</section>
			<section className={styles.contentBox}>
				<Link href="/sparade-listor" passHref>
				<p className={styles.link}>gå till sparade listor</p>
				</Link>
			{
				lista ? lista.map((list, index) => {
					return (
						<>
						{
							popupIsOpen && (
								<section className={styles.popup}>
									<h2>Vill du starta denna lista?</h2>
									<input type={"button"} value={"starta"} onClick={(list) => handleClick(list)}/>
								</section>
							)
						}
						<SmallListObj listItem={list} key={index} handleClick={setPoputIsOpen}/>
						</>
					)
				}) : <h3>Tomt!</h3>
				}
			</section>
		</div>
	)

};

export default SavedLists;