import { useState, useEffect } from 'react';
import styles from './styles/deleteBtn.module.scss';
import { useUpdateContext, useTodoContext} from "../../context/TodoContext";
import {useRouter} from 'next/router';
import clsx from 'clsx';

const PopupLists = ({ previewTodosList,closeAll }) => {
	const router = useRouter();
	const currentState = useUpdateContext();
	const state = useTodoContext()
	const fetchAllLists = state.fetchTodos;
	//const [overlay, setOverlay] = useState(false);
	
	const handleClick = async(list) => {
		console.log('SAVE!!!', list._id)
		list.todos.map(async(x) => {
			await fetch("/api/todos/todo", {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: x._id,
					checked: false,
				}),
			})
			.then(console.log('nollställd todo'))
			.catch(error => {
				console.log('error:', error);
			})
		})
		await fetch("/api/todos/todolist", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: list._id,
				saved: false,
			}),
		})
		.then(console.log('omstartad lista'))
		.catch(error => {
			console.log('error:', error);
		})
		
		currentState.setCurrentItem(null);
		currentState.setPopupIsOpen(false);
		fetchAllLists();
		closeAll ? closeAll() : null;
		currentState.setOverlay(false);
		router.push('/mina-todos');
	};

	const handleClose = () => {
		currentState.setOverlay(false);
		currentState.setPopupIsOpen(false);
	};

	useEffect(() => {
		currentState.setOverlay(true);
		return () => {
			currentState.setPopupIsOpen(false);
			currentState.setOverlay(false);
		};
	}, []);

	/* useEffect(() => {
		if (currentState.overlay && !popupIsOpen) {
		//setPopupIsOpen(false);
		}

		if (!currentState.overlay && popupIsOpen) {
		//	setPopupIsOpen(false);
		}
	}, [currentState.overlay]); */

	return (
		currentState.currentItem && currentState.currentItem._id && currentState.currentItem.saved && (
			<div className={styles.deleteWarning}>
				<section className={styles.textGroup}>
					<h2 className={styles.removeHeader}>
						Vill du starta om 
							<span className={styles.todoTitle}>{`"${currentState.currentItem.title}"`}</span>
						?
					</h2>
					<div className={styles.btnContainer}>
						<input type={"button"} className={styles.closeForm} value="Stäng" onClick={() => closeAll()} />
						<input type={"button"} className={styles.addBtn} value="Starta" onClick={() => handleClick(currentState.currentItem)} />
					</div>
				</section>
			</div>
		)
	)
}


				

export default PopupLists;