import styles from '../styles/playBtn.module.scss';
import clsx from 'clsx';
import { useUpdateContext } from "../context/TodoContext";
import { useRouter } from 'next/router';

const PlayBtn = ({ listItem, size, content, styleChecked }) => {
	const currentState = useUpdateContext();
	const router = useRouter();
	
	const click = () => {
		if (listItem.time || currentState.countdownItem) {
		currentState.setCountdownItem(listItem);
		router.push('/timer-countdown');}
	};

	return (
		<aside className={styles.todoTimeSection} onClick={() => click()} >
			<button 
				className={clsx(styles.playBtn, {
					[styles.orange]: listItem._type ==="tomato",
					[styles.green]: listItem._type !=="tomato" && styleChecked,
					[styles.grey]: listItem._type !=="tomato" && !styleChecked && !currentState.countdownItem && router.pathname !== '/',
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
