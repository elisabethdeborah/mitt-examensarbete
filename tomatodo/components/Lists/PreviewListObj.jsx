import styles from './styles/deleteBtn.module.scss';
import clsx from 'clsx';
import NumberFormat from '../NumberFormat';

const PreviewListObj = ({ item }) => {
	return (
		<article key={item._id} className={clsx(styles.hiddenLists, styles.isVisible)} >
			<section className={styles.textGroup}>
				<h3>{item.title}</h3>
				{ item && item._createdAt && (
					<p> tillagd: {item._createdAt.slice(0, 10)} </p>
				)}
			</section>
			<div className={styles.tomatoTime}>
					<NumberFormat 
						milliSeconds={Number(item.time*1000)} 
						styling={{fontSize: '0.7rem', position: 'relative', bottom: '0px', margin: '0'}}
						text={'tid: '} 
					/>
				</div>
		</article>
	);
};

export default PreviewListObj;