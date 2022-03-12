import styles from '../styles/playBtn.module.scss';
import NumberFormat from './NumberFormat';
import Link from 'next/link';
import clsx from 'clsx';
import {useUpdateContext, useTodoContext} from "../context/TodoContext";

const PlayBtn = ({listItem, size}) => {
	
	const currentState = useUpdateContext();

	return (
		<aside className={styles.todoTimeSection} onClick={() => currentState.setCurrentItem(listItem)} >
		{
			listItem.time ? (
				<>
					<Link
						href={'/timer'}
						passHref
					>
					<article className={clsx(styles.playBtn, {
						[styles.orange]: listItem._type ==="tomato",
						[styles.green]: listItem._type !=="tomato" && listItem.checked,
						[styles.grey]: listItem._type !=="tomato" && !listItem.checked,
						[styles.orangeLg]: size === 'large',
						[styles.regularBtn]: !listItem._type,
						})} />
					</Link>
				</>
			):
			<article className={styles.playBtnPlaceholder} /> 
		}
		</aside>
	)
}

export default PlayBtn;
