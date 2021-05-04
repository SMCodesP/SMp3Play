import React, { useContext, useEffect, useState } from "react";

import ProgressiveImage from "react-progressive-graceful-image";

import { ImSearch } from "react-icons/im";
import { FaRegPlayCircle } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { Video } from "../../interfaces/Video";

import { usePlaylists } from "../../contexts/playlists";

import { ContainerVideo, TitleVideo, AuthorName } from "./styles";
import { ThemeContext } from "styled-components";

interface MenuItem {
  key: string;
  caption: string;
  onClick?(
    _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    {
      video,
      stop,
      playSound,
      handleClose,
    }: {
      video: Video;
      playSound(video: Video): void;
      stop(): void;
      handleClose(): void;
    }
  ): void;
  subMenuItems?: Array<MenuItem>;
}

const VideoComponent = ({
  video,
  playSound,
}: {
  video: Video;
  playSound(video: Video): void;
}) => {
  const theme = useContext(ThemeContext);
  const { playlists, addVideoInPlaylist, stop } = usePlaylists();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [optionsActive, setOptionsActive] = useState(false);
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([
    {
      key: "1",
      caption: "Play",
      onClick: (_, { video, playSound, handleClose }) => {
        stop();
        handleClose();
        playSound(video);
      },
    },
  ]);

  useEffect(() => {
    if (playlists) {
      const playlistsMenuItems = playlists.map(
        (playlist) =>
          ({
            key: playlist.id,
            caption: playlist.name,
            onClick: (_, { video, handleClose }) => {
              if (addVideoInPlaylist) {
                addVideoInPlaylist(playlist.id, video);
                handleClose();
              }
            },
          } as MenuItem)
      );
      setMenuItems([
        {
          key: "1",
          caption: "Play",
          onClick: (_, { video, playSound, handleClose }) => {
            stop();
            handleClose();
            playSound(video);
          },
        },
        {
          key: "group-1",
          caption: "Adicionar à playlist",
          subMenuItems: playlistsMenuItems,
        },
      ]);
    }
  }, [playlists]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderMenuItem(menuItem: MenuItem) {
    return !!(menuItem.subMenuItems && menuItem.subMenuItems.length) ? (
      <li
        key={menuItem.key}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          padding: "5px 10px",
          background: theme.background,
          color: theme.pink,
          filter: "brightness(90%)",
        }}
      >
        <p
          style={{
            margin: "3px 0 10px 0",
            fontWeight: "bold",
          }}
        >
          {menuItem.caption}
        </p>
        <Paper>
          <MenuList>
            {menuItem.subMenuItems.map((subMenuItem) =>
              renderMenuItem(subMenuItem)
            )}
          </MenuList>
        </Paper>
      </li>
    ) : (
      <MenuItem
        key={menuItem.key}
        onClick={(e) => {
          if (menuItem.onClick) {
            menuItem.onClick(e, {
              video,
              stop,
              playSound,
              handleClose,
            });
          }
        }}
      >
        {menuItem.caption}
      </MenuItem>
    );
  }

  return (
    <ContainerVideo key={video.videoId}>
      <TitleVideo>{video.title}</TitleVideo>
      <p
        style={{
          fontSize: 14,
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        <strong>Views:</strong>{" "}
        {new Intl.NumberFormat("pt-BR", {
          maximumFractionDigits: 1,
          notation: "compact",
          compactDisplay: "short",
        } as any).format(video.views)}
      </p>
      <ProgressiveImage
        src={video.image}
        placeholder={`https://i.ytimg.com/vi/${video.videoId}/default.jpg`}
      >
        {(src: string, loading: boolean) => (
          <img
            style={{
              filter: loading ? "blur(5px)" : "",
            }}
            src={src}
            alt={video.title}
          />
        )}
      </ProgressiveImage>
      <div
        style={{
          display: "flex",
          marginTop: "15px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FaRegPlayCircle
          size={22}
          color={theme.pink}
          className="iconUsage"
          onClick={() => {
            stop();
            playSound(video);
          }}
        />
        <AuthorName>{video.author.name}</AuthorName>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon style={{ color: theme.pink }} />
        </IconButton>
      </div>
      <Menu
        id={`simple-menu-${video.videoId}`}
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="simple-menu"
      >
        {menuItems.map((menuItem) => renderMenuItem(menuItem))}
      </Menu>
    </ContainerVideo>
  );
};

export default VideoComponent;
