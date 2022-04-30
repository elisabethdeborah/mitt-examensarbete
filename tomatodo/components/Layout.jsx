import Meta from './Meta';
import styles from '../styles/Layout.module.scss';
import Header from './Header';
import {useTodoContext} from "../context/TodoContext";
import Message from './Message';

const Layout = ({children}) => {
	const state = useTodoContext();
	return (
		<div className={styles.container}>
			<Meta />
			<Header />
			<main className={styles.main}>
			{ 
				state.fetchRes.show ? 
					<Message text={state.fetchRes.res ? `${state.fetchRes.type} "${state.fetchRes.title}" ${state.fetchRes.action}!` : `Nåt gick fel`} response={state.fetchRes.res} setFetchRes={state.setFetchRes} /> : null
			}
				{children}
			</main>
		</div>
	);
};

export default Layout;