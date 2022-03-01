export default {
	name: "library",
	title: "Mina tomater",
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
		name: "publishedAt",
		title: "Published at",
		type: "datetime"
	  },
	  {
		title: "Library",
		name: "library",
		type: "array",
		of: [
			{type: "tomato"}
		],
	},
	],
	preview: {
	  select: {
		title: "title",
	  },
	}
  };