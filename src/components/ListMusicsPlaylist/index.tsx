import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

import { Playlist } from '../../interfaces/Playlist';

import { usePlaylists } from '../../contexts/playlists';

import { ListMusics, MusicItemPlaylist, PlayPlaylistMusic } from './styles';
import secondstoMinutes from '../../utils/secondsToMinutes';

const initialState = {
  mouseX: null,
  mouseY: null,
};

const Music = ({ music, index, play, playlist }: any) => {
  const [position, setPosition] =
    React.useState<{
      mouseX: null | number;
      mouseY: null | number;
    }>(initialState);

  const { removeMusicPlaylist } = usePlaylists();

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
          <MusicItemPlaylist
            onContextMenu={handleClick}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <p
              style={{
                flex: 1,
              }}
            >
              <strong>{index + 1}</strong>
            </p>
            <p
              style={{
                flex: 5,
              }}
            >
              {music.title}
            </p>
            <p
              style={{
                flex: 1,
                margin: '0 10px'
              }}
            >
              {secondstoMinutes(music.seconds)}
            </p>
            <PlayPlaylistMusic
              size={26}
              color="#bd93f9"
              onClick={() => {
                if (play && music) {
                  play(playlist, index);
                }
              }}
            />
          </MusicItemPlaylist>
          {(provided as any).placeholder}
          <Menu
            keepMounted
            open={position.mouseY !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              position.mouseY !== null && position.mouseX !== null
                ? { top: position.mouseY, left: position.mouseX }
                : undefined
            }
          >
            <MenuItem
              onClick={() => {
                play(playlist, index);
                handleClose();
              }}
            >
              Play
            </MenuItem>
            <span className="cancel">
              <MenuItem
                onClick={() => {
                  removeMusicPlaylist(playlist.id, index);
                  handleClose();
                }}
              >
                Remove
              </MenuItem>
            </span>
          </Menu>
        </div>
      )}
    </Draggable>
  );
};

const MusicList = ({ playlist, play }: any) => {
  return (
    playlist.musics &&
    playlist.musics.map((music: any, index: any) => (
      <Music
        key={music.videoId}
        music={music}
        index={index}
        play={play}
        playlist={playlist}
      />
    ))
  );
};

const ListMusicsPlaylist = ({
  playlist,
  play,
}: {
  playlist: Playlist;
  play(playlist: Playlist, start: number): void;
}) => {
  return (
    <Droppable droppableId="list">
      {(provided: DroppableProvided) => (
        <ListMusics ref={provided.innerRef} {...provided.droppableProps}>
          <MusicList playlist={playlist} play={play} />
          {provided.placeholder}
        </ListMusics>
      )}
    </Droppable>
  );
};

export default ListMusicsPlaylist;
