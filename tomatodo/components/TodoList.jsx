
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/todoList.module.scss';
import SaveList from '../svgAssets/save-list.svg';
import clsx from 'clsx';
//import AddTodoForm from './AddTodoForm';
import AddTodo from '../svgAssets/addBtn.svg';
import DeleteButton from './DeleteButton';
import ListObj from './ListObj';
import SaveListBtn from './SaveListBtn';
import Form from './Form';
import Resize from '../components/Resize';

import dynamic from 'next/dynamic';

const TodoList = ({list,setOverlay}) => {
	const [addTodoFormIsVisible, setAddTodoFormIsVisible] = useState(false);
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const sectionRef = useRef();
	const [width, setWidth] = useState(); 

	//{console.log('listobj id', list._id)}

	const handleClickTodo = () => {
		//console.log('addTodoFormIsVisible', addTodoFormIsVisible, 'addListFormIsVisible', addListFormIsVisible )
			//setOverlay(false)
			setAddListFormIsVisible(false)
			setAddTodoFormIsVisible(true)
			/* setTimeout(() => {
				setAddTodoFormIsVisible(true)
			}, 600)	 */
	} 

	const handleClickList = () => {
	//	console.log('addTodoFormIsVisible', addTodoFormIsVisible, 'addListFormIsVisible', addListFormIsVisible )
			//setOverlay(false)
			setAddTodoFormIsVisible(false)
			setAddListFormIsVisible(true)
			/* setTimeout(() => {
				setAddListFormIsVisible(true)
			}, 600)	 */
	} 

	return (
		list? (
			<section className={styles.todoListSection} key={list._rev} ref={sectionRef}>
				{
					addTodoFormIsVisible && !addListFormIsVisible &&(
					<Form setFormIsVisible={setAddTodoFormIsVisible} objectType={'todo'} method={'POST'} currentListDocId={list._id} setOverlay={setOverlay} typeName={'todo'} />
					)}
					{addListFormIsVisible && !addTodoFormIsVisible &&
					(<Form setFormIsVisible={setAddListFormIsVisible} objectType={'todoList'} method={'POST'} typeName={'lista'} setOverlay={setOverlay} />)
					}
				<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
				{list._id && 
				<div className={styles.todolistContainer}>
					<div className={styles.todoListTop}>
						<h2 className={styles.todolistHeader}>{list.title}</h2> 
						{/* <SaveListBtn list={list} /> */}
						<DeleteButton color={'orange'} listItem={list} />
					</div>
					<div className={styles.addBtnGroup}>
						<button className={styles.addTodoList} onClick={() => handleClickTodo()} >
							<h3>Ny todo</h3>
							<AddTodo className={styles.addTdodoSvg} />
						</button>
						<button className={styles.addTodoList} onClick={() => handleClickList()} >
							<h3>Ny lista</h3>
							<AddTodo className={styles.addTdodoSvg} />
						</button>
					</div>
					
				{list.todos.length >0 ?
					list.todos.map((listItem, index) => {
						//console.log('listItem i todolist map till listObj', listItem, 'id', listItem._id)
						return (

					<ListObj key={listItem._rev} listItem={listItem} width={width &&(width)} />
						)
					}
				): (
					<section className={styles.emptyList}>
						<article className={styles.addListIconBtn} onClick={() => setAddTodoFormIsVisible(true)} />
							<h3>Den här listan är tom.</h3>
					</section>
				)}
				</div>
				}
			</section>
		) : null
	)
};

export default TodoList;
