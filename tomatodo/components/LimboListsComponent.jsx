
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/limboLists.module.scss';
import { useTodoContext} from "../context/TodoContext";
import clsx from 'clsx';
import DeleteButton from './DeleteButton';

const LimboLists = ({list, page, tomato, previewLists, setDisplayWarning}) => {
	const state = useTodoContext();
	const fetchAllLists = state.fetchTodos;

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
		list.todos.map(async(x) => {
			await fetch("/api/todos/todo", {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: list._id,
					checked: false,
				}),
			})
			.then(console.log('posted'))
			.catch(error => {
				console.log('error:', error);
			})
		})
		setDisplayWarning(false);
		fetchAllLists();
	};

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
						<DeleteButton setDisplayWarning={setDisplayWarning} listItem={list} size={'regular'} text={'delete'} />
						<input type={"button"} className={styles.addBtn} value="Spara" onClick={() => handleClick()} />
					</div>
				</section>
			</article>
		</div>
	)
};

export default LimboLists;