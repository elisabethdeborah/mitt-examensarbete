
import React, { useEffect, useState } from 'react';
import Form from "../components/Form";
import AddTodo from '../svgAssets/addBtn.svg';
import styles from '../styles/activeLists.module.scss';
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import SmallListObj from './SmallListObj';
import clsx from 'clsx';

const ActiveLists = ({ tomato, previewLists}) => {

	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const state = useTodoContext();
	const fetchAllLists = state.fetchTodos;
	let lista;

	if (state.initialFetch) {
		lista = state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0);
	};

	const postTomatoTodo = async(tomatoTodo, toList) => {
		await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				title: tomatoTodo.title,
				description: tomatoTodo.description,
				time: tomatoTodo.time,
				parentRef: toList._id,
			}),
		})
		.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: 'todo', title: tomatoTodo.title, action: 'skapad', res: response.ok}))
		.catch(error => {
			console.log('error:', error);
		});
		fetchAllLists();
	};

	const handleClickOpen = (list, tomato) => {
		postTomatoTodo(tomato, list);
	};

	useEffect(() => {
		console.log(addListFormIsVisible)
		return () => setAddListFormIsVisible(false);
	}, [])

	return (
		addListFormIsVisible ? 
		(
			<Form 
				setFormIsVisible={setAddListFormIsVisible} 
				objectType={'todoList'} 
				method={'POST'} 
				typeName={'lista'} 
				page={'archive'}
			/>
		) : (			
			<div className={clsx(styles.activeLists, styles.showContent, styles.tomatoPage)}>
				<section className={styles.activeListsTop}>
					<h4>Mina påbörjade listor</h4>
				</section>
				<section className={clsx(styles.contentBox, {[styles.previewLists]: previewLists===true})}>
					{lista && lista.length > 0 ? 
					<>
						{lista.map((list, index) => {
							return (
								<div onClick={() => handleClickOpen(list, tomato)} key={list._id}>
									<SmallListObj setPopupIsOpen={null} contentIsVisible={true} item={list} listObjIndex={index} page={'archive'}/>
								</div>
							)
						})}
						<aside className={styles.optionContainer}>
							<button className={styles.addTodoList} onClick={() => setAddListFormIsVisible(true)} >
								<h2>Skapa ny lista</h2>
								<AddTodo className={styles.addTdodoSvg} />
							</button>
						</aside>
					</>
					:<>
						<h3>Tomt!</h3>
						<aside className={styles.optionContainer}>
							<button className={styles.addTodoList} onClick={() => setAddListFormIsVisible(true)} >
								<h2>Skapa ny lista</h2>
								<AddTodo className={styles.addTdodoSvg} />
							</button>
						</aside>
					</>
					}
				</section>
			</div>
		)
	)
};

export default ActiveLists;
