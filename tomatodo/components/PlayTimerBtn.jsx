import styles from '../styles/playBtn.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { useUpdateContext } from "../context/TodoContext";

const PlayBtn = ({listItem, size, content, styleChecked}) => {
	const currentState = useUpdateContext();

	return (
		<aside className={styles.todoTimeSection} onClick={() => currentState.setCountdownItem(listItem)} >
			{
				listItem.time || currentState.countdownItem ? (
					<>
						<Link
							href={'/timer-countdown'}
							passHref
						>
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
						</Link>
					</>
				) : (
					<article className={styles.playBtnPlaceholder} /> 
				)
			}
		</aside>
	);
};

export default PlayBtn;
