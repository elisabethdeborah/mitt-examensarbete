import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../../context/TodoContext";
import TimeInput from "./TimeInput";
import { validateName, submitClick, calculateTime } from "./formFunctions";

const Form = ({ objectType, method, currentListDocId, defaultTime, page }) => {
	
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;

	const [userInputName, setUserInputName] = useState(currentState.currentItem? currentState.currentItem.title: '');
	const [userInputText, setUserInputText] = useState(currentState.currentItem && currentState.currentItem.description ? currentState.currentItem.description : '');
	const [userInputTime, setUserInputTime] = useState(0);
	const [errMessage, setErrMessage] = useState('');
	const [inputTime, setInputTime] = useState(0);
	const [body, setBody] = useState({title: userInputName, description: userInputText, time: inputTime});
	
	let header;
	
	if (method === "PUT" && currentState.currentItem) {
		header = currentState.currentItem? currentState.currentItem.title : `Namn på ${objectType}`
	};

	useEffect(() => {
		const calc = calculateTime(defaultTime, currentState);
		setUserInputTime(calc); 
		method === 'POST' && objectType === 'todo' && setBody((body) => ({...body, parentRef: currentListDocId}));
		method === 'PUT' && setBody((body) => ({...body, id: currentState.currentItem._id}));
		return () => setUserInputTime(0);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10);
		return () => currentState.setOverlay(false);
	}, []);

	useEffect(() => {
		setErrMessage("");
		const validTime = typeof userInputTime.hh || typeof userInputTime.min === 'number' ? Number(userInputTime.hh *60 * 60 + userInputTime.min*60) : null;
		validTime ? setInputTime(validTime) : setInputTime(0);
		validTime ? setBody((body) => ({...body, time: validTime})) : setBody((body) => ({...body, time: 0}));
	}, [userInputTime]);

	const postFetch = () => {
		fetchAllLists();
		if (page !== 'archive')  {
		setBody({title: userInputName, description: userInputText, time: inputTime});
		setUserInputName('');
		setUserInputTime(0);
		setUserInputText('');
		setErrMessage('');
		currentState.handleGoBack();
		currentState.setCurrentItem(null);
		};
		setTimeout(() => {
			currentState.setOverlay(false);
		}, 600);
	};

	const handleSubmit = () => {
		const checkValid = validateName(body);
		if (checkValid === "valid") {
			submitClick(objectType, body, method, state);
			postFetch(currentState);
		} else {
			setErrMessage(checkValid);
		}
	};

	return (
		<section 
			className={clsx(styles.formContainer, {
				[styles.tomatoFormContainer]: objectType === 'tomato',
				[styles.todoFormContainer]: objectType === 'todo',
				[styles.todoListFormContainer]: objectType === 'todoList',
			})}
		>	
			{
				objectType === 'tomato' && page !== 'archive' && (
				<aside className={styles.smallTomato} />
				)
			}
				<h1 className={styles.formHeader}>
					{header? `Redigera\n ${header}`: `Ny ${objectType}`}
				</h1>
				{
					objectType !== 'todoList' && currentState.currentItem && currentState.currentItem.title ? (
					<input 
						type="text" 
						className={clsx(styles.input, styles.textInput)} 
						value={body.title} 
						onChange={(e) => setBody((body) => ({...body, title: e.target.value}))}
					/>
					) : (
					<input 
						type="text" 
						className={clsx(styles.input, styles.textInput)} 
						placeholder={`Namn på ${objectType}`} 
						onChange={(e) => setBody((body) => ({...body, title: e.target.value}))}
					/>)
				}
			{
				objectType !== 'todoList' && (
					<>
					{
						currentState.currentItem && currentState.currentItem.description ? (
							<input 
								type="text" 
								className={clsx(styles.input, styles.textInput)} 
								value={body.description} 
								onChange={(e) => setBody((body) => ({...body, description: e.target.value}))}
							/>) : (
							<input 
								type="text" 
								className={clsx(styles.input, styles.textInput)} 
								placeholder={"Beskrivning"} 
								onChange={(e) => setBody((body) => ({...body, description: e.target.value}))}
							/>)
						}
						<TimeInput userInputTime={userInputTime} setUserInputTime={setUserInputTime} setBody={setBody} body={body} inputTime={inputTime} />
					</>
				)
			}
			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => currentState.handleGoBack()} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit()} />
			</div>
			{errMessage}
		</section>
	);
};

export default Form;

