import Meta from "../components/Meta";
import clsx from "clsx";
import styles from '../components/Time/styles/timer.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import calculateBgColor from "../functions";
import useCountDown from 'react-countdown-hook';
import ProgressBar from "../components/Time/ProgressBar";
import NumberFormat from "../components/NumberFormat";
import { useRouter } from "next/router";
import { useUpdateContext } from "../context/TodoContext";
import ReactPlayer from 'react-player/lazy';
import alarmSound from '../assets/sounds/arcade_game_alarm_long.mp3';
import ChartSection from "../components/Time/ChartSection";
import TomatoBtnContainers from "../components/Time/TomatoBtnContainers";

const Timer = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [timesUp, setTimesUp] = useState(false);
	const [ soundOn, setSoundOn ] = useState(true);
	const [volume, setVolume] = useState(1);
	const router = useRouter();
	const currentState = useUpdateContext();
	let currentStateTime = currentState.countdownItem? Number(currentState.countdownItem.time)*1000:null;
	const [initialTime, setInitialTime] = useState(currentStateTime);
	const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, 100);
	const [percentage, setPercentage ] = useState(0);
	const src = alarmSound;

	useEffect(() => {
		initialTime ?  handlePlay() : router.back();
		return () => {
			reset();
			setIsRunning(false);
			setIsInitialized(false);
			setTimesUp(false);
			currentState.setCountdownItem(null);
			currentState.setCurrentItem(null);
			sectionRef.current ? sectionRef.current.style.opacity = '0' :null;
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
		if (isInitialized && isRunning && timeLeft === 0) {
			setTimesUp(true);
		} else {
			setPercentage(Math.round((initialTime-timeLeft)/initialTime*100));
			isInitialized && (calculateBgColor(percentage, sectionRef));
		};
		return () => {
			setTimesUp(false);
		};
	}, [timeLeft]);
	
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
		currentState.setCurrentItem(null);
		sectionRef.current ? sectionRef.current.style.opacity = '0' :null;
		setTimeout(() => {
			router.back();
		}, 600);
	};
	
	const functions = {
		handlePlay,
		handlePause,
		handleStop,
		setSoundOn,
		restart,
		setVolume,
	};

	const states = {
		soundOn,
		isRunning,
		isInitialized,
		volume
	};

	return (
		<div 
			className={clsx(styles.timerPageWrapper, {
				[styles.backgroundIsPlaying]: isInitialized,
			})}
			ref={sectionRef}
		>
			<Meta title='Timer' />
			<div onClick={() => {handleStop()}} className={styles.closeCountdown} />
			<section className={styles.contentContainer} >
				<section className={styles.soundPlayerContainer}>
					<ReactPlayer playing={isInitialized && timesUp} url={src} loop muted={!soundOn} volume={volume} />
				</section>
				<ChartSection isRunning={isRunning} timesUp={timesUp} isInitialized={isInitialized} initialTime={initialTime} timeLeft={timeLeft} sectionRef={sectionRef} />
				{
					isInitialized && !timesUp && (
						<article className={styles.tomatoCountDown} />
					)
				}
				<h2 className={styles.todoTitle} styling={percentage > 80 ? { color: 'white' } : null}>
					{currentState.countdownItem && (currentState.countdownItem.title)}
				</h2>
				{
					isInitialized && timesUp ? (
						<section className={clsx(styles.timesUpHeaderContainer, {
							[styles.showText]: timesUp, 
							[styles.hideText]: !timesUp
						})}>
							<h1 className={styles.timesUpHeader}>Tiden är ute!</h1>
						</section>
					) : ( 
						<section className={clsx(styles.showCountdownNumbers, {[styles.hideNumber]: timesUp, [styles.showNumbers]: !timesUp})}>
							{
								isInitialized && typeof timeLeft ==="number" && (
									<NumberFormat 
										className={styles.formattedTime} 
										milliSeconds={Number(timeLeft)} 
										text={''} 
										styling={percentage > 80 ? {fontSize: '1.75rem', position: 'relative', color: 'white'}:{fontSize: '1.75rem', position: 'relative'}} 
										showSecs 
									/> 
							)}
						</section>
						) 
				}
				{ 
					!timesUp ? (
						<TomatoBtnContainers functions={functions} states={states}/>
					) : (
						<section className={styles.buttonContainerAfter}>
							<article className={styles.stopAlarmBtn}  onClick={() => handleStop()}>Stoppa</article> 
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
