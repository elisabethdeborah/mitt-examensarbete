import React, { useState, useEffect, useRef } from 'react';
import Meta from './Meta';
import styles from '../styles/Layout.module.scss';
import Header from './Header';
import {useTodoContext, useUpdateContext} from "../context/TodoContext";
import Message from './Message';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const Layout = ({children}) => {
	const router = useRouter();
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			setFadeIn(false);
		}
	
		const handleRouteChangeOff = (url, { shallow }) => {
			setFadeIn(true);
		}
		router.events.on('routeChangeStart', handleRouteChange)
		router.events.on('routeChangeComplete', handleRouteChangeOff)
	
		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
		  router.events.off('routeChangeStart', handleRouteChange)
		  router.events.off('routeChangeComplete', handleRouteChangeOff)
		}
	  }, [router.events])

	return (
		<div className={styles.container}>
			<div onClick={
				router.pathname === '/mina-tomater' || router.pathname === '/mina-sparade-listor' ?  
				() => currentState.setOverlay(false) :
				() => currentState.handleGoBack(false)
			} 
			
				
				className={clsx(styles.showOverlay, {[styles.overlayVisible]: currentState.overlay})}/>
				<Meta />
				<Header />
				<main className={clsx(styles.main, {[styles.pageLoading]: fadeIn})}>
				{ 
					state.fetchRes.show ? 
						<Message text={state.fetchRes.res ? `${state.fetchRes.type} "${state.fetchRes.title}" ${state.fetchRes.action}!` : `Nåt gick fel`} response={state.fetchRes.res} setFetchRes={state.setFetchRes} /> : null
				}
					{children}
				</main>
		</div>
	);
};

export default Layout;