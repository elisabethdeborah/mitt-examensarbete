export default {
	name: 'user',
	title: 'User',
	type: 'document',
	fields: [
	  {
		name: 'name',
		title: 'Name',
		type: 'string',
	  },
	  {
		name: 'email',
		title: 'Email',
		type: 'string',
	  },
	  {
		name: 'password',
		title: 'Password',
		type: 'string',
	  },
	  {
		name: "registerDate",
		title: "Register date",
		type: "datetime"
	  },
	  {
		name: 'isAdmin',
		title: 'Is Admin',
		type: 'boolean',
	  },
	],
	initialValue: () => ({
		isAdmin: false,
		registerDate: new Date().toISOString(),
	  }),
	  preview: {
		select: {
		  name: "name",
		  email: "email",
		},
		prepare(selection) {
			const {name, email} = selection
			  return {
				title: name,
				subtitle: email,
			  }
		}
	  }
  };