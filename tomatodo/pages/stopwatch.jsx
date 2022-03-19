import Meta from "../components/Meta";
import clsx from "clsx";
import styles from '../styles/timer.module.scss';
import { useEffect, useState } from "react";
import NumberFormat from "../components/NumberFormat";
import Form from "../components/Form";
import { useUpdateContext } from "../context/TodoContext";

const Stopwatch = () => {
	const [inputformVisible, setInputformVisible] = useState(false);
	const [overlay, setOverlay] = useState(false);
	const [currentTime, setCurrentTime] = useState(null);
	const [isCounting, setIsCounting] = useState(false);
	const setItemState = useUpdateContext().setCurrentItem;

	const start = () => {
		setIsCounting(true);
	};

	useEffect(()=> {
		setItemState('');
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

	const pause = () => {
		setIsCounting(false);
	};

	const reset = () => {
		setCurrentTime(0);
		setIsCounting(false);
	};

	return (
		<div className={clsx(styles.timerPageWrapper, styles.stopwatchWrapper)}>
			<Meta title='Tidtagning' />
			<section className={styles.contentContainer}>
				{
					inputformVisible && (
						<Form 
							setFormIsVisible={setInputformVisible} 
							objectType={'tomato'} 
							method={'POST'} 
							currentListDocId={''} 
							setOverlay={setOverlay} 
							typeName={'tomat'} 
							defaultTime={currentTime/60} 
						/>
					)
				}
				<article className={styles.tomatoWhiteBorder} />
				<section className={styles.showStopwatchNumbers}>
					<NumberFormat 
						className={styles.formattedTime} 
						milliSeconds={Number(currentTime)} 
						text={''}
						styling={{fontSize: '1.75rem', position: 'relative'}} 
						showSecs 
					/>
				</section>
				<section className={styles.buttonContainer}>
					<article 
						className={clsx(styles.timerBtn, styles.playBtn, {[styles.disabled]: isCounting})} 
						onClick={() => start()}
					/>
					<article 
						className={clsx(styles.timerBtn, styles.pauseBtn, {[styles.disabled]: !isCounting || currentTime < 1})} 
						onClick={() => pause()} 
					/>
					<article 	
						className={clsx(styles.timerBtn, styles.stopBtn, {[styles.disabled]: currentTime < 1})} 
						onClick={() => reset()} 
					/>
					<article 
						className={clsx(styles.timerBtn, styles.saveBtn, {[styles.disabled]: isCounting || currentTime < 1})} 
						onClick={() => setInputformVisible(true)} 
					/> 
				</section>
			</section>
		</div>
	);
};

export default Stopwatch;