import styles from '../styles/playBtn.module.scss';
import clsx from 'clsx';
import { useUpdateContext, useTodoContext } from "../context/TodoContext";
import { useRouter } from 'next/router';

const PlayBtn = ({ listItem, size, content, styleChecked }) => {
	const currentState = useUpdateContext();
	const todoState = useTodoContext();
	const router = useRouter();
	const newNumber = listItem.numberOfClicks + 1;
	

	const handleUpdateClicks = async() => {
		try {
			await fetch("/api/tomatoes/tomato", {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: listItem._id,
					numberOfClicks: newNumber,
				}),
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: 'lista', title: list.title, action: list.saved ? 'startad' : 'sparad', res: response.ok}))
		} catch (error) {
			console.log('error:', error);
		}
		todoState.fetchTodos();
	};

	const click = () => {
		if (listItem.time || currentState.countdownItem) {
			currentState.setCountdownItem(listItem);
			listItem._type ==="tomato" ? handleUpdateClicks() : null;
			router.push('/timer-countdown');
		};
	};

	return (
		<aside className={styles.todoTimeSection} onClick={() => click()} >
			<button 
				className={clsx(styles.playBtn, {
					[styles.orange]: listItem._type ==="tomato",
					[styles.green]: listItem._type !=="tomato" && styleChecked,
					[styles.grey]: listItem._type !=="tomato" && !styleChecked && !currentState.countdownItem && router.pathname !== '/start',
					[styles.orangeLg]: size === 'large',
					[styles.regularBtn]: content && content.length>0, 
					[styles.todoList]: router.pathname === '/mina-todos',
					[styles.disabledTime]: !listItem.time,
				})} 
				value={`${content}`}
			/>
		</aside>
	);
};

export default PlayBtn;
