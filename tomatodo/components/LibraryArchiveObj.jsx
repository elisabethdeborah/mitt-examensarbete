import React, { useEffect, useState } from "react";
import Form from "./Form";
import ActiveLists from "./ActiveLists";
import styles from "../styles/libraryArchiveObj.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import NumberFormat from "./NumberFormat";
import ListObj from "./ListObj";
import PlayBtn from "./PlayTimerBtn";
import DeleteButton from "./DeleteButton";


import {useUpdateContext, useTodoContext} from "../context/TodoContext";



const LibraryArchiveObj = ({list, index, listObjectIndex, showListObject, handleClick, overlay, setaddToListIsVisible, setShowDelete, setShowChangeForm}) => {
	const state = useTodoContext()
	const currentState = useUpdateContext()

	const [open, setOpen] = useState(0); 

	const handleClickObj = (index, list) => {
		console.log('list in handleclick', list)
		currentState.setCurrentItem(list)
		console.log(currentState.currentItem)
		handleClick(index, list, currentState)
	}
	const handleShowSettings = () => {
		//setOverlay(false)
		setaddToListIsVisible(false)
		list._type === 'tomato' ?setShowChangeForm(true):null;
	}
	const handleShowAddtolist = () => {
		//setOverlay(false)
		list._type === 'tomato' ?setShowChangeForm(false):setShowDelete(false);
		
		setaddToListIsVisible(true)
	}

	const handleShowDelete = () => {
		setShowDelete(true)
		setaddToListIsVisible(false)
	}

	return (
		<div className={styles.container}  onClick={() => console.log('list container', list)}>
			
			<article onClick={() => handleClickObj(index, list)} className={clsx(styles.listObject, {
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
						<NumberFormat className={styles.formattedTime} milliSeconds={Number(list.time*1000)} text={'tid: '} textSize={'1.3rem'} showSecs={false} />
					</>
				)}
			</article>
			{showListObject && index === listObjectIndex && (
				
				<div className={clsx(styles.optionsDiv, {
					[styles.visibleFirst]: showListObject && overlay, 
					}
					)}>
						{console.log('list in obj', list)}
					{showListObject && (
					<div className={styles.btnContainer}>
						
						{list._type === 'tomato'? (
							<>
							<article className={clsx(styles.iconBtn, styles.iconSettings)} onClick={() => handleShowSettings()} />
							<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleShowAddtolist()} />
							<DeleteButton listItem={currentState.currentItem} size={'large'} />
							<article className={clsx(styles.iconBtn, styles.playBtn)}><PlayBtn size={'large'} listItem={list} /></article>
							</>
						) : (<>
							<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleShowAddtolist()} />
							<DeleteButton listItem={currentState.currentItem} size={'large'} />
							</>)
						}
					</div>
					)}

					


					

					
					
						
					
				</div>
			)}
		</div>
	)
}

export default LibraryArchiveObj;