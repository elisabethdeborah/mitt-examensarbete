import React, { useEffect, useState } from "react";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import TodoList from "../components/Lists/TodoList";
import styles from "../components/Lists/styles/minaTodos.module.scss";
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import Form from "../components/Forms/Form"; 
import ListContainer from "../components/Lists/ListContainer";
import { useRouter } from "next/router";

export default function MinaTodos() {
	const router = useRouter();
	const [sideListVisible, setSideListsVisible] = useState(true);
	const [flexDirection, setFlexDirection] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(0); 
	const [lists, setLists] = useState({activeLists: null, savedLists: null, tomatoLibrary: null});
	const todoState = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = todoState.fetchTodos;
	let titles = lists.activeLists && lists.activeLists.map(x => x.title);


	const handleSideListArrow = () => {
		setFlexDirection(true);
		setTimeout(() => {
			setSideListsVisible(true);
		}, 600);	
	};

	useEffect(() => {
		setIsLoading(true);
		fetchAllLists();
		console.log('on mount:', open);
		open < 0 || !open ? setOpen(0) : null;

		return () => setIsLoading(false);
	}, []);

	useEffect(() => {
		console.log('changed: todoState.initialFetch', open)
		if (todoState.initialFetch) {
			setLists({activeLists: todoState.initialFetch.activeLists, savedLists: todoState.initialFetch.savedLists, tomatoLibrary: todoState.initialFetch.tomatoLibrary})
			
			titles && currentState.currentItem && !currentState.currentItem.saved && currentState.currentItem.title && setOpen(titles.findIndex(x => x === currentState.currentItem.title));

		//	open < 0 || !open ? setOpen(0) : null;
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}; 
		//return () => setIsLoading(false);
	}, [todoState.initialFetch, currentState.currentItem, lists.activeList, open]);


						//console.log('activeLists:', lists.activeLists, 'open:', open)

	//set open to clicked list on page mount, make sure open can't be negative
	useEffect(() => {
		console.log('change?', open, titles, isLoading);
		!isLoading ? open < 0 || !open && setOpen(0) : null;
		titles && currentState.currentItem && !currentState.currentItem.saved && currentState.currentItem.title && setOpen(titles.findIndex(x => x === currentState.currentItem.title));
		//return () => setOpen(0);
	}, [lists.activeLists, open]);

	//om change in page, change after mount, change to clicked smalllist before page change
	useEffect(() => {
		console.log('changed: open, lists.activeLists', open, titles, isLoading, open < 0 || !open);
		open < 0 || !open ? setOpen(0) : null;
	}, [open]);
/* 
	useEffect(() => {
		let newIndex;
		lists.activeLists && currentState.currentItem ? newIndex = lists.activeLists[currentState.currentItem] : null;
		open < 0 || !open ? setOpen(0) : null;
		currentState.currentItem && lists.activeLists && open === newIndex ? setOpen(0) : null; 
	}, [lists]); */

	//on mount //om change in page
	/* useEffect(() => {
		titles && currentState.currentItem && !currentState.currentItem.saved && currentState.currentItem.title && setOpen(titles.findIndex(x => x === currentState.currentItem.title));
		//return () => setOpen(0);
	}, [currentState.currentItem]); */

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
							<ListContainer setSideListsVisible={setSideListsVisible} key='currentList' itemType={'todos'} setOpen={setOpen} open={open} page={'todo'} list={lists.activeLists && lists.activeLists.length > 1 ? lists.activeLists : null}  activeLists={lists.activeLists} />
							<ListContainer setSideListsVisible={setSideListsVisible} key='savedList' itemType={'sparade-listor'} setOpen={setOpen} open={open} page={'todo'} list={lists.savedLists} activeLists={lists.activeLists} />
							
						</section>
					}
					<div className={styles.todoListWrapper}>
						{
							currentState.formIsVisible && 
							(
								<Form 
									objectType={'todoList'} 
									method={'POST'} 
									typeName={'lista'} 
								/>
							)
						}
						{
							lists.activeLists && lists.activeLists.length > 0? (
								router.pathname === "/mina-todos" && lists.activeLists.map((lista, index) => (
									open === index && (
										<TodoList key={lista._id} list={lista} />
									)
								))
								) : (
									<section className={styles.emptyList}>
										<div className={styles.todoListTop} />
										<article className={styles.addListIconBtn} onClick={() => currentState.setFormIsVisible()} />
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
