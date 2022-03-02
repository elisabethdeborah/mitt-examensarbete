import DeleteButton from './DeleteButton';
import Link from 'next/link';
import clsx from 'clsx';
import CheckBox from './CheckBox';

import styles from '../styles/todoList.module.scss';

const ListObj = ({listItem, width}) => {
	let time = Number(listItem.time)				
	let hours = Math.floor(time/60/60);
	hours < 10 ? hours = `0${hours}` : hours;
	let minutes = (Math.floor(time/60) % 60);
	minutes < 10 ? minutes = `0${minutes}` : minutes;
	let seconds = time%60;
	seconds < 10 ? seconds = `0${seconds}` : seconds;
	let timeForm = `${hours}:${minutes}:${seconds}`;

	return (
		listItem ? (
			width < 500 ? 
				<article key={listItem._key} className={clsx(styles.todoArticle, {[styles.checkedItem]: listItem.checked === true})}>
					<div className={styles.todoTextSection}>
						<h3 className={styles.todoName}>{listItem.title}</h3>
						<p className={styles.todoDescription}>{listItem.description}</p>
					</div>
					<div className={styles.btnSection}>
						<div className={styles.todoTimeSection}>
						{
							listItem.time ? (
								<>
									<Link href="/timer" passHref>
										<article className={styles.playBtn} />
									</Link>
									<p className={styles.todoTime}>{timeForm}</p>
								</>
							):
							<article className={styles.playBtnPlaceholder} /> 
						}
						</div>
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
					{
						listItem.time ? (
							<>
								<Link href="/timer" passHref>
									<article className={styles.playBtn} />
								</Link>
								<p className={styles.todoTime}>{timeForm}</p>
							</>
							) 
						: <article className={clsx(styles.playBtn, styles.disabled)} />
					}
					</div>
					<DeleteButton color={'blue'} listItem={listItem} />
				</article>
		) : null
	)
}

export default ListObj;