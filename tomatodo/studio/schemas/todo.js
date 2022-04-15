import React from 'react'; 

export default {
	name: "todo",
	title: "Todo",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Name",
			type: "string",
			validation: Rule => [Rule.max(50).warning('Kortare namn är oftast bättre'), Rule.required().min(1).error('Namnet måste vara minst 1 tecken/bokstav långt')],
		},
		/* {
			name: "slug",
			title: "Slug",
			type: "slug",
			validation: Rule => Rule.required(),
			options: {
			  source: "title",
			  maxLength: 96,
			}
		  }, */
	{
		title: "Tid",
		name: "time",
		type: "number",
		description: "Tid att räkna ner när den här todon görs (i sekunder).",
		validation: Rule => Rule.min(0).warning('Glöm inte att fylla i en tid om du vill kunna räkna ner'),
	},
	{
		title: "Checked",
		name: "checked",
		type: "boolean",
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
		  title: "Tillhör lista",
		  name: "todoList",
		  description: "Lista som denna todo tillhör",
		  type: "reference",
		  weak: true,
		  to: [{type: "todoList"}]
	  }
	],
	initialValue: () => ({
		checked: false,
		publishedAt: new Date().toISOString(),
	  }),

	  preview: {
		select: {
		  title: "title",
		  checked: "checked",
		date: "publishedAt"
		},
		prepare({title, checked, date}) {
			  return {
				title: title,
				subtitle: date.slice(0, 10),
				media: <span style={{fontSize: '1.5rem'}}>{checked ? '✅': '⬜'}</span>
			  }
		}
	  }
  };