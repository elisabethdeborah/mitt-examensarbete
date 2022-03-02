import React, { useState, useEffect } from "react";
import styles from '../styles/addTodoForm.module.scss';
import clsx from "clsx";
import TimePicker from "./TimePicker";

const AddTomatoForm = ({addTomatoFormIsVisible, setAddTomatoFormIsVisible}) => {
	const [userInputName, setUserInputName] = useState('');
	const [userInputText, setUserInpuText] = useState('');
	const [userInputTime, setUserInputTime] = useState(0);
	const [errMessage, setErrMessage] = useState('');
	/* const [scrollValue, setScrollValue] = useState('00:00');
	const [scrollGroup, setScrollGroup] = useState(); */


	const submitTodo = () => {
		console.log('Ny tomato', {
			name: userInputName,
			description: userInputText,
			time: userInputTime,
			date: new Date()
		  })
	};


	/* useEffect(() => {
		for (let i = 1; i < 13; i++) {
			hoursArray.push(i)
		}
		for (let i = 0; i < 59; i++) {
			minutesArray.push(i)
		}
	}, []) */

	const handleSubmit = async (e) => {
		//e.preventDefault();
		//if either part of the form isn't filled out
		//set an error message and exit
		if (userInputName.length == 0 ) {
			setErrMessage("Namnet måste vara minst 1 tecken lång.");
		} else {
		  //otherwise send the todo to our api
				// (we'll make this next!)
		  await fetch("/api/todos/todo", {
			method: "POST",
			body: JSON.stringify({
				name: userInputName,
				description: userInputText,
				time: userInputTime,
				date: new Date()
			}),
		  });
		  
		}
	  };
	  

	return (
		<section className={clsx(styles.formContainer, styles.tomatoFormContainer)}>
			<aside className={styles.smallTomato} />
			<h1>Ny tomat</h1>
			<input type="text" className={clsx(styles.input, styles.textInput)} placeholder="Namn på tomat" onChange={(e) => setUserInputName(e.target.value)} />
			<input type="text" className={clsx(styles.input, styles.textInput)} placeholder="Beskrivning" onChange={(e) => setUserInpuText(e.target.value)} />
			{/* <input type="number" className={clsx(styles.input, styles.timeInput)} placeholder="Tid" onChange={(e) => setUserInputTime(e.target.value)}/> */}
			<TimePicker setUserInputTime={setUserInputTime} userInputTime={userInputTime} />
			{console.log('userInputTime', userInputTime)}
			{/* <article className={styles.wheelsContainer}>
				
				<div className={styles.selectWheel}>
					<div className={styles.hoursWheel}>
						{hoursArray.map((hour, index) => { <p key={hour}>hour {hoursArray[index]}</p>})}
					</div>
					<div className={styles.minWheel}>
					{minutesArray.map((min, index) => {<p key={min}>min {minutesArray[index]}</p>})}
					</div>
				</div>
			</article> */}

			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeTomatForm} value="Ångra" onClick={() => setAddTomatoFormIsVisible(false)} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => submitTodo()} />
			</div>
			{errMessage}
		</section>
	)
};

export default AddTomatoForm;

// await fetchTodos(); //(we'll add this later)
		  // Clear all inputs after the todo is sent to Sanity
		  /* setUserInputName("");
		  setUserInputTime(0);
		  setUserInputText("");
		  setErrMessage(""); */