export default {
	name: "todoList",
	title: "Todo-listor",
	type: "document",
	fields: [
	  {
		name: "title",
		title: "Title",
		type: "string",
		validation: Rule => [Rule.max(50).warning('Kortare namn är oftast bättre'), Rule.required().min(1).error('Namnet måste vara minst 1 tecken/bokstav långt')],
	  },
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
	{
		title: "Antal omstarter",
		name: "numberOfClicks",
		type: "number",
		description: "Antal klick (starta om lista) för att se hur populär listan är",
	},
	{
		title: "Användare",
		name: "user",
		description: "Användare som listan tillhör",
		type: "reference",
		weak: true,
		to: [{type: "user"}]
	}
	],
	initialValue: () => ({
		saved: false,
		publishedAt: new Date().toISOString(),
		numberOfClicks: 0,
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
		  subtitle: added.slice(0, 10)
		}
	  }
	}
  };