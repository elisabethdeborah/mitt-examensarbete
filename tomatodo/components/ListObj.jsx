import DeleteButton from './DeleteButton';
import Link from 'next/link';
import clsx from 'clsx';
import CheckBox from './CheckBox';
import styles from '../styles/todoList.module.scss';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';

const ListObj = ({listItem, width}) => {
	return (
		listItem ? (
			width < 500 ? 
				<article key={listItem._key} className={clsx(styles.todoArticle, {[styles.checkedItem]: listItem.checked === true})}>
					<div className={styles.todoTextSection}>
						<h3 className={styles.todoName}>{listItem.title}</h3>
						<p className={styles.todoDescription}>{listItem.description}</p>
					</div>
					<div className={styles.btnSection}>
						<PlayTimerBtn listItem={listItem} color={listItem.checked? 'green' : 'grey'} />
						{listItem && listItem.time > 0 &&<NumberFormat milliSeconds={listItem.time*1000} textSize={'0.75rem'} />}
						<CheckBox listItem={listItem} />
					</div>
					
					<DeleteButton color={'blue'} listItem={listItem}/>
				</article> 
			:
				<article key={listItem._key} className={clsx(styles.todoArticle, {[styles.checkedItem]: listItem.checked === true})}>
					<article className={styles.todoBorder} />
					<CheckBox listItem={listItem} />
					<div className={styles.todoTextSection}>
						<h3 className={styles.todoName}>{listItem.title}</h3>
						<p className={styles.todoDescription}>{listItem.description}</p>
					</div>
					<div className={styles.todoTimeSection}>
					<PlayTimerBtn listItem={listItem} color={listItem.checked? 'green' : 'grey'} />
					{listItem && listItem.time > 0 &&<NumberFormat milliSeconds={listItem.time *1000} textSize={'0.75rem'} />}
					</div>
					<DeleteButton color={'blue'} listItem={listItem} />
				</article>
		) : null
	)
}

export default ListObj;