export default function calculateBgColor(percentage, sectionRef ) {
	console.log('percentage', percentage);
	const endColor = [217, 35, 90];
	const middleColor = [252, 255, 8];
	const startColor = [136, 218, 78];
	const gamma = 3;
	let step = percentage< 50? percentage/100: percentage/90;
	step = Math.min(1, step);

	const average = (a, b, percent) => {
		let a_2 = Math.pow(a, gamma);
		let b_2 = Math.pow(b, gamma);
		let c_2 = a_2 + (b_2 - a_2) * percent;
		return Math.pow(c_2, 1/gamma);
	};

	const colorString = (r, g, b) => {
		r = Math.min(255, Math.round(r));
		g = Math.min(255, Math.round(g));
		b = Math.min(255, Math.round(b));
	return "#" 
	+ ("0" + r.toString(16)).slice(-2) 
	+ ("0" + g.toString(16)).slice(-2) 
	+ ("0" + b.toString(16)).slice(-2)
	};

	const c = colorString (
		average(startColor[0], middleColor[0], step),
		average(startColor[1], middleColor[1], step),
		average(startColor[2], middleColor[2], step)
	);

	const d = colorString (
		average(middleColor[0], endColor[0], step),
		average(middleColor[1], endColor[1], step),
		average(middleColor[2], endColor[2], step)
	);
	if ( percentage <50) {
		sectionRef.current.style.backgroundColor = c;
	} else if (percentage >= 50) {
		sectionRef.current.style.backgroundColor = d;
	};
};



const handleDelete = async (listItem, todoState, currentState) => {
	//delete todo
	if (listItem._type === 'todo') {
		await fetch("/api/todos/todo", {
			method: "DELETE",
			body: listItem._id,
		})
		.then((response) => todoState.setFetchRes && todoState.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
		.catch(error => {
			console.log('error:', error);
		})
		todoState.fetchTodos();			 
	} else if (listItem._type === 'todoList') {
		listItem.todos.map(async(x) => {
			await fetch("/api/todos/todo", {
				method: "DELETE",
				body: x._id,
			})
			.then((response) => todoState.setFetchRes && todoState.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
			.catch(error => {
				console.log('error:', error);
			})
		});
		await fetch("/api/todos/todolist", {
			method: "DELETE",
			body: listItem._id,
		})
		.then((response) => todoState.setFetchRes && todoState.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
		.then(todoState.fetchTodos())
		.catch(error => {
			console.log('error:', error);
		})
		todoState.fetchTodos();
	} else if (listItem._type === 'tomato') {
	//delete tomato
	console.log('delete tomato (btn component)', 'id:', listItem._id, 'title:', listItem.title)
		await fetch("/api/tomatoes/tomato", {
			method: "DELETE",
			body: listItem._id,
		})
		.then((response) => todoState.setFetchRes && todoState.setFetchRes({show: true, type: listItem._type, title: listItem.title, action: 'raderad', res: response.ok}))
		todoState.fetchTodos();
	}
	currentState.setListitem(null);
	todoState.fetchTodos();
	currentState.setCurrentItem(null);
	currentState.setOverlay(false);
};

export { handleDelete };