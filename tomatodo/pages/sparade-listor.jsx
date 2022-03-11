import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import ActiveLists from "../components/ActiveLists";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import styles from "../styles/tomatoLibrary.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import NumberFormat from "../components/NumberFormat";
import LibraryArchiveObj from "../components/libraryArchiveObj";
import ListObj from "../components/ListObj";
import PlayBtn from "../components/PlayTimerBtn";
import DeleteButton from "../components/DeleteButton";
import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";

import { groq } from "next-sanity";

import {useUpdateContext, useTodoContext} from "../context/TodoContext";

export default function SparadeListor(props) {
	<Meta title='Mina sparade listor' />
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [showListObject, setShowListObject] = useState(false);
	const [listObjectIndex, setListObjectIndex] = useState();
	const [showSettingsForm, setShowSettingsForm] = useState(false);
	const [showAddTodo, setShowAddTodo] = useState(false);
	const [overlay, setOverlay] = useState(false)
	const [showStartList, setShowStartList] = useState(false);
	const [currentObj, setCurrentObj] = useState(null);
	const [addToListIsVisible, setaddToListIsVisible] = useState(false);
	
	const [showDelete, setShowDelete] = useState(false);
	const { postdata, preview } = props;

	

	const router = useRouter();
  
	const { data: posts } = usePreviewSubscription(query, {
		initialData: postdata,
		enabled: preview || router.query.preview !== undefined,
	  });
	  const state = useTodoContext()
	  const currentState = useUpdateContext()
	  const currentLists = posts.currentLists;
	  const savedLists = posts.savedLists;
	

	const handleClick = (x, item) => {
		console.log('currentItem:', currentState.currentItem, 'currentObj', currentObj)

		if (showListObject) {
			setCurrentObj(item)
			setOverlay(false)
			setShowAddTodo(false)
			setShowSettingsForm(false)
			setAddListFormIsVisible(false)
			setaddToListIsVisible(false)
			setTimeout(() => {
			setShowListObject(false)
			listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null)
			}, 600)
		} else if (!showListObject){

			setShowListObject(true)
			setShowAddTodo(false)
			setAddListFormIsVisible(false)

			listObjectIndex !== x ? setListObjectIndex(x) : setListObjectIndex(null)
		setTimeout(() => {
			setOverlay(true)
			}, 10);
		}	
	}  



	const handleAddToTodo = (list) => {
		setShowSettingsForm(false)
		setAddListFormIsVisible(false)
		setShowAddTodo(!showAddTodo)
	}

	const handleStartTodoList = (list) => {
		setShowStartList(!showStartList)
		setaddToListIsVisible(!addToListIsVisible)
	}
	
	return (
		<div className={styles.tomatoPageWrapper}>
			<Meta title='Mina sparade listor' />
			{
			showDelete && (
				<DeleteButton list={currentState.currentItem} type={'deleteLg'} />
			)
			}
			{addToListIsVisible && (
				<Form setFormIsVisible={setAddListFormIsVisible} objectType={'todoList'}  method={'PUT'} typeName={'lista'} page={'sparade'} thisList={currentObj} />
			)}


			<div className={styles.libraryContainer}>
				<div className={styles.tomatoListTop}>
					<h2 className={styles.savedListsHeader}>Mina sparade listor</h2> 
				</div>
				{showListObject && (
				<div onClick={() => handleClick()} className={clsx(styles.showOverlay, {[styles.overlayVisible]: overlay})}/> )}
				
				 
				{savedLists ? 
					(savedLists.map((list, index) => {
					return (
						<LibraryArchiveObj  
							key={list._rev} 
							list={list} 
							index={index} 
							listObjectIndex={listObjectIndex} 
							showListObject={showListObject} 
							showSettingsForm={showSettingsForm} 
							showAddTodo={showAddTodo} 
							addListFormIsVisible={addListFormIsVisible} 
							setAddListFormIsVisible={setAddListFormIsVisible} 
							handleClick={handleClick}
							handleStartTodoList={handleStartTodoList}
							currentLists={posts.currentLists}
							overlay={overlay}
							handleAddToTodo={handleAddToTodo}

							setShowStartList={setShowStartList}
							setCurrentObj={setCurrentObj}
							setaddToListIsVisible={setaddToListIsVisible}
							setShowDelete={setShowDelete}
						/>
					)}
					
					)) 
					: 
					<h3>Du har inga sparade listor</h3>
				}
			</div>
		</div>
	)
};

const query = groq`{
		"savedLists": *[ _type == "todoList" && saved || _type == "library" ] {title, list, ..., "nrOfTodos": count(list)},
		
		"currentLists": *[_type == "todoList" && !saved]{
		title, _id, ...,
		'combinedLists': list + *[_type == 'todo' && references(^._id)],
		'nrOfTodos': count(list[] + *[_type == 'todo' && references(^._id)]),
		'numberOfNotChecked': count(*[_type == 'todo' && references(^._id) && !checked]) + count(list[!checked]),
		'numberOfChecked': count(*[_type == 'todo' && references(^._id) && checked]) + count(list[checked])
		},
			"tomatoLibrary": * [_type == "tomato"] {title, time, ...}
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
