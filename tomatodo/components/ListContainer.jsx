
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/listContainer.module.scss';
import clsx from 'clsx';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';
import {useUpdateContext} from "../context/TodoContext";
import SmallListObj from './SmallListObj';
import PopupLists from './PopupLists';

const ListContainer = ({itemType, setSideListsVisible, setOpen, open, page, list, tomato}) => {
	const currentState = useUpdateContext();
	const [contentIsVisible, setContentIsVisible] = useState(page === 'home'  && itemType === "todos" || page === 'tomato' && itemType === "tomater" || page === 'saved' && itemType === 'sparade-listor');
	
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	//const [popupIsOpen, setPopupIsOpen] = useState(currentState.currentItem && currentState.currentItem.saved);
	const [overlay, setOverlay] = useState(false)

	/* useEffect(() => {
		setPopupIsOpen(currentState.currentItem && currentState.currentItem.saved);

		return () => setPopupIsOpen(false);
	}, [currentState.currentItem]) */


	/* const handleClickOpen = (item, index) => {
		console.log('klick från listkomponent: ', item, 'index', index);
		if (page === "tomato") {
		 	console.log('POST TOMATO', tomato, 'TO CHOSEN TODO LIST: ', item, 'UPDATE LIST'); 
		 } else if (page === 'todo') {
			setOpen(index);
		 } else if (page === 'home') {
			console.log('go to todolists med denna som open: ', item); 
		 }; 
	}; */

	return (
		<>
			{
				popupIsOpen && (
					<PopupLists setPopupIsOpen={setPopupIsOpen} />
				)
			}
			<div className={clsx(styles.listContainer, {
				[styles.showContent]: contentIsVisible,
				[styles.homePage]: page === 'home',
				[styles.tomatoPage]: page === 'tomato',
				[styles.todolistPage]: page === 'todo',
				[styles.savedListsPage]: page === 'saved',
			})}>
				<section 
					className={clsx(styles.listTop, {
						[styles.tomatoes]: itemType === "tomater",
						[styles.currentTodos]: itemType === "todos",
						[styles.savedTodos]: itemType === "sparade-listor",
					})} 
					onClick={itemType !== "todos" ? () => setContentIsVisible(!contentIsVisible):null}
				>
					<h4>{`Mina ${itemType}`}</h4>
					{
						page === 'todo' && (
							<p className={styles.arrowRight} onClick={() => setSideListsVisible(false)}>&rarr;</p>
						)
					}
				</section>
				<section className={styles.contentBox}>
					<Link href={`/mina-${itemType}`} passHref>
						<p className={clsx(styles.link, {
							[styles.tomatoes]: itemType === "tomater",
							[styles.currentTodos]: itemType === "todos",
							[styles.savedTodos]: itemType === "sparade-listor",
						})}>
							{`Gå till ${itemType}`}
						</p>
					</Link>
					{
					list && list.length > 0 ? 
						list.map((item, index) => {
							return (
								page === 'todo' && !item.saved ? (
									open !== index && (
										<SmallListObj contentIsVisible={contentIsVisible} key={item._id} item={item} />
									)
								) : (
									<SmallListObj setPopupIsOpen={setPopupIsOpen} contentIsVisible={contentIsVisible} key={item._id} item={item}  />
								)
							)
						}) : (
							<h3 className={styles.emptyListText}>Tomt!</h3>
						)
					}
				</section>
			</div>
		</>
	);
};

export default ListContainer;
