import React, { useState, useEffect } from "react";
import styles from '../styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";

const Form = ({className, setFormIsVisible, objectType, typeName, method, currentListDocId, defaultTime, page, setInputTime, thisList }) => {
	console.log('form item:', currentListDocId)
	const state = useTodoContext()
	const currentState = useUpdateContext()
	const fetchAllLists = state.fetchTodos;

  let initialTime;

  let initialObjTime;
  
	if ( defaultTime ) {
		initialObjTime = defaultTime;
	} else if (currentState.currentItem && currentState.currentItem.time) {
		initialObjTime = currentState.currentItem.time;
	} 
	console.log(initialTime, initialObjTime, Number(initialObjTime)*1000)


	if (Number(initialObjTime)*1000 > 0) {
		let time = Number(initialObjTime);
		let hours = Math.floor(time/60/60);
		let minutes = (Math.floor(time/60) % 60);
		console.log(time, hours, minutes)
		initialTime = {
			hh: hours, min: minutes
		} 
	}else {
		initialTime = {
			hh: 0, min: 0
		}
	}

	const [userInputName, setUserInputName] = useState('');
	const [userInputText, setUserInputText] = useState('');
	const [userInputTime, setUserInputTime] = useState(initialObjTime? initialTime : {hh: 0, min:0});
	const [errMessage, setErrMessage] = useState('');
	const [overlay, setOverlay] = useState(false)

	let hours = [];
	for (let index = 0; index < 24; index++) {
		hours.push(index)
	}
	const mins = [];
	for (let index = 0; index < 60; index++) {
		mins.push(index)
	}

	const inputTime = typeof userInputTime.hh || typeof userInputTime.min === 'number' ? Number(userInputTime.hh *60 * 60 + userInputTime.min*60) : null;

	const createEndpoint = () => {
		if (objectType === 'todo') {
			return '/api/todos/todo';
		} else if (objectType === 'todoList') {
			return '/api/todos/todolist'; 
		} else if (objectType === 'tomato') {
			return '/api/tomatoes/tomato';
		}
	} 

	
	const handleSubmit = async () => {
		if (method === 'POST') {
		console.log(`POST ${objectType} formulär ${userInputName}, ${inputTime}, ${currentListDocId}`)
			if (userInputName.length == 0 ) {
				setErrMessage("Namnet måste vara minst 1 tecken lång.");
			} else if (typeof inputTime === 'number' && inputTime < 30 && inputTime > 86340) {
				setErrMessage("Tiden måste vara mins 30 sekunder och max 23 h 59 min.");
			} else {
			await fetch(createEndpoint(), {
				method: 'POST',
				body: JSON.stringify({
					name: userInputName,
					description: userInputText,
					time: inputTime ? inputTime : 0,
					parentRef: currentListDocId,
					
				}),
			})
			
			.then(console.log('posted'))
			.catch(error => {
				console.log('error:', error);
			})
			fetchAllLists();
			
				setUserInputName('');
				setUserInputTime(0);
				setUserInputText('');
				setErrMessage('');
				setOverlay(false)
				setTimeout(() => {
					setFormIsVisible(false)
				}, 600)
				currentState.setCurrentItem(null)
			}
		} else if (method === 'PUT') {
			console.log(`PUT ${objectType} formulär ${userInputName}, ${inputTime}, ${currentListDocId}`)
			if (currentState.currentItem.saved ) {
				await fetch(createEndpoint(), {
					method: "PUT",
					body: JSON.stringify({
						id: currentListDocId,
						name: userInputName,
						description: userInputText,
						time: userInputTime,
					}),
				})
				
		.then(console.log('posted'))
		.catch(error => {
			console.log('error:', error);
		})
		fetchAllLists();
		
				;
			} else if (currentState.currentItem)

			await fetch(createEndpoint(), {
				method: "PUT",
				body: JSON.stringify({
					id: currentListDocId,
					name: userInputName,
					description: userInputText,
					time: userInputTime,
				}),
			})
			
		.then(console.log('posted'))
		.catch(error => {
			console.log('error:', error);
		})
		fetchAllLists();
			setUserInputName('');
			setUserInputTime(0);
			setUserInputText('');
			setErrMessage('');
			//setFormIsVisible(false)
			setOverlay(false)
			setTimeout(() => {
				setFormIsVisible(false)
			}, 600)
			currentState.setCurrentItem(null)
		} else if (objectType === 'inputCountdown') {

			console.log('inputTime', inputTime * 1000)
			setInputTime(inputTime*1000)
			setTimerState.setCurrentItem({title: userInputName, time: inputTime*1000})

			setUserInputName('');
			setUserInputTime(0);
			setUserInputText('');
			setErrMessage('');
			setOverlay(false)
			setTimeout(() => {
				setFormIsVisible(false)
			}, 600)
			currentState.setCurrentItem(null)
		}
	};



	  const handleGoBack = () => {
		   setOverlay(false)
		  setTimeout(() => {
			setFormIsVisible(false)
		}, 600)
		currentState.setCurrentItem(null)
		} 
	  

	  useEffect(() => {
		setTimeout(() => {
			setOverlay(true)
			}, 10);
		  return () => setOverlay(false)
	  }, [])

	let header;

	if (method === "POST" && currentState.currentItem ) {
		header = currentState.currentItem? currentState.currentItem.title : `Namn på ${objectType}`
	} else if (method === "PUT" && currentState.currentItem) {
		currentState.currentItem? currentState.currentItem.title : `Namn på ${objectType}`
	}

	
	return (
		<>
		{console.log('page', page, 'thisList', thisList, 'class', className, 'currentitme', currentState.currentItem)}
		<div onClick={() => handleGoBack()} className={clsx(styles.showOverlay, {[styles.overlayVisible]: overlay, [styles.archObj]: page === 'archive'})}/>
		<section className={clsx(styles.formContainer, {
			[styles.tomatoFormContainer]: objectType === 'tomato',
			[styles.todoFormContainer]: objectType === 'todo',
			[styles.todoListFormContainer]: objectType === 'todoList',
			[styles.formIsVisible]: overlay,
			})}>
			
			{page!== 'sparade'?
			(
				<>
			{objectType === 'tomato' && page !== 'tomater' && (<aside className={styles.smallTomato} />)}
			
			<h1 className={styles.formHeader}>{header? header: `Ny ${objectType}`}</h1>
			<input type="text" className={clsx(styles.input, styles.textInput)} placeholder={currentState.currentItem? currentState.currentItem.title : `Namn på ${objectType}`} onChange={(e) => setUserInputName(e.target.value)} />
			<input type="text" className={clsx(styles.input, styles.textInput)} placeholder="Beskrivning" onChange={(e) => setUserInputText(e.target.value)} />
			
			{objectType !== 'todoList' && (
				<div className={styles.timeInputContainer}>
					<select
					value={userInputTime.hh}
					onChange={({ target: { value } }) => setUserInputTime({hh: value, min: userInputTime.min})}
					>
					{hours.map((value, index) => (
						<option key={index} value={value}>
						{value<10? `0${value}`: value}
						</option>
					))}
					</select>

					<select
					value={userInputTime.min}
					onChange={({ target: { value } }) => setUserInputTime({hh: userInputTime.hh, min: value})}
					>

					{mins.map((value, index) => (
						<option key={index} value={value}>
						{value<10? `0${value}`: value}
						</option>
					))}
					</select>
				</div>)
			}
			</>
):
<>
<h1 className={styles.formHeader}>{`Starta om ${currentState.currentItem ? currentState.currentItem.title: 'lista'}`}</h1>
</>

}

			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => handleGoBack()} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit(objectType)} />
			</div>
			{errMessage}
		</section>
		</>
	)
};

export default Form;

/* 

				headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3000"
				},
*/

