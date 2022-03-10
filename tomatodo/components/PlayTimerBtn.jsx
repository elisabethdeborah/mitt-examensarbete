import styles from '../styles/playBtn.module.scss';
import NumberFormat from './NumberFormat';
import Link from 'next/link';
import clsx from 'clsx';
import {useUpdateContext, useTodoContext} from "../context/TodoContext";

const PlayBtn = ({listItem}) => {
	//RÄKNA ANATAL CLICK, UPDATERA DB?
	/* const handlePlayTimer = async() => {
		await fetch("/api/tomato/todo", {
			method: "PUT",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			  "Access-Control-Allow-Origin": "http://localhost:3000"
			},
			body: JSON.stringify({
			  id: listItem._id,
			  //checked: !listItem.checked,
			}),
		});
		
	} */
	
	const currentState = useUpdateContext();




	return (
		<aside className={styles.todoTimeSection} onClick={() => currentState.setCurrentItem(listItem)} >
		{
			listItem.time ? (
				<>
					{/* {console.log('play btn: ', listItem.title, listItem.time, 'slug:', listItem.slug, listItem._id, color)} */}
					<Link
						href={'/timer'}
						passHref
					>
					<article className={clsx(styles.playBtn, {
						[styles.orange]: listItem._type ==="tomato",
						[styles.green]: listItem._type !=="tomato" && listItem.checked,
						[styles.grey]: listItem._type !=="tomato" && !listItem.checked,
						})} />
					</Link>
					{/* {listItem._type !=="tomato" && <NumberFormat timeSeconds={listItem.time} textSize={'0.75rem'} />} */}
				</>
			):
			<article className={styles.playBtnPlaceholder} /> 
		}
		</aside>
	)
}

export default PlayBtn;






/* 

<Link
						href={{
							pathname: "/timer/[id]",
							query: {
								id: listItem._id,
								title: listItem.title,
								time: listItem.time
							}
						}}
						as={`/timer/${listItem.slug}-${listItem.time}`}
						passHref
					>

{
						listItem.time ? (
							<>
								<Link href="/timer" passHref>
									<article className={styles.playBtn} />
								</Link>
								<div className={styles.todoTime}>
									<NumberFormat timeSeconds={listItem.time} textSize={'0.75rem'} />
								</div>
							</>
							) 
						: <article className={clsx(styles.playBtn, styles.disabled)} />
					}


*/