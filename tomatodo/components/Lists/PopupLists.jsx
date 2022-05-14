import { useState, useEffect } from 'react';
import styles from './styles/deleteBtn.module.scss';
import { useUpdateContext, useTodoContext} from "../../context/TodoContext";
import {useRouter} from 'next/router';
import clsx from 'clsx';
import PreviewListObj from './PreviewListObj';
import ChevronDown from '../../svgAssets/chevron-down.svg';

const PopupLists = () => {
	const [showPreview, setShowPreview] = useState(false);
	const [transition, setTransition] = useState(false);
	const router = useRouter();
	const currentState = useUpdateContext();
	const state = useTodoContext()
	const fetchAllLists = state.fetchTodos;
	
	//restart list by unchecking all todos in list and setting list to not saved
	const handleClick = async(list) => {
		list.todos.map(async(x) => {
			await fetch("/api/todos/todo", {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: x._id,
					checked: false,
				}),
			})
			.then(console.log('nollställd todo'))
			.catch(error => {
				console.log('error:', error);
			})
		})
		await fetch("/api/todos/todolist", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: list._id,
				saved: false,
				numberOfClicks: list.numberOfClicks,
			}),
		})
		.then(console.log('omstartad lista'))
		.catch(error => {
			console.log('error:', error);
		})
		setShowPreview(false);
		currentState.setCurrentItem(null);
		currentState.setPopupIsOpen(false);
		fetchAllLists();
		currentState.setOverlay(false);
		router.push('/mina-todos');
	};

	useEffect(() => {
		currentState.setOverlay(true);
		return () => {
			setShowPreview(false);
			currentState.handleGoBack();
		};
	}, []);


	const handlePreview = () => {
		if (showPreview) {
			setTransition(true)
			setTimeout(() => {
				setShowPreview(false);
			}, 100);
		} else {
			setShowPreview(true)
			setTimeout(() => {
				setTransition(false);
			}, 100);
		};
	};

	return (
			<div className={styles.popupLIstContainer}>
			<div className={styles.deleteWarning}>
				<section className={styles.textGroup}>
					<h1> Vill du starta om </h1>
					<h2><span className={styles.todoTitle}>
							{currentState.currentItem && currentState.currentItem.title ? `"${currentState.currentItem.title}"` : null}
					</span>?</h2>
					<div className={styles.btnContainer}>
						<input type={"button"} className={styles.close} value="stäng" onClick={() => currentState.handleGoBack()} />
						<input type={"button"} className={styles.addBtn} value="starta" onClick={() => handleClick(currentState.currentItem)} />
					</div>
				</section>
				<section onClick={() => handlePreview()} className={styles.previewContainer}>
					<div  className={clsx(styles.previewTop , {[styles.previewArrow]: showPreview})}>
						<h3>Todos i listan</h3>
						<ChevronDown style={{height: '14px', width: '14px', position: 'absolute', right: '50px', color: 'inherit'}} />
					</div>
				</section>
			</div>
			
			{ /* preview todos in list */
			showPreview && currentState.currentItem && currentState.currentItem.todos && (
				<div   className={clsx(styles.previewLists, {
					[styles.preview]: showPreview,
					[styles.transition]: transition,
					})}
				>	
					<div className={styles.previewListContainer}>
						{ currentState.currentItem.todos.map((item) => {
							return (
								<PreviewListObj key={item._id} item={item} />
							);
						})}
					</div>
				</div>
			)}
			</div>
	);
};				

export default PopupLists;