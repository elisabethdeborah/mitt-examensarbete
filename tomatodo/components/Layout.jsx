import Meta from './Meta';
import styles from '../styles/Layout.module.scss';
import Header from './Header';

const Layout = ({children}) => {
	return (
		<div className={styles.container}>
			<Meta />
			<Header />
			<main className={styles.main}>
				{children}
			</main>
		</div>
	)
};

export default Layout;