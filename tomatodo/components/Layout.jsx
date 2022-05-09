import React, { useState, useEffect, useRef } from 'react';
import Meta from './Meta';
import styles from '../styles/Layout.module.scss';
import Header from './Header';
import {useTodoContext, useUpdateContext} from "../context/TodoContext";
import { useUserStore } from '../context/UserStore';
import Message from './Message';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import User from './User';
import Resize from './Resize';
import Cookies from 'js-cookie';
import LimboLists from './Lists/LimboListsComponent';
import PopupLists from '../components/Lists/PopupLists';
import DeletePopup from './Lists/DeletePopup';

const Layout = ({ children }) => {
	const router = useRouter();
	const todoState = useTodoContext();
	const currentState = useUpdateContext();
	const [fadeIn, setFadeIn] = useState(false);
	const { state, dispatch } = useUserStore();
	const { userInfo } = state;
	const [width, setWidth] = useState(); 
	const [limbo, setLimbo] = useState(null);
	const sectionRef = useRef();

	useEffect(() => {
		if (userInfo) {
			todoState.fetchTodos();
		} 
  	}, []);

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			setFadeIn(false);
		};
	
		const handleRouteChangeOff = (url, { shallow }) => {
			setFadeIn(true);
		};
		router.events.on('routeChangeStart', handleRouteChange);
		router.events.on('routeChangeComplete', handleRouteChangeOff);
	
		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
		  router.events.off('routeChangeStart', handleRouteChange)
		  router.events.off('routeChangeComplete', handleRouteChangeOff)
		};
	}, [router.events]);

	useEffect(() => {
		if (todoState.initialFetch && todoState.initialFetch.limboLists) {
		setLimbo(todoState.initialFetch.limboLists);
		todoState.initialFetch.limboLists[0] ? currentState.setOverlay(true) : null;
		} else {
			setLimbo(false);
		};
		console.log('limbo', limbo)
	}, [todoState.initialFetch]);

	const logOut = () => {
		dispatch({ type: 'USER_LOGOUT' });
		Cookies.remove('userInfo');
		router.replace('/login');
	};

	useEffect(() => {
		if (!userInfo) {
			if ( router.pathname !== '/register') {
				router.replace('/login');
			}
		}
  	}, [userInfo, router.pathname]);

	  useEffect(() => {
		  if ( currentState.listitem && !currentState.overlay) { //router.pathname !== 'mina-tomater' || router.pathname !== 'mina-todos'
			  currentState.listitem ?
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10): null;
		  }
		currentState.listitem ?
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10): null;
		return () => currentState.closeOverlay();
	}, [currentState.listitem]);
	
	return (
		<div className={styles.container}>
			<div onClick={() => {
				currentState.closeOverlay();
					currentState.setPopupIsOpen(false);
					currentState.setListitem(null);
				}} 	
				className={clsx(styles.showOverlay, {[styles.overlayVisible]: currentState.overlay})} ref={sectionRef}/>
				<Meta />
				<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
				{
					width > 599 && <User userInfo={userInfo} logOut={logOut} />
				}
				
				<Header width={width} />
				<main className={clsx(styles.main, {[styles.pageLoading]: fadeIn})}>
				{
					limbo && (
						limbo.map((list) => <LimboLists key={list._rev} list={list} />)
					)
				}
				{
					currentState.popupIsOpen && (
						<PopupLists />
					)
				}
				{currentState.listitem && (
					<DeletePopup listItem={currentState.listitem} />
				)}
				{ 
					todoState.fetchRes.show ? 
						<Message text={todoState.fetchRes.res ? `${todoState.fetchRes.type} "${todoState.fetchRes.title}" ${todoState.fetchRes.action}!` : `Nåt gick fel`} response={todoState.fetchRes.res} setFetchRes={todoState.setFetchRes} /> : null
				}
					{children}
				</main>
		</div>
	);
};

export default Layout;