
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/savedTomatoes.module.scss';
import clsx from 'clsx';

const ActiveLists = ({tomatoes, setSideListsVisible, setOpen, open, page}) => {
	const [contentIsVisible, setContentIsVisible] = useState(false);

	const handleClickTomato = (tomato, index) => {
		console.log('tomato-klick från sidlista: ', tomato, 'index', index)
	}

	return (
		<div className={clsx(styles.activeLists, {[styles.showContent]: contentIsVisible,
			[styles.homePage]: page === 'home',
			[styles.tomatoPage]: page === 'tomato'})}>
			<section className={styles.activeListsTop} onClick={() => setContentIsVisible(!contentIsVisible)}>
				<h4>Mina tomater</h4><p className={styles.arrowRight} onClick={() => setSideListsVisible(false)}>&rarr;</p>
			</section>
			<section className={styles.contentBox}>
			<Link href="/mina-tomater" passHref>
			<p className={styles.link}>gå till mina tomater</p>
			</Link>
				{
				tomatoes ? tomatoes.map((tomato, index) => {
					return (
						open !== index && (
							<article key={index} onClick={() => handleClickTomato(tomato, index)} className={styles.hiddenLists}>
								<article className={styles.smallTomato} />
								<section className={styles.textGroup}>
									<h3>{tomatoes[index].title}</h3>
									<p>tid: {tomato.time}</p>
								</section>
								<Link href={"/timer"} passHref>
									<article onClick={() => console.log('go to timer, time', tomato.time)} className={styles.playBtnTomato} />		
								</Link>
							</article>
						)
					)
				}) : <h3>Tomt!</h3>
				}
			</section>
		</div>
	)
};

export default ActiveLists;