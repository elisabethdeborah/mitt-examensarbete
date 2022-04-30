// VALIDATION

const validateTime = (body) => {
	if (body && body.time && typeof body.time === 'number' && body.time > 59 && body.time < 86340) {
		return "valid";
	} else  {
		let error = "Tiden måste vara minst 1 minut och max 23 h 59 min.";
		return error;
	}
};

const validateName = (body) => {
	if (body.title && body.title.length > 0) {
		return "valid";
	} else {
		let error = "Namnet måste vara minst 1 tecken lång.";
		return error;
	}
}

// TIME

const calculateTime = (defaultTime, currentState) => {
	let initialObjTime = 0;

	if ( defaultTime ) {
		initialObjTime = Number(defaultTime);
	} else if (currentState && currentState.currentItem && currentState.currentItem.time) {
		initialObjTime = Number(currentState.currentItem.time);
	}; 
	
	let calcHours = Math.floor(initialObjTime/60/60);
	let calcMinutes = Math.round(initialObjTime/60) % 60;
	let initialTime = {
		hh: calcHours, min: calcMinutes
	}; 
	return initialTime;
};

//POST/PUT FUNCTIONS

const createEndpoint = (objectType) => {
	if (objectType === 'todo') {
		return '/api/todos/todo';
	} else if (objectType === 'todoList') {
		return '/api/todos/todolist'; 
	} else if (objectType === 'tomato') {
		return '/api/tomatoes/tomato';
	};
}; 

const submitClick = (objectType, body, method, state) => {
	const endPoint = createEndpoint(objectType);
	let fetchObj = {
		method: `${method}`,
		body: JSON.stringify(body),
	};
	if (method === 'POST') {
		let action = 'skapad';
		submitForm(fetchObj, objectType, endPoint, action, state, body);
	} else if (method === 'PUT') {
		let action = 'ändrad';
		submitForm(fetchObj, objectType, endPoint, action, state, body);
	};
};

const submitForm = async(fetchObj, objectType, endPoint, action, state, body) => {
	await fetch(endPoint, fetchObj)
	.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: body.title, action: action, res: response.ok}))
	.catch(error => {
		console.log('error:', error);
	})
};

export { calculateTime, validateTime, validateName, submitClick, createEndpoint, submitForm };

/* 


const createEndpoint = (objectType) => {
	if (objectType === 'todo') {
		return '/api/todos/todo';
	} else if (objectType === 'todoList') {
		return '/api/todos/todolist'; 
	} else if (objectType === 'tomato') {
		return '/api/tomatoes/tomato';
	};
}; 

const postFetch = (currentState) => {
	setUserInputName('');
	setUserInputTime(0);
	setUserInputText('');
	setErrMessage('');
	setOverlay(false);
	setTimeout(() => {
		setFormIsVisible(false);
	}, 600);
	currentState.setCurrentItem(null);
};

const post = async(body, objectType) => {
	if (body.title.length == 0 ) {
		setErrMessage("Namnet måste vara minst 1 tecken lång.");
	} else if (typeof body.time === 'number' && body.time < 60 && body.time > 86340) {
		setErrMessage("Tiden måste vara minst 1 minut och max 23 h 59 min.");
	} else {
		await fetch(createEndpoint(objectType), {
			method: 'POST',
			body: JSON.stringify(body),
		})
		.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: body.title, action: 'skapad', res: response.ok}))
		.catch(error => {
			console.log('error:', error);
		})
		if (page === 'archive') {
			fetchAllLists();
			setTimeout(() => {
				setFormIsVisible(false);
			}, 600);
		} else if (page !== 'archive')  {
			fetchAllLists();
			postFetch(currentState);
		}
	}
};

const put = async(body, objectType) => {
	if (objectType === 'tomato' ) { 
		console.log('Clicked state object id: ', currentState.currentItem._id, 'name:', currentState.currentItem.title)
		await fetch(createEndpoint(), {
			method: "PUT",
			body: JSON.stringify(body),
		})
		.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: body.title, action: 'ändrad', res: response.ok}))
		.catch(error => {
			console.log('error:', error);
		})
		fetchAllLists();
	} else if (currentState.currentItem) {
		await fetch(createEndpoint(), {
			method: "PUT",
			body: JSON.stringify(body),
		})
		.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: body.title, action: 'ändrad', res: response.ok}))
		.catch(error => {
			console.log('error:', error);
		})
		fetchAllLists();
	};
	postFetch(currentState);
};


*/


