import React, { useState, useEffect, memo } from 'react'

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import { usePlayer } from '../../../contexts/player'

const ControlPause = ({
	audioElement
}: { audioElement: React.RefObject<HTMLAudioElement> }) => {

	const [playing, setPlaying] = useState(true)

	const { playerSound } = usePlayer()

	useEffect(() => {

		audioElement.current?.addEventListener('pause', () => setPlaying(false))
		audioElement.current?.addEventListener('play', () => setPlaying(true))

		return () => {
			audioElement.current?.removeEventListener('pause', () => setPlaying(false))
			audioElement.current?.removeEventListener('play', () => setPlaying(true))
		}
	}, [audioElement])

	useEffect(() => {

		if (playerSound && playerSound.current) {
			playing ? playerSound.current.play() : playerSound.current.pause() 
		}

	}, [playing])


	return playing ? (
		<BsFillPauseFill
			color="#f1fa8c"
			size={26}
			onClick={() => setPlaying((currentPlaying) => !currentPlaying)}
			className="iconPlay"
		/>
	) : (
		<BsFillPlayFill
			color="#f1fa8c"
			size={26}
			onClick={() => setPlaying((currentPlaying) => !currentPlaying)}
			className="iconPlay"
		/>
	)

}

export default memo(ControlPause)
