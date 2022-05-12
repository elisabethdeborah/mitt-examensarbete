import React, { useState, useEffect, useRef } from 'react';
import PieChart from './PieChart';
import clsx from "clsx";
import styles from './styles/charts.module.scss';

const ChartSection = ({ isRunning, timesUp, isInitialized, initialTime, timeLeft, sectionRef }) => {
	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		setFadeIn(true);
		return () => setFadeIn(false);
	}, []);

	return (
		<div className={styles.tomatoChartContainer} >
			{
				isInitialized ? (
				 !timesUp ? 
					(
						<PieChart 
							className={clsx( styles.viewPieChart, {
								[styles.isVisible]: isRunning
							})} 
							startTime={initialTime} 
							color={sectionRef.current && (sectionRef.current.style.backgroundColor)} 
							timeLeft={timeLeft} 
						/> 
					) : (
						<article className={clsx(styles.tomatoWhiteBorder, styles.isVisible,
							{	[styles.isVisible]: !isRunning, 
							[styles.animate]: timesUp})} />
					)
				): (
					<article className={clsx(styles.tomatoWhiteBorder, {
						[styles.isVisible]: fadeIn,	
						[styles.animateFadeIn]: fadeIn,
						[styles.animateFadeOut]: !fadeIn,
					})} />
				)
			}
		</div>
	);
};

export default ChartSection;