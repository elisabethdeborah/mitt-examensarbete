import styles from '../styles/limboLists.module.scss';
import DeleteButton from './DeleteButton';
import { useUpdateContext, useTodoContext} from "../context/TodoContext";
import {useRouter} from 'next/router';

const PopupLists = ({previewTodosList, setPopupIsOpen, setOverlay}) => {
	const router = useRouter();
	const currentState = useUpdateContext();
	const state = useTodoContext()
	const fetchAllLists = state.fetchTodos;
	
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
		setPopupIsOpen(false);
		fetchAllLists();
		setOverlay ? setOverlay(false) : null;
		router.push('/mina-todos');
	};

	const handleClose = () => {
		setPopupIsOpen(false);
		//currentState.setCurrentItem(null);
	};

	return (
		currentState.currentItem && currentState.currentItem._id && currentState.currentItem.saved && (
			<article className={styles.popupContainer}>
				<section className={styles.textGroup}>
				<h2>Vill du starta om <span className={styles.todoTitle}>{`"${currentState.currentItem.title}"`}</span>?</h2>
					<div className={styles.btnContainer}>
						<input type={"button"} className={styles.closeForm} value="Stäng" onClick={() => handleClose()} />
						<input type={"button"} className={styles.addBtn} value="Starta" onClick={() => handleClick(currentState.currentItem)} />
					</div>
				</section>
			</article>
		)
	)
}

export default PopupLists;