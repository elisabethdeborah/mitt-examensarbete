import styles from '../styles/todoList.module.scss';
import DeleteBtnBlue from '../svgAssets/x-btn-small.svg';
import DeleteBtnOrange from '../svgAssets/x-btn-small-orange.svg';
import { useState } from 'react';
const DeleteButton = ({color, listItem}) => {
	const [showWarning, setShowWarning] = useState(false);
	const handleDelete = async (listItem) => {
		console.log('deleteklick:',listItem.title, listItem._id, listItem._type, 'item', listItem)

		if (listItem._type === 'todo') {
			await fetch("/api/todos/todo", {
				method: "DELETE",
				body: listItem._id,
			  });
		} else if (listItem._type === 'todoList') {
			await fetch("/api/todos/todolist", {
				method: "DELETE",
				body: listItem._id,
			  });
		} else if (listItem._type === 'tomato') {

		}
		setShowWarning(false);
	}

	return (
		<>
		{
			color === 'blue'?
			<DeleteBtnBlue className={styles.deleteBtn} onClick={() => setShowWarning(true)} />
			:<DeleteBtnOrange className={styles.deleteBtn} onClick={() => setShowWarning(true)} />
		}
		{ showWarning &&(
			<div className={styles.deleteWarning}>
			<h2>Vill du ta bort {listItem.title}?</h2>
			<input type={"button"} onClick={() => handleDelete(listItem)} value={'ta bort'} />
			<input type={"button"} onClick={() => setShowWarning(false)} value={'ångra'}  />
		</div>)}
		</>
		
	)
}

export default DeleteButton;