import styles from './styles/deleteBtn.module.scss';
import {useTodoContext, useUpdateContext} from "../../context/TodoContext";
import { handleDelete } from '../../functions';
import {useRouter} from 'next/router';

const DeletePopup = ({ listItem }) => {
	const router = useRouter();
	const currentState = useUpdateContext();
	const todoState = useTodoContext();

	const close = () => {
		if (router.pathname !== '/mina-tomater' && router.pathname !== '/mina-sparade-listor') {
			currentState.handleGoBack();
			currentState.setListitem(null);
		} else {
			currentState.setListitem(null);
		};
	};

	return (
		<div className={styles.deleteWarning}>
			<section className={styles.textGroup}>
				<h1>Vill du <span>ta bort</span> </h1>
				<h2><span>{`"${listItem.title}"`}</span>?</h2>
				<div className={styles.btnContainer}>
					<input className={styles.close} type={"button"} onClick={() => close()} value={'ångra'}  />
					<input className={styles.addBtn} type={"button"} onClick={() => handleDelete(listItem,todoState, currentState)} value={'ta bort'} />
				</div>
			</section>
		</div>
	);
};

export default DeletePopup;
