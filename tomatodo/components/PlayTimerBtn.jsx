import styles from '../styles/playBtn.module.scss';
import clsx from 'clsx';
import { useUpdateContext } from "../context/TodoContext";
import { useRouter } from 'next/router';

const PlayBtn = ({ listItem, size, content, styleChecked }) => {
	const currentState = useUpdateContext();
	const router = useRouter();
	
	const click = () => {
		currentState.setCountdownItem(listItem);
		router.push('/timer-countdown');
	};

	return (
		<aside className={styles.todoTimeSection} onClick={() => click()} >
			{
				listItem.time || currentState.countdownItem ? (
					<button 
						className={clsx(styles.playBtn, {
							[styles.orange]: listItem._type ==="tomato",
							[styles.green]: listItem._type !=="tomato" && styleChecked,
							[styles.grey]: listItem._type !=="tomato" && !styleChecked,
							[styles.orangeLg]: size === 'large',
							[styles.regularBtn]: content && content.length>0, 
						})} 
						value={`${content}`}
					/>
				) : (
					<article className={styles.playBtnPlaceholder} /> 
				)
			}
		</aside>
	);
};

export default PlayBtn;
