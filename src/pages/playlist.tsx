import React, { useState, useEffect } from 'react'

import ProgressiveImage from 'react-progressive-graceful-image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { FaRegPlayCircle } from 'react-icons/fa';

import ContainerPage from '../components/ContainerPage'
import VerticalMenu from '../components/VerticalMenu'

import '../styles/pages/playlist.css'

import { Playlist } from '../interfaces/Playlist'
import { Thumbnail } from '../interfaces/Thumbnail'

import { usePlaylists } from '../contexts/playlists'

const PlaylistPage = ({ match }: {
	match: {
		params: {
			id: string;
		}
	}
}) => {
	const [playlist, setPlaylist] = useState<Playlist>(
		JSON.parse(localStorage.getItem('playlists') || '[]').find((playlist: Playlist) => playlist.id === match.params.id)
	)
	const [thumbnails, setThumbnails] = useState<Array<Thumbnail | null>>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [titleEditing, setTitleEditing] = useState<boolean>(false)
	const [title, setTitle] = useState<string>(playlist.name)

	const history = useHistory()
	const { play, setTitlePlaylist } = usePlaylists()

	function secondsToDate(seconds: number) {
		let date = new Date(0)
		date.setSeconds(seconds)
		return date.toISOString().substr(11, 8)
	}

	useEffect(() => {
		if (!playlist) {
			history.push('/playlists')
			return;
		}

		if (playlist.musics) {
			const thumbnailsLocal = playlist.musics.map((music) => ({
				src: music.image,
				placeholder: `https://i.ytimg.com/vi/${music.videoId}/default.jpg`
			} as {
				src: string;
				placeholder: string
			}))
			setThumbnails(thumbnailsLocal)

			setThumbnails((state) => state.slice(0, 4))
	
			for (var i = 0; i <= 3 - thumbnailsLocal.length; i++) {
				setThumbnails((state) => [...state, null])
			}
		} else {
			setThumbnails((state) => state.slice(0, 4))
	
			for (var i = 0; i <= 3 - thumbnails.length; i++) {
				setThumbnails((state) => [...state, null])
			}
		}

		setLoading(false)
	}, [])

	function handleTitleEditingForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (setTitlePlaylist) {
			if (title.length === 0) {
				setTitle('Untitled')
			}
			setTitlePlaylist(playlist.id, title)
			setPlaylist((state) => ({
				...state,
				name: title
			}))
			setTitleEditing(false)
		}
	}

	return (!loading && playlist) ? (
		<SkeletonTheme color="#282a36" highlightColor="#44475a">
			<ContainerPage>
				<VerticalMenu />
				
				<div style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column'
				}}>
					<div className="containerPlaylistInformation">
						<div className="thumbnailPlaylistInformation">
							{thumbnails.map((thumbnail) => {
								return (thumbnail !== null) ? (
									<ProgressiveImage
										src={thumbnail.src}
										placeholder={thumbnail.placeholder}
									>
									{(src: string, loading: boolean) => (
										<img
											style={{
												filter: loading ? 'blur(5px)' : ''
											}}
											src={src}
										/>
									)}
									</ProgressiveImage>
								) : (
									<Skeleton
										height={92}
										duration={1.2}
									/>
								)
							})}
						</div>

						<div className="containerInformationMusic">
							{titleEditing ? (
								<form onSubmit={handleTitleEditingForm}>
									<input
										name="title"
										type="text"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="inputTitle"
									/>
								</form>
							) : (
								<h1
									onClick={() => setTitleEditing(true)}
									style={{
										cursor: 'text',
										fontSize: 26,
										fontWeight: 'bold'
									}}
								>
									{playlist.name}
								</h1>
							)}
							<ul className="informationList">
								<li><strong>Músicas:</strong> {playlist.musics?.length}</li>
								<li><strong>Tempo total:</strong> {(playlist.musics && playlist.musics.length !== 0) ? secondsToDate(playlist.musics.map((music) => music.seconds).reduce((prev, current) => prev + current)) : 0}</li>
							</ul>
						</div>
					</div>

					{(playlist.musics && playlist.musics.length === 0) && (
						<h1 style={{
							textAlign: 'center'
						}}>Nenhuma música nessa playlist até o momento.</h1>
					)}
					<ul className="listMusics">
						{(playlist.musics) && playlist.musics.map((music, index) => (
							<li key={`music-${music.videoId}`} className="musicItemPlaylist">
								<p style={{
									flex: 1
								}}><strong>{index + 1}</strong></p>
								<p style={{
									flex: 5
								}}>{music.title}</p>
								<p style={{
									flex: 1
								}}>{secondsToDate(music.seconds)}</p>
								<FaRegPlayCircle
									size={26}
									color="#bd93f9"
									className="playPlaylistMusic"
									onClick={() => {
										if (play && music) {
											play(playlist, music.videoId)
										}
									}}
								/>
							</li>
						))}
					</ul>
				</div>
			</ContainerPage>
		</SkeletonTheme>
	) : null
}

export default PlaylistPage