
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

const TodoList = ({list}) => {
	const [addTodoFormIsVisible, setAddTodoFormIsVisible] = useState(false);
	const sectionRef = useRef();
	const [width, setWidth] = useState();

	return (
		list? (
			<section className={styles.todoListSection} key={list._rev} ref={sectionRef}>
				<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
				{list._id && 
				<div className={styles.todolistContainer}>
					<div className={styles.todoListTop}>
						<h2 className={styles.todolistHeader}>{list.title}</h2> 
						<SaveListBtn list={list} />
						<DeleteButton color={'orange'} listItem={list} />
					</div>
					{
					!addTodoFormIsVisible && (
						<button className={styles.addTodoList} onClick={() => setAddTodoFormIsVisible(true)} >
							<h3>Lägg till todo</h3>
							<AddTodo className={styles.addTdodoSvg} />
						</button>
					)}
				
				{!addTodoFormIsVisible && list.combinedLists ? (
					list.combinedLists.map((listItem, index) => 
					<ListObj key={index} listItem={listItem} width={width &&(width)} />
					)
				): (
					<Form setFormIsVisible={setAddTodoFormIsVisible} objectType={'todo'} method={'POST'} currentListDocId={list._id} />
				)}
				</div>
				}
			</section>
		) : null
	)
};

export default TodoList;


					{/* <AddTodoForm currentListDocId={list._id} addTodoFormIsVisible={addTodoFormIsVisible} setAddTodoFormIsVisible={setAddTodoFormIsVisible} /> */}