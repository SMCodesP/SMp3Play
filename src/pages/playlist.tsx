import React, { useState, useEffect, createRef, useContext } from "react";

import ProgressiveImage from "react-progressive-graceful-image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Switch from "@material-ui/core/Switch";
import { useHistory } from "react-router-dom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import ContainerPage from "../components/ContainerPage";
import VerticalMenu from "../components/VerticalMenu";
import ListMusicsPlaylist from "../components/ListMusicsPlaylist";

import { Playlist } from "../interfaces/Playlist";
import { Thumbnail } from "../interfaces/Thumbnail";

import { usePlaylists } from "../contexts/playlists";
import { Video } from "../interfaces/Video";

import {
  ContainerInformationMusic,
  ContainerPlaylistInformation,
  ThumbnailPlaylistInformation,
  InformationList,
  InputTitle,
} from "../styles/pages/playlist";
import { ThemeContext } from "styled-components";
import secondstoMinutes from "../utils/secondsToMinutes";
import { transparentize } from "polished";

const { ipcRenderer } = window.require("electron");

const PlaylistPage = ({
  match,
}: {
  match: {
    params: {
      id: string;
    };
  };
}) => {
  const [playlist, setPlaylist] = useState<Playlist>(
    JSON.parse(localStorage.getItem("playlists") || "[]").find(
      (playlist: Playlist) => playlist.id === match.params.id
    )
  );
  const [thumbnails, setThumbnails] = useState<Array<Thumbnail | null>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(
    playlist.checkedDownload || false
  );
  const [listMusic, setListMusic] = useState<boolean>(true);
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(playlist.name);

  const inputTitle = createRef<HTMLInputElement>();

  const history = useHistory();
  const theme = useContext(ThemeContext);
  const { play, setTitlePlaylist, updatePlaylist } = usePlaylists();

  function handleTitleEditingForm(e: any) {
    if (e) {
      e.preventDefault();
    }
    if (setTitlePlaylist) {
      let newTitle = title;
      if (title.length === 0) {
        newTitle = "Untitled";
        setTitle("Untitled");
      }
      setTitlePlaylist(playlist.id, newTitle);
      setPlaylist((state) => ({
        ...state,
        name: newTitle,
      }));
      setTitleEditing(false);
    }
  }

  useEffect(() => {
    if (checked) {
      ipcRenderer.send("playlistDownload", playlist);
    }

    setPlaylist((state) => ({
      ...state,
      checkedDownload: checked,
    }));
  }, [checked]);

  useEffect(() => {
    if (titleEditing && inputTitle.current) {
      inputTitle.current.focus();
    }
  }, [titleEditing]);

  useEffect(() => {
    if (updatePlaylist) {
      updatePlaylist(playlist.id, playlist);
    }
    if (!playlist) {
      history.push("/playlists");
      return;
    }

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

    setLoading(false);
  }, [playlist]);

  const reorder = (
    list: Video[],
    startIndex: number,
    endIndex: number
  ): Video[] => {
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
      playlist.musics || [],
      result.source.index,
      result.destination.index
    );

    setPlaylist((state) => ({
      ...state,
      musics: newPlaylist,
    }));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SkeletonTheme color={theme.background} highlightColor={transparentize(0.65, theme.comment)}>
        <ContainerPage>
          <VerticalMenu selected="playlists" />

          {!loading && playlist && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ContainerPlaylistInformation>
                <ThumbnailPlaylistInformation>
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
                      <Skeleton
                        height={92}
                        duration={2}
                        key={`thumbnail-${index}`}
                      />
                    )
                  )}
                </ThumbnailPlaylistInformation>

                <ContainerInformationMusic>
                  {titleEditing ? (
                    <form onSubmit={handleTitleEditingForm}>
                      <InputTitle
                        ref={inputTitle}
                        name="title"
                        type="text"
                        value={title}
                        onBlur={handleTitleEditingForm}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </form>
                  ) : (
                    <h1
                      onClick={() => setTitleEditing(true)}
                      style={{
                        cursor: "text",
                        fontSize: 26,
                        fontWeight: "bold",
                        padding: 5,
                        marginBottom: 3,
                      }}
                    >
                      {playlist.name}
                    </h1>
                  )}
                  <InformationList>
                    <li>
                      <strong>Músicas:</strong> {playlist.musics?.length}
                    </li>
                    <li>
                      <strong>Tempo total:</strong>{" "}
                      {playlist.musics && playlist.musics.length !== 0
                        ? secondstoMinutes(
                            playlist.musics
                              .map((music) => music.seconds)
                              .reduce((prev, current) => prev + current)
                          )
                        : 0}
                    </li>
                  </InformationList>
                </ContainerInformationMusic>

                <div
                  style={{
                    alignSelf: "flex-end",
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      height: "fit-content",
                    }}
                  >
                    Download playlist
                  </p>
                  <Switch
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                </div>
              </ContainerPlaylistInformation>

              {playlist.musics && playlist.musics.length === 0 && (
                <h1
                  style={{
                    textAlign: "center",
                  }}
                >
                  Nenhuma música nessa playlist até o momento.
                </h1>
              )}

              {playlist &&
                playlist.musics &&
                playlist.musics.length !== 0 &&
                play &&
                listMusic && (
                  <ListMusicsPlaylist playlist={playlist} play={play} />
                )}
            </div>
          )}
        </ContainerPage>
      </SkeletonTheme>
    </DragDropContext>
  );
};

export default PlaylistPage;
