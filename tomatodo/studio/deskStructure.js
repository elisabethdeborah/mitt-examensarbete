import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content Manager")
    .items([
		S.listItem()
		.title("Todo-listor")
		.schemaType("todoList")
        .child(
			S.documentList()
			.title("lista")
			.schemaType("todoList")
			.filter('_type == "todoList"')
		),
		S.listItem()
  			.title('Todo')
			.schemaType('todo')
			.id('dddd')
			.child(
				S.documentList()
				.title("todo")
				.filter('_type == "todo"')
			),
		S.listItem()
			.title('Tomato')
			.schemaType('tomato')
			.id('tttt')
			.child(
				S.documentList()
				.title("tomato")
				.filter('_type == "tomato"')
			),
      S.divider(),
    ]);