import React, { useEffect, useState, useRef } from 'react';
import Meta from "../components/Meta";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.scss';
import { useUserStore } from '../context/UserStore';
import {useTodoContext} from "../context/TodoContext"
import ListContainer from "../components/Lists/ListContainer";
import Resize from '../components/Resize';

export default function Start() {
	const sectionRef = useRef();
	const [width, setWidth] = useState(); 
	const [open, setOpen] = useState(0); 
	const [isLoading, setIsLoading] = useState(false);
	const { state, dispatch } = useUserStore();
	const { userInfo } = state;
	const router = useRouter();
	const [lists, setLists] = useState({activeLists: null, savedLists: null, tomatoLibrary: null});

 	const todoState = useTodoContext();
 
	useEffect(() => {
		if (userInfo) {
			setIsLoading(true);
			todoState.fetchTodos();
		} 
  	}, []);

	  useEffect(() => {
		if (todoState.initialFetch) {
			setLists({activeLists: todoState.initialFetch.activeLists, savedLists: todoState.initialFetch.savedLists, tomatoLibrary: todoState.initialFetch.tomatoLibrary})
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}; 
		return () => setIsLoading(false);
	}, [todoState.initialFetch]);

  	return (
		  <>
		  <Meta title='Start' />
		  {
			isLoading ? (
				<h1>laddar...</h1> 
			):(
				<div className={styles.container}>
				<div className={styles.wrapper} ref={sectionRef}>	
					<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
					{width > 600 ?( <>
						<ListContainer key='tomatoListLg' itemType={'tomater'} setOpen={setOpen} open={open} page={'home'} list={lists.tomatoLibrary} setAddListFormIsVisible />
						<ListContainer key='currentListLg' itemType={'todos'} setOpen={setOpen} open={open} page={'home'} index={2} list={lists.activeLists} setAddListFormIsVisible />
						<ListContainer key='savedListsLg' itemType={'sparade-listor'} setOpen={setOpen} open={open} page={'home'} list={lists.savedLists} setAddListFormIsVisible />
					</> ) : ( <> 
						<ListContainer key='tomatoList' itemType={'tomater'} setOpen={setOpen} open={open} page={'home'} list={lists.tomatoLibrary} setAddListFormIsVisible />
						<ListContainer key='savedList' itemType={'sparade-listor'} setOpen={setOpen} open={open} page={'home'} list={lists.savedLists} setAddListFormIsVisible />
						<ListContainer key='currentList' itemType={'todos'} setOpen={setOpen} open={open} page={'home'} index={2} list={lists.activeLists} setAddListFormIsVisible />
					</> )}
				</div>
			</div>
		)
		}
		</>
  	);
};
