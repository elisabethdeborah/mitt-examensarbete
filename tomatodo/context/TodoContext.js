 import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { createContext, useContext, useEffect, useState } from 'react';
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";

const UserContext = createContext();
const TodoContext = createContext();
const UpdateContext = createContext();

export function TodoWrapper({children}) {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [initialFetch, setInitialFetch] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);
	const [countdownItem, setCountdownItem] = useState(null);
	const [fetchRes, setFetchRes] = useState({show: false});

  const fetchTodos = async () => {
    let fetchedTodos;
      fetchedTodos = await client.fetch(
			groq`{
				"allTodoLists": * [_type == "todoList" && !saved] | order(_createdAt desc) { 
				"limbo": count([...list[!checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][!checked])== 0 && count(* [_type == "todo" && todoList._ref == ^._id]{checked} +[...list]{checked}) > 0
				},	  
				}
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
				},

				"limboLists": * [_type == "todoList" && !saved && count([...list[!checked]]) + count(*[_type == "todo" && todoList._ref == ^._id][!checked])== 0 && count(* [_type == "todo" && todoList._ref == ^._id]{checked} +[...list]{checked}) > 0] | order(_createdAt desc) {
				title,
				"todos": * [_type == "todo" && todoList._ref == ^._id]{..., "slug": slug.current}+[...list]{..., "slug": slug.current},
				...,
				}
			  }`);
	  state.setInitialFetch(fetchedTodos);
	  return; 
  };

  const loggedInUserState = {
	  loggedInUser,
	  setLoggedInUser
  };

  const state = {
	 initialFetch,
	 setInitialFetch,
	 fetchTodos,
	 fetchRes,
	 setFetchRes
  };

  const currentState = {
	  currentItem,
	  setCurrentItem,
	  countdownItem,
	  setCountdownItem
  };

	return (
		<UserContext.Provider value={loggedInUserState}>
			<TodoContext.Provider value={state}>
				<UpdateContext.Provider value={currentState}>
					{children}
				</UpdateContext.Provider>
			</TodoContext.Provider>
		</UserContext.Provider>
	);
};

export function useUserContext() {
	const userState = useContext(UserContext);
	return userState;
};


export function useTodoContext() {
	const todoState = useContext(TodoContext);
	return todoState;
};

export function useUpdateContext() {
	const updatedState = useContext(UpdateContext);
	return updatedState;
};





/* 

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
			  }

*/