/* const handleSubmit = async (page, currentState, objectType, userInputTime, userInputName, userInputText, currentListDocId, setErrMessage, method) => {

	const inputTime = typeof userInputTime.hh || typeof userInputTime.min === 'number' ? Number(userInputTime.hh *60 * 60 + userInputTime.min*60) : null;

	if (method === 'POST') {
		post();
		/* if (userInputName.length == 0 ) {
			setErrMessage("Namnet måste vara minst 1 tecken lång.");
		} else if (typeof inputTime === 'number' && inputTime < 60 && inputTime > 86340) {
			setErrMessage("Tiden måste vara minst 1 minut och max 23 h 59 min.");
		} else {
			await fetch(createEndpoint(objectType), {
				method: 'POST',
				body: JSON.stringify({
						title: userInputName,
						description: userInputText,
						time: inputTime ? inputTime : 0,
						parentRef: currentListDocId,
					}),
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: userInputName, action: 'skapad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
			if (page === 'archive') {
				fetchAllLists();
				setTimeout(() => {
					setFormIsVisible(false);
				}, 600);
			} else if (page !== 'archive')  {
				fetchAllLists();
				postFetch(currentState);
			}
		} *
	} else if (method === 'PUT') {
		put();
		/* if (objectType === 'tomato' ) { 
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
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: userInputName, action: 'ändrad', res: response.ok}))
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
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: userInputName, action: 'ändrad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
			fetchAllLists();
		};
		postFetch(currentState); *
	} else if (objectType === 'inputCountdown') {
		setInputTime(inputTime*1000);
		setTimerState.setCurrentItem({title: userInputName, time: inputTime*1000});
		postFetch(currentState);
	};
};
 */

//export { createEndpoint, postFetch, post, put };


/* 


const createEndpoint = (objectType) => {
	if (objectType === 'todo') {
		return '/api/todos/todo';
	} else if (objectType === 'todoList') {
		return '/api/todos/todolist'; 
	} else if (objectType === 'tomato') {
		return '/api/tomatoes/tomato';
	};
}; 

const postFetch = (currentState) => {
	setUserInputName('');
	setUserInputTime(0);
	setUserInputText('');
	setErrMessage('');
	setOverlay(false);
	setTimeout(() => {
		setFormIsVisible(false);
	}, 600);
	currentState.setCurrentItem(null);
};

const handleSubmit = async (page, currentState, objectType, userInputTime, userInputName, userInputText, currentListDocId, setErrMessage, method) => {

	const inputTime = typeof userInputTime.hh || typeof userInputTime.min === 'number' ? Number(userInputTime.hh *60 * 60 + userInputTime.min*60) : null;

	if (method === 'POST') {
		if (userInputName.length == 0 ) {
			setErrMessage("Namnet måste vara minst 1 tecken lång.");
		} else if (typeof inputTime === 'number' && inputTime < 60 && inputTime > 86340) {
			setErrMessage("Tiden måste vara minst 1 minut och max 23 h 59 min.");
		} else {
			await fetch(createEndpoint(objectType), {
				method: 'POST',
				body: JSON.stringify({
						title: userInputName,
						description: userInputText,
						time: inputTime ? inputTime : 0,
						parentRef: currentListDocId,
					}),
			})
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: userInputName, action: 'skapad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
			if (page === 'archive') {
				fetchAllLists();
				setTimeout(() => {
					setFormIsVisible(false);
				}, 600);
			} else if (page !== 'archive')  {
				fetchAllLists();
				postFetch(currentState);
				// setUserInputName('');
				// setUserInputTime(0);
				// setUserInputText('');
				// setErrMessage('');
				// setOverlay(false);
				// setTimeout(() => {
				// 	setFormIsVisible(false);
				// }, 600);
				// currentState.setCurrentItem(null);
			}
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
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: userInputName, action: 'ändrad', res: response.ok}))
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
			.then((response) => state.setFetchRes && state.setFetchRes({show: true, type: objectType, title: userInputName, action: 'ändrad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
			fetchAllLists();
		};
		postFetch(currentState);
		// setUserInputName('');
		// setUserInputTime(0);
		// setUserInputText('');
		// setErrMessage('');
		// setOverlay(false);
		// setTimeout(() => {
		// 	setFormIsVisible(false);
		// }, 600)
		// currentState.setCurrentItem(null);
	} else if (objectType === 'inputCountdown') {
		setInputTime(inputTime*1000);
		setTimerState.setCurrentItem({title: userInputName, time: inputTime*1000});
		postFetch(currentState);
		// setUserInputName('');
		// setUserInputTime(0);
		// setUserInputText('');
		// setErrMessage('');
		// setOverlay(false);
		// setTimeout(() => {
		// 	setFormIsVisible(false);
		// }, 600)
		// currentState.setCurrentItem(null);
	};
};


export { createEndpoint, handleSubmit };




*/