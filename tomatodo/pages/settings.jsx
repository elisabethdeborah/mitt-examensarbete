import React, { useState, useEffect, useRef } from 'react';
import Meta from "../components/Meta";
import clsx from "clsx";
import styles from '../components/Time/styles/timer.module.scss';
import FormTemplate from "../components/Forms/FormTemplate";
import ChartSection from "../components/Time/ChartSection";
import TomatoBtnContainers from '../components/Time/TomatoBtnContainers';
import { useUpdateContext } from "../context/TodoContext";

const Settings = () => {
	// const sectionRef = useRef();
	// const currentState = useUpdateContext();
	// const [width, setWidth] = useState();
	// const [fadeIn, setFadeIn] = useState(false);

	/* useEffect(() => {
		setFadeIn(true);
		return () => {
			setFadeIn(false);
		}
	}, []);
 */




	
	// 	        KOPPLAT TILL USER
	//			DEFAULT-INSTÄLLNINGAR
	//			VÄLJA ALARM-LJUD
	//			VÄLJA DEFAULT-VOLYM
	//			VÄLJA COLOR-SCHEME/DARK-/(COLOR MUTED) MODE
	//			SPARA PÅGÅENDE NEDRÄKNING / PÅGÅENDE TIDTAGNING I LOCAL-STORAGE, SÅ ATT 
	//			DET INTE FÖRSVINNER OM NÅN RÅKAR RELOADA BROWSERN


	//			DELETA ANVÄNDARE


	//			OFFLINE VERSION? (PWA?)






	return (
		<div 
			className={clsx(styles.settingsPageWrapper, {[styles.pageLoading]: fadeIn})}
			ref={sectionRef}
		>
			<Meta title='Inställningar' />
			<section className={styles.contentContainer} >
				
			</section>
		</div>
	);
};
  
export default Settings;