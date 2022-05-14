import React, { useState, useEffect, useRef } from 'react';
import Meta from "../components/Meta";
import clsx from "clsx";
import TomatoBtnContainers from '../components/Time/TomatoBtnContainers';
import { useUpdateContext } from "../context/TodoContext";
import ReactPlayer from 'react-player/lazy';
import mp3s from '../components/Time/alarms'; 

const Settings = () => {
	const sounds = mp3s;
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [soundOn, setSoundOn] = useState(true);
	const [audioSrc, setAudioSrc] = useState(null);

	return (
		<div 
			
		>
			<Meta title='Inställningar' />
			<section className={styles.contentContainer} >
				{console.log('mp3s', audioSrc)}
			<div>
			<ReactPlayer playing={isPlaying} url={audioSrc && audioSrc.src} muted={!soundOn} volume={volume} />
				<ul>
				{
					sounds.map((sound, index) => {
						return (<li onClick={() => {
							setAudioSrc(sound);
							setIsPlaying(!isPlaying);
						}} 
						key={index} style={{height: '100px', width: '300px', border: '2px solid red'}}><p>Alarm {sound.name}</p><span>{audioSrc && audioSrc.name === sounds[index].name && soundOn && isPlaying? 'sound On' : 'sound off'}</span>  volym: {volume * 100}% </li>)
					})
				}
				</ul>
			</div>
				
			</section>
		</div>
	);
};
  
export default Settings;