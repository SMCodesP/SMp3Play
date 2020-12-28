import React, { useState } from 'react'

import { ImSearch } from 'react-icons/im'

const { ipcRenderer } = window.require('electron');

import ContainerPage from '../components/ContainerPage'
import VerticalMenu from '../components/VerticalMenu'

import styles from '../styles/pages/search.module.css'

const Search = () => {
	const [searchText, setSearchText] = useState('')

	const searchVideos = () => {

		console.log(searchText)

	}

	const onFormSubmit = (e) => {
		e.preventDefault();
		searchVideos()
	}

	return (
		<ContainerPage>
			<VerticalMenu />

			<div className={styles.container}>
				<form className={styles.containerInput} onSubmit={onFormSubmit.bind(this)}>
					<input
						name="search"
						type="text"
						placeholder="Pesquisa uma música aqui."
						className={styles.searchInput}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<ImSearch
						size={18}
						color="#ff79c6"
						className={styles.searchIcon}
						onClick={searchVideos.bind(this)}
					/>
				</form>

				<div className={styles.containerVideos}>
					
				</div>
			</div>
		</ContainerPage>
	)
}

export default Search