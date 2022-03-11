import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";

import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.scss';

import { groq } from "next-sanity";
import ActiveLists from "../components/ActiveLists";
import SavedLists from "../components/SavedLists";
import {useUpdateContext, useTodoContext} from "../context/TodoContext"
import ListContainer from "../components/ListContainer";
import Resize from '../components/Resize';
export default function Post({postdata, preview}) {
	const sectionRef = useRef();
	const [width, setWidth] = useState(); 
	const [open, setOpen] = useState(0); 

  const router = useRouter();

  const { data: posts } = usePreviewSubscription(query, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined,
  });

  const activeLists = posts.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0);
	const savedLists = posts.allTodoLists.filter(x => x.saved && x.numberOfNotChecked === 0);
	const tomatoList = posts.tomatoLibrary;

const currentState = useUpdateContext()


  return (
    <div className={styles.wrapper} ref={sectionRef}>
		<Resize setWidth={setWidth} width={width} sectionRef={sectionRef} />
		 {width > 600 ?(<>
			<ListContainer key='tomatoListLg' itemType={'tomater'} setOpen={setOpen} open={open} page={'home'} list={tomatoList} setAddListFormIsVisible />
			<ListContainer key='currentListLg' itemType={'pågående listor'} setOpen={setOpen} open={open} page={'home'} index={2} list={activeLists} setAddListFormIsVisible />
		 <ListContainer key='savedListsLg' itemType={'sparade listor'} setOpen={setOpen} open={open} page={'home'} list={savedLists} setAddListFormIsVisible />
		 </>)
		 : 
		(<> <ListContainer key='tomatoList' itemType={'tomater'} setOpen={setOpen} open={open} page={'home'} list={tomatoList} setAddListFormIsVisible />
		 <ListContainer key='savedList' itemType={'sparade listor'} setOpen={setOpen} open={open} page={'home'} list={savedLists} setAddListFormIsVisible />
		 <ListContainer key='currentList' itemType={'pågående listor'} setOpen={setOpen} open={open} page={'home'} index={2} list={activeLists} setAddListFormIsVisible /></>)
		 }
    </div>
  );
}

const query = groq`
{
	"allTodoLists": * [_type == "todoList"] | order(_createdAt desc) { 
	  title,
	  saved,
	  "todos": * [_type == "todo" && todoList._ref == ^._id]{..., "slug": slug.current}+[...list]{..., "slug": slug.current},
	  "nrOfTodos": count(* [_type == "todo" && todoList._ref == ^._id]{checked} +[...list]{checked}),
	  'numberOfChecked': count([...list[checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][checked]),
	  'numberOfNotChecked': count([...list[!checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][!checked]),
	  ...,
	  },
  
	  "tomatoLibrary": * [_type == "tomato"] | order(_createdAt desc) {
	  title, 
	  time, 
	  slug,
	  ...,
	  "slug": slug.current,
	}
  }`;


export async function getStaticProps({ params, preview = false }) {
	const post = await getClient(preview).fetch(query);
  
	return {
	  props: {
		postdata: post,
		preview,
	  },
	  revalidate: 10,
	};
  }
