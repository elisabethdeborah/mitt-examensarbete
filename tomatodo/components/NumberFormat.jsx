import styles from '../styles/numberFormat.module.scss';

const NumberFormat = ({ milliSeconds, text, showSecs, styling }) => {

	let time = Math.round(Number(milliSeconds)/1000);
	let hours = Math.floor(time/60/60);
	hours < 10 ? hours = `0${hours}` : hours;
	let minutes = (Math.floor(time/60) % 60);
	minutes < 10 ? minutes = `0${minutes}` : minutes;
	let seconds = time%60;
	seconds < 10 ? seconds = `0${seconds}` : seconds;
	let timeForm;
	showSecs ? 
		timeForm = `${hours}:${minutes}:${seconds}`
		: timeForm = `${hours}:${minutes}`

	return (
		<>
		{text || !showSecs ? (
			<h2 style={styling}>
			{time > 0 && 
			`${text? text : ''} ${timeForm}`
			}
		</h2>
		) : (
			<div className={styles.numbersContainer}>
				<h2 className={styles.number}>{hours}</h2><h2> : </h2><h2 className={styles.number}>{minutes}</h2><h2> : </h2><h2 className={styles.number}>{seconds}</h2>
			</div>

		)}
		</>
	);
};

export default NumberFormat;