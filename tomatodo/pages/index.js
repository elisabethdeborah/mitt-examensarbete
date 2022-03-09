import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';

import { groq } from "next-sanity";
import SavedTomatoes from '../components/SavedTomatoes';
import ActiveLists from "../components/ActiveLists";
import SavedLists from "../components/SavedLists";
import {sharedState} from "../context/TodoContext";
import ListContainer from "../components/ListContainer";

export default function Post(props) {
	const [open, setOpen] = useState(0); 
  const {postdata, preview} = props;

  const router = useRouter();

  const { data: posts } = usePreviewSubscription(query, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined,
  });

  const activeLists = posts.allTodoLists.filter(x => x.numberOfNotChecked > 0 || x.nrOfTodos === 0);
  const savedLists = posts.allTodoLists.filter(x => x.saved && x.numberOfNotChecked === 0);

  const fetchNoPreview = async () => {
	let fetched;

	if (client) {
		fetched = await client.fetch(
			 `*[_type == "tomato"]`
		)
		console.log('no preview', fetched)
	}
  }

  useEffect(() => {
	  fetchNoPreview()
  }, [])

  return (
    <div className={styles.wrapper}>
		<SavedTomatoes tomatoes={posts.tomatoLibrary} page={'home'} />
     	<ActiveLists lista={activeLists}  page={'home'} />
		 <SavedLists lista={savedLists} page={'home'} />
		 <ListContainer itemType={'tomater'} setOpen={setOpen} open={open} page={'home'} list={activeLists} setAddListFormIsVisible />
		 <ListContainer itemType={'todos'} setOpen={setOpen} open={open} page={'home'} list={activeLists} setAddListFormIsVisible />
		 <ListContainer itemType={'todos'} setOpen={setOpen} open={open} page={'home'} list={activeLists} setAddListFormIsVisible />
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
/* 
  // pages/blog.js
  import { loadData } from '../lib/load-posts'
  
  // This function runs only on the server side
  export async function getStaticProps() {
	// Instead of fetching your `/api` route you can call the same
	// function directly in `getStaticProps`
	const data = await loadData()
  
	// Props returned will be passed to the page component
	return { props: { data } }
  } */