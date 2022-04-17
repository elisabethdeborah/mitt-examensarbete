
import React, { useState, useEffect } from "react";
import styles from '../styles/message.module.scss';
import clsx from "clsx";

const Message = ({text, response, setFetchRes}) => {
	const [showText, setShowText] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setShowText(true);
		}, 2000);
		setTimeout(() => {
			setShowText(false);
		}, 3500);
		setTimeout(() => {
			setFetchRes({show: false});
		}, 4000);
	}, []);

	return (
		<div className={
			clsx(styles.textContainer, {
				[styles.messageVisible]: showText,
				[styles.warning]: !response, 
				[styles.success]: response, 
			})}>
			<h3>{text}</h3>
		</div>
	)
}

export default Message;