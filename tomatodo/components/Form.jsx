import React, { useState, useEffect } from "react";
import styles from '../styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";


const Form = ({ setFormIsVisible, objectType, method, currentListDocId, defaultTime, page, setInputTime }) => {
	
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	const [userInputName, setUserInputName] = useState(currentState.currentItem? currentState.currentItem.title: '');
	const [userInputText, setUserInputText] = useState(currentState.currentItem && currentState.currentItem.description ? currentState.currentItem.description : '');
	const [userInputTime, setUserInputTime] = useState(0);
	const [errMessage, setErrMessage] = useState('');
	const [overlay, setOverlay] = useState(false);

	
	let header;

	const calculateTime = () => {
		//let initialTime = 0;
		let initialObjTime = 0;
	
		if ( defaultTime ) {
			initialObjTime = Number(defaultTime);
		} else if (currentState.currentItem && currentState.currentItem.time) {
			initialObjTime = Number(currentState.currentItem.time);
		}; 
		
		let calcHours = Math.floor(initialObjTime/60/60);
		let calcMinutes = Math.round(initialObjTime/60) % 60;
		let initialTime = {
			hh: calcHours, min: calcMinutes
		}; 
		setUserInputTime(initialTime); 
	};
	

	useEffect(() => {
		calculateTime();
		setTimeout(() => {
			setOverlay(true);
		}, 10);
		return () => setOverlay(false);
	}, []);

	let hours = [];
	for (let index = 0; index < 24; index++) {
		hours.push(index);
	};

	const mins = [];
	for (let index = 0; index < 60; index++) {
		mins.push(index);
	};

	

	const createEndpoint = () => {
		if (objectType === 'todo') {
			return '/api/todos/todo';
		} else if (objectType === 'todoList') {
			return '/api/todos/todolist'; 
		} else if (objectType === 'tomato') {
			return '/api/tomatoes/tomato';
		};
	}; 
	
	const handleSubmit = async () => {
		const inputTime = typeof userInputTime.hh || typeof userInputTime.min === 'number' ? Number(userInputTime.hh *60 * 60 + userInputTime.min*60) : null;
		if (method === 'POST') {
		console.log(`POST ${objectType} formulär ${userInputName}, ${inputTime}, ${currentListDocId}`)
			if (userInputName.length == 0 ) {
				setErrMessage("Namnet måste vara minst 1 tecken lång.");
			} else if (typeof inputTime === 'number' && inputTime < 60 && inputTime > 86340) {
				setErrMessage("Tiden måste vara minst 1 minut och max 23 h 59 min.");
			} else {
				await fetch(createEndpoint(), {
					method: 'POST',
					body: JSON.stringify({
							title: userInputName,
							description: userInputText,
							time: inputTime ? inputTime : 0,
							parentRef: currentListDocId,
						}),
				})
				.then(console.log('POST posted'))
				.catch(error => {
					console.log('error:', error);
				})
				fetchAllLists();
				setUserInputName('');
				setUserInputTime(0);
				setUserInputText('');
				setErrMessage('');
				setOverlay(false);
				setTimeout(() => {
					setFormIsVisible(false);
				}, 600);
				currentState.setCurrentItem(null);
			}
		} else if (method === 'PUT') {
			if (objectType === 'tomato' ) { 
				console.log('Clicked state object id: ', currentState.currentItem._id, 'name:', currentState.currentItem.title)
				await fetch(createEndpoint(), {
					method: "PUT",
					body: JSON.stringify({
						id: currentState.currentItem._id,
						title: userInputName,
						description: userInputText,
						time: inputTime,
					}),
				})
				.then(console.log('PUT posted'))
				.catch(error => {
					console.log('error:', error);
				})
				fetchAllLists();
			} else if (currentState.currentItem) {
				await fetch(createEndpoint(), {
					method: "PUT",
					body: JSON.stringify({
						id: currentState.currentItem._id,
						title: userInputName,
						description: userInputText,
						time: inputTime,
					}),
				})
				.then(console.log('posted'))
				.catch(error => {
					console.log('error:', error);
				})
				fetchAllLists();
			};
			setUserInputName('');
			setUserInputTime(0);
			setUserInputText('');
			setErrMessage('');
			setOverlay(false);
			setTimeout(() => {
				setFormIsVisible(false);
			}, 600)
			currentState.setCurrentItem(null);
		} else if (objectType === 'inputCountdown') {
			setInputTime(inputTime*1000);
			setTimerState.setCurrentItem({title: userInputName, time: inputTime*1000});
			setUserInputName('');
			setUserInputTime(0);
			setUserInputText('');
			setErrMessage('');
			setOverlay(false);
			setTimeout(() => {
				setFormIsVisible(false);
			}, 600)
			currentState.setCurrentItem(null);
		};

		fetchAllLists();
		setUserInputName('');
		setUserInputTime(0);
		setUserInputText('');
		setErrMessage('');
		setOverlay(false);
		setTimeout(() => {
			setFormIsVisible(false);
		}, 600)
		currentState.setCurrentItem(null);
	};

	const handleGoBack = () => {
		setOverlay(false);
		setTimeout(() => {
			setFormIsVisible(false);
		}, 600);
		page !== 'archive' ?
		currentState.setCurrentItem(null) : null;
	}; 

	if (method === "POST" && currentState.currentItem ) {
		//header = currentState.currentItem? currentState.currentItem.title : `Namn på ${objectType}`
	} else if (method === "PUT" && currentState.currentItem) {
		header = currentState.currentItem? currentState.currentItem.title : `Namn på ${objectType}`
	};
	
	return (
		<>
			<div 
				onClick={() => handleGoBack()} 
				className={clsx(styles.showOverlay, {
					[styles.overlayVisible]: overlay, 
					[styles.archObj]: page === 'archive'
				})}
			/>
			<section 
				className={clsx(styles.formContainer, {
					[styles.tomatoFormContainer]: objectType === 'tomato',
					[styles.todoFormContainer]: objectType === 'todo',
					[styles.todoListFormContainer]: objectType === 'todoList',
					[styles.formIsVisible]: overlay,
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
					currentState.currentItem && currentState.currentItem.title ? (
						<input 
							type="text" 
							className={clsx(styles.input, styles.textInput)} 
							value={userInputName} 
							onChange={(e) => setUserInputName(e.target.value)} 
						/>
						) : (
						<input 
							type="text" 
							className={clsx(styles.input, styles.textInput)} 
							placeholder={`Namn på ${objectType}`} 
							onChange={(e) => setUserInputName(e.target.value)} 
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
									value={userInputText} 
									onChange={(e) => setUserInputText(e.target.value)} 
								/>) : (
								<input 
									type="text" 
									className={clsx(styles.input, styles.textInput)} 
									placeholder={"Beskrivning"} 
									onChange={(e) => setUserInputText(e.target.value)} 
								/>)
							}
						<div className={styles.timeInputContainer}>
							<select
								value={userInputTime.hh}
								onChange={({ target: { value } }) => setUserInputTime({hh: `${value}`, min: userInputTime.min})}
							>
								{
									hours.map((value, index) => (
										<option key={index} value={`${value}`}>
											{value<10? `0${value}`: `${value}`}
										</option>
									))
								}
							</select>
							<select
								value={userInputTime.min}
								onChange={({ target: { value } }) => setUserInputTime({hh: userInputTime.hh, min: `${value}`})}
							>
								{
									mins.map((value, index) => (
										<option key={index} value={`${value}`}>
											{value<10? `0${value}`: `${value}`}
										</option>
									))
								}
							</select>
						</div>
						</>
					)
				}
				
				<div className={styles.btnContainer}>
					<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => handleGoBack()} />
					<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit(objectType)} />
				</div>
				{errMessage}
			</section>
		</>
	);
};

export default Form;

