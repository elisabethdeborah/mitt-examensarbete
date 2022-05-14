import React, { useState } from "react";
import styles from "./styles/libraryArchiveObj.module.scss";
import clsx from "clsx";
import NumberFormat from "../NumberFormat";
import PlayTimerBtn from "../PlayTimerBtn";
import DeleteButton from "./DeleteButton";
import { useUpdateContext } from "../../context/TodoContext";
import { useRouter } from 'next/router';

const LibraryArchiveObj = ({ list, index, listObjectIndex, showListObject, handleClick, setaddToListIsVisible, setShowDelete, setShowChangeForm, closeOverlay }) => {
	const [showHover, setShowHover] = useState(false);
	const currentState = useUpdateContext();
	const router = useRouter();

	const handleClickObj = (index, list) => {
		currentState.setCurrentItem(list);
		handleClick(index);
	};

	const handleShowSettings = () => {
		currentState.setFormIsVisible(true);
		setaddToListIsVisible(false);
		router.pathname === '/mina-tomater' ? setShowChangeForm(true) : null;
	};

	const handleShowAddtolist = () => {
		if (router.pathname === '/mina-tomater') { 
			setShowChangeForm(false);
			currentState.setFormIsVisible(false); 
		} else {
			setShowDelete(false);
		} 
		setaddToListIsVisible(true);
	};

	return (
		<div className={styles.container}>	
			<article 
				onClick={() => handleClickObj(index, list)} 
				onMouseEnter={() => setShowHover(true)} onMouseLeave={() => setShowHover(false)}
				className={clsx(styles.listObject, {
					[styles.orangeTomato]: router.pathname === '/mina-tomater' && index % 2 === 0,
					[styles.pinkTomato]: router.pathname === '/mina-tomater' && index % 2 === 1,
					[styles.pinkTodoList]: router.pathname === '/mina-sparade-listor' && index % 2 === 0,
					[styles.blueTodoList]: router.pathname === '/mina-sparade-listor' && index % 2 === 1,
					[styles.showListObject]: index === listObjectIndex,
				})} 
				key={index}
			>
				{ 
					index < 5 && list.numberOfClicks > 0 &&  <p className={styles.favouriteNumber}>{`favorit nr: ${index+1}`}</p>
				}
			{
				<div className={clsx(styles.hoverDescription, {[styles.showDescription]: showHover === true})}>{list.description && list.description.length > 0 && list.description} {list.numberOfClicks}</div> 
			}
			{
				router.pathname !== '/mina-tomater' ? (
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
			{ showListObject && index === listObjectIndex && (
				<div className={clsx(styles.optionsDiv, {
						[styles.visibleFirst]: showListObject, 
					})}
				>
				{showListObject && (
					<div className={styles.btnContainer}>
						{router.pathname === '/mina-tomater' ? (
						<>
							<article className={clsx(styles.iconBtn, styles.iconSettings)} onClick={() => handleShowSettings()} />
							<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleShowAddtolist()} />
							<DeleteButton listItem={currentState.currentItem} size={'large'} />
							<PlayTimerBtn size={'large'} listItem={list} />
						</>
						) : (
						<>
							<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleShowAddtolist()} />
							<DeleteButton listItem={currentState.currentItem} size={'large'} closeOverlay={closeOverlay} />
						</>
						)}
					</div>
				)}
				</div>
			)}
		</div>
	);
};

export default LibraryArchiveObj;

