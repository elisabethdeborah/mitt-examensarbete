import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import styles from './styles/btnContainer.module.scss';
import { useRouter } from "next/router";

const TomatoBtnContainers = ({ functions, states }) => {
	const router = useRouter();
	const [showVolume, setShowVolume] = useState(false);
	const [volumeBoxes, setVolumBoxes] = useState([]);

	const setVolume = (operation, volume) => {
		console.log('volume', volume, Number(volume.toFixed(1)), typeof volume, typeof Number(volume.toFixed(1)))
		if (operation === 'add') {
			volume < 1 ? functions.setVolume((Number((volume + 0.1).toFixed(1)))) : null; 
		} else if (operation === 'subtract') {
			volume > 0 ? functions.setVolume((Number((volume - 0.1).toFixed(1)))) : null; 
		}
	};

	const toggleSound = () => {
		functions.setVolume(states.volume < 0.1 ? 1 : 0);
	};

	const volumeArray = [];

	useEffect(() => {
		if (states && states.volume) {
		for (let index = 0; index < states.volume*10; index++) {
			volumeArray.push(index + 1);
		};
		setVolumBoxes(volumeArray);
		}
	}, [states]);



	return (
	<>
	{ router.pathname === '/timer' ?
	(
		<section className={styles.buttonContainer}>
			<article className={clsx(styles.timerBtn, styles.playBtn, styles.disabled)}/>
			<article className={clsx(styles.timerBtn, styles.stopBtn, styles.disabled)}/>
			<article className={clsx(styles.timerBtn, styles.restartBtn, styles.disabled)}/>
			<article className={clsx(styles.timerBtn, styles.soundOffBtn, styles.disabled)}/>
		</section>
	) : (
		<section className={styles.buttonContainer}>
			{router.pathname === '/stopwatch' ? 
			<article 
				className={clsx(styles.timerBtn, styles.playBtn, {[styles.disabled]: states.isCounting})} 
				onClick={() => functions.start()}
			/> :
			<article className={clsx(styles.timerBtn, styles.playBtn, {[styles.disabled]: states.isRunning || !states.isInitialized})} 
			onClick={!states.isRunning && states.isInitialized ? () => functions.handlePlay(): null} />
			}
			{router.pathname === '/stopwatch' ?
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
			{router.pathname === '/stopwatch' ?
			<article 	
				className={clsx(styles.timerBtn, styles.stopBtn, {[styles.disabled]: states.currentTime < 1})} 
				onClick={() => functions.reset()} 
			/> : 
			<article className={clsx(styles.timerBtn, styles.restartBtn, {[styles.disabled]: !states.isInitialized})} onClick={() => functions.restart()} />
		}
			
			{router.pathname === '/stopwatch' ? 
			<article 
				className={clsx(styles.timerBtn, styles.saveBtn, {[styles.disabled]: states.isCounting || states.currentTime < 1})}  
				onClick={() => functions.setFormIsVisible(true)}
			/>:
			<>
				<article className={clsx(styles.timerBtn, {[styles.soundOffBtn]: states.volume < 0.1, [styles.soundOnBtn]: states.volume > 0})} onClick={() => toggleSound()} />
					{showVolume && (
						<>
							<div className={styles.volumeSection}>
								<div className={styles.volumGraph}>
								{
								volumeBoxes.map((x) => {
									return (<article key={x} style={{height: `${x*10}%`}} 
									className={clsx(styles.volumBox, {
										[styles.volumeBlue]: states.volume > 0,
										[styles.volumeOrange]: states.volume > 0.4,
										[styles.volumePink]: states.volume > 0.7
									})} />)
								})}
								</div>
								<div className={styles.volumeBtnGroup}>
								<button className={styles.volumController} onClick={() =>  setVolume('subtract', states.volume)}> – </button>
								<p className={styles.volumePercent}>{`${states.volume * 100}%`}</p>
								<button className={styles.volumController} onClick={() => setVolume('add', states.volume)}> + </button>
							</div>
							</div>
							
						</>		
				)}
				<button className={clsx(styles.showVolumeBtn, {[styles.open]: showVolume, [styles.close]: !showVolume})} onClick={() => setShowVolume(!showVolume)}>{showVolume ? '–':'+/-'}</button>
			</>
		}	
		</section>)

		}
	</>
	);
};

export default TomatoBtnContainers;
