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
	const sectionRef = useRef();

	//fetch all logged in user's lists on mount
	useEffect(() => {
		if (userInfo) {
			todoState.fetchTodos();
		} 
  	}, []);

	 //smooth transitions between routes 
	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			setFadeIn(false);
		};
	
		const handleRouteChangeOff = (url, { shallow }) => {
			setFadeIn(true);
		};
		router.events.on('routeChangeStart', handleRouteChange);
		router.events.on('routeChangeComplete', handleRouteChangeOff);

		return () => {
		  router.events.off('routeChangeStart', handleRouteChange)
		  router.events.off('routeChangeComplete', handleRouteChangeOff)
		};
	}, [router.events]);

	//log out user
	const logOut = () => {
		dispatch({ type: 'USER_LOGOUT' });
		Cookies.remove('userInfo');
		router.replace('/login');
	};

	//if no user is logged in, redirect to login page, unless current page is "register"
	useEffect(() => {
		if (!userInfo) {
			if ( router.pathname !== '/register') {
				router.replace('/login');
			};
		};
  	}, [userInfo, router.pathname]);

	  //show/hide overlay
	  useEffect(() => {
		  if ( currentState.listitem && !currentState.overlay) {
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10);
		  }
	}, [currentState.listitem]);

	//close overlay by clicking outside of popup/form/tomato/saved list
	const hideOverlay = () => {
		if (currentState.limbo && !currentState.limbo[0] || !currentState.limbo ) {
			currentState.closeOverlay();
			currentState.setPopupIsOpen(false);
			currentState.setListitem(null);
		};
	};
	
	return (
		<div className={styles.container}>
			<div 
				onClick={() => hideOverlay()} 	
				className={clsx(styles.showOverlay, {
					[styles.overlayVisible]: currentState.overlay, 
					[styles.noHover]: currentState.limbo && currentState.limbo[0],
				})} 
				ref={sectionRef}
			/>
			<Meta />
			<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
			{ /* show user in topbar on larger screens */
			width > 599 && (
				<User userInfo={userInfo} logOut={logOut} />
			)}
			<Header width={width} />
			<main className={clsx(styles.main, {[styles.pageLoading]: fadeIn})}>
				{
				currentState.limbo && (
					currentState.limbo.map((list) => <LimboLists key={list._rev} list={list} />)
				)}
				{
				currentState.popupIsOpen && (
					<PopupLists />
				)}
				{
				currentState.listitem && (
					<DeletePopup listItem={currentState.listitem} />
				)}
				{ /* alert after post/update/delete */
				todoState.fetchRes.show && (
					<Message 
					text={todoState.fetchRes.res ? 
						`${todoState.fetchRes.type} "${todoState.fetchRes.title}" ${todoState.fetchRes.action}!` 
						: `Nåt gick fel`} 
					response={todoState.fetchRes.res} 
					setFetchRes={todoState.setFetchRes} 
					/> 
				)}
				{children}
			</main>
		</div>
	);
};

export default Layout;