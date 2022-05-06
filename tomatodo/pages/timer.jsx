import React, { useState, useEffect, useRef } from 'react';
import Meta from "../components/Meta";
import clsx from "clsx";
import styles from '../components/Time/styles/timer.module.scss';
import FormTemplate from "../components/Forms/FormTemplate";
import ChartSection from "../components/Time/ChartSection";
import TomatoBtnContainers from '../components/Time/TomatoBtnContainers';
import { useUpdateContext } from "../context/TodoContext";

const TimerSet = () => {
	const sectionRef = useRef();
	const currentState = useUpdateContext();
	const [width, setWidth] = useState();
	const [fadeIn, setFadeIn] = useState(false);

	const getListSize = () => {
		const newWidth = sectionRef.current.clientWidth;
		setWidth(newWidth);
	};

	useEffect(() => {
		setFadeIn(true);
		getListSize();
		window.addEventListener("resize", getListSize);
		return () => {
			setFadeIn(false);
			window.removeEventListener("resize", getListSize);
		}
	}, []);

	return (
		<>
			{currentState.formIsVisible && (
				<FormTemplate />
			)}
			<div 
				className={clsx(styles.timerPageWrapper, {[styles.pageLoading]: fadeIn})}
				ref={sectionRef}
			>
				<Meta title='Timer' />
				<section className={styles.contentContainer} >
					<ChartSection sectionRef={sectionRef} />

						<button className={styles.addTime} onClick={() => currentState.setFormIsVisible(true)}>
							lägg till tid
						</button>
						<TomatoBtnContainers />
				</section>
			</div>
		</>
	);
};
  
export default TimerSet;