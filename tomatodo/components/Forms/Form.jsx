import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../../context/TodoContext";
import TimeInput from "./TimeInput";
import { validateName, submitClick, calculateTime } from "./formFunctions";
import { useUserStore } from '../../context/UserStore';
import { useRouter } from "next/router";

const Form = ({ objectType, method, currentListDocId, defaultTime }) => {
	const router = useRouter();
	const todoState = useTodoContext();
	const currentState = useUpdateContext();
	const { state, dispatch } = useUserStore();
	const { userInfo } = state;

	const [userInputName, setUserInputName] = useState(currentState.currentItem? currentState.currentItem.title: '');
	const [userInputText, setUserInputText] = useState(currentState.currentItem && currentState.currentItem.description ? currentState.currentItem.description : '');
	const [userInputTime, setUserInputTime] = useState(0);
	const [errMessage, setErrMessage] = useState('');
	const [inputTime, setInputTime] = useState(0);
	const [nrClicks, setNrClicks] = useState(currentState.currentItem ? currentState.currentItem.numberOfClicks : 0);
	const [body, setBody] = useState({title: userInputName, description: userInputText, time: inputTime, userId: userInfo._id, numberOfClicks: nrClicks});

	let header;
	
	//set header to tomato's title
	if (method === "PUT" && currentState.currentItem) {
		header = currentState.currentItem? currentState.currentItem.title : `Namn på ${objectType}`
	};

	//format time when creating/updating tomato or when creating todo
	useEffect(() => {
		const calc = calculateTime(defaultTime, currentState);
		setUserInputTime(calc); 
		method === 'POST' && objectType === 'todo' && setBody((body) => ({...body, parentRef: currentListDocId}));
		method === 'PUT' && setBody((body) => ({...body, id: currentState.currentItem._id}));
		return () => setUserInputTime(0);
	}, []);

	//open overlay when form is opened, except in /mina-tomater or /mina-sparade-listor
	//close overlay when form is closed, except in /mina-tomater or /mina-sparade-listor
	useEffect(() => {
		if (router.pathname !== '/mina-tomater' && router.pathname !== '/mina-sparade-listor') {
			setTimeout(() => {
				currentState.setOverlay(true);
			}, 10);
			return () => {
				currentState.setOverlay(false);
			};
		};
	}, []);

	
	useEffect(() => {
		const validTime = typeof userInputTime.hh || typeof userInputTime.min === 'number' ? Number(userInputTime.hh *60 * 60 + userInputTime.min*60) : null;
		validTime ? setInputTime(validTime) : setInputTime(0);
		validTime ? setBody((body) => ({...body, time: validTime})) : setBody((body) => ({...body, time: 0}));
	}, [userInputTime]);

//remove error message when input is changed
	useEffect(() => {
		setErrMessage("");
	}, [body]);

	//fetch lists avter submit, reset everything after submit, except for in /mina-tomater or /mina-sparade-listor
	const postFetch = () => {
		todoState.fetchTodos();
		if (router.pathname !== '/mina-tomater' && router.pathname !== '/mina-sparade-listor')  {
			setBody({title: userInputName, description: userInputText, time: inputTime, user: userInfo._id, numberOfClicks: nrClicks});
			setUserInputName('');
			setUserInputTime(0);
			setUserInputText('');
			setErrMessage('');
			currentState.handleGoBack();
			currentState.setCurrentItem(null);
			setTimeout(() => {
				currentState.setOverlay(false);
			}, 400);
		};
	};

	const handleSubmit = () => {
		const checkValid = validateName(body);
		if (checkValid === "valid") {
			if (objectType === 'tomato' || objectType === 'todoList') {
				submitClick(objectType, body, method, todoState);
			} else {
				submitClick(objectType, body, method, todoState);
			}

			postFetch(currentState);
			closeForm();
		} else {
			setErrMessage(checkValid);
		};
	};

	const closeForm = () => {
		if (router.pathname !== '/mina-tomater' && router.pathname !== '/mina-sparade-listor') {
			currentState.handleGoBack();
		} else {
			currentState.handleGoBack();
		};
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
			objectType === 'tomato' && router.pathname !== '/mina-tomater' && (
			<aside className={styles.smallTomato} />
			)
		}
			<h1 className={styles.formHeader}>
				{header? `Redigera\n ${header}`: `Ny ${objectType}`}
			</h1>
		{
			objectType !== 'todoList' && method !== 'POST' && currentState.currentItem && currentState.currentItem.title ? (
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
			<div className={styles.errMessageContainer}>
				<p className={styles.errMessage}>{errMessage}</p>
			</div>
			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => closeForm()} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit()} />
			</div>
		</section>
	);
};

export default Form;

