import React, { useState } from "react";
import styles from "../styles/libraryArchiveObj.module.scss";
import clsx from "clsx";
import NumberFormat from "./NumberFormat";
import PlayBtn from "./PlayTimerBtn";
import DeleteButton from "./DeleteButton";
import { useUpdateContext } from "../context/TodoContext";

const LibraryArchiveObj = ({ list, index, listObjectIndex, showListObject, handleClick, setaddToListIsVisible, setShowDelete, setShowChangeForm, closeOverlay }) => {
	const [showHover, setShowHover] = useState(false);
	const currentState = useUpdateContext();

	const handleClickObj = (index, list) => {
		currentState.setCurrentItem(list);
		handleClick(index);
	};

	const handleShowSettings = () => {
		setaddToListIsVisible(false);
		console.log('list', list)
		list._type === 'tomato' ? setShowChangeForm(true):null;
	};

	const handleShowAddtolist = () => {
		console.log('list', list)
		list._type === 'tomato' ?setShowChangeForm(false):setShowDelete(false);
		setaddToListIsVisible(true);
	};

	return (
		<div className={styles.container}>	
			<article 
				onClick={() => handleClickObj(index, list)} 
				onMouseEnter={() => setShowHover(true)} onMouseLeave={() => setShowHover(false)}
				className={clsx(styles.listObject, {
					[styles.orangeTomato]: list._type === 'tomato' && index % 2 === 0,
					[styles.pinkTomato]: list._type === 'tomato' && index % 2 === 1,
					[styles.pinkTodoList]: list._type === 'todoList' && index % 2 === 0,
					[styles.blueTodoList]: list._type === 'todoList' && index % 2 === 1,
					[styles.showListObject]: index === listObjectIndex,
				})} 
				key={index}
			>
			{
				list.description && list.description.length > 0 && (
					<div className={clsx(styles.hoverDescription, {[styles.showDescription]: showHover === true})}>{list.description}</div> 
				)
			}
			{
				list._type !== 'tomato' ? (
					<>
						<section className={styles.textGroup}>
							<h3>{list.title}</h3>
							<p>tillagd: {list._createdAt.slice(0, 10)}</p>
						</section>
						<article className={styles.nrOfTodosIcon}>
							<p className={styles.nrTodos}>{list.nrOfTodos}</p>
						</article>
					</>
				) : (
					<>
						<h3>{list.title}</h3>
						<NumberFormat 
							className={styles.formattedTime} 
							milliSeconds={Number(list.time*1000)} 
							text={'tid: '} 
							styling={{fontSize: '1.3rem', position: 'relative', bottom: '0'}} 
							showSecs={false} 
						/>
					</>
				)
			}
			</article>	
			{
			showListObject && index === listObjectIndex && (
			<>
				<div className={clsx(styles.optionsDiv, {
						[styles.visibleFirst]: showListObject, 
					})}
				>
					{
					showListObject && (
						<div className={styles.btnContainer}>
						{
							list._type === 'tomato'? (
							<>
								<article className={clsx(styles.iconBtn, styles.iconSettings)} onClick={() => handleShowSettings()} />
								<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleShowAddtolist()} />
								<DeleteButton listItem={currentState.currentItem} size={'large'} />
							</>
							) : (
							<>
								<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleShowAddtolist()} />
								<DeleteButton listItem={currentState.currentItem} size={'large'} closeOverlay={closeOverlay} />
							</>
							)
						}
						</div>
					)
					}
				</div>
				{
				showListObject && list._type === 'tomato' && (
					<article className={styles.playBtnContainer}>
						<PlayBtn size={'large'} listItem={list} />
					</article>
				)
				}
			</>
			)
			}
		</div>
	);
};

export default LibraryArchiveObj;

