import React from 'react'

import { FaRegPlayCircle } from 'react-icons/fa';

import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult
} from 'react-beautiful-dnd'

import secondsToDate from '../../utils/secondsToDate'

import { Video } from '../../interfaces/Video'
import { Playlist } from '../../interfaces/Playlist'
import { Thumbnail } from '../../interfaces/Thumbnail'

const Music = ({ music, index, play, playlist }) => {
	return (
		<Draggable draggableId={music.videoId} index={index}>
      		{(provided: DraggableProvided) => (
      			<div>
					<div
						className="musicItemPlaylist"
				        ref={provided.innerRef}
				        {...provided.draggableProps}
				        {...provided.dragHandleProps}
					>
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
					</div>
					{provided.placeholder}
				</div>
			)}
		</Draggable>
	)
}

const MusicList = ({ playlist, play }) => {
	return (playlist.musics) && playlist.musics.map((music, index) => (
		<Music
			key={music.videoId}
			music={music}
			index={index}
			play={play}
			playlist={playlist}
		/>
	))
}


const ListMusicsPlaylist = ({ playlist, setPlaylist, play }: {
	playlist: Playlist
}) => {
	return (
		<Droppable droppableId="list">
			{(provided: DroppableProvided) => (
				<div ref={provided.innerRef} {...provided.droppableProps} className="listMusics">
					<MusicList playlist={playlist} play={play} />
        			{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}

export default ListMusicsPlaylist