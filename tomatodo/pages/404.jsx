import Link from 'next/link';
import styles from '../styles/error.module.scss';

const Custom404 = () => {
	return (
		<div className={styles.wrapper}>
			<h1>404</h1>
			<h2>hoppsan, nånting gick snett.</h2>
			<Link href="/" passHref>
				<button className={styles.errGoBackBtn}>gå till startsidan</button>
			</Link>
		</div>
	);
};

export default Custom404;