import Meta from "../components/Meta";
import clsx from "clsx";
import PieChart from '../components/PieChart';
import styles from '../styles/timer.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import useCountDown from 'react-countdown-hook';
import ProgressBar from "../components/ProgressBar";
import NumberFormat from "../components/NumberFormat";
import { useRouter } from "next/router";
import { useUpdateContext } from "../context/TodoContext";

const Timer = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [timesUp, setTimesUp] = useState(false);
	const [ soundOn, setSoundOn ] = useState(false);
	const router = useRouter();
	const currentState = useUpdateContext();
	let currentStateTime = currentState.countdownItem? Number(currentState.countdownItem.time)*1000:null;
	const [initialTime, setInitialTime] = useState(currentStateTime);
	const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime);
	const [percentage, setPercentage ] = useState(0);

	useEffect(() => {
		initialTime? handlePlay() : null;
		return () => {
			handleStop();
		};
	}, []);


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
	  
	useEffect(() => {
		if (isInitialized && isRunning && timeLeft <= 0) {
			setTimesUp(true);
			console.log('ended:', 'timeleft', percentage, isInitialized && isRunning && timeLeft <= 0);
		} else {
			setPercentage(Math.round((initialTime-timeLeft)/initialTime*100));
			isInitialized && (calculateBgColor());
		};
		return () => {
			setTimesUp(false);
		};
	}, [timeLeft]);

	useEffect(() => {
		!currentState.countdownItem ? 
		router.replace('/timer') : null;
	}, [currentState.countdownItem]);
	
	const restart = () => {
		setTimesUp(false);
		if (isInitialized) { 
			setIsRunning(true);
			start(initialTime);
		};
	};

	const handlePlay = () => {
		setTimesUp(false);
		if (!isRunning) {
			if (! isInitialized) {
				start();
				setIsInitialized(true);
				setIsRunning(true);
			} else {
				setIsRunning(true);
				resume();
			};
		};
	};

	const handlePause = () => {
		pause();
		setIsRunning(false);
	};

	const handleStop = () => {
		reset();
		setIsRunning(false);
		setIsInitialized(false);
		setTimesUp(false);
		currentState.setCountdownItem(null);
		sectionRef.current ? sectionRef.current.style.backgroundColor = '' :null;
		router.replace('/timer');
	};

	const handleStopAlarm = () => {
		setTimesUp(false);
		setIsInitialized(false);
		setIsRunning(false);
		sectionRef.current ? sectionRef.current.style.backgroundColor = '' :null;
		setTimeout(() => {
			router.replace('/timer');
		}, 1000);
	};

	const calculateBgColor = () => {
		console.log('percentage', percentage);
		const endColor = [217, 35, 90];
		const middleColor = [252, 255, 8];
		const startColor = [136, 218, 78];
		const gamma = 3;
		let step = percentage< 50? percentage/100: percentage/90;
		step = Math.min(1, step);

		const average = (a, b, percent) => {
			let a_2 = Math.pow(a, gamma);
			let b_2 = Math.pow(b, gamma);
			let c_2 = a_2 + (b_2 - a_2) * percent;
			return Math.pow(c_2, 1/gamma);
		};

		const colorString = (r, g, b) => {
			r = Math.min(255, Math.round(r));
			g = Math.min(255, Math.round(g));
			b = Math.min(255, Math.round(b));
		return "#" 
		+ ("0" + r.toString(16)).slice(-2) 
		+ ("0" + g.toString(16)).slice(-2) 
		+ ("0" + b.toString(16)).slice(-2)
		};

		const c = colorString (
			average(startColor[0], middleColor[0], step),
			average(startColor[1], middleColor[1], step),
			average(startColor[2], middleColor[2], step)
		);

		const d = colorString (
			average(middleColor[0], endColor[0], step),
			average(middleColor[1], endColor[1], step),
			average(middleColor[2], endColor[2], step)
		);
		if ( percentage <50) {
			sectionRef.current.style.backgroundColor = c;
		} else if (percentage >= 50) {
			sectionRef.current.style.backgroundColor = d;
		};
	};

	return (
		<div 
			className={clsx(styles.timerPageWrapper, {
				[styles.backgroundIsPlaying]: isInitialized,
			})}
			ref={sectionRef}
		>
			<Meta title='Timer' />
			<section className={styles.contentContainer} >
				<div className={styles.tomatoChartContainer} >
					{
						isInitialized && !timesUp ? 
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
								<article className={clsx(styles.tomatoWhiteBorder, {[styles.isVisible]: !isRunning, [styles.animate]: timesUp})} />
							)
					}
				</div>
				{
					isInitialized && !timesUp && (
						<article className={styles.tomatoCountDown} />
					)
				}
				<h2 className={styles.todoTitle}>
					{currentState.countdownItem && (currentState.countdownItem.title)}
				</h2>
				{
					isInitialized && timesUp ? (
							<>
								<section className={clsx(styles.timesUpHeaderContainer, {[styles.showText]: timesUp, [styles.hideText]: !timesUp})}>
									<h1 className={styles.timesUpHeader}>Tiden är ute!</h1>
								</section>
							</>
						) : ( 
							<section className={clsx(styles.showCountdownNumbers, {[styles.hideNumber]: timesUp, [styles.showNumbers]: !timesUp})}>
								{
									isInitialized && typeof timeLeft ==="number" && (
										<NumberFormat 
											className={styles.formattedTime} 
											milliSeconds={Number(timeLeft)} 
											text={''} 
											styling={{fontSize: '1.75rem', position: 'relative'}} 
											showSecs 
										/> 
								)}
							</section>
						) 
				}
				{ 
					!timesUp ? (
						<section className={styles.buttonContainer}>
							<article className={clsx(styles.timerBtn, styles.playBtn, {[styles.disabled]: isRunning || !isInitialized})} onClick={!isRunning && isInitialized ? () => handlePlay(): null} />
							{
								isRunning ? (
									<article className={clsx(styles.timerBtn, styles.pauseBtn, {[styles.disabled]: !isRunning})} onClick={() => handlePause()} />
								) : (
									<article className={clsx(styles.timerBtn, styles.stopBtn, {[styles.disabled]: !isInitialized})} onClick={() => handleStop()} />
								)
							}
							<article className={clsx(styles.timerBtn, styles.restartBtn, {[styles.disabled]: !isInitialized})} onClick={() => restart()} />
							<article className={clsx(styles.timerBtn, {[styles.soundOffBtn]: soundOn, [styles.soundOnBtn]: !soundOn})} onClick={() => setSoundOn(!soundOn)} />
						</section>
					) : (
						<section className={styles.buttonContainerAfter}>
							<article className={clsx(styles.timerBtn, styles.stopBtn)}  onClick={() => handleStopAlarm()} /> 
						</section>
					)
				}
				<ProgressBar 
					initialTime={initialTime} 
					timeLeft={timeLeft} 
					color={sectionRef.current? sectionRef.current.style.backgroundColor: null}
					percentage={isInitialized && timeLeft > 0 ? percentage : 0}
					isRunning={isRunning}
				/>
			</section>
		</div>
	);
};
  
export default Timer;