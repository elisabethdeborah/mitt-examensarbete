import React from "react";
import styles from './styles/form.module.scss';

const TimeInput = ({userInputTime, setUserInputTime, body, setBody, inputTime }) => {
	let hours = [];
	const mins = [];

	for (let index = 0; index < 24; index++) {
		hours.push(index);
	};

	for (let index = 0; index < 60; index++) {
		mins.push(index);
	};
	return (
		<div className={styles.timeInputContainer}>
			<select
				value={userInputTime.hh}
				onChange={({ target: { value } }) => {setUserInputTime({hh: `${value}`, min: userInputTime.min})}}
				onBlur={() => setBody((body) => ({...body, time: inputTime}))}
			>
				{
					hours.map((value, index) => (
						<option key={index} value={`${value}`}>
							{value<10? `0${value}`: `${value}`}
						</option>
					))
				}
			</select>
			<select
				value={userInputTime.min}
				onChange={({ target: { value } }) => {setUserInputTime({hh: userInputTime.hh, min: `${value}`})}}
				onBlur={() => setBody((body) => ({...body, time: inputTime}))}
			>
				{
					mins.map((value, index) => (
						<option key={index} value={`${value}`}>
							{value<10? `0${value}`: `${value}`}
						</option>
					))
				}
			</select>
		</div>
	)
};

export default TimeInput;