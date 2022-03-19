
import React, { useState, useRef } from 'react';
import styles from '../styles/todoList.module.scss';
import AddTodo from '../svgAssets/addBtn.svg';
import DeleteButton from './DeleteButton';
import ListObj from './ListObj';
import Form from './Form';
import Resize from '../components/Resize';

const TodoList = ({list,setOverlay}) => {
	const [addTodoFormIsVisible, setAddTodoFormIsVisible] = useState(false);
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const sectionRef = useRef();
	const [width, setWidth] = useState(); 
	const [isLoading, setIsLoading] = useState(false);

	const handleClickTodo = () => {
			setAddListFormIsVisible(false);
			setAddTodoFormIsVisible(true);
	}; 

	const handleClickList = () => {
			setAddTodoFormIsVisible(false);
			setAddListFormIsVisible(true);
	}; 

	return (
		list? (
			<section className={styles.todoListSection} key={list._rev} ref={sectionRef}>
				{ 
					addTodoFormIsVisible && !addListFormIsVisible && (
						<Form 
							setFormIsVisible={setAddTodoFormIsVisible} 
							objectType={'todo'} 
							method={'POST'} 
							currentListDocId={list._id} 
							setOverlay={setOverlay} 
							typeName={'todo'} 
						/>
					)
				}
				{ 
					addListFormIsVisible && !addTodoFormIsVisible && (
						<Form 
							setFormIsVisible={setAddListFormIsVisible} 
							objectType={'todoList'} 
							method={'POST'} 
							typeName={'lista'} 
							setOverlay={setOverlay} 
						/>
					)
				}
				<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
				{ 
					list._id && (
						<div className={styles.todolistContainer}>
							<div className={styles.todoListTop}>
								<h2 className={styles.todolistHeader}>
									{list.title}
								</h2> 
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
							{ 
								isLoading ? (
									"hämtar todos..."
								) : (	
									list.todos.length >0 ? (
										list.todos.map((listItem, index) => {
											return (
												<ListObj key={listItem._rev} listItem={listItem} width={width &&(width)} />
											)
										})
									) : (
										<section className={styles.emptyList}>
											<article className={styles.addListIconBtn} onClick={() => setAddTodoFormIsVisible(true)} />
											<h3>Den här listan är tom.</h3>
										</section>
									)
								)
							}
						</div>
					)
				}
			</section>
		) : null
	);
};

export default TodoList;
