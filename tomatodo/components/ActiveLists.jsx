
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/activeLists.module.scss';
import clsx from 'clsx';

const ActiveLists = ({lista, setSideListsVisible, setOpen, open, page, tomato, previewLists}) => {
	const [contentIsVisible, setContentIsVisible] = useState(page === 'home' || page === 'tomato');

	const postTomatoTodo = async(tomatoTodo, toList) => {
		await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				title: tomatoTodo.title,
				description: tomatoTodo.description,
				time: tomatoTodo.time,
				parentRef: toList._id,
			}),
		});
	};

	const handleClickOpen = (list, index, tomato) => {
		if (page === "tomato") {
			postTomatoTodo(tomato, list);
		 } else if (page === 'todo') {
			setOpen(index)
		 } else if (page === 'home') {
			console.log('go to todolists med denna som open: ', list) 
		 }
	};

	return (
		<div className={clsx(styles.activeLists, {
			[styles.showContent]: contentIsVisible,
			[styles.homePage]: page === 'home',
			[styles.tomatoPage]: page === 'tomato',
			[styles.todolistPage]: page === 'todo', 
		})}>
			{page!== 'homeSaved' && (
			<section className={styles.activeListsTop} onClick={page === 'todo' ? () => setContentIsVisible(!contentIsVisible): null}>
				<h4>Mina påbörjade listor</h4>
				<p className={styles.arrowRight} onClick={() => setSideListsVisible(false)}>&rarr;</p>
			</section>
			)}
			<section className={clsx(styles.contentBox, {[styles.previewLists]: previewLists===true})}>
				{page!== 'homeSaved' && (
					<Link href="/mina-todos" passHref>
						<p className={styles.link}>gå till mina todos</p>
					</Link>
				)}
				{lista ? 
					lista.map((list, index) => {
						return (
							open !== index && (
								<article key={index} 
									onClick={() => handleClickOpen(list, index, tomato)} 
									className={(styles.hiddenLists)}
								>
									<section className={styles.textGroup}>
										<h3>{list.title}</h3>
										<p>tillagd: {list._createdAt? list._createdAt.slice(0, 10) : index}</p>
									</section>
									<section className={styles.iconGroup}>
										<article className={styles.nrOfTodosIcon}>
											<p className={styles.nrTodos}>{list.nrOfTodos? list.nrOfTodos: 0}</p>
										</article>
										<article className={styles.nrOfNotCheckedIcon}>
											<p className={styles.nrNotChecked}>{list.numberOfNotChecked? list.numberOfNotChecked: 0}</p>
										</article>
										<article className={styles.nrOfCheckedIcon}>
											<p className={styles.nrChecked}>{list.numberOfChecked? list.numberOfChecked: 0}</p>
										</article>
									</section>
								</article>
							)
						)
					}) 
					: <h3>Tomt!</h3>
				}
			</section>
		</div>
	)
};

export default ActiveLists;