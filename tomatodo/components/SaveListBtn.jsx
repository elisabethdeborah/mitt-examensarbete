import SaveList from '../svgAssets/save-list.svg';
import styles from '../styles/todoList.module.scss';
import { useState } from 'react';

const SaveListBtn = ({list}) => {
	const [showPopup, setShowPopup] = useState(false);

	const saveList = async(list) => {
		await fetch("/api/todos/todolist", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: list._id,
				saved: true,
			}),
		});
	};

	const resetList = async(list) => {
		await list.combinedLists.map(async(todo) => {
			await fetch("/api/todos/todo", {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: todo._id,
					checked: false,
				}),
			});
		});
	};

	const handleSave = async (listItem) => {
		console.log('saveklick:',listItem.title, listItem._id, listItem._type, 'item', listItem.numberOfNotChecked)
		if (listItem._type === 'todoList' && listItem.numberOfNotChecked === 0) {
			saveList(listItem);
		} else if (listItem._type === 'todoList' && listItem.numberOfNotChecked > 0) {
			await resetList(listItem);
			await saveList(listItem);
		};
		setShowPopup(false);
	};

	return (
		<article>
			{
				showPopup && (
					list.numberOfNotChecked > 0 ? 
						<section className={styles.popup}>
							<h2>Vill du spara listan och nollställa checkade todos?</h2>
							<input type={"button"} value={"spara"} onClick={() => handleSave(list)}/>
						</section>
					:
						<section className={styles.popup}>
							<h2>Vill du spara listan?</h2>
							<input type={"button"} value={"spara"} onClick={() => handleSave(list)}/>
						</section>
				)
			}
			<SaveList className={styles.saveIcon} onClick={() => setShowPopup(!showPopup)} />
		</article>
	);
};

export default SaveListBtn;