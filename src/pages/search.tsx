import React, { useState } from 'react'

import { ImSearch } from 'react-icons/im'
import { FaRegPlayCircle } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import ProgressiveImage from 'react-progressive-graceful-image';
import { Player } from '@lottiefiles/react-lottie-player';

import ContainerPage from '../components/ContainerPage'
import VerticalMenu from '../components/VerticalMenu'
import { Video } from '../interfaces/Video'

import '../styles/pages/search.css'
import { usePlayer } from '../contexts/player';

const Search = () => {
	const [searchText, setSearchText] = useState('')
	const [loading, setLoading] = useState(false)
	const [videos, setVideos] = useState<Video[]>([])

	const {playSound} = usePlayer()

	const searchVideos = () => {

		console.log(searchText)

		setLoading(true)

		fetch(`https://sm-p3-play-api.vercel.app/api/videos/search?q=${searchText}`)
			.then((response) => {
				return response.json()
			})
			.then((response: Video[]) => {
				setVideos(response)
				setLoading(false)
			})
			.catch((error) => {
				alert(`Houve um erro ao pesquisar os videos: ${error}`)
			})
	}

	const onFormSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		searchVideos()
	}

	return (
		<ContainerPage>
			<VerticalMenu />

			<div className="container">
				<form className="containerInput" onSubmit={onFormSubmit.bind(this)}>
					<input
						name="search"
						type="text"
						placeholder="Pesquisa uma música aqui."
						className="searchInput"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<ImSearch
						size={18}
						color="#ff79c6"
						className="searchIcon"
						onClick={searchVideos.bind(this)}
					/>
				</form>

			
				{loading ? (
					<Player
						autoplay={true}
						loop={true}
						src="https://assets7.lottiefiles.com/datafiles/Diiccbibc5RWV4v/data.json"
						style={{ height: '450px', width: '450px' }}
					></Player>
				) : videos.length === 0 ? (
					<center><h1>Pesquise uma música para ouvir</h1></center>
				) : (
					<div className="containerVideos">
						{videos.map((video) => (
							<div className="containerVideo" key={video.videoId}>
								<p className="titleVideo">{video.title}</p>
								<ProgressiveImage
									src={video.image}
									placeholder={`https://i.ytimg.com/vi/${video.videoId}/default.jpg`}
								>
								{(src: string, loading: boolean) => (
									<img
										style={{
											filter: loading ? 'blur(5px)' : ''
										}}
										src={src}
										alt={video.title}
									/>
								)}
								</ProgressiveImage>
								<div style={{
									display: 'flex',
									marginTop: '15px',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<FaRegPlayCircle
										size={22}
										color="#ff79c6"
										className="iconUsage"
										onClick={() => {
											console.log('playing...')
											if (playSound !== undefined && video !== undefined) {
												playSound(video)
											}
										}}
									/>
									<p className="authorName">{video.author.name}</p>
									<FiMoreVertical
										size={22}
										color="#ff79c6"
										className="iconUsage"
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</ContainerPage>
	)
}

export default Search