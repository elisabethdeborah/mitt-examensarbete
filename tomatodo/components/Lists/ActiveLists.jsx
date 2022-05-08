
import React, { useEffect } from 'react';
import FormArch from "../Forms/FormArchive";
import AddTodo from '../../svgAssets/addBtn.svg';
import styles from './styles/listContainer.module.scss';
import {useUpdateContext, useTodoContext} from "../../context/TodoContext";
import SmallListObj from './SmallListObj';
import clsx from 'clsx';

const ActiveLists = ({ tomato, previewLists, setAddListFormIsVisible }) => {
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	let lista = state.initialFetch ? state.initialFetch.activeLists : null;


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
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10);
		return () => setAddListFormIsVisible(false);
	}, []);

	return (
		currentState.formIsVisible ? 
		(
			<FormArch />
		) : (			
			<div className={clsx(styles.activeLists, styles.showContent, styles.tomatoPage)}>
				<section className={styles.activeListsTop}>
					<h4 style={{textAlign: 'center'}}>Pågående listor</h4>
				</section>
				<section className={clsx(styles.contentBox, {[styles.previewLists]: previewLists===true})}>
					{lista && lista.length > 0 ? 
					<>
						{lista.map((list, index) => {
							return (
								<div onClick={() => handleClickOpen(list, tomato)} key={list._id}>
									<SmallListObj  contentIsVisible={true} item={list} listObjIndex={index} page={'archive'}/>
								</div>
							)
						})}
						<aside className={styles.optionContainer}>
							<button className={styles.addTodoList} onClick={() => currentState.setFormIsVisible(true)} >
								<h2>Skapa ny lista</h2>
								<AddTodo className={styles.addTdodoSvg} />
							</button>
						</aside>
					</>
					:<>
						<h3 className={styles.tomtHeader}>Tomt!</h3>
						<aside className={styles.optionContainer}>
							<button className={styles.addTodoList} onClick={() => currentState.setFormIsVisible(true)} >
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
