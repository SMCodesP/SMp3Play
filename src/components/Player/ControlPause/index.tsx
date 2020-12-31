import React, { useState, useEffect, memo } from 'react'

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import { usePlayer } from '../../../contexts/player'

const ControlPause = () => {

	const [playing, setPlaying] = useState(true)

	const { playerSound } = usePlayer()

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
