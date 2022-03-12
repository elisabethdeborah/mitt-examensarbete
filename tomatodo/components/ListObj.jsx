import DeleteButton from './DeleteButton';
import Link from 'next/link';
import clsx from 'clsx';
import CheckBox from './CheckBox';
import styles from '../styles/todoList.module.scss';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';
import React, {useState} from 'react';
import { groq } from "next-sanity";
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";

import {useUpdateContext, useTodoContext} from "../context/TodoContext";

const ListObj = ({listItem, width}) => {
	const [save, setSave] = useState(false);
	const [listId, setListId] = useState(null);
	const state = useTodoContext()
	const fetchAllLists = state.fetchTodos;

	const checkedAllChecked = async() =>{
		let allChecked;
		allChecked = await client.fetch(
		  `{
			"listFinished": *[_id == "c5781972-fbf7-4f5e-8b5b-76558137636a"] | order(_createdAt desc) { 
				_id,
			  title,
			  saved,
			  "nrOfTodos": count(* [_type == "todo" && todoList._ref == ^._id]{checked} +[...list]{checked}),
			  'numberOfChecked': count([...list[checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][checked]),
			  'numberOfNotChecked': count([...list[!checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][!checked]),
			}
			}`);

			
			let list = allChecked.listFinished[0];
			
			console.log('id', allChecked.listFinished[0]._id, 'total: ',allChecked.listFinished[0].nrOfTodos, 'not checked', allChecked.listFinished[0].numberOfNotChecked )
			setListId({'id':allChecked.listFinished[0]._id})
			let finished = list.nrOfTodos > 0 && list.numberOfNotChecked === 0;
			finished ? setSave(true):null;
			console.log('id', listId, 'allChecked??? query', 'saved', list.saved, 'finished', finished)
	}


	;




	return (
<>
		{
			save && (
				<div>
				<h2>Vill du spara eller ta bort listan? </h2>
				<button onClick={() => console.log('save: PUT saved=true OCH nollställ alla todos... ', allChecked.listFinished.title)}>Spara</button>
				<button onClick={() => console.log(allChecked.listFinished.title)}>Ta bort</button>
				</div>
			)
		}
		{listItem ? (
			width < 500 ? 
				<article onClick={() =>checkedAllChecked()} key={listItem._id} className={clsx(styles.todoArticle, {[styles.checkedItem]: listItem.checked === true})}>
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
				<article onClick={() =>checkedAllChecked()} key={listItem._id} className={clsx(styles.todoArticle, {[styles.checkedItem]: listItem.checked === true})}>
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
		) : null}
		</>
	)
}

export default ListObj;