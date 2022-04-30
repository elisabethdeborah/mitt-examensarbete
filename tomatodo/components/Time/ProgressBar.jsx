import clsx from 'clsx';
import React from 'react';
import styles from './styles/charts.module.scss';

const ProgressBar = ({color, percentage}) => {
	return (
		<section className={styles.wrapperSection}>
			<div className={clsx(styles.progressbarWrapper, {[styles.visible]: percentage > 0})}>
				<div 
					className={clsx(styles.progressBarFiller)} 
					style={{width: `${percentage}%`, backgroundColor: `${color}`, filter: 'brightness(0.5)'}} 
				/>
			</div>
		</section>
	);
};

export default ProgressBar;

