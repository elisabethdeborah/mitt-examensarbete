import client from "../../../lib/sanity";

const todolist = async function handler(req, res) {
	switch (req.method) {
		case "POST":
			const newTodoList = await JSON.parse(req.body);
			try {
				await client
				.create({
					_type: "todoList",
					title: newTodoList.title,
					publishedAt: new Date().toISOString(),
					saved: false,
				})
				.then((res) => {
					console.log(`TodoList was created, document ID is ${res._id}. Res body is ${res.body}`);
				});
				res
				.status(200)
				.json({ msg: `TodoList was created, document ID is ${res._id}` });
			} catch (err) {
				console.error(err);
				res.status(500).json({ msg: "Error, check console" });
			};
			break;
		case "PUT":
			try {
				const result = await client
				.patch(req.body.id)
				.set({
				isCompleted: !req.body.isCompleted,
				completedAt: !!req.body.isCompleted ? "" : new Date().toISOString(),
				})
				.commit();
				res.status(200).json({
					status: result.isCompleted,
					completedAt: result.completedAt,
				});
			} catch (error) {
				console.error(error);
				res.status(500).json({ msg: "Error, check console" });
			};
			break;
		case "DELETE":
			try {
				await client
				.delete(req.body)
				.then((res) => {
				res.body;
				})
				.then((res) => console.log(`Todo was deleted`));
				res.status(200).json({ msg: "Success" });
			} catch (error) {
				console.error(error);
				res.status(500).json({ msg: "Error, check console" });
			};
		default:
		break;
	};
	console.log('client in todos/todoList api page', 'client', req.body);    
};

export default todolist;