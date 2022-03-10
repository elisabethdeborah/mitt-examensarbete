import client from "../../../lib/sanity";

const todo = async function handler(req, res) {
	switch (req.method) {
		case "POST":
			const newTodo = await JSON.parse(req.body);
			try {
				await client
				.create({
					_type: "todo",
					title: newTodo.name,
					description: newTodo.description,
					time: Number(newTodo.time),
					checked: false,
					publishedAt: new Date().toISOString(),
					todoList: {
						_type: "reference",
						_ref: `${newTodo.parentRef}`
					}
				})
				.then((res) => {
					console.log(`Todo was created, document ID is ${res._id}. Res body is ${res.body}`);
				});
					res
					.status(200)
					.json({ msg: `Todo was created, document ID is ${res._id}` });
			} catch (error) {
					console.error(error);
					res.status(500).json({ msg: "Error, check console" });
			}
			break;

		case "PUT":
			try {
				await client
				.patch(req.body.id)
				.set({
					checked: req.body.checked,
				})
				.commit()
				res.status(200).json({
					status: res.body,
				});
			} catch (error) {
				console.error(error);
					res.status(500).json({ msg: "Error, check console" });
			}
			break;

		case "DELETE":
			await client
				.delete(req.body)
				.then((res) => {
				res.body;
				})
				.then((res) => console.log(`Todo was deleted`));
			res.status(200).json({ msg: "Success" });

	
		default:
			break;
	}
	console.log('client in todos/todo api page', req.body)
      
}

export default todo;