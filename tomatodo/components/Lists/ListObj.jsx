import DeleteButton from './DeleteButton';
import clsx from 'clsx';
import CheckBox from './CheckBox';
import styles from './styles/todoList.module.scss';
import {useUpdateContext} from "../../context/TodoContext";
import NumberFormat from '../NumberFormat';
import PlayTimerBtn from '../PlayTimerBtn';
import React, {useState} from 'react';

const ListObj = ({ listItem, width }) => {
	const [styleChecked, setStyleChecked] = useState(listItem.checked === true);
	const currentState = useUpdateContext();

	return (
		<>
			{/* {
				listItem && listItem.saved && (
					<div>
						<h2>Vill du spara eller ta bort listan? </h2>
						<button onClick={() => console.log('save: PUT saved=true OCH nollställ alla todos... ', allChecked.listFinished.title)}>
							Spara
						</button>
						<button onClick={() => console.log(allChecked.listFinished.title)}>Ta bort</button>
					</div>
				)
			} */}
			{
				listItem ? (
					width < 450 ? 
						<article 
							key={listItem._id} 
							className={clsx(styles.todoArticle, {
								[styles.checkedItem]: styleChecked === true
							})}
						>
							<div className={styles.todoTextSection}>
								<h3 className={styles.todoName}>{listItem.title}</h3>
								<p className={styles.todoDescription}>{listItem.description}</p>
							</div>
							<div className={styles.btnSection}>
								<PlayTimerBtn listItem={listItem} color={styleChecked? 'green' : 'grey'} styleChecked={styleChecked} />
								{
									listItem && listItem.time > 0 && (
										<NumberFormat 
											milliSeconds={listItem.time*1000} 
											styling={{fontSize: '0.75rem', position: 'absolute', top: '45px'}} 
										/>
									)
								}
								<CheckBox listItem={listItem} setStyleChecked={setStyleChecked}/>
							</div>
							<DeleteButton color={'blue'} listItem={listItem}/>
						</article> 
					:
						<article 
							key={listItem._id} 
							className={clsx(styles.todoArticle, {
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
								<PlayTimerBtn listItem={listItem} color={styleChecked? 'green' : 'grey'} styleChecked={styleChecked} />
								{
									listItem && listItem.time > 0 && (
										<NumberFormat 
											milliSeconds={listItem.time *1000} 
											styling={{fontSize: '0.75rem', position: 'absolute', bottom: '20px', right: '50px'}} 
										/>
									)
								}
							</div>
							<DeleteButton color={'blue'} listItem={listItem} />
						</article>
				) : null
			}
		</>
	);
};

export default ListObj;