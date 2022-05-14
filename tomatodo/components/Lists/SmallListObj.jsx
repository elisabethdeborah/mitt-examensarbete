import clsx from 'clsx';
import NumberFormat from '../NumberFormat';
import PlayTimerBtn from '../PlayTimerBtn';
import { useUpdateContext } from "../../context/TodoContext";
import { useRouter } from 'next/router';
import styles from './styles/listObj.module.scss';

const SmallListObj = ({ item, listObjIndex, contentIsVisible }) => {
	const currentState = useUpdateContext();
	const router = useRouter();

	const handleClick = (x) => {
		if ( router.pathname !== '/mina-tomater') {
			currentState.setCurrentItem({...x, listObjIndex: listObjIndex});
			x.saved ? currentState.setPopupIsOpen(true):null;
			if (item._type === 'todoList' && !item.saved && router.pathname !== '/mina-todos') {
				router.push('/mina-todos');
			} else if (item._type === 'tomato' && !currentState.countdownItem) {
				router.push('/mina-tomater');
			}
		}
	}; 

	return (
		<div style={{position: 'relative', height: 'fit-content'}}>
		<article 
			id={`${item._id}`}
			key={item._rev} 
			onClick={() => handleClick(item)} 
			className={clsx(styles.hiddenLists, {
				[styles.isVisible] : contentIsVisible === true,
				[styles.tomatoObj] : item._type === 'tomato',
				[styles.todoListObj] : item._type === 'todoList',
				[styles.previewList] : router.pathname === '/mina-tomater'
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
					<PlayTimerBtn listItem={''} />
				</>
			)
			}
		</article>
		{router.pathname === '/start' && item._type === 'tomato' && item.time > 0 && <PlayTimerBtn listItem={item} style={{position: 'absolute'}}/>}
		</div>
	);
};

export default SmallListObj;
		