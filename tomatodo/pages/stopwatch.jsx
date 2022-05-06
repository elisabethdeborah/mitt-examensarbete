import Meta from "../components/Meta";
import clsx from "clsx";
import styles from '../components/Time/styles/timer.module.scss';
import { useEffect, useState, useRef } from "react";
import NumberFormat from "../components/NumberFormat";
import Form from "../components/Forms/Form";
import { useUpdateContext } from "../context/TodoContext";
import ChartSection from "../components/Time/ChartSection";
import TomatoBtnContainers from "../components/Time/TomatoBtnContainers";

const Stopwatch = () => {
	const [currentTime, setCurrentTime] = useState(null);
	const [isCounting, setIsCounting] = useState(false);
	const [width, setWidth] = useState();
	const [fadeIn, setFadeIn] = useState(false);
	const setItemState = useUpdateContext().setCurrentItem;
	const currentState = useUpdateContext();
	const sectionRef = useRef();

	useEffect(() => {
		setFadeIn(true);
		getListSize();
		window.addEventListener("resize", getListSize);
		return () => {
			setFadeIn(false);
			window.removeEventListener("resize", getListSize);
		}
	}, []);

	useEffect(()=> {
		setItemState(null);
	}, []);

	useEffect(() => {
		let interval = null;
		isCounting? 
			interval = setInterval(() => {
				setCurrentTime(currentTime => currentTime+=10);
			}, 10)
			: clearInterval(interval);
		return () => clearInterval(interval);
	}, [isCounting]);
	
	const getListSize = () => {
		const newWidth = sectionRef.current.clientWidth;
		setWidth(newWidth);
	};
	
	const start = () => {
		setIsCounting(true);
	};

	const pause = () => {
		setIsCounting(false);
	};

	const reset = () => {
		setCurrentTime(0);
		setIsCounting(false);
	};

	const functions = {
		start,
		pause,
		reset,
		setFormIsVisible: currentState.setFormIsVisible,
	};

	const states = {
		isCounting,
		currentTime
	};

	return (
		<>
		{
		currentState.formIsVisible && (
			<Form 
				objectType={'tomato'} 
				method={'POST'} 
				currentListDocId={''} 
				typeName={'tomat'} 
				defaultTime={Math.round(currentTime/10000)*10 > 59 ? Math.round(currentTime/10000)*10 : 60} 
			/>
		)
		}
		
		<div className={clsx(styles.timerPageWrapper, styles.stopwatchWrapper)} ref={sectionRef}>
			<Meta title='Tidtagning' />
			<section className={styles.contentContainer}>
				<ChartSection sectionRef={sectionRef} />
				<section className={styles.showStopwatchNumbers}>
					<NumberFormat 
						className={styles.formattedTime} 
						milliSeconds={Number(currentTime)} 
						text={''}
						styling={{fontSize: '1.75rem', position: 'relative'}} 
						showSecs 
					/>
				</section>
				<div className={styles.filler} />
				<TomatoBtnContainers functions={functions} states={states} />
			</section>
		</div>
		</>
	);
};

export default Stopwatch;