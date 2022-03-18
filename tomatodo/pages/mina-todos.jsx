import React, { useEffect, useState } from "react";

import ActiveLists from "../components/ActiveLists";
import SavedLists from "../components/SavedLists";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import TodoList from "../components/TodoList";
import styles from "../styles/minaTodos.module.scss";
import clsx from "clsx";


import {useUpdateContext, useTodoContext} from "../context/TodoContext"

import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";

import { groq } from "next-sanity";
import Form from "../components/Form"; 


export default function MinaTodos() {
	<Meta title='Mina todos' />
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	
	const [sideListVisible, setSideListsVisible] = useState(true);
	const [flexDirection, setFlexDirection] = useState(false);

	const [showAddTodo, setShowAddTodo] = useState(false);

	const state = useTodoContext()
	const currentState = useUpdateContext()
	const fetchAllLists = state.fetchTodos;

	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(0); 
	///
	//const { postdata, preview } = props;

	const router = useRouter();
  
	/* const { data: posts } = usePreviewSubscription(query, {
		initialData: postdata,
		enabled: preview || router.query.preview !== undefined,
	  }); */

	  let activeLists;
	  let savedLists;
	  let titles;

	  if (state.initialFetch) {
		activeLists = state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0);
		savedLists = state.initialFetch.allTodoLists.filter(x => x.saved && x.numberOfNotChecked === 0);
		titles = activeLists.map(x => x.title);
	  }
	
	

	const handleSideListArrow = () => {
		setFlexDirection(true)
		setTimeout(() => {
			setSideListsVisible(true)
		}, 600);
		
	}

	useEffect(() => {
		setIsLoading(true)
		fetchAllLists()
		console.log('open index', open)
		open < 0 || !open ? setOpen(0) : console.log('open?', open);
		return () => setIsLoading(false)
	}, [])

	useEffect(() => {
		activeLists ? setIsLoading(false) : setIsLoading(true)
		open < 0 || !open ? setOpen(0) : console.log('open?', open);
		return () => setIsLoading(false)
	}, [activeLists])


	useEffect(() => {
		currentState.currentItem && currentState.currentItem.title && setOpen(titles.findIndex(x => x === currentState.currentItem.title))
	}, [currentState.currentItem])


	const handleClick = () => {
		
		if (addListFormIsVisible) {
			setShowAddTodo(false)
			console.log('click', addListFormIsVisible)
			setTimeout(() => {
				setAddListFormIsVisible(false)
			}, 600)
		} else if (!addListFormIsVisible){
			setShowAddTodo(false)
			setAddListFormIsVisible(true)
		}		
	} 


	return (isLoading ? (<h1>laddar...</h1>):(
		<div className={clsx(styles.todoPageWrapper, {
			[styles.sideListVisible]: sideListVisible,
			[styles.changeFlex]: flexDirection,
			})}>
			<Meta title='Mina todos' />
			
				{
				!sideListVisible && (
				<aside className={styles.optionContainer} onClick={() => handleSideListArrow()} >
					<p>Visa fler listor</p>
					<AddTodo className={styles.addTdodoSvg} />
				</aside>)
				} 
			{
			<section className={clsx(styles.sideListContainer, {[styles.sideLists]: sideListVisible})}>
				<ActiveLists lista={activeLists} setSideListsVisible={setSideListsVisible} setOpen={setOpen} open={open} page={'todo'} />
				<SavedLists lista={savedLists} setSideListsVisible={setSideListsVisible} setOpen={setOpen} open={open}  page={'todo'} activeLists={activeLists} setAddListFormIsVisible={setAddListFormIsVisible}  />
			</section>
			}
			<div className={styles.todoListWrapper}>
				{
				addListFormIsVisible && (
					<Form setFormIsVisible={setAddListFormIsVisible} objectType={'todoList'} method={'POST'} typeName={'lista'}/>)
				}

					{activeLists? (
						activeLists.map((lista, index) => (
								open === index && (
								<TodoList key={lista._id} list={lista} />
								)
							))
					)
					: 
					(<section className={styles.emptyList}>
						<div className={styles.todoListTop} />
						<article className={styles.addListIconBtn} onClick={() => handleClick()} />
						<h3>Du har inga pågående listor</h3>
					</section>)
				}
			</div>
		</div>
	))
};
