export default {
	name: "archive",
	title: "Sparade listor",
	type: "document",
	fields: [
	  /* {
		name: "slug",
		title: "Slug",
		type: "slug",
		validation: Rule => Rule.required(),
		options: {
		  source: "title",
		  maxLength: 96
		}
	  }, */
	  {
		title: "Namn",
		name: "name",
		type: "string",
		validation: Rule => [Rule.max(50).warning('Kortare namn är oftast bättre'), Rule.required().min(1).error('Namnet måste vara minst 1 tecken/bokstav långt')],
	},
	  {
		name: "publishedAt",
		title: "sparad",
		type: "datetime"
	  },
	  {
		title: "Lists",
		name: "lists",
		type: "array",
		of: [
			{type: "todoList"}
		],
	},
	],
	initialValue: () => ({
		saved: false,
		publishedAt: new Date().toISOString()
	  }),
	preview: {
	  select: {
		title: "title",
	  },
	}
  };