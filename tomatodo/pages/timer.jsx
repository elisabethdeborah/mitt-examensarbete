import Meta from "../components/Meta";
import clsx from "clsx";
import PieChart from '../components/PieChart';
import styles from '../styles/timer.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import useCountDown from 'react-countdown-hook';
import ProgressBar from "../components/ProgressBar";
import gsap from 'gsap';






const Timer = ({tomato}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [timesUp, setTimesUp] = useState(false);
	const [ soundOn, setSoundOn ] = useState(false);
	const [formattedTime, setFormattedTime] = useState();

	const initialTime = tomato ? tomato.time : 30000;
	const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, 1000);

	const [percentage, setPercentage ] = useState(0);
	const [color, setColor] = useState();


	/////
	const sectionRef = useRef();
	const [width, setWidth] = useState();
	const getListSize = () => {
		const newWidth = sectionRef.current.clientWidth;
		setWidth(newWidth);
	}

	const timeFormat = (timeSeconds) => {
		let time = Number(timeSeconds/1000)				
		let hours = Math.floor(time/60/60);
		hours < 10 ? hours = `0${hours}` : hours;
		let minutes = (Math.floor(time/60) % 60);
		//minutes > 60? minutes - 60 : minutes;
		minutes < 10 ? minutes = `0${minutes}` : minutes;
		let seconds = time%60;
		seconds < 10 ? seconds = `0${seconds}` : seconds;
		let timeForm = `${hours}:${minutes}:${seconds}`;
		return timeForm;
	  }
	
	useEffect(() => {
		getListSize();
		window.addEventListener("resize", getListSize);
		return () => {
			window.removeEventListener("resize", getListSize);
		}
	  }, []);
	  
	  useEffect(() => {
		  setPercentage(isInitialized && (Math.round((initialTime-timeLeft)/initialTime * 100)));
		  isInitialized && timeLeft <= 0 && (setTimesUp(true));
		  setFormattedTime(timeFormat(timeLeft))
		  isInitialized && (calculateBgColor());
		  return () => setPercentage(0);
	  }, [timeLeft])
	  
	  const restart = () => {
		if (isInitialized) { 
			setIsRunning(true);
			start(initialTime);
			//setColor(color)
		}
	  };

	  const handlePlay = () => {
		  if (!isRunning) {
		  if (! isInitialized) {
			  setIsInitialized(true);
			  setIsRunning(true)
			  start()
			  //setColor(color)
		  } else {
			setIsRunning(true)
			//gsap.to()
			//start(timeLeft)
			resume()
		  }
		}
	  }

	  const handlePause = () => {
		  pause()
		setIsRunning(false)
	  }

	  const handleStop = () => {
		reset()
	  setIsRunning(false)
	  setIsInitialized(false)
	}

	  const handleResume = () => {
		  resume()
		  setIsRunning(true)
	  }

	  const handleReset = () => {
		isInitialized && setIsInitialized(false)
		  reset()
	  }

	  const handleStopAlarm = () => {
		  setTimesUp(false)
		  setIsInitialized(false)
		  setIsRunning(false)
		  sectionRef.current.style.backgroundColor = '';
		};

