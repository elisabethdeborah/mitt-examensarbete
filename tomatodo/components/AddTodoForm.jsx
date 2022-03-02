import React, { useState } from "react";

const AddTodoForm = ({ setAddTodoFormIsVisible, currentListDocId}) => {
	const [userInputName, setUserInputName] = useState('');
	const [userInputText, setUserInputText] = useState('');
	const [userInputTime, setUserInputTime] = useState(0);
	const [errMessage, setErrMessage] = useState('');

	const handleSubmit = async () => {
		if (userInputName.length == 0 ) {
			setErrMessage("Namnet måste vara minst 1 tecken lång.");
		} else {
		  await fetch("/api/todos/todo", {
			method: "POST",
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
		}
	  };

	return (
		<article>
			<h1>Mina listor</h1>
			<input type="text" placeholder="Namn på todo" onChange={(e) => setUserInputName(e.target.value)} value={userInputName} />
			<input type="text" placeholder="Beskrivning" onChange={(e) => setUserInputText(e.target.value)} value={userInputText} />
			<input type="number" placeholder="Tid" onChange={(e) => setUserInputTime(e.target.value)}/>
			<input type="button" value="lägg till" onClick={() => handleSubmit()} />
			{errMessage}
			<button onClick={() => setAddTodoFormIsVisible(false)}>stäng</button>
		</article>
	)
};

export default AddTodoForm;
