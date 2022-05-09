import { useState, useEffect } from 'react';
import styles from './styles/deleteBtn.module.scss';
import {useTodoContext, useUpdateContext} from "../../context/TodoContext";
import clsx from 'clsx';

const DeleteButton = ({ color, listItem, size, text }) => {
	const currentState = useUpdateContext();


	return (
		<>
			<div onClick={() => currentState.setListitem(listItem)} 
				className={clsx(styles.deleteBtn, {
					[styles.smallOrange]: color === 'orange', 
					[styles.smallBlue]: color === 'blue', 
					[styles.large]: size === 'large',
					[styles.regular]: size === 'regular', 
				})} 
			>
				{text}
			</div>
		</>
	)
};

export default DeleteButton;
