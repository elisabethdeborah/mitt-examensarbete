
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/todoList.module.scss';
import SaveList from '../svgAssets/save-list.svg';
import clsx from 'clsx';
import AddTodoForm from './AddTodoForm';
import AddTodo from '../svgAssets/addBtn.svg';
import DeleteButton from './DeleteButton';
import ListObj from './ListObj';

const TodoList = ({list}) => {
	const [addTodoFormIsVisible, setAddTodoFormIsVisible] = useState(false);
	const sectionRef = useRef();
	const [width, setWidth] = useState();
	const getListSize = () => {
		const newWidth = sectionRef.current.clientWidth;
		setWidth(newWidth);
	}

	useEffect(() => {
		getListSize();
		window.addEventListener("resize", getListSize);
		return () => {
			window.removeEventListener("resize", getListSize);
		}

	  }, []);

	return (
		list? (
			<section className={styles.todoListSection} key={list._rev} ref={sectionRef}>
				{list._id && 
				<div className={styles.todolistContainer}>
					<div className={styles.todoListTop}>
						<h2 className={styles.todolistHeader}>{list.title}</h2> 
						<SaveList className={styles.saveIcon} />
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
					list.combinedLists.map((listItem) => <ListObj key={listItem.id} listItem={listItem} width={width} />)
				): (
					<AddTodoForm currentListDocId={list._id} addTodoFormIsVisible={addTodoFormIsVisible} setAddTodoFormIsVisible={setAddTodoFormIsVisible} />
				)}
				</div>
				}
			</section>
		) : null
	)
};

export default TodoList;