import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { useUserStore } from '../context/UserStore';

export default function Index() {
	const { state, dispatch } = useUserStore();
	const { userInfo } = state;
	const router = useRouter();
 
	useEffect(() => {
		userInfo ? router.replace('/start') : router.replace('/login');
  	}, []);
};
