import { useEffect, useState } from 'react';
import Picker from 'react-simple-picker';
import styles from '../styles/timePicker.module.scss';

const TimePicker = ({setUserInputTime}) => {
	const [time, setTime] = useState({hh: 0, min: 0});

const Text = ({ text, className }) => (
  <div className={className}>{text}</div>
);
Text.displayName = 'Text';

useEffect(() => {
	let hours = time.hh * 60 * 60;
	let minutes = time.min * 60;
	let totalTime = hours + minutes
	setUserInputTime(totalTime)
}, [time])


const handleChange = (tag) => (number) =>
  tag === 'hour' ? setTime( {...time, hh: number}) : setTime({...time, min: number})

return(
  <div className={styles.layout}>
    <Picker
	className={styles.pickerScroll}
	iconAdd={<Text className={styles.whiteButtonB} text="&#x2303;" />}
	iconMinus={<Text className={styles.whiteButtonT} text="&#8964;" />}
      initCount={6}
      maxCount={23}
      preloadCount={8}
	  scrollerBackground={'#D0EDFD'}
      onChange={handleChange('hour')}
    />
    <Picker
		className={styles.pickerScroll}
	iconAdd={<Text className={styles.whiteButtonB} text="&#x2303;" />}
	iconMinus={<Text className={styles.whiteButtonT} text="&#x2304;" />}
      initCount={6}
      maxCount={59}
      preloadCount={8}
	  scrollerBackground={'#D0EDFD'}
      onChange={handleChange('minute')}
    />
  </div>
)}

export default TimePicker;