import React, { useState } from "react";

import AddListForm from "../components/AddListForm";
import ActiveLists from "../components/ActiveLists";
import SavedLists from "../components/SavedLists";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import TodoList from "../components/TodoList";
import styles from "../styles/minaTodos.module.scss";
import clsx from "clsx";

import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";

import { groq } from "next-sanity";


export default function MinaTodos(props) {
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [open, setOpen] = useState(0); 
	const [sideListVisible, setSideListsVisible] = useState(true);
	const [flexDirection, setFlexDirection] = useState(false);
	///
	const { postdata, preview } = props;

	const router = useRouter();
  
	const { data: posts } = usePreviewSubscription(query, {
		initialData: postdata,
		enabled: preview || router.query.preview !== undefined,
	  });

	const handleSideListArrow = () => {
		setFlexDirection(true)
		setTimeout(() => {
			setSideListsVisible(true)
		}, 600);
		
	}

	return (
		<div className={clsx(styles.todoPageWrapper, {
			[styles.sideListVisible]: sideListVisible,
			[styles.changeFlex]: flexDirection,
			})}>
			<Meta title='Mina todos' />
			<aside className={styles.optionContainer}>
				{!addListFormIsVisible && (
				<button className={styles.addTodoList} onClick={() => setFlexDirection(false)} >
					<h2>Skapa ny lista</h2>
					<AddTodo className={styles.addTdodoSvg} />
				</button>
				)}
				{
				!sideListVisible && (
					<button className={styles.showSideLists} onClick={() => handleSideListArrow()} >
						<h2>Visa fler listor</h2><p className={styles.arrowLeft}>&larr;</p>
					</button>
				)
			}
			</aside>
			{
			<section className={clsx(styles.sideListContainer, {[styles.sideLists]: sideListVisible})}>
				<ActiveLists lista={posts.currentLists} setSideListsVisible={setSideListsVisible} setOpen={setOpen} open={open} page={'todo'} />
				<SavedLists lista={posts.savedLists} setSideListsVisible={setSideListsVisible} setOpen={setOpen} open={open}  page={'todo'} />
			</section>
			}
			<div className={styles.todoListWrapper}>
				{console.log('posts', posts)}
				{addListFormIsVisible ? <AddListForm addListFormIsVisible={addListFormIsVisible} setAddListFormIsVisible={setAddListFormIsVisible} /> 
				: 
				posts.currentLists ? (posts.currentLists.map((list, index) => {
					return (
						open === index && (
						<TodoList key={list._id} list={list} />
						)
					)})) : 
						<section className={styles.emptyList}>
							<div className={styles.todoListTop} />
							<article className={styles.addListIconBtn} onClick={() => setAddListFormIsVisible(true)} />
							<h3>Du har inga pågående listor</h3>
						</section>
				}
			</div>
		</div>
	)
};


const query = groq`
{"savedLists": *[ _type == "todoList" && saved || _type == "library" ] {title, list, ..., "numberOfTodos": count(list)},
"currentLists": * [_type == "todoList" && !saved] {title, list, id, ...,
	"numberOfChecked": count(list[checked == true]),
	"numberOfNotChecked": count(list[checked == false]),
	"TotalNumberOfTodos": count(list)},
"todos": *[_type == "todo"]
}
`;


export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(query);

  return {
    props: {
		postdata: post,
		preview,
	  },
    //revalidate: 10,
  };
}
