import React from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import Blast from '../../svgAssets/newtomato-whiteborder-blast3.svg';
import styles from './styles/charts.module.scss';
import clsx from 'clsx';
Chart.register(ArcElement);

const TimerChart = ({startTime, timeLeft, color}) => {
	const transparent = startTime-timeLeft;
	const orange = timeLeft;
	const fill = color === "green" ? "yellow": '#FF9100';
	const state = {
		datasets: [
			{
				backgroundColor: [
					'transparent',
					`${fill}`,
				],
				borderWidth: [
					0,
					3,
				],
				data: [transparent, orange]
		  	}
		],
	};
	
	return (
		<div className={styles.pieChartWrapper}>
			<Blast className={clsx(styles.chartBlast, {[styles.animate]: startTime})} />
			<Pie
				className={styles.pieChartObj}
				data={state}
			/>
		</div>
	);
};

export default TimerChart;
