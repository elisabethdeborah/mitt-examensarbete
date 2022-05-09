import styles from './styles/deleteBtn.module.scss';
import {useTodoContext, useUpdateContext} from "../../context/TodoContext";
import { handleDelete } from '../../functions';

const DeletePopup = ({ listItem }) => {
	const currentState = useUpdateContext();
	const todoState = useTodoContext();
	const close = () => {
		currentState.setListitem(null);
		currentState.closeOverlay();
	}
	return (
		<div className={styles.deleteWarning}>
			<h2 className={styles.removeHeader}>Vill du ta bort <span>{`"${listItem.title}"`}</span>?</h2>
			<div className={styles.btnContainer}>
				<input className={styles.close} type={"button"} onClick={() => currentState.setListitem(null)} value={'ångra'}  />
				<input className={styles.addBtn} type={"button"} onClick={() => handleDelete(listItem,todoState, currentState)} value={'ta bort'} />
			</div>
		</div>
	);
};

export default DeletePopup;
