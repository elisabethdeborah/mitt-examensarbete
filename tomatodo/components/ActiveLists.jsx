
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/activeLists.module.scss';
import clsx from 'clsx';

const ActiveLists = ({lista, setSideListsVisible, setOpen, open, page, tomato}) => {
	const [contentIsVisible, setContentIsVisible] = useState(page === 'home' || page === 'tomato');


	const postTomatoTodo = async(tomatoTodo, toList) => {
		await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				name: tomatoTodo.name,
				description: tomatoTodo.description,
				time: tomatoTodo.time,
				parentRef: toList._id,
			}),
		  });
	}

	const handleClickOpen = (list, index, tomato) => {
		if (page === "tomato") {
		 console.log('POST TOMATO', tomato, 'TO CHOSEN TODO LIST: ', list, 'UPDATE LIST') 
		
		postTomatoTodo(tomato, list);

		 } else if (page === 'todo') {
			setOpen(index)
		 }
		 
	}

	return (
		<div className={clsx(styles.activeLists, {
			[styles.showContent]: contentIsVisible,
			[styles.homePage]: page === 'home',
			[styles.tomatoPage]: page === 'tomato',
			[styles.todolistPage]: page === 'todo', 
			})}>
			<section className={styles.activeListsTop} onClick={page === 'todo' ? () => setContentIsVisible(!contentIsVisible): null}>
				<h4>Mina påbörjade listor</h4><p className={styles.arrowRight} onClick={() => setSideListsVisible(false)}>&rarr;</p>
			</section>
			<section className={styles.contentBox}>
			<Link href="/mina-todos" passHref>
			<p className={styles.link}>gå till mina todos</p>
			</Link>
				{
				lista ? lista.map((list, index) => {

			//{console.log('i listan:', list.list)}
					return (
						open !== index && (
							<article key={index} onClick={() => handleClickOpen(list, index, tomato)} className={styles.hiddenLists}>
								<section className={styles.textGroup}>
								<h3>{list.title}</h3>
								<p>tillagd: {list._createdAt? list._createdAt.slice(0, 10) : index}</p>
								</section>
								{/* {console.log(list)} */}
								<section className={styles.iconGroup}>
									<article className={styles.nrOfTodosIcon}>
									<p className={styles.nrTodos}>{list.nrOfTodos}</p>
									</article>
									<article className={styles.nrOfNotCheckedIcon}>
									<p className={styles.nrNotChecked}>{list.numberOfNotChecked}</p>
									</article>
									<article className={styles.nrOfCheckedIcon}>
									<p className={styles.nrChecked}>{list.numberOfChecked}</p>
									</article>
								</section>
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