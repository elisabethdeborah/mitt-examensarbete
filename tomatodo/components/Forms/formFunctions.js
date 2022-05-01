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
};

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
