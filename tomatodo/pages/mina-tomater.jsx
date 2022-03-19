import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import ActiveLists from "../components/ActiveLists";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import styles from "../styles/tomatoLibrary.module.scss";
import clsx from "clsx";
import LibraryArchiveObj from "../components/libraryArchiveObj";
import DeleteButton from "../components/DeleteButton";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";

export default function MinaTomater() {
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [addTomatoFormIsVisible, setAddTomatoFormIsVisible] = useState(false);
	const [open, setOpen] = useState(0); 
	const [sideListVisible, setSideListsVisible] = useState(false);
	const [showListObject, setShowListObject] = useState(false);
	const [listObjectIndex, setListObjectIndex] = useState();
	const [showAddTodo, setShowAddTodo] = useState(false);
	const [overlay, setOverlay] = useState(false)
	const [showChangeForm, setShowChangeForm] = useState(false);
	const [addToListIsVisible, setaddToListIsVisible] = useState(false);
	const [currentObj, setCurrentObj] = useState(null);
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	const [isLoading, setIsLoading] = useState(false);

	let tomatoLibrary = state.initialFetch? state.initialFetch.tomatoLibrary:null;
	const activeLists = state.initialFetch? state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0):null;

	useEffect(() => {
		setIsLoading(true)
		fetchAllLists()
		return () => setIsLoading(false)
	}, []);

	useEffect(() => {
		tomatoLibrary ? setIsLoading(false) : setIsLoading(true)
		return () => setIsLoading(false)
	}, [tomatoLibrary]);

	const handleClick = (x, item) => {
		console.log('currentItem:', currentState.currentItem, 'currentObj', currentObj);
		if (showListObject) {
			setOverlay(false);
			setShowAddTodo(false);
			setAddListFormIsVisible(false);
			setaddToListIsVisible(false);
			setShowChangeForm(false);
			setTimeout(() => {
				setShowListObject(false);
				listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null);
			}, 600);
		} else if (!showListObject) {
			setShowListObject(true);
			setShowAddTodo(false);
			setAddListFormIsVisible(false);
			listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null);
		setTimeout(() => {
			setOverlay(true);
			}, 10);
		};		
	};  

	const handleAddToTodo = (list) => {
		console.log('add', list);
		setShowAddTodo(!showAddTodo);
	};

	const handleStartTodoList = (list) => {
		console.log('start', list);
		setShowAddTodo(!showAddTodo);
	};

	return (
		<div className={clsx(styles.tomatoPageWrapper, {[styles.sideListVisible]: sideListVisible})}>
			<Meta title='Mina tomater' />
			{
				showChangeForm && (
					<>
						<Form 
							setFormIsVisible={setShowChangeForm} 
							className={styles.archiveForm} 
							list={currentState.currentItem} 
							typeName={'redigera'} 
							objectType={'tomato'} 
							method={'PUT'} 
							page={'archive'} 
							currentListDocId 
						/>
						<div className={styles.showSettings}>
							<DeleteButton listItem={currentState.currentItem}/>
						</div>
					</>
				)
			}
			{
				addToListIsVisible && (
					<div className={styles.showActiveLists}>
						{
							addListFormIsVisible ? 
								(
									<Form 
										setFormIsVisible={setAddListFormIsVisible} 
										objectType={'todoList'} 
										method={'POST'} 
										typeName={'lista'} 
									/>
								) : (
									<>
										<ActiveLists 
											lista={activeLists} 
											setOpen={setOpen} 
											tomato={currentState.currentItem} 
											open={4} 
											page={'tomato'} 
											setAddListFormIsVisible={setAddListFormIsVisible} 
										/>
										<aside className={styles.optionContainer}>
											<button className={styles.addTodoList} onClick={() => setAddListFormIsVisible(true)} >
												<h2>Skapa ny lista</h2>
												<AddTodo className={styles.addTdodoSvg} />
											</button>
										</aside>
									</>
								)
						}
					</div>
				)
			}
			{
				addTomatoFormIsVisible && (
					<Form setFormIsVisible={setAddTomatoFormIsVisible} objectType={'tomato'} method={'POST'} />
				)
			}
			{
				<div className={styles.libraryContainer}>
					<div className={styles.tomatoListTop}>
						<h2 className={styles.tomatoLibraryHeader}>Mina tomater</h2> 
						<article className={styles.addTomatoIcon} onClick={() => setAddTomatoFormIsVisible(!addTomatoFormIsVisible)} />
					</div>
					{
						showListObject && (
							<div onClick={() => handleClick()} className={clsx(styles.showOverlay, {[styles.overlayVisible]: overlay})}/> 
						)
					}
					{
						isLoading ? 
						(
							"hämtar tomater..."
						) :
							tomatoLibrary ? 
								(
									tomatoLibrary.map((list, index) => (
										<LibraryArchiveObj  
											className={styles.gridItem}
											key={list._rev} 
											list={list} 
											index={index} 
											listObjectIndex={listObjectIndex} 
											showListObject={showListObject} 
											showAddTodo={showAddTodo} 
											addListFormIsVisible={addListFormIsVisible} 
											setAddListFormIsVisible={setAddListFormIsVisible} 
											handleClick={handleClick}
											handleStartTodoList={handleStartTodoList}
											overlay={overlay}
											handleAddToTodo={handleAddToTodo}
											setShowChangeForm={setShowChangeForm}
											setaddToListIsVisible={setaddToListIsVisible}
											setCurrentObj={setCurrentObj}
										/>
									))
								) : (
									<section className={styles.emptyList}>
										<div className={styles.todoListTop} />
										<article className={styles.addTomatoIcon} onClick={() => setAddTomatoFormIsVisible(!addTomatoFormIsVisible)} />
										<h3>Du har inga sparade tomater</h3>
									</section>
								)
					}
				</div>
			}
		</div>
	);
};
