import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import {useUpdateContext, useTodoContext} from "../../context/TodoContext";

const Form = () => {
	
	const state = useTodoContext();
	const currentState = useUpdateContext();
	const fetchAllLists = state.fetchTodos;
	const [errMessage, setErrMessage] = useState('');
	const [overlay, setOverlay] = useState(false);
	
	let header;


	return (
		<>
			<div 
				className={clsx(styles.showOverlay, {
					[styles.overlayVisible]: overlay, 
				})}
			/>
			<section 
				className={clsx(styles.formContainer, {
					[styles.formIsVisible]: overlay,
				})}
			>	
				{
					objectType === 'tomato' && page !== 'archive' && (
					<aside className={styles.smallTomato} />
					)
				}
					<h1 className={styles.formHeader}>
						{header? `Redigera\n ${header}`: `Ny ${objectType}`}
					</h1>
					{
					 objectType !== 'todoList' && currentState.currentItem && currentState.currentItem.title ? (
						<input 
							type="text" 
							className={clsx(styles.input, styles.textInput)} 
							value={userInputName} 
							onChange={(e) => setUserInputName(e.target.value)} 
						/>
						) : (
						<input 
							type="text" 
							className={clsx(styles.input, styles.textInput)} 
							placeholder={`Namn på ${objectType}`} 
							onChange={(e) => setUserInputName(e.target.value)} 
						/>)
					}
				{
					objectType !== 'todoList' && (
						<>
						{
							currentState.currentItem && currentState.currentItem.description ? (
								<input 
									type="text" 
									className={clsx(styles.input, styles.textInput)} 
									value={userInputText} 
									onChange={(e) => setUserInputText(e.target.value)} 
								/>) : (
								<input 
									type="text" 
									className={clsx(styles.input, styles.textInput)} 
									placeholder={"Beskrivning"} 
									onChange={(e) => setUserInputText(e.target.value)} 
								/>)
							}
						<div className={styles.timeInputContainer}>
							<select
								value={userInputTime.hh}
								onChange={({ target: { value } }) => setUserInputTime({hh: `${value}`, min: userInputTime.min})}
							>
								{
									hours.map((value, index) => (
										<option key={index} value={`${value}`}>
											{value<10? `0${value}`: `${value}`}
										</option>
									))
								}
							</select>
							<select
								value={userInputTime.min}
								onChange={({ target: { value } }) => setUserInputTime({hh: userInputTime.hh, min: `${value}`})}
							>
								{
									mins.map((value, index) => (
										<option key={index} value={`${value}`}>
											{value<10? `0${value}`: `${value}`}
										</option>
									))
								}
							</select>
						</div>
						</>
					)
				}
				
				<div className={styles.btnContainer}>
					<input type={"button"} className={styles.closeForm} value="Ångra" onClick={() => handleGoBack()} />
					<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleSubmit(objectType)} />
				</div>
				{errMessage}
			</section>
		</>
	);
};

export default Form;

