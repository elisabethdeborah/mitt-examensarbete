export default {
  name: "post",
  title: "Posts",
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
      name: "excerpt",
      description:
        "Write a short pararaph of this post (For SEO Purposes)",
      title: "Excerpt",
      rows: 5,
      type: "text",
      validation: Rule =>
        Rule.max(160).error(
          "SEO descriptions are usually better when its below 160"
        )
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    }
  ],

  preview: {
    select: {
      title: "title",
    },
  }
};