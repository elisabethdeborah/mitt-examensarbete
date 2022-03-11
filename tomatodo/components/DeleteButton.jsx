import styles from '../styles/deleteBtn.module.scss';
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import clsx from 'clsx';
import { useState } from 'react';

const DeleteButton = ({color, listItem, size}) => {
	const [showWarning, setShowWarning] = useState(false);
	const state = useTodoContext()
	const fetchAllLists = state.fetchTodos;

	const handleDelete = async (listItem) => {
		console.log('deleteklick:',listItem.title, listItem._id, listItem._type, 'item', listItem)

		if (listItem._type === 'todo') {
			await fetch("/api/todos/todo", {
				method: "DELETE",
				body: listItem._id,
			  })
			  
		.then(console.log('posted'))
		.catch(error => {
			console.log('error:', error);
		})
		fetchAllLists();
		
			 
			  ;
		} else if (listItem._type === 'todoList') {
			await fetch("/api/todos/todolist", {
				method: "DELETE",
				body: listItem._id,
			  })
		.then(console.log('posted'))
		.catch(error => {
			console.log('error:', error);
		})
		fetchAllLists();
		
			  ;
		} else if (listItem._type === 'tomato') {
			await fetch("/api/tomatoes/tomato", {
				method: "DELETE",
				body: listItem._id,
			  })
		fetchAllLists();
		}
		setShowWarning(false);
	}

	return (<>
		<div onClick={() => setShowWarning(true)} className={clsx(styles.deleteBtn, {[styles.smallOrange]: color === 'orange', [styles.smallBlue]: color === 'blue', [styles.large]: size === 'large' })} />
		{ showWarning &&(
			<div className={styles.deleteWarning}>
			<h2>Vill du ta bort {listItem.title}?</h2>
			<div className={styles.btnContainer}>
				<input className={clsx(styles.warningBtn,styles.delete)} type={"button"} onClick={() => handleDelete(listItem)} value={'ta bort'} />
				<input className={clsx(styles.warningBtn, styles.close)} type={"button"} onClick={() => setShowWarning(false)} value={'ångra'}  />
			</div>
		</div>)}
		</>
	)
}

export default DeleteButton;