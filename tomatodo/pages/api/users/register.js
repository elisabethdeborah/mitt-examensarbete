import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { config } from '../../../lib/config';
import { signToken } from '../../../lib/auth';
import client from "../../../lib/sanity";
const handler = nc();

handler.post(async (req, res) => {
	const projectId = config.projectId;
	const dataset = config.dataset;
	const tokenWithWriteAccess = config.token; 
	
	const createMutations = [
		{
		create: {
			_type: 'user',
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password),
			isAdmin: false,
			registerDate: new Date().toISOString(),
			showOnboarding: true,
			userAlarm: 0,
			userDefaultVolume: 1,
		},
		},
	];

	const existUser = await client.fetch(
		`*[_type == "user" && email == $email][0]`,
		{
		  email: req.body.email,
		}
	  );
	  if (existUser) {
		return res.status(401).send({ message: 'Email aleardy exists' });
	  };

	const { data } = await axios.post(
		`https://${projectId}.api.sanity.io/v2022-02-21/data/mutate/${dataset}?returnIds=true`, 
		{ mutations: createMutations },
		{
			headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${tokenWithWriteAccess}`
			},
		}
	);
	
	console.log('DATA I API:', data)

	const userId = data.results[0].id;
	const user = {
		_id: userId,
		name: req.body.name,
		email: req.body.email,
		isAdmin: false,
	};

	const token = signToken(user);
	res.send({...user, token});
});

export default handler;
