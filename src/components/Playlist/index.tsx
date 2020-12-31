import React, { useState, useEffect } from 'react'

import ProgressiveImage from 'react-progressive-graceful-image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Playlist } from '../../interfaces/Playlist'
import { Thumbnail } from '../../interfaces/Thumbnail'

import './style.css'

const PlaylistComponent = ({ playlist }: { playlist: Playlist }) => {
	const [thumbnails, setThumbnails] = useState<Array<Thumbnail | null>>([])

	useEffect(() => {
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
	}, [])

	return (
		<SkeletonTheme color="#282a36" highlightColor="#44475a">
			<a href={`#/smp3/playlist/${playlist.id}`} className="resetLink">
				<div className="playlist">
					<p className="playlistTitle">{playlist.name}</p>
					<div className="thumbnailPlaylist">
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
				</div>
			</a>
		</SkeletonTheme>
	)
}

export default PlaylistComponent