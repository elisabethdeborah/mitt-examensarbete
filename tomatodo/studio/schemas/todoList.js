export default {
	name: "todoList",
	title: "Todo-listor",
	type: "document",
	fields: [
	  {
		name: "title",
		title: "Title",
		type: "string",
		//validation: Rule => Rule.required()
		validation: Rule => [Rule.max(50).warning('Kortare namn är oftast bättre'), Rule.required().min(1).error('Namnet måste vara minst 1 tecken/bokstav långt')],
	  },
	  {
		name: "slug",
		title: "Slug",
		type: "slug",
		options: {
		  source: "title",
		  maxLength: 96
		}
	  },
	  /* {
		title: "Namn",
		name: "name",
		type: "string",
		validation: Rule => [Rule.max(50).warning('Kortare namn är oftast bättre'), Rule.required().min(1).error('Namnet måste vara minst 1 tecken/bokstav långt')],
	}, */
	  {
		name: "publishedAt",
		title: "Published at",
		type: "datetime"
	  },
	  {
		title: "Saved",
		name: "saved",
		type: "boolean",
	},
	  {
		title: "list",
		name: "list",
		type: "array",
		of: [
			{type: "todo"}
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
		added: "publishedAt"
	  },
	  prepare(selection) {
		const {title, added} = selection
		return {
		  title: title,
		  subtitle: added.slice(0, 10) // YYYY-MM-DD
		}
	  }
	}
  };