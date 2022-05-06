import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import styles from "../components/Lists/styles/tomatoLibrary.module.scss";
import LibraryArchiveObj from "../components/Lists/libraryArchiveObj";
import DeleteButton from "../components/Lists/DeleteButton";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import PopupLists from "../components/Lists/PopupLists";

const SparadeListor = () => {
	const [showListObject, setShowListObject] = useState(false);
	const [listObjectIndex, setListObjectIndex] = useState();
	const [showStartList, setShowStartList] = useState(false);
	const [addToListIsVisible, setaddToListIsVisible] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	const [isLoading, setIsLoading] = useState(false);

	const savedLists = state.initialFetch? state.initialFetch.allTodoLists.filter(x => x.saved && x.numberOfNotChecked === 0):null;

	useEffect(() => {
		setIsLoading(true);
		fetchAllLists();
		return () => setIsLoading(false);
	}, []);

	useEffect(() => {
		savedLists ? setIsLoading(false) : setIsLoading(true);
		return () => setIsLoading(false);
	}, [savedLists]);

	useEffect(() => {
		if (!currentState.currentItem) {
			closeOverlay();
		}
	}, [currentState.currentItem]);


	useEffect(() => {
		showListObject ? currentState.setOverlay(true): currentState.setOverlay(false);
		return () => currentState.setOverlay(false);
	}, [showListObject]);
	  
	const handleClick = (x) => {
		if (showListObject) {
			currentState.setOverlay(false);
			setaddToListIsVisible(false);
			setTimeout(() => {
				setShowListObject(false);
				listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null);
			}, 600);
		} else if (!showListObject){
			setShowListObject(true);
			listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null);
			setTimeout(() => {
				currentState.setOverlay(true);
			}, 10);
		};	
	};  

	const closeAll = (x) => {
		setaddToListIsVisible(x);
		setShowStartList(x);
	};

	const closeOverlay = () => {
		currentState.setOverlay(false);
		setaddToListIsVisible(false);
		setTimeout(() => {
			setShowListObject(false);
			currentState.setCurrentItem(null);
			setListObjectIndex(null);
		}, 600);
	}
	
	return (
		<div className={styles.tomatoPageWrapper}>
			<Meta title='Mina sparade listor' />
			{showDelete && (
				<DeleteButton list={currentState.currentItem} type={'deleteLg'} />
			)}
			{addToListIsVisible && (
				<section className={styles.restartForm}>
					<PopupLists setPopupIsOpen={closeAll} />
				</section>
			)}
			<div className={styles.libraryContainer}>
				<div className={styles.tomatoListTop}>
					<h2 className={styles.savedListsHeader}>Mina sparade listor</h2> 
				</div>
				{
				isLoading ? (
					<h1 className={styles.LoadingText} style={{width: '100%', textAlign: 'center'}}>Hämtar sparade listor...</h1>
				) : 
					savedLists && savedLists.length > 0 ? 
						( savedLists.map((list, index) => {
							return (
								<LibraryArchiveObj  
									key={list._rev} 
									list={list} 
									index={index} 
									listObjectIndex={listObjectIndex} 
									showListObject={showListObject} 
									handleClick={handleClick}
									setaddToListIsVisible={setaddToListIsVisible}
									setShowDelete={setShowDelete}
									closeOverlay={closeOverlay}
								/>
							);
						})) : (
							<h1 className={styles.LoadingText} style={{width: '100%', textAlign: 'center', padding: '2rem 1rem'}}>Du har inga sparade listor</h1>
							)
				}
			</div>
		</div>
	);
};

export default SparadeListor;