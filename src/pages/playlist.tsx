import React, { useState, useEffect, createRef } from 'react'

import ProgressiveImage from 'react-progressive-graceful-image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import {
	DragDropContext
} from 'react-beautiful-dnd'

import ContainerPage from '../components/ContainerPage'
import VerticalMenu from '../components/VerticalMenu'
import ListMusicsPlaylist from '../components/ListMusicsPlaylist'

import secondsToDate from '../utils/secondsToDate'

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
	const [listMusic, setListMusic] = useState<boolean>(true)
	const [titleEditing, setTitleEditing] = useState<boolean>(false)
	const [title, setTitle] = useState<string>(playlist.name)

	const inputTitle = createRef<HTMLInputElement>()

	const history = useHistory()
	const { play, setTitlePlaylist, updatePlaylist } = usePlaylists()

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
			let newTitle = title
			if (title.length === 0) {
				newTitle = 'Untitled'
				setTitle('Untitled')
			}
			setTitlePlaylist(playlist.id, newTitle)
			setPlaylist((state) => ({
				...state,
				name: newTitle
			}))
			setTitleEditing(false)
		}
	}

	useEffect(() => {
		if (titleEditing) {
			inputTitle.current.focus()
		}
	}, [titleEditing])

	useEffect(() => {
		if (updatePlaylist) {
			updatePlaylist(playlist.id, playlist)
		}
	}, [playlist])

	const reorder = (list: Video[], startIndex: number, endIndex: number): Video[] => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const newPlaylist = reorder(
			playlist.musics,
			result.source.index,
			result.destination.index,
		);

		setPlaylist((state) => ({
			...state,
			musics: newPlaylist
		}));
	}

	return (!loading && playlist) ? (
		<DragDropContext onDragEnd={onDragEnd}>
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
											ref={inputTitle}
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

						{(playlist && playlist.musics && playlist.musics.length !== 0 && play && listMusic) && (
							<ListMusicsPlaylist
								playlist={playlist}
								setPlaylist={setPlaylist}
								play={play}
							/>
						)}
					</div>
				</ContainerPage>
			</SkeletonTheme>
		</DragDropContext>
	) : null
}

export default PlaylistPage