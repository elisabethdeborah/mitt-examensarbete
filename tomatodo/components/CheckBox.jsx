import styles from '../styles/todoList.module.scss';

const CheckBox = ({listItem}) => {
	console.log(listItem, listItem.checked, listItem._id)
	const handleCheckTodo = async() => {
		await fetch("/api/todos/todo", {
			method: "PUT",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  id: listItem._id,
			  checked: !listItem.checked,
			}),
		});
	}
	
	return (
		<aside className={styles.checkBox} onClick={() => handleCheckTodo()} />
	)
}

export default CheckBox;