import S from "@sanity/desk-tool/structure-builder";
//import ConfigPreview from './ConfigPreview';

export default () =>
  S.list()
    .title("Content Manager")
    .items([
		S.listItem()
		.title("Todo-listor")
		.schemaType("todoList")
        .child(
			S.list()
				.title('Alla todo-listor')
				.items([
					S.listItem()
					.title("Sparade todo-listor")
					.schemaType("todoList")
					.child(
						S.documentList()
						.title("lista")
						.schemaType("todoList")
						.filter('_type == "todoList" && saved')
					),
					S.listItem()
					.title("Ej sparade todo-listor")
					.schemaType("todoList")
					.child(
						S.documentList()
						.title("lista")
						.schemaType("todoList")
						.filter('_type == "todoList" && !saved')
					)
				])
		),
		S.divider(),
		S.listItem()
  			.title('Alla todos')
			.schemaType('todo')
			.id('alltodos')
			.child(
				S.documentList()
				.title("todo")
				.filter('_type == "todo"')
			),
		S.listItem()
			.title('Alla tomater')
			.schemaType('tomato')
			.id('alltomatoes')
			.child(
				S.documentList()
				.title("tomato")
				.filter('_type == "tomato"')
			),
      S.divider(),
	  S.listItem()
			.title('Användare')
			.schemaType('user')
			.id('allusers')
			.child(
				S.documentList()
				.title("user")
				.filter('_type == "user"')
			),
      S.divider(),
    ]);