
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/limboLists.module.scss';

import { useTodoContext} from "../context/TodoContext";
import clsx from 'clsx';
import DeleteButton from './DeleteButton';

const LimboLists = ({list, page, tomato, previewLists, setDisplayWarning}) => {
	const state = useTodoContext();
	const fetchAllLists = state.fetchTodos;
	const restartList = async(tomatoTodo, toList) => {
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

	const handleClick = async() => {
		console.log('SAVE!!!', list._id)
		await fetch("/api/todos/todolist", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: list._id,
				saved: true,
			}),
		})
		.then(console.log('saved'))
		.catch(error => {
			console.log('error:', error);
		})
		setDisplayWarning(false);
		fetchAllLists();
		
	}

	return (
		<div className={styles.listContainer}>
				<article
					className={(styles.hiddenLists)}
				>
				<section className={styles.textGroup}>
					<h2> Alla todos är färdiga, bra jobbat!</h2>
					<h3>Vill du spara eller ta bort denna lista?</h3>
					<h2>{list.title}</h2>
					<div className={styles.btnContainer}>
						{/* <input type={"button"} className={styles.closeForm} value="Delete" onClick={ () => deleteList()} /> */}
						<DeleteButton setDisplayWarning={setDisplayWarning} listItem={list} size={'regular'} text={'delete'} />
						<input type={"button"} className={styles.addBtn} value="Spara" onClick={() => handleClick()} />
					</div>
					
				</section>
			</article>
				{/* {lista ? 
					lista.map((list, index) => {
						return (
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
					}) 
					: <h3>Tomt!</h3>
				} */}
		</div>
	)
};

export default LimboLists;