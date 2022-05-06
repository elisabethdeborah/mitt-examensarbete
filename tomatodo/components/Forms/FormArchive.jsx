import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../../context/TodoContext";
import { submitClick } from "./formFunctions";

const FormArchive = () => {
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	const [errMessage, setErrMessage] = useState('');
	const [body, setBody] = useState({title: ''});
	const [length, setLength] = useState(0);
	const [waiting, setWaiting] = useState(false);

	useEffect(() => {
		postFetch();
		if (state.initialFetch.allTodoLists.length !== length && waiting) { 
			postTomato(currentState.currentItem, state.initialFetch.allTodoLists[0]);
			setWaiting(false); 
			currentState.setFormIsVisible(false);
		};
	}, [state.fetchRes]);

	useEffect(() => {
		setErrMessage('');
	}, [body]);

	const postFetch = () => {
		fetchAllLists();
	};

	const postTomato = async(tomatoTodo, toList) => {
		await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				title: currentState.currentItem.title,
				description: currentState.currentItem.description,
				time: currentState.currentItem.time,
				parentRef: toList._id,
			}),
		})
		.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: 'todo', title: tomatoTodo.title, action: 'skapad', res: response.ok}))
		.catch(error => {
			console.log('error:', error);
		});
		fetchAllLists();
	};

	const handleSubmit = () => {
		setLength(state.initialFetch.allTodoLists.length);
		if (body.title && body.title.length > 0) {
			setWaiting(true);
			submitClick('todoList', body, 'POST', state);
		} else {
			setErrMessage("Namnet måste vara minst 1 tecken lång.");
		}
	};

	return (
		<section 
			className={clsx(styles.formContainer, styles.todoListFormContainer)}
		>	
			<h1 className={styles.formHeader}>
				{'Ny lista'}
			</h1>
			<input 
					type="text" 
					className={clsx(styles.input, styles.textInput)} 
					placeholder={`Namn på lista`} 
					onChange={(e) => setBody((body) => ({...body, title: e.target.value}))}
				/>
			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => currentState.setFormIsVisible(false)} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit()} />
			</div>
			{errMessage}
		</section>
	);
};

export default FormArchive;

