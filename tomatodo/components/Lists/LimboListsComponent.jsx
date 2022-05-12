import React, { useEffect } from 'react';
import styles from '../../components/Lists/styles/deleteBtn.module.scss';
import {useTodoContext, useUpdateContext} from "../../context/TodoContext";
import DeleteButton from './DeleteButton';

const LimboLists = ({ list }) => {
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;

	const handleClick = async() => {
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
		.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: 'lista', title: list.title, action: list.saved ? 'startad' : 'sparad', res: response.ok}))
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
		fetchAllLists();
		currentState.setOverlay(false);
	};

	useEffect(() => {
		currentState.setOverlay(true);
	}, []);

	return (
		<div className={styles.deleteWarning}>
				<article
					className={(styles.hiddenLists)}
				>
				<section className={styles.textGroup}>
					<h1> Alla todos är färdiga, <span>bra jobbat!</span></h1>
					<div className={styles.question}>
						<p>Vill du spara eller ta bort 
						<span>{` "${list.title}"`}</span>
						?</p>
					</div>
					<div className={styles.btnContainer}>
						<DeleteButton 
							listItem={list} 
							size={'regular'} 
							text={'ta bort'} 
						/>
						<input type={"button"} className={styles.addBtn} value="spara" onClick={() => handleClick()} />
					</div>
				</section>
			</article>
		</div>
	)
};

export default LimboLists;