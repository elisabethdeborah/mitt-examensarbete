import client from "../../../lib/sanity";

const todo = async function handler(req, res) {
	switch (req.method) {
		case "POST":
			const newTomato = await JSON.parse(req.body);
			try {
				await client
				.create({
					_type: "tomato",
					title: newTomato.name,
					description: newTomato.description,
					time: Number(newTomato.time),
					publishedAt: new Date().toISOString(),
					numberOfClicks: 0,
				})
				.then((res) => {
					console.log(`Tomato was created, document ID is ${res._id}. Res body is ${res.body}`);
				});
					res
					.status(200)
					.json({ msg: `Tomato was created, document ID is ${res._id}` });
			} catch (error) {
					console.error(error);
					res.status(500).json({ msg: "Error, check console" });
			}
			break;

		case "PUT":
			try {
				const result = await client
				.patch(req.body.id)
				.set({
					checked: req.body.checked,
				})
				.commit();
				res.status(200).json({
					status: result.checked,
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
				.then((res) => console.log(`Tomato was deleted`));
			res.status(200).json({ msg: "Success" });

	
		default:
			break;
	}
	console.log('client in tomatos/tomato api page', req.body)
      
}

export default todo;