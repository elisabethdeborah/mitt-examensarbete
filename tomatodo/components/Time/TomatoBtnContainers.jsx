import clsx from 'clsx';
import React from 'react';
import styles from './styles/btnContainer.module.scss';

const TomatoBtnContainers = ({page, functions, states }) => {
	return (
	<>
	{ page === 'none' ?
	(
		<section className={styles.buttonContainer}>
			<article className={clsx(styles.timerBtn, styles.playBtn, styles.disabled)}/>
			<article className={clsx(styles.timerBtn, styles.stopBtn, styles.disabled)}/>
			<article className={clsx(styles.timerBtn, styles.restartBtn, styles.disabled)}/>
			<article className={clsx(styles.timerBtn, styles.soundOffBtn, styles.disabled)}/>
		</section>
	) : (
		<section className={styles.buttonContainer}>
			{page === "stopwatch" ? 
			<article 
				className={clsx(styles.timerBtn, styles.playBtn, {[styles.disabled]: states.isCounting})} 
				onClick={() => functions.start()}
			/> :
			<article className={clsx(styles.timerBtn, styles.playBtn, {[styles.disabled]: states.isRunning || !states.isInitialized})} 
			onClick={!states.isRunning && states.isInitialized ? () => functions.handlePlay(): null} />
			}
			{page === "stopwatch" ?
			<article 
				className={clsx(styles.timerBtn, styles.pauseBtn, {[styles.disabled]: !states.isCounting || states.currentTime < 1})} 
				onClick={() => functions.pause()} 
			/> :
			
			states.isRunning ? (
					<article className={clsx(styles.timerBtn, styles.pauseBtn, {[styles.disabled]: !states.isRunning})} 
					onClick={() => functions.handlePause()} />
				) : (
					<article className={clsx(styles.timerBtn, styles.stopBtn, {[styles.disabled]: !states.isInitialized})} onClick={() => functions.handleStop()} />
				)
		}
			{page === "stopwatch" ?
			<article 	
				className={clsx(styles.timerBtn, styles.stopBtn, {[styles.disabled]: states.currentTime < 1})} 
				onClick={() => functions.reset()} 
			/> : 
			<article className={clsx(styles.timerBtn, styles.restartBtn, {[styles.disabled]: !states.isInitialized})} onClick={() => functions.restart()} />
		}
			
			{page === "stopwatch" ? 
			<article 
				className={clsx(styles.timerBtn, styles.saveBtn, {[styles.disabled]: states.isCounting || states.currentTime < 1})}  
				onClick={() => functions.setFormIsVisible(true)}
			/>:
			<article className={clsx(styles.timerBtn, {[styles.soundOffBtn]: !states.soundOn, [styles.soundOnBtn]: states.soundOn})} onClick={() => functions.setSoundOn(!states.soundOn)} />
		}	
		</section>)

		}
	</>
	);
};

export default TomatoBtnContainers;
