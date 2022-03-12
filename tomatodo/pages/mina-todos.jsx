import React, { useEffect, useState } from "react";

import ActiveLists from "../components/ActiveLists";
import SavedLists from "../components/SavedLists";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import TodoList from "../components/TodoList";
import styles from "../styles/minaTodos.module.scss";
import clsx from "clsx";


import {useUpdateContext, useTodoContext} from "../context/TodoContext"

import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";

import { groq } from "next-sanity";
import Form from "../components/Form"; 


export default function MinaTodos() {
	<Meta title='Mina todos' />
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	
	const [sideListVisible, setSideListsVisible] = useState(true);
	const [flexDirection, setFlexDirection] = useState(false);

	const [showAddTodo, setShowAddTodo] = useState(false);

	const state = useTodoContext()
	const currentState = useUpdateContext()
	const fetchAllLists = state.fetchTodos;
	///
	//const { postdata, preview } = props;

	const router = useRouter();
  
	/* const { data: posts } = usePreviewSubscription(query, {
		initialData: postdata,
		enabled: preview || router.query.preview !== undefined,
	  }); */

	  let activeLists;
	  let savedLists;
	  let titles;

	  if (state.initialFetch) {
		activeLists = state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0);
		savedLists = state.initialFetch.allTodoLists.filter(x => x.saved && x.numberOfNotChecked === 0);
		titles = activeLists.map(x => x.title);
	  }
	
	const [open, setOpen] = useState(0); 

	const handleSideListArrow = () => {
		setFlexDirection(true)
		setTimeout(() => {
			setSideListsVisible(true)
		}, 600);
		
	}

	useEffect(() => {
		fetchAllLists()

	}, [])


	useEffect(() => {
		currentState.currentItem ? setOpen(titles.findIndex(x => x === currentState.currentItem.title)):setOpen(0);
	}, [currentState.currentItem])


	const handleClick = () => {
		
		if (addListFormIsVisible) {
			setShowAddTodo(false)
			console.log('click', addListFormIsVisible)
			setTimeout(() => {
				setAddListFormIsVisible(false)
			}, 600)
		} else if (!addListFormIsVisible){
			setShowAddTodo(false)
			setAddListFormIsVisible(true)
		}		
	} 


	return (
		<div className={clsx(styles.todoPageWrapper, {
			[styles.sideListVisible]: sideListVisible,
			[styles.changeFlex]: flexDirection,
			})}>
			<Meta title='Mina todos' />
			
				{
				!sideListVisible && (
				<aside className={styles.optionContainer} onClick={() => handleSideListArrow()} >
					<p>Visa fler listor</p>
					<AddTodo className={styles.addTdodoSvg} />
				</aside>)
				} 
			{
			<section className={clsx(styles.sideListContainer, {[styles.sideLists]: sideListVisible})}>
				<ActiveLists lista={activeLists} setSideListsVisible={setSideListsVisible} setOpen={setOpen} open={open} page={'todo'} />
				<SavedLists lista={savedLists} setSideListsVisible={setSideListsVisible} setOpen={setOpen} open={open}  page={'todo'} />
			</section>
			}
			<div className={styles.todoListWrapper}>
				{
				addListFormIsVisible && (
					<Form setFormIsVisible={setAddListFormIsVisible} objectType={'todoList'} method={'POST'} typeName={'lista'} /* setOverlay={setOverlay} *//>)
				}
				
				{
					activeLists? (
						activeLists.map((lista, index) => (
								open === index && (
								<TodoList key={lista._id} list={lista} />
								)
							))
					)
					: 
					<section className={styles.emptyList}>
						<div className={styles.todoListTop} />
						<article className={styles.addListIconBtn} onClick={() => handleClick()} />
						<h3>Du har inga pågående listor</h3>
					</section>
						
				}
			</div>
		</div>
	)
};
/* 
const query = groq`
{
	"allTodoLists": * [_type == "todoList"] | order(_createdAt desc) { 
	  title,
	  saved,
	  "todos": * [_type == "todo" && todoList._ref == ^._id]{..., "slug": slug.current}+[...list]{..., "slug": slug.current},
	  "nrOfTodos": count(* [_type == "todo" && todoList._ref == ^._id]{checked} +[...list]{checked}),
	  'numberOfChecked': count([...list[checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][checked]),
	  'numberOfNotChecked': count([...list[!checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][!checked]),
	  ...,
	  },
  }`;


export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(query);

  return {
    props: {
		postdata: post,
		preview,
	  },
    revalidate: 10,
  };
}
 */