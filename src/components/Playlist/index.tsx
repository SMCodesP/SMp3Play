import React, { useState, useEffect, useContext } from "react";

import ProgressiveImage from "react-progressive-graceful-image";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { Playlist } from "../../interfaces/Playlist";
import { Thumbnail } from "../../interfaces/Thumbnail";

import { usePlaylists } from "../../contexts/playlists";

import { PlaylistContainer, PlaylistTitle, ThumbnailPlaylist } from "./styles";
import { ThemeContext } from "styled-components";

const initialState = {
  mouseX: null,
  mouseY: null,
};

const PlaylistComponent = ({ playlist }: { playlist: Playlist }) => {
  const [thumbnails, setThumbnails] = useState<Array<Thumbnail | null>>([]);
  const [position, setPosition] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialState);

  const theme = useContext(ThemeContext);
  const { play, deletePlaylist } = usePlaylists();

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

  useEffect(() => {
    if (playlist.musics) {
      const thumbnailsLocal = playlist.musics.map(
        (music) =>
          ({
            src: music.image,
            placeholder: `https://i.ytimg.com/vi/${music.videoId}/default.jpg`,
          } as {
            src: string;
            placeholder: string;
          })
      );
      setThumbnails(thumbnailsLocal);

      setThumbnails((state) => state.slice(0, 4));

      for (var i = 0; i <= 3 - thumbnailsLocal.length; i++) {
        setThumbnails((state) => [...state, null]);
      }
    } else {
      setThumbnails((state) => state.slice(0, 4));

      for (var i = 0; i <= 3 - thumbnails.length; i++) {
        setThumbnails((state) => [...state, null]);
      }
    }
  }, []);

  return (
    <>
      <a href={`#/smp3/playlist/${playlist.id}`} className="resetLink">
        <PlaylistContainer onContextMenu={handleClick}>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          <ThumbnailPlaylist>
            {thumbnails.map((thumbnail, index) =>
              thumbnail !== null ? (
                <ProgressiveImage
                  src={thumbnail.src}
                  placeholder={thumbnail.placeholder}
                  key={`thumbnail-${index}`}
                >
                  {(src: string, loading: boolean) => (
                    <img
                      style={{
                        filter: loading ? "blur(5px)" : "",
                      }}
                      src={src}
                    />
                  )}
                </ProgressiveImage>
              ) : (
                <div
                  style={{
                    height: 106,
                    width: "100%",
                    background: theme.background,
                    borderRadius: 5,
                  }}
                  key={`thumbnail-${index}`}
                />
              )
            )}
          </ThumbnailPlaylist>
        </PlaylistContainer>
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
              if (play) {
                play(playlist, 0);
              }
              handleClose();
            }}
          >
            Play
          </MenuItem>
          <span className="cancel">
            <MenuItem
              onClick={() => {
                if (deletePlaylist) {
                  deletePlaylist(playlist.id);
                }
                handleClose();
              }}
            >
              Excluir
            </MenuItem>
          </span>
        </Menu>
      </a>
    </>
  );
};

export default PlaylistComponent;
