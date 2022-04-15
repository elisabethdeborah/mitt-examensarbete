
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/listContainer.module.scss';
import clsx from 'clsx';
import {useUpdateContext} from "../context/TodoContext";
import SmallListObj from './SmallListObj';
import PopupLists from './PopupLists';

const ListContainer = ({itemType, setSideListsVisible, open, page, list}) => {
	const currentState = useUpdateContext();
	const [contentIsVisible, setContentIsVisible] = useState(page === 'home'  && itemType === "todos" || page === 'tomato' && itemType === "tomater" || page === 'saved' && itemType === 'sparade-listor');
	
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const [overlay, setOverlay] = useState(false);

	useEffect(() => {
		popupIsOpen ? setOverlay(true):null;
	}, [popupIsOpen]);

	return (
		<>
			{
				popupIsOpen && (
					<PopupLists setPopupIsOpen={setPopupIsOpen} setOverlay={setOverlay} />
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
					<h4>{`Mina ${itemType.split('-').join(' ')}`}</h4>
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
							{`Gå till ${itemType.split('-').join(' ')}`}
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
