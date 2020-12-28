import React from 'react'

import { usePlayer } from "../../contexts/player";

const ContainerPage = ({ children }) => {
	const {playing} = usePlayer()

	return (
		<div style={{
			width: '100%',
			display: 'flex',
			paddingBottom: playing ? '95px' : '0'
		}}>
			{children}
		</div>
	)
}

export default ContainerPage