import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles/listContainer.module.scss';
import clsx from 'clsx';
import {useUpdateContext} from "../../context/TodoContext";
import { useRouter } from "next/router";
import SmallListObj from './SmallListObj';
import PopupLists from './PopupLists';

const ListContainer = ({ itemType, setSideListsVisible, open, list }) => {
	const currentState = useUpdateContext();
	const router = useRouter();
	const [contentIsVisible, setContentIsVisible] = useState(router.pathname === '/'  && itemType === "todos" || router.pathname === '/mina-tomater' && itemType === "tomater" || router.pathname === '/mina-sparade-listor' && itemType === 'sparade-listor');
	
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	//const [overlay, setOverlay] = useState(false);

	useEffect(() => {
		popupIsOpen ? currentState.setOverlay(true) : null;
	}, [popupIsOpen]);

	return (
		<>
			{
				popupIsOpen && (
					<PopupLists setPopupIsOpen={setPopupIsOpen} />
				)
			}
			<div className={clsx(styles.listContainer, {
				[styles.showContent]: contentIsVisible,
				[styles.homePage]: router.pathname === '/',
				[styles.tomatoPage]: router.pathname === '/mina-tomater',
				[styles.todolistPage]: router.pathname === '/mina-todos',
				[styles.savedListsPage]: router.pathname === '/mina-sparade-listor',
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
						router.pathname === '/mina-todos' && (
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
								router.pathname === '/mina-todos' && !item.saved ? (
									open !== index && (
										<SmallListObj contentIsVisible={contentIsVisible} key={item._id} item={item} listObjIndex={index} />
									)
								) : (
									<SmallListObj setPopupIsOpen={setPopupIsOpen} contentIsVisible={contentIsVisible} key={item._id} item={item} listObjIndex={index} />
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
