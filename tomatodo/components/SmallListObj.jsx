
//import styles from '../styles/activeLists.module.scss';
import clsx from 'clsx';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';
import { useUpdateContext } from "../context/TodoContext";
import Link from 'next/link';
import styles from '../styles/listContainer.module.scss';

const SmallListObj = ({item, contentIsVisible, index, open, setPopupIsOpen}) => {
	const currentState = useUpdateContext();
	
	const linkHref = item._type === 'todoList' && item.numberOfNotChecked > 0 && item.nrOfTodos > 0 ? '/mina-todos' : `#${item._id}`;

	const handleClick = (x) => {
		currentState.setCurrentItem(x);
		x.saved ? setPopupIsOpen(true):null;
	}; 

	return (
		<Link key={item._rev}  href={linkHref} passHref> 
			<article 
				id={`${item._id}`}
				key={item._rev} 
				onClick={() => handleClick(item)} 
				className={clsx(styles.hiddenLists, {
					[styles.isVisible] : contentIsVisible === true,
					[styles.tomatoObj] : item._type === 'tomato',
					[styles.todoListObj] : item._type === 'todoList',
				})}
			>
				{item._type !== 'tomato' ? (
					<>
				<section className={styles.textGroup}>
					<h3>{item.title}</h3>
					{
					item && item._createdAt && (
						<p>
							tillagd: {item._createdAt.slice(0, 10)}
						</p>
					)
					}
				</section>
				<section className={styles.iconGroup}>
				{
				item.saved ? (
					<article className={styles.nrOfTodosIcon}>
						<p className={styles.nrTodos}>
							{item.nrOfTodos? item.nrOfTodos: 0}
						</p>
					</article>
					): (
					<>
						<article className={styles.nrOfTodosIcon}>
							<p className={styles.nrTodos}>
								{item.nrOfTodos? item.nrOfTodos: 0}
							</p>
						</article>
						<article className={styles.nrOfNotCheckedIcon}>
							<p className={styles.nrNotChecked}>
								{item.numberOfNotChecked? item.numberOfNotChecked: 0}
							</p>
						</article>
						<article className={styles.nrOfCheckedIcon}>
							<p className={styles.nrChecked}>{item.numberOfChecked? item.numberOfChecked: 0}</p>
						</article>
					</>
					)
				}
				</section>
				</>
				) : (
					<>
						<>
							<article className={styles.smallTomato} />
							<section className={styles.textGroup}>
								<h3>{item.title}</h3>
								<div className={styles.tomatoTime}>
									<NumberFormat 
										milliSeconds={Number(item.time*1000)} 
										styling={{fontSize: '0.7rem', position: 'relative', bottom: '0px'}}
										text={'tid: '} 
									/>
								</div>
							</section>
						</>
							<PlayTimerBtn listItem={item} />
					</>
				)
				}
			</article>
		</Link>
	);
};

export default SmallListObj;
		