import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/savedLists.module.scss';
import clsx from 'clsx';
import SmallListObj from './smallListObj';
import ListContainer from "../components/ListContainer";
import ActiveLists from "../components/ActiveLists";

const SavedLists = ({lista, setSideListsVisible, setOpen, page, activeLists, setAddListFormIsVisible }) => {
	const [contentIsVisible, setContentIsVisible] = useState(false);
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const [previewTodos, setPreviewTodos] = useState(false);
	const [previewTodosList, setPreviewTodosList] = useState(null);

	const handleClick = (list, index) => {
		if (page === 'todo') {
			console.log('lägg till, sätt denna som open ', activeLists.length-1, index)
			setOpen(activeLists.length-1 + index)
		 } else if (page === 'home') {
			console.log('go to todolists med denna som open: ', list) 
		 }
	}

	const handleClickOpen = (list, index) => {
		//setAddListFormIsVisible(true)
		if (page === 'todo') {
			//setPreviewTodos(true);
			/* list.todos? 
			setPreviewTodosList(null):setPreviewTodosList(list.todos); */
			setPreviewTodosList(list.todos)
			console.log("show todolist's todos: ", list.todos, 'index', index) 
			//console.log('lägg till, sätt denna som open ', activeLists.length-1, index)
			//setOpen(activeLists.length-1 + index)
		 } else if (page === 'home') {
			console.log("show todolist's todos: ", list.todos) 
		 }
		 
	}

	return (
		<div className={clsx(styles.savedLists, {[styles.showContent]: contentIsVisible,
			[styles.homePage]: page === 'home',
			[styles.todolistPage]: page === 'todo',
			[styles.savedListsPage]: page === 'saved'})}>
				
			<section className={styles.savedListsTop} onClick={() => setContentIsVisible(!contentIsVisible)}>
				<h4>Mina sparade listor</h4><p className={styles.arrowRight}  onClick={() => setSideListsVisible(false)}>&rarr;</p>
			</section>
			<section className={styles.contentBox}>
				<Link href="/sparade-listor" passHref>
				<p className={styles.link}>gå till sparade listor</p>
				</Link>
			{
				lista ? lista.map((list, index) => {
					let listItem = previewTodosList? list.todos:null;
					console.group('listItem', listItem, 'index', index)
					return (
						<div key={index}>
						{previewTodosList &&(
							listItem? (
								listItem.map((todoItem) =>(
							<article key={todoItem._rev} onClick={() => setPopupIsOpen(true)} className={styles.hiddenLists}>
								<section className={styles.textGroup}>
									<h3>{todoItem.title}</h3>
									{todoItem.description && (<p>Beskrivning: {`${todoItem.description}`}</p>)}
								</section>
							</article>
								))
							
							):
							<h2>Den här listan är tom</h2>
						)}
						{
							popupIsOpen && (
								<section className={styles.popup}>
									<h2>Vill du starta denna lista?</h2>
									<input type={"button"} value={"starta"} onClick={(list) => handleClickOpen(list)}/>
									<input type={"button"} value={"stäng"} onClick={(list) => setPopupIsOpen(false)}/>
								</section>
							)
						}
							<article key={index} onClick={() => handleClickOpen(list, index)} className={styles.hiddenLists}>
								<section className={styles.textGroup}>
								<h3>{list.title}</h3>
								<p>tillagd: {list._createdAt? list._createdAt.slice(0, 10) : index}</p>
								</section>
								<section className={styles.iconGroup}>
									<article className={styles.nrOfTodosIcon}>
									<p className={styles.nrTodos}>{list.nrOfTodos? list.nrOfTodos: 0}</p>
									</article>
								</section>
							</article>
						</div>
					)
				}) : <h3>Tomt!</h3>
				}
			</section>
		</div>
	)

};

export default SavedLists;