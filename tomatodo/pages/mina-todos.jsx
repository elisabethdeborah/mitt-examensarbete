import React, { useEffect, useState } from "react";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import TodoList from "../components/Lists/TodoList";
import styles from "../components/Lists/styles/minaTodos.module.scss";
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import Form from "../components/Forms/Form"; 
import ListContainer from "../components/Lists/ListContainer";

export default function MinaTodos() {
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [sideListVisible, setSideListsVisible] = useState(true);
	const [flexDirection, setFlexDirection] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(0); 

	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	
	let activeLists;
	let savedLists;
	let titles;
	let limboLists;
	const [displayWarning, setDisplayWarning] = useState(limboLists && limboLists.length > 0);

	if (state.initialFetch) {
		activeLists = state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0);
		savedLists = state.initialFetch.allTodoLists.filter(x => x.saved);
		titles = activeLists.map(x => x.title);
		limboLists = state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked === 0 && !x.saved);
	};
	
	const handleSideListArrow = () => {
		setFlexDirection(true);
		setTimeout(() => {
			setSideListsVisible(true);
		}, 600);	
	};

	useEffect(() => {
		setIsLoading(true);
		fetchAllLists();
		console.log('open index', open);
		open < 0 || !open ? setOpen(0) : console.log('open?', open);
		return () => setIsLoading(false);
	}, []);

	useEffect(() => {
		activeLists && savedLists ? setIsLoading(false) : setIsLoading(true);
		limboLists ? setDisplayWarning(true): null;
		open < 0 || !open ? setOpen(0) : console.log('open?', open);
		return () => setIsLoading(false);
	}, [activeLists, savedLists]);

	useEffect(() => {
		currentState.currentItem && currentState.currentItem.title && setOpen(titles.findIndex(x => x === currentState.currentItem.title));
	}, [currentState.currentItem]);

	const handleClick = () => {
		if (addListFormIsVisible) {
			console.log('click', addListFormIsVisible);
			setTimeout(() => {
				setAddListFormIsVisible(false);
			}, 600);
		} else if (!addListFormIsVisible){
			setAddListFormIsVisible(true);
		};		
	}; 

	return (
		<>
		{
		isLoading ? 
			(
				<h1>laddar...</h1> 
			) : (
				<div className={clsx(styles.todoPageWrapper, {
					[styles.sideListVisible]: sideListVisible,
					[styles.changeFlex]: flexDirection,
					})}
				>
					<Meta title='Mina todos' />
					{
						!sideListVisible && (
							<aside className={styles.optionContainer} onClick={() => handleSideListArrow()} >
								<p>Visa fler listor</p>
								<AddTodo className={styles.addTdodoSvg} />
							</aside>
						)
					} 
					{
						<section className={clsx(styles.sideListContainer, {[styles.sideLists]: sideListVisible})}>
							<ListContainer setSideListsVisible={setSideListsVisible} key='savedList' itemType={'sparade-listor'} setOpen={setOpen} open={open} page={'todo'} list={savedLists} activeLists={activeLists} />
							<ListContainer setSideListsVisible={setSideListsVisible} key='currentList' itemType={'todos'} setOpen={setOpen} open={open} page={'todo'} list={activeLists && activeLists.length > 1 ? activeLists : null}  activeLists={activeLists} />
						</section>
					}
					<div className={styles.todoListWrapper}>
						{
							addListFormIsVisible && (
								<Form setFormIsVisible={setAddListFormIsVisible} objectType={'todoList'} method={'POST'} typeName={'lista'} />
							)
						}
						{
							activeLists && activeLists.length > 0? (
								activeLists.map((lista, index) => (
									open === index && (
										<TodoList key={lista._id} list={lista} />
									)
								))
							) : (
								<section className={styles.emptyList}>
									<div className={styles.todoListTop} />
									<article className={styles.addListIconBtn} onClick={() => handleClick()} />
									<h3>Du har inga pågående listor</h3>
								</section>
							)
						}
					</div>
				</div>
			)
			}
		</>
	);
};
