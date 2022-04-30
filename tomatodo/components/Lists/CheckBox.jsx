import styles from './styles/todoList.module.scss';
import { useTodoContext} from "../../context/TodoContext";

const CheckBox = ({listItem, setStyleChecked}) => {
	const state = useTodoContext();
	const fetchAllLists = state.fetchTodos;

	const handleCheckTodo = async() => {
		setStyleChecked(!listItem.checked)
		await fetch("/api/todos/todo", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: listItem._id,
				checked: !listItem.checked,
			}),
		})
		.then(console.log('posted'))
		.catch(error => {
			console.log('error:', error);
		})
		fetchAllLists();
	};
	
	return (
		<aside className={styles.checkBox} onClick={() => handleCheckTodo()} />
	);
};

export default CheckBox;