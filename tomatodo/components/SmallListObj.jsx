
import styles from '../styles/smallListObj.module.scss';
import clsx from 'clsx';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';
import {useUpdateContext, useTodoContext} from "../context/TodoContext";

const SmallListObj = (listItem, contentIsVisible) => {
	const currentState = useUpdateContext();
	const handleClick = () => console.log('currentState:', currentState)
	return (
		<article onClick={() => handleClick()} className={clsx(
			styles.hiddenLists, 
			{[styles.isVisible] : contentIsVisible === true})}>
			<div onClick={() => currentState.setCurrentItem(listItem)}>
			{listItem._type === "tomato" && <article className={styles.smallTomato} />}
			<section className={styles.textGroup}>
				<h3>{listItem.title}</h3>
				{listItem._type === "tomato"? (
				<div className={styles.tomatoTime}>
					<NumberFormat milliSeconds={tomato.time*1000} text={'tid: '} textSize={'0.75rem'} />
				</div>)
				: listItem && listItem._createdAt && (<p>tillagd: {listItem._createdAt.slice(0, 10)}</p>)}
			</section>
			</div>
			<PlayTimerBtn listItem={listItem} />
		</article>
	)
}

export default SmallListObj;
		