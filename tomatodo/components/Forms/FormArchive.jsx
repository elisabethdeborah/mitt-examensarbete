import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../../context/TodoContext";
import { useUserStore } from '../../context/UserStore';
import { submitClick } from "./formFunctions";

const FormArchive = () => {
	const todoState = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = todoState.fetchTodos;
	const [errMessage, setErrMessage] = useState('');
	const { state, dispatch } = useUserStore();
	const { userInfo } = state;
	const [body, setBody] = useState({title: '', userId: userInfo._id});
	const [length, setLength] = useState(0);
	const [waiting, setWaiting] = useState(false);
	

	useEffect(() => {
		postFetch();
		if (todoState.initialFetch.activeLists.length !== length && waiting) { 
			postTomato(currentState.currentItem, todoState.initialFetch.activeLists[0]);
			setWaiting(false); 
			currentState.setFormIsVisible(false);
		};
	}, [todoState.fetchRes]);

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
				user: {
					_type: "reference",
					_ref: `${body.userId}`,
					_weak: true
				}
			}),
		})
		.then((response) => todoState.setFetchRes && todoState.setFetchRes({show: true, type: 'todo', title: tomatoTodo.title, action: 'skapad', res: response.ok}))
		.catch(error => {
			console.log('error:', error);
		});
		fetchAllLists();
	};

	const handleSubmit = () => {
		setLength(todoState.initialFetch.activeLists.length);
		if (body.title && body.title.length > 0 && body.userId) {
			setWaiting(true);
			submitClick('todoList', body, 'POST', todoState);
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
			<div className={styles.errMessageContainer}>
				<p className={styles.errMessage}>{errMessage}</p>
			</div>
			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => currentState.setFormIsVisible(false)} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit()} />
			</div>
		</section>
	);
};

export default FormArchive;

