 import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";
import Cookies from "js-cookie";
import { useUserStore } from '../context/UserStore';

//const UserContext = createContext();
const TodoContext = createContext();
const UpdateContext = createContext();

export function TodoWrapper({children}) {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [initialFetch, setInitialFetch] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);
	const [countdownItem, setCountdownItem] = useState(null);
	const [fetchRes, setFetchRes] = useState({show: false});
	const [overlay, setOverlay] = useState(false);
	const [formIsVisible, setFormIsVisible] = useState(false);
	const [showWarning, setShowWarning] = useState(null);
	const [deleteNow, setDeleteNow] = useState(false);
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const router = useRouter();

	const { state, dispatch } = useUserStore();
	const { userInfo } = state;

	const handleGoBack = () => {
		setTimeout(() => {
			setFormIsVisible(false);
		}, 600);
		if (router.pathname !== '/mina-tomater' && router.pathname !== '/mina-sparade-listor') {
			setOverlay(false);
			setCurrentItem(null);
		};
	};

	const closeOverlay = () => {
		setOverlay(false);
		setCurrentItem(null);
		setTimeout(() => {
			setFormIsVisible(false);
		}, 600);
	};

  const fetchTodos = async () => {
    let fetchedTodos;
	let user;
	userInfo ? user = userInfo._id : null;
    
	fetchedTodos = await client.fetch(groq`{
		"activeLists": * [_type == "todoList" && user._ref == "${user}" && !saved  ] | order(_createdAt desc) {
			title,
			saved,
			"nrOfTodos": count(* [_type == "todo" && todoList._ref == ^._id]),
			'numberOfChecked': count(*[_type == "todo" && todoList._ref == ^._id][checked]),
			'numberOfNotChecked': count(*[_type == "todo" && todoList._ref == ^._id][!checked]),
			"todos": * [_type == "todo" && todoList._ref == ^._id],
			...,
		},
		"savedLists": * [_type == "todoList" && user._ref == "${user}" && saved && count(*[_type == "todo" && todoList._ref == ^._id][!checked]) == 0  ] | order(_createdAt desc) {
			title,
			saved,
			"nrOfTodos": count(* [_type == "todo" && todoList._ref == ^._id]),
			"todos": * [_type == "todo" && todoList._ref == ^._id],
			...,
		},
		"tomatoLibrary": * [_type == "tomato"  && user._ref == "${user}"] | order(_createdAt desc) {
			title, 
			time, 
			...,
		  },
		"limboLists": * [_type == "todoList" && user._ref == "${user}" && !saved && count(*[_type == "todo" && todoList._ref == ^._id][!checked]) == 0 && count(* [_type == "todo" && todoList._ref == ^._id]) > 0] | order(_createdAt desc) {
			title,
			saved,
			"todos": * [_type == "todo" && todoList._ref == ^._id],
			...,
		},
	}`);
				
	  todoState.setInitialFetch(fetchedTodos);
	  return; 
  };

  const todoState = {
	 initialFetch,
	 setInitialFetch,
	 fetchTodos,
	 fetchRes,
	 setFetchRes,
	 showWarning,
	 setShowWarning,
	 setDeleteNow,
	 deleteNow
  };

  const currentState = {
	  currentItem,
	  setCurrentItem,
	  countdownItem,
	  setCountdownItem, 
	  overlay,
	  setOverlay,
	  handleGoBack, 
	  setFormIsVisible,
	  formIsVisible,
	  closeOverlay,
	  popupIsOpen,
	  setPopupIsOpen,
  };

	return (
			<TodoContext.Provider value={todoState}>
				<UpdateContext.Provider value={currentState}>
					{children}
				</UpdateContext.Provider>
			</TodoContext.Provider>
	);
};

export function useTodoContext() {
	const todoState = useContext(TodoContext);
	return todoState;
};

export function useUpdateContext() {
	const updatedState = useContext(UpdateContext);
	return updatedState;
};