import Cookies from 'js-cookie';
import { createContext, useReducer, useContext } from 'react';

export const UserContext = createContext();

const initialState = {
  userInfo: Cookies.get('userInfo')
    ? Cookies.get('userInfo')
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export const StoreProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const userState = { state, dispatch };

	return (
		<UserContext.Provider value={userState}>
			{children}
		</UserContext.Provider>
	);
};

export function useUserStore() {
	const storeState = useContext(UserContext);
	return storeState;
};