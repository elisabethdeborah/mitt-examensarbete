import React, { useEffect, useState } from "react";
import Form from "./Form";
import ActiveLists from "./ActiveLists";
import AddTodo from '../svgAssets/addBtn.svg';
import styles from "../styles/libraryArchiveObj.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import NumberFormat from "./NumberFormat";
import ListObj from "./ListObj";

const LibraryArchiveObj = ({list, index, listObjectIndex, showListObject, showSettingsForm, showAddTodo, handleClick, handleShowSettings, handleStartTodoList, handleDelete, currentLists, overlay, handleAddToTodo, handlePlayTomato, setShowAddTodo, setOverlay, addListFormIsVisible,setAddListFormIsVisible}) => {
	//const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [open, setOpen] = useState(0); 

	/* const handleShowAddList = () => {
		setAddListFormIsVisible(true)
		setShowAddTodo(false)
		setOverlay(false)
		console.log('overlay?', overlay)
	}
	 */


	return (
		<div className={styles.container}>
			{/* {addListFormIsVisible && 
				<Form setFormIsVisible={setAddListFormIsVisible} objectType={'todoList'} method={'POST'} typeName={'lista'} overlayActive />
			} */}

			
			<article onClick={() => handleClick(index)} className={clsx(styles.listObject, {
				[styles.orangeTomato]: list._type === 'tomato' && index % 2 === 0,
				[styles.pinkTomato]: list._type === 'tomato' && index % 2 === 1,
				[styles.pinkTodoList]: list._type === 'todoList' && index % 2 === 0,
				[styles.blueTodoList]: list._type === 'todoList' && index % 2 === 1,
				[styles.showListObject]: index === listObjectIndex,
			})} key={index}>
				{list._type !== 'tomato' ? (
					<>
						<section className={styles.textGroup}>
							<h3>{list.name}</h3>
							<p>tillagd: {list._createdAt.slice(0, 10)}</p>
						</section>
						<article className={styles.nrOfTodosIcon}>
							<p className={styles.nrTodos}>{list.nrOfTodos}</p>
						</article>
					</>
				
				) : (
					<>
						<h3>{list.title}</h3>
						<NumberFormat className={styles.formattedTime} timeSeconds={Number(list.time)} text={'tid: '} textSize={'1.3rem'} showSecs={false} />
					</>
				)}

				
			</article>
			{showListObject && index === listObjectIndex && (
				<div className={clsx(styles.optionsDiv, {
					[styles.visibleFirst]: showListObject && overlay, 
					[styles.visibleSettings]: showSettingsForm,
					[styles.visibleLists]: showAddTodo,
					[styles.visibleListForm]: addListFormIsVisible,
					}
					)}>
					{showListObject && (
					<div className={styles.btnContainer}>
						<article className={clsx(styles.iconBtn, styles.iconSettings)} onClick={() => handleShowSettings(list)} />
						<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleAddToTodo(list)} />
						<article className={clsx(styles.iconBtn, styles.iconPlay)} onClick={() => handlePlayTomato(list)} />
					</div>
					)}
					<div className={styles.showSettings}>
						<Form typeName={'redigera'} objectType={list._type} method={'PUT'} currentListDocId />
						{/* <input type="text" placeholder={list.title} className={styles.inputTomato} />
						<input type="number" placeholder={list.time} className={styles.inputTomato} />
						<button className={styles.changeTomatoBtn}><p>Ändra</p></button> */}
					</div>
					<div className={styles.showActiveLists}>
						{console.log(list._type)}
						{
							list._type === 'todoList' && (list.list.map((todoItem, index) =>
							 <ListObj key={index} listItem={todoItem} width={400} />))
						}
						{list._type === 'tomato' && (
						addListFormIsVisible ? (
							<Form setFormIsVisible={setAddListFormIsVisible} objectType={'todoList'} method={'POST'} typeName={'lista'} overlayActive />
							) : (<>
									<ActiveLists lista={currentLists} setOpen={setOpen} tomato={list} open={4} page={'tomato'} setAddListFormIsVisible={setAddListFormIsVisible} />
									<aside className={styles.optionContainer}>
										<button className={styles.addTodoList} onClick={() => setAddListFormIsVisible(true)} >
											<h2>Skapa ny lista</h2>
											<AddTodo className={styles.addTdodoSvg} />
										</button>
										
									</aside>
								</>)
						)}
						
					</div>
				</div>
			)}
		</div>
	)
}

export default LibraryArchiveObj;