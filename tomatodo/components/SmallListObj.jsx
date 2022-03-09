
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/smallListObj.module.scss';
import clsx from 'clsx';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';


const SmallListObj = (listItem, handleClick, clickParam) => {
	console.log('small list obj', listItem)
	return (
		<>
		<article onClick={() => handleClick(clickParam)} className={styles.hiddenLists}>
			{
			listItem._type === "tomato"? (
				<>
				<article className={styles.smallTomato} />
				<section className={styles.textGroup}>
					<h3>{listItem.title}</h3>
					<div className={styles.tomatoTime}>
						<NumberFormat timeSeconds={tomato.time} text={'tid: '} textSize={'0.75rem'} /></div>
				</section>
				</>
			):(	
				<section className={styles.textGroup}>
					<h3>{listItem.name}</h3>
					{listItem && listItem._createdAt && (<p>tillagd: {listItem._createdAt.slice(0, 10)}</p>)}
				</section>
			)
			}
			<PlayTimerBtn listItem={listItem} />
		</article>
		</>
	)
}

export default SmallListObj;
		