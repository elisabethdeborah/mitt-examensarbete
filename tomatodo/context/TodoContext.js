 import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { createContext, useContext, useEffect, useState } from 'react';
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";


  const TodoContext = createContext();
  const UpdateContext = createContext();


export function TodoWrapper({children}) {
	
	const [initialFetch, setInitialFetch] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);
	const [countdownItem, setCountdownItem] = useState(null);

  const fetchTodos = async () => {
    let fetchedTodos;
      fetchedTodos = await client.fetch(
			`{
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
			  }`);
	  state.setInitialFetch(fetchedTodos);
	  console.log('fetched, updated lists?')
	  return 
  };

  const state = {
	 initialFetch,
	 setInitialFetch,
	 fetchTodos
  };

  const currentState = {
	  currentItem,
	  setCurrentItem,
	  countdownItem,
	  setCountdownItem
  }



	return (
		<TodoContext.Provider value={state}>
			<UpdateContext.Provider value={currentState}>
			{children}
			</UpdateContext.Provider>
		</TodoContext.Provider>
	)
}

export function useTodoContext() {
	const todoState = useContext(TodoContext);
	return todoState;

}

export function useUpdateContext() {
	const updatedState = useContext(UpdateContext);
	return updatedState;

}






