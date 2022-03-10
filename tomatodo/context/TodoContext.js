 import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { createContext, useContext, useEffect, useState } from 'react';
import {server} from '../config/index';

import styles from '../styles/Home.module.scss';
import client, {
	getClient,
	usePreviewSubscription,
  } from "../lib/sanity";


  const TodoContext = createContext();
  const UpdateContext = createContext();


export function TodoWrapper({children}) {
	
	const [otherState, setOtherState] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);


  //const { user, loading } = useAuth();
  const { user, loading } = useState('elisabeth');

  useEffect(() => {
  }, []);

  const state = {
	 user,
  };

  const currentState = {
	  currentItem,
	  setCurrentItem
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






