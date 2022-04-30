import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/todoList.module.scss';
import AddTodo from '../../svgAssets/addBtn.svg';
import DeleteButton from './DeleteButton';
import ListObj from './ListObj';
import Form from '../Forms/Form';
import Resize from '../Resize';
import { useUpdateContext, useTodoContext } from "../../context/TodoContext";
import LimboLists from "./LimboListsComponent";

const TodoList = ({list,setOverlay}) => {
	const [addTodoFormIsVisible, setAddTodoFormIsVisible] = useState(false);
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const sectionRef = useRef();
	const [width, setWidth] = useState(); 
	const [isLoading, setIsLoading] = useState(false);
	const state = useTodoContext();
	const currentState = useUpdateContext();
	let limboLists;
	const [displayWarning, setDisplayWarning] = useState(limboLists && limboLists.length > 0);

	if (state.initialFetch) {
		limboLists = state.initialFetch.allTodoLists.filter(x => x.numberOfNotChecked === 0 && !x.saved && x.nrOfTodos > 0);
	};

	const handleClickTodo = () => {
			setAddListFormIsVisible(false);
			setAddTodoFormIsVisible(true);
			currentState.setCurrentItem(null);
	}; 

	const handleClickList = () => {
			setAddTodoFormIsVisible(false);
			setAddListFormIsVisible(true);
	}; 

	useEffect(() => {
		setIsLoading(true);
		return () => setIsLoading(false);
	}, []);

	useEffect(() => {
		list && list.todos ? setIsLoading(false) : setIsLoading(true);
		limboLists ? setDisplayWarning(true): null;
		return () => setIsLoading(false);
	}, [list, state.initialFetch]);

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
				{
					displayWarning && 
					<div className={styles.limboListContainer}>
						{limboLists && limboLists.map((x) => <LimboLists key={x._id} list={x} setDisplayWarning={setDisplayWarning} />)}
					</div>
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