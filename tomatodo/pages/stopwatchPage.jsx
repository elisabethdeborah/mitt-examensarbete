import Meta from "../components/Meta";
import clsx from "clsx";
import styles from '../styles/stopwatch.module.scss';

const StopwatchPage = () => (
	<div className={styles.timerPageWrapper}>
		<Meta title='Timer' />
		<section className={styles.contentContainer}>
			<article className={styles.tomatoWhiteBorder} />
			<section className={styles.showStopwatchNumbers}></section>
			<section className={styles.buttonContainer}>
				<article className={clsx(styles.timerBtn, styles.playBtn)} />
				<article className={clsx(styles.timerBtn, styles.pauseBtn)} />
				<article className={clsx(styles.timerBtn, styles.stopBtn)} />
				{showSaveTomatoBtn ? <article className={clsx(styles.timerBtn, styles.saveBtn)} /> : <article className={clsx(styles.timerBtn, styles.saveBtn)} />}
			</section>
		</section>
	</div>
);

export default StopwatchPage;