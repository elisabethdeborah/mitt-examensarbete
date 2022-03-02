import React, { useEffect, useState } from "react";
import AddListForm from "../components/AddListForm";
import AddTomatoForm from "../components/AddTomatoForm";
import ActiveLists from "../components/ActiveLists";
import AddTodo from '../svgAssets/addBtn.svg';
import Meta from "../components/Meta";
import styles from "../styles/tomatoLibrary.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import NumberFormat from "../components/NumberFormat";

import client, {
  getClient,
  usePreviewSubscription,
} from "../lib/sanity";

import { groq } from "next-sanity";

export default function MinaTomater(props) {
	<Meta title='Mina tomater' />
	const [addListFormIsVisible, setAddListFormIsVisible] = useState(false);
	const [addTomatoFormIsVisible, setAddTomatoFormIsVisible] = useState(false);
	const [open, setOpen] = useState(0); 
	const [sideListVisible, setSideListsVisible] = useState(false);
	const [showTomatoo, setShowTomato] = useState(false);
	const [tomatoIndex, setTomatoIndex] = useState();
	const [showSettingsForm, setShowSettingsForm] = useState(false);
	const [showAddTodo, setShowAddTodo] = useState(false);
	const [overlay, setOverlay] = useState(false)

	const { postdata, preview } = props;

	const router = useRouter();
  
	const { data: posts } = usePreviewSubscription(query, {
		initialData: postdata,
		enabled: preview || router.query.preview !== undefined,
	  });

	const handleTomatoClick = (x) => {
		if (showTomatoo) {
			setOverlay(false)
			setSideListsVisible(false)
			setShowAddTodo(false)
			setShowSettingsForm(false)
			setAddListFormIsVisible(false)
			setTimeout(() => {
			setShowTomato(false)
			tomatoIndex !== x ? setTomatoIndex(x) : setTomatoIndex(null)
			}, 600)
		} else if (!showTomatoo){
			setShowTomato(true)
			setSideListsVisible(false)
			setShowAddTodo(false)

			setAddListFormIsVisible(false)
			setShowSettingsForm(false)

		tomatoIndex !== x ? setTomatoIndex(x) : setTomatoIndex(null)
		setTimeout(() => {
			setOverlay(true)
			}, 10);
		}		
	}

	const handleShowSettings = (x) => {
		setSideListsVisible(false)

		setAddListFormIsVisible(false)
		setShowAddTodo(false)
		setShowSettingsForm(!showSettingsForm)
	}

	const handleAddToTodo = (list) => {
		console.log('add', list)
		setShowSettingsForm(false)
		setAddListFormIsVisible(false)
		setShowAddTodo(!showAddTodo)
		setSideListsVisible(false)
	}

	const handlePlayTomato = (x) => {
		setSideListsVisible(false)
		setShowAddTodo(false)
		setAddListFormIsVisible(false)
		setShowSettingsForm(false)
		console.log('play', x.time)
	}

	return (
		<div className={clsx(styles.tomatoPageWrapper, {[styles.sideListVisible]: sideListVisible})}>
			<Meta title='Mina tomater' />
			{addTomatoFormIsVisible ? <AddTomatoForm addTomatoFormIsVisible={addTomatoFormIsVisible} setAddTomatoFormIsVisible={setAddTomatoFormIsVisible} /> 
				:
			<div className={styles.libraryContainer}>
				<div className={styles.tomatoListTop}>
					<h2 className={styles.tomatoLibraryHeader}>Mina tomater</h2> 
					<article className={styles.addTomatoIcon} onClick={() => setAddTomatoFormIsVisible(!addTomatoFormIsVisible)} />
				</div>
				{showTomatoo && (
				<div onClick={() => handleTomatoClick()} className={clsx(styles.showOverlay, {[styles.overlayVisible]: overlay})}/> )}
				
				 
				{posts.tomatoLibrary ? (posts.tomatoLibrary.map((list, index) => {
					return (
						<div className={styles.tomatoArtContainer} key={list._rev}>
						<article onClick={() => handleTomatoClick(index)} className={clsx(styles.tomatoObject, {
							[styles.orangeTomato]: index % 2 === 0,
							[styles.pinkTomato]: index % 2 === 1,
							[styles.showTomato]: index === tomatoIndex,
						})} key={index}>
							<h3>{list.title}</h3>
							{<NumberFormat className={styles.formattedTime} timeSeconds={Number(list.time)} text={'tid: '} textSize={'1.3rem'} showSecs={false} />}
						</article>
						{showTomatoo && posts.tomatoLibrary && index === tomatoIndex && (
						<div className={clsx(styles.optionsDiv, {
							[styles.visibleFirst]: showTomatoo && overlay, 
							[styles.visibleSettings]: showSettingsForm,
							[styles.visibleLists]: showAddTodo,
							[styles.visibleListForm]: addListFormIsVisible,
							}
							)}>
							{showTomatoo && (
								<div className={styles.btnContainer}>
									<article className={clsx(styles.iconBtn, styles.iconSettings)} onClick={() => handleShowSettings(list)} />
									<article className={clsx(styles.iconBtn, styles.iconAdd)} onClick={() => handleAddToTodo(list)} />
									<article className={clsx(styles.iconBtn, styles.iconPlay)} onClick={() => handlePlayTomato(list)} />
								</div>
							)}
								<div className={styles.showSettings}>
									<input type="text" placeholder={list.title} className={styles.inputTomato} />
									<input type="number" placeholder={list.time} className={styles.inputTomato} />
									<button className={styles.changeTomatoBtn}><p>Ändra</p></button>
								</div>
								<div className={styles.showActiveLists}>
									{console.log('tomato', list)}
									{
									console.log(list.name, list.time, list.description)}
									<ActiveLists lista={posts.currentLists} setSideListsVisible={setSideListsVisible} setOpen={setOpen} tomato={list} open={4} page={'tomato'} />
									<aside className={styles.optionContainer}>
										{!addListFormIsVisible && (
										<button className={styles.addTodoList} onClick={() => setAddListFormIsVisible(true)} >
											<h2>Skapa ny lista</h2>
											<AddTodo className={styles.addTdodoSvg} />
										</button>
										)}
									</aside>
									{addListFormIsVisible && <AddListForm addListFormIsVisible={addListFormIsVisible} setAddListFormIsVisible={setAddListFormIsVisible} />}
								</div>
						</div>
						)}
						</div>
					)})) : 
						<section className={styles.emptyList}>
							<article className={styles.addListIconBtn} onClick={() => setAddTomatoFormIsVisible(true)} />
							<h3>Du har inga tomater</h3>
						</section>
				}
			</div>
		}
		</div>
	)
};

const query = groq`{
		"savedLists": *[ _type == "todoList" && saved || _type == "library" ] {title, list, ..., "nrOfTodos": count(list)},
		
		"currentLists": *[_type == "todoList" && !saved]{
		title, _id, ...,
		'combinedLists': list + *[_type == 'todo' && references(^._id)],
		'nrOfTodos': count(list[] + *[_type == 'todo' && references(^._id)]),
		'numberOfNotChecked': count(*[_type == 'todo' && references(^._id) && !checked]) + count(list[!checked]),
		'numberOfChecked': count(*[_type == 'todo' && references(^._id) && checked]) + count(list[checked])
		},
			"tomatoLibrary": * [_type == "tomato"] {title, time, ...}
		}`;

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(query);

  return {
    props: {
		postdata: post,
		preview,
	  },
    //revalidate: 10,
  };
}
