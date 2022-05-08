import { useState, useEffect } from 'react';
import styles from './styles/deleteBtn.module.scss';
import {useTodoContext, useUpdateContext} from "../../context/TodoContext";
import clsx from 'clsx';

const DeleteButton = ({ color, listItem, size, text, setDisplayWarning, closeOverlay }) => {
	const [showWarning, setShowWarning] = useState(false);
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	//const [overlay, setOverlay] = useState(false);

	const handleDelete = async (listItem) => {
		//delete todo
		if (listItem._type === 'todo') {
			await fetch("/api/todos/todo", {
				method: "DELETE",
				body: listItem._id,
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
			fetchAllLists();			 
			//closeOverlay ? closeOverlay() : null;
		} else if (listItem._type === 'todoList') {
			listItem.todos.map(async(x) => {
				await fetch("/api/todos/todo", {
					method: "DELETE",
					body: x._id,
				})
				.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
				.catch(error => {
					console.log('error:', error);
				})
			});
			await fetch("/api/todos/todolist", {
				method: "DELETE",
				body: listItem._id,
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
			.then(fetchAllLists())
			.catch(error => {
				console.log('error:', error);
			})
			fetchAllLists();
			//closeOverlay ? closeOverlay() : null;
		} else if (listItem._type === 'tomato') {
		//delete tomato
		console.log('delete tomato (btn component)', 'id:', listItem._id, 'title:', listItem.title)
			await fetch("/api/tomatoes/tomato", {
				method: "DELETE",
				body: listItem._id,
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
			fetchAllLists();
			//closeOverlay ? closeOverlay() : null;
		}
		setDisplayWarning ? setDisplayWarning(false):null;
		setShowWarning(false);
		fetchAllLists();
		currentState.setCurrentItem(null);
		currentState.setOverlay(false);
	};

	useEffect(() => {
		showWarning ?
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10): null;
		return () => currentState.setOverlay(false);
	}, [showWarning]);
	
	useEffect(() => {
		showWarning ?
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10): null;
		return () => currentState.setOverlay(false);
	}, [showWarning]);

	return (
		<>
			<div onClick={() => setShowWarning(!showWarning)} 
				className={clsx(styles.deleteBtn, {
					[styles.smallOrange]: color === 'orange', 
					[styles.smallBlue]: color === 'blue', 
					[styles.large]: size === 'large',
					[styles.regular]: size === 'regular', 
				})} 
			>
				{text}
			</div>
			{showWarning && (
				<div className={styles.deleteWarning}>
					<h2 className={styles.removeHeader}>Vill du ta bort <span>{`"${listItem.title}"`}</span>?</h2>
					<div className={styles.btnContainer}>
						<input className={styles.close} type={"button"} onClick={() => setShowWarning(false)} value={'ångra'}  />
						<input className={styles.addBtn} type={"button"} onClick={() => handleDelete(listItem)} value={'ta bort'} />
					</div>
				</div>
			)}
		</>
	)
};

export default DeleteButton;


/* 


				{/* <div className={styles.deleteWarning}>
					<h2>Vill du ta bort {listItem.title}?</h2>
					<div className={styles.btnContainer}>
						<input className={clsx(styles.warningBtn,styles.delete)} type={"button"} onClick={() => handleDelete(listItem)} value={'ta bort'} />
						<input className={clsx(styles.warningBtn, styles.close)} type={"button"} onClick={() => setShowWarning(false)} value={'ångra'}  />
					</div>
				</div> *

import { useState, useEffect } from 'react';
import styles from './styles/deleteBtn.module.scss';
import {useTodoContext, useUpdateContext} from "../../context/TodoContext";
import clsx from 'clsx';

const DeleteButton = ({ color, listItem, size, text, setDisplayWarning, closeOverlay }) => {
	const [showWarning, setShowWarning] = useState(false);
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;

	const handleDelete = async (listItem) => {
		//delete todo
		if (listItem._type === 'todo') {
			await fetch("/api/todos/todo", {
				method: "DELETE",
				body: listItem._id,
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
			fetchAllLists();			 
			closeOverlay ? closeOverlay() : null;
		} else if (listItem._type === 'todoList') {
			listItem.todos.map(async(x) => {
				await fetch("/api/todos/todo", {
					method: "DELETE",
					body: x._id,
				})
				.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
				.catch(error => {
					console.log('error:', error);
				})
			});
			await fetch("/api/todos/todolist", {
				method: "DELETE",
				body: listItem._id,
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
			.then(fetchAllLists())
			.catch(error => {
				console.log('error:', error);
			})
			fetchAllLists();
			closeOverlay ? closeOverlay() : null;
		} else if (listItem._type === 'tomato') {
		//delete tomato
		console.log('delete tomato (btn component)', 'id:', listItem._id, 'title:', listItem.title)
			await fetch("/api/tomatoes/tomato", {
				method: "DELETE",
				body: listItem._id,
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
			fetchAllLists();
			closeOverlay ? closeOverlay() : null;
		}
		setDisplayWarning ? setDisplayWarning(false):null;
	};

	useEffect(() => {
		showWarning ?
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10) : null;
		
	}, [showWarning]);

	useEffect(() => {
		if (state.deleteNow) {
			handleDelete(listItem);
			state.setDeleteNow(false);
			state.setShowWarning(null);
		}
	}, [state.deleteNow]);

	return (
		<>
			{/* {showWarning && (
					<div className={styles.deleteWarning}>
						<h2>Vill du ta bort {listItem.title}?</h2>
						<div className={styles.btnContainer}>
							<input className={clsx(styles.close)} type={"button"} onClick={() => setShowWarning(false)} value={'ångra'}  />
							<input className={styles.addBtn} type={"button"} onClick={() => handleDelete(listItem)} value={'ta bort'} />
							
						</div>
					</div>
				)} *
				<div onClick={() => state.setShowWarning({title: listItem.title})} 
				className={clsx(styles.deleteBtn, {
					[styles.smallOrange]: color === 'orange', 
					[styles.smallBlue]: color === 'blue', 
					[styles.large]: size === 'large',
					[styles.regular]: size === 'regular', 
				})} 
			>
				{text}
			</div>
		</>
	)
};

export default DeleteButton;




 */