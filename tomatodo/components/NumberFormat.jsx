const NumberFormat = ({milliSeconds, textSize, text, showSecs}) => {
	let time = Math.round(Number(milliSeconds)/1000);
	let hours = Math.floor(time/60/60);
	hours < 10 ? hours = `0${hours}` : hours;
	let minutes = (Math.floor(time/60) % 60);
	minutes < 10 ? minutes = `0${minutes}` : minutes;
	let seconds = time%60;
	seconds < 10 ? seconds = `0${seconds}` : seconds;
	let timeForm;
	showSecs ? 
	timeForm = `${hours}:${minutes}:${seconds}`: timeForm = `${hours}:${minutes}`
	return (
		<h2 style={{fontSize: textSize}}>{text}{timeForm}</h2>
	);
}

export default NumberFormat;