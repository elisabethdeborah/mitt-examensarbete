
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/savedTomatoes.module.scss';
import clsx from 'clsx';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';
import SmallListObj from './smallListObj';

const ListContainer = ({itemType, tomatoes, setSideListsVisible, setOpen, open, page, list, tomato, setAddListFormIsVisible}) => {
	const [contentIsVisible, setContentIsVisible] = useState(false);
	//const [contentIsVisible, setContentIsVisible] = useState(page === 'home' || page === 'tomato');
	const [popupIsOpen, setPoputIsOpen] = useState(false);

	const handleOpenPopupClick = (x) => {
		setOpen(x)
	}


	const postTomatoTodo = async(tomatoTodo, toList) => {
		await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				name: tomatoTodo.name,
				description: tomatoTodo.description,
				time: tomatoTodo.time,
				parentRef: toList._id,
			}),
		  });
		  //set
	}

	const handleClickOpen = (item, index) => {
		console.log('klick från listkomponent: ', item, 'index', index)
		if (page === "tomato") {
		 console.log('POST TOMATO', tomato, 'TO CHOSEN TODO LIST: ', item, 'UPDATE LIST') 
		
		//postTomatoTodo(tomato, item);

		 } else if (page === 'todo') {
			setOpen(index)
		 } else if (page === 'home') {
			console.log('go to todolists med denna som open: ', item) 
		 }
		 
	}

	console.log(list)

	return (
		<>
		{
			popupIsOpen && (
				<section className={styles.popup}>
					<h2>Vill du starta denna lista?</h2>
					<input type={"button"} value={"starta"} onClick={(list) => handleOpenPopupClick(list)}/>
				</section>
			)
		}
		<div className={clsx(styles.listContainer, {[styles.showContent]: contentIsVisible,
			[styles.homePage]: page === 'home',
			[styles.tomatoPage]: page === 'tomato',
			[styles.todolistPage]: page === 'todo',
			[styles.savedListsPage]: page === 'saved'})}>

			<section className={clsx(styles.listTop, {
				[styles.tomatoes]: styles.itemType === "tomatoes",
				[styles.currentTodos]: styles.itemType === "todos",
				[styles.savedTodos]: styles.itemType === "todos" && list.saved,
				})} onClick={() => setContentIsVisible(!contentIsVisible)}>
				<h4>{`Mina ${itemType}`}</h4>
				{page === 'todo' && (
					<p className={styles.arrowRight} onClick={() => setSideListsVisible(false)}>&rarr;</p>
				)}
			</section>
			<section className={styles.contentBox}>
			<Link href={`/mina-${itemType}`} passHref>
			<p className={styles.link}>{`Gå till mina ${itemType}`}</p>
			</Link>
				{
				list ? list.map((item, index) => {
					let params = {item, index}
					return (
						//open !== index && (
							<SmallListObj key={index} listItem={item}  handleClick={handleClickOpen} clickParam={params} />
						//)
					)
				}) : <h3>Tomt!</h3>
				}
			</section>
		</div>
		</>
	)
};

export default ListContainer;

{/* <article key={index} onClick={() => handleClickTomato(tomato, index)} className={styles.hiddenLists}>
								<article className={styles.smallTomato} />
								<section className={styles.textGroup}>
									<h3>{tomatoes[index].title}</h3>
									<div className={styles.tomatoTime}><NumberFormat timeSeconds={tomato.time} text={'tid: '} textSize={'0.75rem'} /></div>
								</section>
								<PlayTimerBtn listItem={tomato} color={"orange"} />
								<Link href={"/timer"} passHref>
									<article onClick={() => console.log('go to timer, time', tomato.time)} className={styles.playBtnTomato} />		
								</Link>
							</article> */}