import React, { useState } from "react";
import styles from '../styles/form.module.scss';
import clsx from "clsx";

const AddListForm = ({setAddListFormIsVisible}) => {
	const [userInputTitle, setUserInputTitle] = useState('');
	const [errMessage, setErrMessage] = useState('');
	const handleSubmit = async () => {
		if (userInputTitle.length == 0 ) {
			setErrMessage("Namnet måste vara minst 1 tecken lång.");
		} else {
		  await fetch("/api/todos/todolist", {
			method: "POST",
			body: JSON.stringify({
				name: userInputTitle,
			}),
		  });
		  	setUserInputTitle("");
			setErrMessage("");
		}
	  };

	return (
		<article className={styles.formContainer}>
			<h1>Skapa ny lista</h1>
			<input type="text" placeholder="Titel på listan" value={userInputTitle} onChange={(e) => setUserInputTitle(e.target.value)} />
			<input type="button" value="lägg till" onClick={() => handleSubmit()} />
			{errMessage}
			<button onClick={() => setAddListFormIsVisible(false)}>stäng</button>
		</article>
	)
};

export default AddListForm;