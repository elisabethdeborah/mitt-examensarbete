import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import { useUpdateContext } from "../../context/TodoContext";
import TimeInput from "./TimeInput";
import { validateTime } from "./formFunctions";
import { useRouter } from "next/router";

const FormTemplate = ({ setFormIsVisible }) => {
	
	const currentState = useUpdateContext();
	const router = useRouter();
	const [userInputTime, setUserInputTime] = useState({
		hh: 0, min: 0
	});
	const [errMessage, setErrMessage] = useState('');
	const [overlay, setOverlay] = useState(false);
	const [inputTime, setInputTime] = useState(0);
	const [body, setBody] = useState({title: '', time: inputTime});

	useEffect(() => {
		setErrMessage("");
		const validTime = typeof userInputTime.hh || typeof userInputTime.min === 'number' ? Number(userInputTime.hh *60 * 60 + userInputTime.min*60) : null;
		validTime ? setInputTime(validTime) : setInputTime(0);
		validTime ? setBody((body) => ({...body, time: validTime})): setBody((body) => ({...body, time: 0}));
	}, [userInputTime]);

	const handleTimerClick = (body) => {
		const checkValid = validateTime(body);
		if (checkValid === "valid") {
			currentState.setCountdownItem(body);
			router.push('/timer-countdown');
			setOverlay(false);
			setFormIsVisible(false);
		} else {
			setErrMessage(checkValid);
		}
	};

	const handleGoBack = () => {
		setOverlay(false);
		setTimeout(() => {
			setFormIsVisible(false);
		}, 600);
	};

	useEffect(() => {
		setTimeout(() => {
			setOverlay(true);
		}, 10);
		return () => setOverlay(false);
	}, []);

	return (
		<>
			<div onClick={() => handleGoBack()} className={clsx(styles.showOverlay, {[styles.overlayVisible]: overlay})}/>
			<section 
				className={clsx(styles.formContainer, {
					[styles.formIsVisible]: overlay
				})}
				style={{padding: '60px'}}
			>
				<h1 className={styles.formHeader}>Lägg till nedräkning</h1>
				<input 
					type="text" 
					className={clsx(styles.input, styles.textInput)} 
					placeholder={'Namn på nedräkning'} 
					onChange={(e) => setBody((body) => ({...body, title: e.target.value}))}
				/>
				<TimeInput userInputTime={userInputTime} setUserInputTime={setUserInputTime} setBody={setBody} body={body} inputTime={inputTime} />
				<div className={styles.btnContainer}>
					<input type={"button"} className={styles.closeForm} value="Ångra" onClick={ () => handleGoBack()} />
					<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleTimerClick(body)} />
				</div>
				{errMessage}
			</section>
		</>
	);
};

export default FormTemplate;

