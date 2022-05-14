import client from "../../../lib/sanity";

const tomato = async function handler(req, res) {
	let newTomato = req.body; 
	switch (req.method) {
		case "POST":
			newTomato = await JSON.parse(req.body);
			console.log('newTomato: ', newTomato)
			try {
				await client
				.create({
					_type: "tomato",
					title: newTomato.title,
					description: newTomato.description,
					time: Number(newTomato.time),
					publishedAt: new Date().toISOString(),
					numberOfClicks: 0,
					user: {
						_type: "reference",
						_ref: `${newTomato.userId}`,
						_weak: true
					}
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
			};
			break;
		case "PUT":
			let update;
			const updateClicks = {
				"numberOfClicks": newTomato.numberOfClicks
			};

			const updateTomato = {
				"_type": "tomato",
				"title": newTomato.title,
				"description": newTomato.description,
				"time": Number(newTomato.time)
			};

			newTomato.title ? update = updateTomato : update = updateClicks;

			try {
				await client
				.patch(newTomato.id)
				.set(update)
				.commit();
				res.status(200).json({
					status: res.body,
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
					.then((res) => console.log(`Tomato was deleted`));
					res.status(200).json({ msg: "Success" });
				} catch (error) {
					console.error(error);
					res.status(500).json({ msg: "Error, check console" });
				};
				break;
		default:
	};
	console.log('client in tomatoes/tomato api page', req.body);    
};

export default tomato;