/////////////////////

	const calculateBgColor = () => {
		console.log('percentage', percentage)
		console.log('sectionRef',sectionRef.current.style.backgroundColor)
		const endColor = [217, 35, 90];
		const middleColor = [252, 255, 8];
		const startColor = [136, 218, 78];
	const gamma = 3;
	let step = percentage< 50? percentage/100: percentage/90;

	step = Math.min(1, step);

	const average = (a, b, percent) => {
		let a_2 = Math.pow(a, gamma);
		let b_2 = Math.pow(b, gamma);
		let c_2 = a_2 + (b_2 - a_2) * percent
		return Math.pow(c_2, 1/gamma);
	}


	const colorString = (r, g, b) => {
		r = Math.min(255, Math.round(r));
		g = Math.min(255, Math.round(g));
		b = Math.min(255, Math.round(b));
	return "#" 
	+ ("0" + r.toString(16)).slice(-2) 
	+ ("0" + g.toString(16)).slice(-2) 
	+ ("0" + b.toString(16)).slice(-2)
	}

	const c = colorString(
		average(startColor[0], middleColor[0], step),
		average(startColor[1], middleColor[1], step),
		average(startColor[2], middleColor[2], step)
	);

	const d = colorString(
		average(middleColor[0], endColor[0], step),
		average(middleColor[1], endColor[1], step),
		average(middleColor[2], endColor[2], step)
	);

	if ( percentage <50) {
		sectionRef.current.style.backgroundColor = c;
	} else if (percentage >= 50) {
		sectionRef.current.style.backgroundColor = d;
	}
	}

//

	return (
	<div className={clsx(styles.timerPageWrapper, {
		[styles.backgroundIsPlaying]: isInitialized,
		})}
		 ref={sectionRef}>
		<Meta title='Timer' />
		<section className={styles.contentContainer} >
			<div className={styles.tomatoChartContainer} >
			{
				isInitialized && !timesUp ? (
					<PieChart className={clsx(
						styles.viewPieChart, {[styles.isVisible]: isRunning})} startTime={initialTime} color={sectionRef.current && (sectionRef.current.style.backgroundColor)} timeLeft={timeLeft} /> 
				) : (
					<article className={clsx(styles.tomatoWhiteBorder, {[styles.isVisible]: !isRunning})} />
				)
			}
			</div>
			{!timesUp && (<article className={styles.tomatoCountDown} />)}
			{tomato && (tomato.title)}
			{timesUp ? (
			<section className={clsx(styles.timesUpHeaderContainer, {[styles.showText]: timesUp, [styles.hideText]: !timesUp})}>
				<h1 className={styles.timesUpHeader}>Tiden är ute!</h1>
			</section>
			) : ( 
			<section className={clsx(styles.showCountdownNumbers, {[styles.hideNumber]: timesUp, [styles.showNumbers]: !timesUp})}>
				<h2>{formattedTime}</h2>
			</section>
			) }
			{ !timesUp ? (
				
				width > 600 ? (
					<section className={styles.buttonContainer}>
						<article className={clsx(styles.timerBtn, styles.playBtn)} onClick={() => handlePlay()} />
						{isRunning ? (<article className={clsx(styles.timerBtn, styles.pauseBtn)} onClick={() => handlePause()} />) : (<article className={clsx(styles.timerBtn, styles.stopBtn)} onClick={() => handleStop()} />)}
						<article className={clsx(styles.timerBtn, styles.restartBtn)} onClick={() => restart()} />
						 <article className={clsx(styles.timerBtn, {[styles.soundOffBtn]: soundOn, [styles.soundOnBtn]: !soundOn})} onClick={() => setSoundOn(!soundOn)} />
					</section>
					) : (
					<section className={styles.buttonContainer}>
						<article className={clsx(styles.timerBtn, {[styles.pauseBtn]: isRunning, [styles.playBtn]: !isRunning})}  onClick={isRunning ? () => handlePause() : () => handlePlay()} /> 
						<article className={clsx(styles.timerBtn, {[styles.soundOnBtn]: soundOn, [styles.soundOffBtn]: !soundOn })} onClick={() => setSoundOn(!soundOn)} />
					</section>
					)
				) : (
				<section className={styles.buttonContainerAfter}>
					<article className={clsx(styles.timerBtn, styles.stopBtn)}  onClick={() => handleStopAlarm()} /> 
				</section>
			)}
			<ProgressBar 
			initialTime={initialTime} 
			timeLeft={timeLeft} 
			color={sectionRef.current? sectionRef.current.style.backgroundColor: null}
			percentage={isInitialized && timeLeft > 0 ? percentage : 0}
			isRunning={isRunning}
			/>
		</section>
	</div>
)};

export default Timer;