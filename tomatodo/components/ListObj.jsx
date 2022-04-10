import DeleteButton from './DeleteButton';
import clsx from 'clsx';
import CheckBox from './CheckBox';
import styles from '../styles/todoList.module.scss';
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import NumberFormat from './NumberFormat';
import { groq } from 'next-sanity';
import PlayTimerBtn from './PlayTimerBtn';
import React, {useEffect, useState} from 'react';
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";

const ListObj = ({listItem, width}) => {
	const [save, setSave] = useState(false);
	const [listId, setListId] = useState(null);
	const [styleChecked, setStyleChecked] = useState(listItem.checked === true);
	const currentState = useUpdateContext();
	/* const checkedAllChecked = async() => {
		let allChecked;
		allChecked = await client.fetch( 
			groq`{
				"listFinished": *[_id == "${currentState.currentItem._id}"] | order(_createdAt desc) { 
					_id,
					title,
					saved,
					"nrOfTodos": count(* [_type == "todo" && todoList._ref == ^._id]{checked} +[...list]{checked}),
					'numberOfChecked': count([...list[checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][checked]),
					'numberOfNotChecked': count([...list[!checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][!checked]),
				}
			}`
		);
	
			let list = allChecked.listFinished[0];
			console.log('id', allChecked.listFinished[0]._id, 'total: ',allChecked.listFinished[0].nrOfTodos, 'not checked', allChecked.listFinished[0].numberOfNotChecked );
			setListId({'id':allChecked.listFinished[0]._id});
			let finished = list.nrOfTodos > 0 && list.numberOfNotChecked === 0;
			finished ? setSave(true):null;
			console.log('id', listId, 'allChecked??? query', 'saved', list.saved, 'finished', finished);
	}; */

	return (
		<>
			{
				save && (
					<div>
						<h2>Vill du spara eller ta bort listan? </h2>
						<button onClick={() => console.log('save: PUT saved=true OCH nollställ alla todos... ', allChecked.listFinished.title)}>
							Spara
						</button>
						<button onClick={() => console.log(allChecked.listFinished.title)}>Ta bort</button>
					</div>
				)
			}
			{
				listItem ? (
					width < 500 ? 
						<article 
							/* onClick={() =>checkedAllChecked()}  */
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
							//onClick={() =>checkedAllChecked()} 
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
											styling={{fontSize: '0.75rem', position: 'absolute', bottom: '20px'}} 
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