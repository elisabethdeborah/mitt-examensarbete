import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles/savedLists.module.scss';
import clsx from 'clsx';
import DeleteButton from './DeleteButton';
import { useUpdateContext} from "../../context/TodoContext";

const SavedLists = ({lista, setSideListsVisible, page }) => {
	const [contentIsVisible, setContentIsVisible] = useState(false);
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const [previewTodosList, setPreviewTodosList] = useState(null);
	const currentState = useUpdateContext();

	const handleClickOpen = (list, index) => {
		if (page === 'todo') {
			setPreviewTodosList(list.todos);
			console.log("show todolist's todos: ", list.todos, 'index', index); 
		} else if (page === 'home') {
			console.log("show todolist's todos: ", list.todos); 
		};	 
	};

	const handleClick = async(list) => {
		console.log('SAVE!!!', list._id)
		await fetch("/api/todos/todolist", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: lista._id,
				saved: true,
			}),
		})
		.then(console.log('saved'))
		.catch(error => {
			console.log('error:', error);
		})
		list.todos.map(async(x) => {
			await fetch("/api/todos/todo", {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: lista._id,
					checked: false,
				}),
			})
			.then(console.log('posted'))
			.catch(error => {
				console.log('error:', error);
			})
		})
		setDisplayWarning(false);
		fetchAllLists();
	};

	const clickItem = (clickItem) => {
		setPopupIsOpen(!popupIsOpen);
		currentState.setCurrentItem(clickItem);
		console.log(currentState.currentItem, clickItem);
	};



	return (
		<div className={clsx(styles.savedLists, {
			[styles.showContent]: contentIsVisible,
			[styles.homePage]: page === 'home',
			[styles.todolistPage]: page === 'todo',
			[styles.savedListsPage]: page === 'saved'})}
		>
			<section className={styles.savedListsTop} onClick={() => setContentIsVisible(!contentIsVisible)}>
				<h4>Mina sparade listor</h4>
				<p className={styles.arrowRight} onClick={() => setSideListsVisible(false)}>&rarr;</p>
			</section>
			<section className={styles.contentBox}>
				<Link href="/sparade-listor" passHref>
					<p className={styles.link}>gå till sparade listor</p>
				</Link>
				{
					lista ? 
						lista.map((list, index) => {
							let listItem = previewTodosList? list.todos:null;
							//console.group('listItem', listItem, 'index', index);
							return (
								<div className={styles.savedListsContainer} key={index}>
									{
										popupIsOpen && currentState.currentItem._id === list._id && (
											<div onClick={() => clickItem(list)} className={styles.listContainer}>
												<article
													//className={(styles.hiddenLists)}
												>
												<section className={styles.textGroup}>
													<h2 className={styles.headerPartOne}>{`Vill du starta om`}</h2>
													<span className={styles.headerPartTwo}>{`${list.title}`}</span>
													<h2 className={styles.headerPartOne}>{`?`}</h2>
													<div className={styles.btnContainer}>
														<DeleteButton setDisplayWarning={setPopupIsOpen} listItem={list} size={'regular'} text={'Delete'} />
														<input type={"button"} className={styles.addBtn} value="Starta" onClick={() => handleClick(list)} />
													</div>
												</section>
											</article>
										</div>
										)
									}
									{
										previewTodosList && (
											listItem? (
												<div className={styles.previewContainer} >
													{console.log('finns id in currentItem?', currentState.currentItem, listItem.filter(x => console.log(x.todoList._ref)))}
												{listItem.filter(x => currentState.currentItem._id.includes(x.todoList._ref).listItem.map((todoItem) => (
													<article key={todoItem._rev} onClick={() => clickItem(todoItem)} className={styles.hiddenLists}>
														<section className={styles.textGroup}>
															<h3>{todoItem.title}</h3>
															{
																todoItem.description && (
																	<p>Beskrivning: {`${todoItem.description}`}</p>
																)
															}
														</section>
													</article>
												)))}
												</div>
											) : (
											<h2>Den här listan är tom</h2>
										))
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
							);
						}) 
					: ( 
						<h3>Den här listan är tom</h3>
					)
				}
			</section>
		</div>
	);
};

export default SavedLists;