import React from 'react'

const ContainerPage = ({ children }) => {
	return (
		<div style={{
			width: '100%',
			height: '100vh',
			display: 'flex'
		}}>
			{children}
		</div>
	)
}

export default ContainerPage