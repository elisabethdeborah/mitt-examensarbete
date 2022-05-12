import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from './styles/savedTomatoes.module.scss';
import clsx from 'clsx';
import NumberFormat from '../NumberFormat';
import PlayTimerBtn from '../PlayTimerBtn';

const ActiveLists = ({ tomatoes, setSideListsVisible, open }) => {
	const [contentIsVisible, setContentIsVisible] = useState(false);
	const router = useRouter();

	return (
		<div className={clsx(styles.activeLists, {
			[styles.showContent]: contentIsVisible,
			[styles.homePage]: router.pathname === '/start',
			[styles.tomatoPage]: router.pathname === '/mina-tomater'})}
		>
			<section className={styles.activeListsTop} onClick={() => setContentIsVisible(!contentIsVisible)}>
				<h4>Mina tomater</h4>
				<p className={styles.arrowRight} onClick={() => setSideListsVisible(false)}>&rarr;</p>
			</section>
			<section className={styles.contentBox}>
				<Link href="/mina-tomater" passHref>
					<p className={styles.link}>gå till mina tomater</p>
				</Link>
					{
						tomatoes ? 
							tomatoes.map((tomato, index) => {
								return (
									open !== index && (
										<article key={index} className={styles.hiddenLists}>
											<article className={styles.smallTomato} />
											<section className={styles.textGroup}>
												<h3>{tomatoes[index].title}</h3>
												<div className={styles.tomatoTime}>
													<NumberFormat 
														milliSeconds={tomato.time*1000} 
														text={'tid: '}  
														styling={{fontSize: '0.75rem', position: 'absolute', bottom: '20px'}} 
													/>
												</div>
											</section>
											<PlayTimerBtn listItem={tomato} color={"orange"} />
											<Link href={"/timer-countdown"} passHref>
												<article className={styles.playBtnTomato} />		
											</Link>
										</article>
									)
								);
							}) 
						: <h3>Tomt!</h3>
					}
			</section>
		</div>
	);
};

export default ActiveLists;