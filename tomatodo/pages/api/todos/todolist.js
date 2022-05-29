import client from "../../../lib/sanity";

const todolist = async function handler(req, res) {
	let newTodoList = req.body;

	switch (req.method) {
		case "POST":
			newTodoList = await JSON.parse(req.body);
			try {
				await client
				.create({
					_type: "todoList",
					title: newTodoList.title,
					publishedAt: new Date().toISOString(),
					saved: false,
					user: newTodoList.user,
					numberOfClicks: 0,
					user: {
						_type: "reference",
						_ref: `${newTodoList.userId}`,
						_weak: true
					}
				})
				.then((res) => {
					//console.log(`TodoList was created, document ID is ${res._id}. Res body is ${res.body}`);
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
			let update;
			const updateClicks = {
				saved: newTodoList.saved,
				numberOfClicks: newTodoList.numberOfClicks
			};
			const saveList = {
				saved: newTodoList.saved,
			};

			newTodoList.saved ? update = saveList : update = updateClicks;

			try {
				await client
				.patch(newTodoList.id)
				.set(update)
				.commit();
				res.status(200).json({
					status: res.body
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
				.then((res) => console.log(`TodoList was deleted`));
				res.status(200).json({ msg: "Success" });
			} catch (error) {
				console.error(error);
				res.status(500).json({ msg: "Error, check console" });
			};
			break;
		default:
	};
};

export default todolist;