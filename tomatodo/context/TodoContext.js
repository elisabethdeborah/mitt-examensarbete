 import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { createContext, useReducer, useContext, useState, useEffect } from 'react';
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";
import { useUserStore } from '../context/UserStore';

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
	const [pending, setPending] = useState(false);
	const [deleteNow, setDeleteNow] = useState(false);
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const [listitem, setListitem] = useState(null);
	const [limbo, setLimbo] = useState(null);
	const router = useRouter();

	const { state, dispatch } = useUserStore();
	const { userInfo } = state;

	useEffect(() => {
		console.log('pending?', pending);
	}, [pending]);

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
				numberOfClicks,
				...,
			},
			"tomatoLibrary": * [_type == "tomato"  && user._ref == "${user}"] | order(_createdAt desc) {
				title, 
				time, 
				...,
				numberOfClicks,
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



	//check if user has lists that are all checked off but not saved,
	// make user choose between saving and deleting such lists
	useEffect(() => {
		if (initialFetch && initialFetch.limboLists) {
		setLimbo(initialFetch.limboLists);
		initialFetch.limboLists[0] ? setOverlay(true) : null;
		} else {
			setLimbo(false);
		};
	}, [initialFetch]);

	const handleGoBack = () => {
		setTimeout(() => {
			setFormIsVisible(false);
			setPopupIsOpen(false);
		}, 600);
		if (router.pathname !== '/mina-tomater' && router.pathname !== '/mina-sparade-listor') {
			if (limbo && !limbo[0] || !limbo ) {
				setOverlay(false);
				setCurrentItem(null);
			};
		};
	};

	const closeOverlay = () => {
		if (limbo && !limbo[0] || !limbo ) {
			setOverlay(false);
			setPopupIsOpen(false);
			setCurrentItem(null);
			setTimeout(() => {
				setFormIsVisible(false);
			}, 600);
		};
	};

	const todoState = {
		initialFetch,
		setInitialFetch,
		fetchTodos,
		fetchRes,
		setFetchRes,
		setDeleteNow,
		deleteNow,
		pending,
		setPending,
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
		listitem,
		setListitem,
		limbo,
		setLimbo,
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