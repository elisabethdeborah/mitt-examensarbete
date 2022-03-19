
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/listContainer.module.scss';
import clsx from 'clsx';
import NumberFormat from './NumberFormat';
import PlayTimerBtn from './PlayTimerBtn';
import {useUpdateContext} from "../context/TodoContext";

const ListContainer = ({itemType, setSideListsVisible, setOpen, open, page, list, tomato}) => {
	const currentState = useUpdateContext();
	const [contentIsVisible, setContentIsVisible] = useState(page === 'home'  && itemType === "todos" || page === 'tomato' && itemType === "tomater" || page === 'saved' && itemType === 'sparade-listor');
	const [popupIsOpen, setPoputIsOpen] = useState(false);

	const handleOpenPopupClick = (x) => {
		setOpen(x)
	};

	const postTomatoTodo = async(tomatoTodo, toList) => {
		await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				title: tomatoTodo.title,
				description: tomatoTodo.description,
				time: tomatoTodo.time,
				parentRef: toList._id,
			}),
		});
	};

	const handleClickOpen = (item, index) => {
		console.log('klick från listkomponent: ', item, 'index', index);
		if (page === "tomato") {
		 	console.log('POST TOMATO', tomato, 'TO CHOSEN TODO LIST: ', item, 'UPDATE LIST'); 
		 } else if (page === 'todo') {
			setOpen(index);
		 } else if (page === 'home') {
			console.log('go to todolists med denna som open: ', item); 
		 }; 
	};

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
									open !== index && (
										item._type === "todoList"? 
											<Link key={item._rev} href={'/mina-todos'} passHref>
												<article  
													onClick={() => currentState.setCurrentItem(item)} 
													className={clsx(
													styles.hiddenLists, {
														[styles.isVisible] : contentIsVisible === true,
														[styles.todoListObj] : item._type === 'todoList',
													})}
												>
													<section className={styles.textGroup}>
														<h3>{item.title}</h3>
														{
															item && item._createdAt && (
																<p>
																	tillagd: {item._createdAt.slice(0, 10)}
																</p>
															)
														}
													</section>
													<section className={styles.iconGroup}>
														<article className={styles.nrOfTodosIcon}>
															<p className={styles.nrTodos}>
																{item.nrOfTodos? item.nrOfTodos: 0}
															</p>
														</article>
														<article className={styles.nrOfNotCheckedIcon}>
															<p className={styles.nrNotChecked}>
																{item.numberOfNotChecked? item.numberOfNotChecked: 0}
															</p>
														</article>
														<article className={styles.nrOfCheckedIcon}>
															<p className={styles.nrChecked}>{item.numberOfChecked? item.numberOfChecked: 0}</p>
														</article>
													</section>
												</article>
											</Link>
											:
											<article 
												key={item._rev} 
												onClick={() => currentState.setCurrentItem(item)} 
												className={clsx(styles.hiddenLists, {
													[styles.isVisible] : contentIsVisible === true,
													[styles.tomatoObj] : item._type === 'tomato',
												})}
											>
												<>
													<article className={styles.smallTomato} />
													<section className={styles.textGroup}>
														<h3>{item.title}</h3>
														<div className={styles.tomatoTime}>
															<NumberFormat 
																milliSeconds={item.time*1000} 
																styling={{fontSize: '0.7rem', position: 'relative', bottom: '0px'}}
																text={'tid: '} 
															/>
														</div>
													</section>
												</>
													<PlayTimerBtn listItem={item} />
											</article>
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
