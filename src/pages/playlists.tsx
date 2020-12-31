import React, { useEffect, useState, createRef } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { ImSearch } from 'react-icons/im'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Player } from '@lottiefiles/react-lottie-player';
import ProgressiveImage from 'react-progressive-graceful-image';

const { ipcRenderer } = window.require("electron");

import ContainerPage from '../components/ContainerPage'
import PlaylistComponent from '../components/Playlist'
import VerticalMenu from '../components/VerticalMenu'

import { usePlaylists } from '../contexts/playlists'

import { Playlist } from '../interfaces/Playlist'

import '../styles/pages/playlists.css'

const Playlists = () => {

	const [searchText, setSearchText] = useState('')
	const [newPlaylist, setNewPlaylist] = useState('')
	const [loading, setLoading] = useState(true)
	const [openModal, setOpenModal] = useState(false)

	const { playlists, createPlaylist } = usePlaylists()

	const inputNewPlaylist = createRef<HTMLInputElement>()

	useEffect(() => {
		setLoading(false)
	}, [])

	useEffect(() => {
		setNewPlaylist('')
		setTimeout(() => {
			if (openModal && inputNewPlaylist.current) {
				inputNewPlaylist.current.focus()
				inputNewPlaylist.current.select()
			}
		}, 100)
	}, [openModal])

	function handleSubmitNewPlaylist(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (createPlaylist) {
			createPlaylist({
				id: uuidv4(),
				name: newPlaylist,
				musics: []
			})
		}
		setOpenModal(false)
	}

	return (
		<ContainerPage>
			<VerticalMenu />
			
			<div className="container">
				<br />
				<h1 style={{
					textAlign: 'center'
				}}>Playlists</h1>

				<form className="containerInput">
					<input
						name="search"
						type="text"
						placeholder="Pesquise uma playlist aqui."
						className="searchInput"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<ImSearch
						size={18}
						color="#ff79c6"
						className="searchIcon"
					/>
				</form>

				{loading ? (
					<Player
						autoplay={true}
						loop={true}
						src="https://assets7.lottiefiles.com/datafiles/Diiccbibc5RWV4v/data.json"
						style={{ height: '450px', width: '450px' }}
					></Player>
				) : (
					<div className="containerPlaylists">
						<div className="playlistAdd" onClick={() => setOpenModal(true)}>
							<h1 style={{
								textAlign: 'center',
								fontSize: 65,
								fontWeight: 400
							}}>+</h1>
						</div>
						{(playlists) && playlists.map((playlist) => (
							<PlaylistComponent
								playlist={playlist}
								key={playlist.id}
							/>
						))}
					</div>
				)}
			</div>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				className="modalInputNewPlaylist"
		        aria-labelledby="transition-modal-title"
		        aria-describedby="transition-modal-description"
		        closeAfterTransition
		        BackdropComponent={Backdrop}
		        BackdropProps={{
		          timeout: 500,
		        }}
			>
				<Fade in={openModal}>
					<form onSubmit={handleSubmitNewPlaylist}>
						<input
							ref={inputNewPlaylist}
							type="text"
							placeholder="Digite o nome da nova playlist."
							className="inputNewPlaylist"
							value={newPlaylist}
							onChange={(e) => setNewPlaylist(e.target.value)}
						/>
					</form>
				</Fade>
			</Modal>
		</ContainerPage>

	)
}

export default Playlists