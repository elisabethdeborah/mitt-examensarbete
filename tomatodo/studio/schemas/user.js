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
	  {
		name: 'userDefaultVolume',
		title: 'Vald default-volym',
		type: 'number',
	  },
	  {
		name: 'userAlarm',
		title: 'Valt alarm',
		type: 'number',
	  },
	  {
		  name: 'showOnboarding',
		  title: 'Visa onboarding varje inloggning',
		  type: 'boolean'
	  }
	],
	initialValue: () => ({
		isAdmin: false,
		registerDate: new Date().toISOString(),
		userDefaultVolume: 0,
		userAlarm: 1,
		showOnboarding: true,
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