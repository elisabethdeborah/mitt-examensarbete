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

export default function MinaTomater() {
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [addTomatoFormIsVisible, setAddTomatoFormIsVisible] = useState(false);
	const [open, setOpen] = useState(0); 
	const [showListObject, setShowListObject] = useState(false);
	const [listObjectIndex, setListObjectIndex] = useState();
	const [overlay, setOverlay] = useState(false)
	const [showChangeForm, setShowChangeForm] = useState(false);
	const [addToListIsVisible, setaddToListIsVisible] = useState(false);
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	const [isLoading, setIsLoading] = useState(false);

	let tomatoLibrary = state.initialFetch? state.initialFetch.tomatoLibrary:null;
	const activeLists = state.initialFetch? state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0):null;

	useEffect(() => {
		setIsLoading(true);
		fetchAllLists();
		if (currentState.currentItem && currentState.currentItem._type === 'tomato') {
			setShowListObject(true);
			setAddListFormIsVisible(false);
			setListObjectIndex(currentState.currentItem.listObjIndex);
			setOverlay(true);
		};
		return () => setIsLoading(false);
	}, []);

	useEffect(() => {
		tomatoLibrary ? setIsLoading(false) : setIsLoading(true)
		return () => setIsLoading(false)
	}, [tomatoLibrary]);

	useEffect(() => {
		if (!currentState.currentItem) {
			setOverlay(false);
			setAddListFormIsVisible(false);
			setaddToListIsVisible(false);
			setShowChangeForm(false);
			setShowListObject(false);
			setListObjectIndex(null);
		}
	}, [currentState.currentItem]);

	const handleClick = (x) => {
		if (showListObject) {
			setOverlay(false);
			setAddListFormIsVisible(false);
			setaddToListIsVisible(false);
			setShowChangeForm(false);
			setTimeout(() => {
				setShowListObject(false);
				currentState.setCurrentItem(null);
				listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null);
			}, 600);
		} else if (!showListObject) {
			setShowListObject(true);
			setAddListFormIsVisible(false);
			listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null);
		setTimeout(() => {
			setOverlay(true);
			}, 10);
		};		
	};  

	return (
		<div className={styles.tomatoPageWrapper}>
			<Meta title='Mina tomater' />
			{
				showChangeForm && (
					<>
						<Form 
							setFormIsVisible={setShowChangeForm} 
							list={currentState.currentItem} 
							typeName={'redigera'} 
							objectType={'tomato'} 
							method={'PUT'} 
							page={'archive'} 
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
							<h1 className={styles.LoadingText} style={{width: '100%', textAlign: 'center'}}>Hämtar tomater...</h1>
						) :
							tomatoLibrary && tomatoLibrary.length > 0 ? 
								(
									tomatoLibrary.map((list, index) => (
										<LibraryArchiveObj  
											className={styles.gridItem}
											key={list._rev} 
											list={list} 
											index={index} 
											listObjectIndex={listObjectIndex} 
											showListObject={showListObject} 
											handleClick={handleClick}
											setShowChangeForm={setShowChangeForm}
											setaddToListIsVisible={setaddToListIsVisible}
										/>
									))
								) : (
									<h1 className={styles.LoadingText} style={{width: '100%', textAlign: 'center', padding: '2rem 1rem'}}>Du har inga sparade tomater</h1>
								)
					}
				</div>
			}
		</div>
	);
};
