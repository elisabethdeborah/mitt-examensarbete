import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/savedLists.module.scss';
import clsx from 'clsx';

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
					//open !== index && (
						<article key={index} onClick={() => setPoputIsOpen(!popupIsOpen)} className={styles.hiddenLists}>
							{
								popupIsOpen && (
									<section className={styles.popup}>
										<h2>Vill du starta denna lista?</h2>
										<input type={"button"} value={"starta"} onClick={(list) => handleClick(list)}/>
									</section>
								)
							}
							<section className={styles.textGroup}>
								<h3>{list.name}</h3>
								<p>tillagd: {list._createdAt.slice(0, 10)}</p>
							</section>
							<article className={styles.nrOfTodosIcon}>
							<p className={styles.nrTodos}>{list.nrOfTodos}</p>
							</article>
						</article>
						//)
				)}) : <h3>Tomt!</h3>
		}
		</section>
		</div>
	)

};

export default SavedLists;