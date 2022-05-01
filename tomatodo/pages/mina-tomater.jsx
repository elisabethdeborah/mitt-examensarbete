import React, { useEffect, useState } from "react";
import Form from "../components/Forms/Form";
import ActiveLists from "../components/Lists/ActiveLists";
import Meta from "../components/Meta";
import styles from "../components/Lists/styles/tomatoLibrary.module.scss";
import clsx from "clsx";
import LibraryArchiveObj from "../components/Lists/libraryArchiveObj";
import DeleteButton from "../components/Lists/DeleteButton";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";

const MinaTomater = () => {
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [showListObject, setShowListObject] = useState(false);
	const [listObjectIndex, setListObjectIndex] = useState();
	const [showChangeForm, setShowChangeForm] = useState(false);
	const [addToListIsVisible, setaddToListIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;

	let tomatoLibrary = state.initialFetch? state.initialFetch.tomatoLibrary:null;

	useEffect(() => {
		setIsLoading(true);
		fetchAllLists();
		if (currentState.currentItem && currentState.currentItem._type === 'tomato') {
			setShowListObject(true);
			setAddListFormIsVisible(false);
			setListObjectIndex(currentState.currentItem.listObjIndex);
			currentState.setOverlay(true);
		};
		return () => setIsLoading(false);
	}, []);

	useEffect(() => {
		tomatoLibrary ? setIsLoading(false) : setIsLoading(true)
		return () => setIsLoading(false)
	}, [tomatoLibrary]);

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
			closeOverlay();
			setTimeout(() => {
				setShowListObject(false);
				currentState.setCurrentItem(null);
			}, 600);
		} else if (!showListObject) {
			setShowListObject(true);
			setAddListFormIsVisible(false);
			listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null);
		setTimeout(() => {
			currentState.setOverlay(true);
			}, 10);
		};		
	};
	
	const closeOverlay = () => {
		currentState.setOverlay(false);
		setAddListFormIsVisible(false);
		setaddToListIsVisible(false);
		setShowChangeForm(false);
		setTimeout(() => {
			setShowListObject(false);
			currentState.setCurrentItem(null);
			setListObjectIndex(null);
		}, 600);
	};

	return (
		<div className={styles.tomatoPageWrapper}>
			<Meta title='Mina tomater' />
			{
				showChangeForm && (
					<>
						<Form 
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
							!addListFormIsVisible && (
									<>
										<ActiveLists 
											tomato={currentState.currentItem} 
											setAddListFormIsVisible={setAddListFormIsVisible} 
										/>
									</>
								)
						}
					</div>
				)
			}
			{
				currentState.formIsVisible && (
					<Form objectType={'tomato'} method={'POST'} />
				)
			}
			{
				<div className={styles.libraryContainer}>
					<div className={styles.tomatoListTop}>
						<h2 className={styles.tomatoLibraryHeader}>Mina tomater</h2> 
						<article className={styles.addTomatoIcon} onClick={() => currentState.setFormIsVisible(true)} />
					</div>
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

export default MinaTomater;