export default {
	name: "tomato",
	title: "Tomato",
	type: "document",
	fields: [
	  {
		name: "title",
		title: "Title",
		type: "string",
		validation: Rule => Rule.required()
	  },
	  {
		name: "slug",
		title: "Slug",
		type: "slug",
		validation: Rule => Rule.required(),
		options: {
		  source: "title",
		  maxLength: 96
		}
	  },
	  {
		title: "Namn",
		name: "name",
		type: "string",
		validation: Rule => [Rule.max(50).warning('Kortare namn är oftast bättre'), Rule.required().min(1).error('Namnet måste vara minst 1 tecken/bokstav långt')],
	},
	{
		title: "Tid",
		name: "time",
		type: "string",
		description: "Tid att räkna ner när den här todon görs.",
		validation: Rule => Rule.min(0).warning('Glöm inte att fylla i en tid om du vill kunna räkna ner'),
	},
	{
		name: 'description',
		type: 'text',
		title: 'Beskrivning',
		description: 'Lägg in en kort beskrivning om du vill.'
	  },
	  {
		name: "publishedAt",
		title: "Published at",
		type: "datetime"
	  },
	  {
		  name: "lists",
		  title: "Listor där denna tomat finns",
		  type: "array",
		  of: [
			  {
				  type: "reference",
				  to: [
					  {type: "todoList"},
					  {type: "archive"},
					  {type: "todo"},
				  ]
			  }
		  ]

	  }
	],
	initialValue: () => ({
		publishedAt: new Date().toISOString()
	  }),
  
	preview: {
	  select: {
		title: "title",
		time: "time",
		name: "name",
	  },
	  /* prepare(selection) {
		const { author } = selection;
		return Object.assign({}, selection, {
		  subtitle: author && `by ${author}`
		});
	  } */
	}
  };