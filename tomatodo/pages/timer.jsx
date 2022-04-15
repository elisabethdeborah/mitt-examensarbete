import Meta from "../components/Meta";
import clsx from "clsx";
import styles from '../styles/timer.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import FormTemplate from "../components/FormTemplate";
import {useUpdateContext, useTodoContext} from "../context/TodoContext";

const TimerSet = () => {
	const [inputformVisible, setInputformVisible] = useState(false);
	const currentState = useUpdateContext();
	let currentStateTime = currentState.countdownItem? Number(currentState.countdownItem.time)*1000:null;

	const sectionRef = useRef();
	const [width, setWidth] = useState();
	const getListSize = () => {
		const newWidth = sectionRef.current.clientWidth;
		setWidth(newWidth);
	};

	useEffect(() => {
		getListSize();
		window.addEventListener("resize", getListSize);
		return () => {
			window.removeEventListener("resize", getListSize);
		}
	}, []);

	return (
		<div 
			className={styles.timerPageWrapper}
			ref={sectionRef}
		>
			<Meta title='Timer' />
			<section className={styles.contentContainer} >
				{
					inputformVisible && (
						<FormTemplate 
							setFormIsVisible={setInputformVisible} 
						/>
					)
				}
				<div className={styles.tomatoChartContainer} >
					<article className={styles.tomatoWhiteBorder} />
				</div>
					<button className={styles.addTime} onClick={() => setInputformVisible(true)}>
						lägg till tid
					</button>
					<section className={styles.buttonContainer}>
							<article className={clsx(styles.timerBtn, styles.playBtn, styles.disabled)}/>
							<article className={clsx(styles.timerBtn, styles.stopBtn, styles.disabled)}/>
							<article className={clsx(styles.timerBtn, styles.restartBtn, styles.disabled)}/>
							<article className={clsx(styles.timerBtn, styles.soundOffBtn, styles.disabled)}/>
						</section>
			</section>
		</div>
	);
};
  
export default TimerSet;