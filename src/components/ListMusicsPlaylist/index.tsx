import React, { useState } from 'react'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

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

import { usePlaylists } from '../../contexts/playlists'

const initialState = {
  mouseX: null,
  mouseY: null,
};

const Music = ({ music, index, play, playlist }) => {
	const [position, setPosition] = React.useState<{
		mouseX: null | number;
		mouseY: null | number;
	}>(initialState);

	const {
		removeMusicPlaylist
	} = usePlaylists()

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setPosition({
			mouseX: event.clientX - 2,
			mouseY: event.clientY - 4,
		});
	};

	const handleClose = () => {
		setPosition(initialState);
	};

	return (
		<Draggable draggableId={music.videoId} index={index}>
      		{(provided: DraggableProvided) => (
      			<div>
					<div
						onContextMenu={handleClick}
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
									play(playlist, index)
								}
							}}
						/>
					</div>
					{provided.placeholder}
					<Menu
				        keepMounted
				        open={position.mouseY !== null}
				        onClose={handleClose}
				        anchorReference="anchorPosition"
				        anchorPosition={
				        	(position.mouseY !== null && position.mouseX !== null)
				        		? { top: position.mouseY, left: position.mouseX }
				        		: undefined
				        }
				    >
				        <MenuItem
				        	onClick={() => {
				        		play(playlist, index)
				        		handleClose()
				        	}}
				        >
				        	Play
				        </MenuItem>
				        <span className="cancel">
					        <MenuItem
					        	onClick={() => {
					        		removeMusicPlaylist(playlist.id, index)
					        		handleClose()
					        	}}
					        >
					        	Remove
					        </MenuItem>
				        </span>
				    </Menu>
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