import DeleteButton from './DeleteButton';
import clsx from 'clsx';
import CheckBox from './CheckBox';
import styles from './styles/todoList.module.scss';
import {useUpdateContext} from "../../context/TodoContext";
import NumberFormat from '../NumberFormat';
import PlayTimerBtn from '../PlayTimerBtn';
import React, {useState, useRef} from 'react';
import Resize from '../Resize';

const ListObj = ({ listItem }) => {
	const [styleChecked, setStyleChecked] = useState(listItem.checked === true);
	const currentState = useUpdateContext();
	const sectionRef = useRef();
	const [width, setWidth] = useState(); 

	return (
		<div ref={sectionRef} className={styles.todoListObjContainer}>
			<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
			{
				listItem ? (
					width < 400 ? 
						<article 
							key={listItem._id} 
							className={clsx(styles.todoArticle, styles.todoSmall, {
								[styles.checkedItem]: styleChecked === true
							})}
						>
							<div className={styles.todoTextSection}>
								<h3 className={styles.todoName}>{listItem.title}</h3>
								<p className={styles.todoDescription}>{listItem.description}</p>
							</div>
							<div className={styles.btnSection}>
								<PlayTimerBtn listItem={listItem} color={styleChecked ? 'green' : 'grey'} styleChecked={styleChecked} />
								<NumberFormat 
									milliSeconds={listItem.time*1000} 
									styling={listItem && listItem.time > 0 ? {fontSize: '0.75rem', position: 'absolute', top: '45px'} : {fontSize: '0.75rem', position: 'absolute', top: '45px', opacity: '0'}} 
								/>
								<CheckBox listItem={listItem} setStyleChecked={setStyleChecked}/>
							</div>
							<DeleteButton color={'blue'} listItem={listItem}/>
						</article> 
					:
						<article 
							key={listItem._id} 
							className={clsx(styles.todoArticle, styles.todoLarge, {
								[styles.checkedItem]: styleChecked === true
								})}
						>
							<article className={styles.todoBorder} />
							<CheckBox listItem={listItem} setStyleChecked={setStyleChecked} />
							<div className={styles.todoTextSection}>
								<h3 className={styles.todoName}>{listItem.title}</h3>
								<p className={styles.todoDescription}>{listItem.description}</p>
							</div>
							<div className={styles.todoTimeSection}>
								<PlayTimerBtn listItem={listItem} color={styleChecked && listItem.time > 0 ? 'green' : 'grey'} styleChecked={styleChecked} />
								<NumberFormat 
									milliSeconds={listItem.time *1000} 
									styling={listItem && listItem.time > 0 ? {fontSize: '0.75rem', position: 'absolute', top: '50px'} : {fontSize: '0.75rem', position: 'absolute', top: '50px', opacity: '0'}} 
								/>
							</div>
							<DeleteButton color={'blue'} listItem={listItem} />
						</article>
				) : null
			}
		</div>
	);
};

export default ListObj;