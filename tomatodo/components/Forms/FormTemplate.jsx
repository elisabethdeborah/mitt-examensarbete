import React, { useState, useEffect } from "react";
import styles from './styles/form.module.scss';
import clsx from "clsx";
import { useUpdateContext } from "../../context/TodoContext";
import TimeInput from "./TimeInput";
import { validateTime } from "./formFunctions";
import { useRouter } from "next/router";

const FormTemplate = () => {
	const [userInputTime, setUserInputTime] = useState({hh: 0, min: 0});
	const [errMessage, setErrMessage] = useState('');
	const [inputTime, setInputTime] = useState(0);
	const [body, setBody] = useState({title: '', time: inputTime});
	const currentState = useUpdateContext();
	const router = useRouter();

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
			currentState.handleGoBack();
		} else {
			setErrMessage(checkValid);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			currentState.setOverlay(true);
		}, 10);
		return () => currentState.setOverlay(false);
	}, []);

	return (
		<section 
			className={styles.formContainer}
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
			<div className={styles.errMessageContainer}>
				<p className={styles.errMessage}>{errMessage}</p>
			</div>
			<div className={styles.btnContainer}>
				<input type={"button"} className={styles.closeForm} value="Ångra" onClick={ () => currentState.handleGoBack()} />
				<input type={"button" }className={styles.addBtn} value="Lägg till" onClick={() => handleTimerClick(body)} />
			</div>
		</section>
	);
};

export default FormTemplate;

