import client from "../../../lib/sanity";

const todo = async function handler(req, res) {
	console.log('client in api page', 'client', req.body)
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
				_type: 'reference',
				_ref: `${newTodo.parentRef}`
			}
          })
          .then((res) => {
            console.log(`Todo was created, document ID is ${res._id}. Res body is ${res.body}`);
          });
        res
          .status(200)
          .json({ msg: `Todo was created, document ID is ${res._id}` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
  }
}

export default todo;