import React, { useState, useEffect } from "react";
import styles from '../styles/form.module.scss';
import clsx from "clsx";
//import TimePicker from "./TimePicker";

const Form = ({setFormIsVisible, objectType, method, currentListDocId}) => {
	const [userInputName, setUserInputName] = useState('');
	const [userInputText, setUserInputText] = useState('');
	const [userInputTime, setUserInputTime] = useState(0);
	const [errMessage, setErrMessage] = useState('');

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
		console.log(`${objectType} formulär ${setFormIsVisible}`)
		if (userInputName.length == 0 ) {
			setErrMessage("Namnet måste vara minst 1 tecken lång.");
		} else {
		  await fetch(createEndpoint(), {
			method: `${method}`,
			body: JSON.stringify({
				name: userInputName,
				description: userInputText,
				time: userInputTime,
				parentRef: currentListDocId,
			}),
		  });
			setUserInputName('');
			setUserInputTime(0);
			setUserInputText('');
			setErrMessage('');
			setFormIsVisible(false)
		}
	  };


	  /* 
	 await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				name: userInputName,
				description: userInputText,
				time: userInputTime,
				//parentRef: currentListDocId,
			}),
		  }); 
	  */
	  

	return (
		<section className={clsx(styles.formContainer, {
			[styles.tomatoFormContainer]: objectType === 'tomato',
			[styles.tomatoFormContainer]: objectType === 'todo',
			[styles.tomatoFormContainer]: objectType === 'todoList',
			})}>
			{objectType === 'tomat' && (<aside className={styles.smallTomato} />)}
			<h1>Ny {objectType}</h1>
			<input type="text" className={clsx(styles.input, styles.textInput)} placeholder={`Namn på ${objectType}`} onChange={(e) => setUserInputName(e.target.value)} />
			<input type="text" className={clsx(styles.input, styles.textInput)} placeholder="Beskrivning" onChange={(e) => setUserInputText(e.target.value)} />
			{/* {objectType !== 'todoList' && (
				//SLIDER INPUT FÖR ATT VISA TIMEPICKER
			)} */}
			{/* {objectType !== 'todoList' && (
				<TimePicker setUserInputTime={setUserInputTime} userInputTime={userInputTime} />
			)}
			{console.log('userInputTime?', userInputTime)} */}
			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => setFormIsVisible(false)} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit(objectType)} />
			</div>
			{errMessage}
		</section>
	)
};

export default Form;
