import React, { createRef, useState, useContext } from "react";

import ProgressiveImage from "react-progressive-graceful-image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { ImVolumeHigh } from "react-icons/im";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

import { ThemeContext } from "styled-components";
import { useDebouncedCallback } from 'use-debounce';

import { Video } from "../../interfaces/Video";
import secondstoMinutes from "../../utils/secondsToMinutes";

import ControlPause from "./ControlPause";
import ControlSpeed from "./ControlSpeed";
import { usePlaylists } from "../../contexts/playlists";

import {
  Control,
  ContainerThumbnail,
  Thumbnail,
  ColumnControl,
  Title,
  ProgressBar,
  ContainerInformation,
  VolumeContainer,
  VolumeControl,
  VolumeIndication,
  InputVolume,
  IconPlay,
  ContainerControl,
} from "./styles";

const { ipcRenderer } = window.require("electron");

const Player = ({
  video,
  loading,
  audioElement,
  reference,
  setPlaying,
  ...props
}: {
  video: Video | null;
  src: string;
  title: string;
  id: string;
  loading: boolean;
  reference: React.RefObject<HTMLDivElement>;
  audioElement: React.RefObject<HTMLAudioElement>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  audioProps: any;
  setPlaying: React.Dispatch<React.SetStateAction<Video | null>>;
}) => {
  const theme = useContext(ThemeContext);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlayingState] = useState(true);
  const [volume, setVolume] = useState(
    Number(localStorage.getItem("volume") || "100")
  );

  const seekVolume = createRef<HTMLInputElement>();
  const volumeIndication = createRef<HTMLParagraphElement>();

  const { playingPlaylist, musicIndexPlaying, next, previous } = usePlaylists();

  function volumeUpdate(e: any) {
    if (audioElement.current) {
      audioElement.current.volume = e.target.value / 100;
    }
  }

  const updateRPC = () => {
    require("electron").remote.getGlobal("globalVars").RichPresence = {
      state: `de ${video?.author.name}`,
      details: video?.title,
      progress,
      duration: video?.duration.seconds,
      largeImageKey: "logo",
      smallImageKey: playing ? "pause" : "play",
      smallImageText: playing ? "Tocando" : "Pausado",
      largeImageText: "SMp3Play",
      instance: true,
      type: "listening"
    }
  };

  const onTimeProgessUpdate = (e: any) => {
    console.log('on time progress')
    setProgress(e.target.currentTime);
    updateRPC()
  };

  const onSeekProgressUpdate = (e: any) => {
    if (audioElement.current) {
      setProgress(e.target.value);
      audioElement.current.currentTime = e.target.value;
    }
  };

  function resetPlayer() {
    require("electron").remote.getGlobal("globalVars").RichPresence = {
      state: "em SMp3Play",
      details: "Procurando alguma música...",
      startTimestamp: Date.now(),
      largeImageKey: "logo",
      instance: true,
      progress: 0,
      duration: 0
    };
    
    if (
      playingPlaylist &&
      playingPlaylist.musics &&
      musicIndexPlaying !== null &&
      musicIndexPlaying !== undefined &&
      playingPlaylist.musics[musicIndexPlaying + 1]
    ) {
      setPlaying(null);
    } else {
      setPlaying(null);
    }
  }

  const startAudio = () => {
    ipcRenderer.send("notification", {
      title: "Tocando uma nova música!",
      body: `A música "${video?.title}" está sendo tocada.`,
    });

    setDuration(audioElement.current?.duration || 0);
    setProgress(0);

    if (audioElement.current)
      audioElement.current.volume =
        Number(localStorage.getItem("volume") || "100") / 100;
  };

  return (
    <>
      <SkeletonTheme color={theme.background} highlightColor={theme.comment}>
        {!loading && (
          <audio
            ref={audioElement}
            onLoadedData={startAudio}
            onVolumeChange={(event: any) =>
              setVolume(event.target.volume * 100)
            }
            onTimeUpdate={onTimeProgessUpdate}
            onEnded={resetPlayer}
            autoPlay
            {...props.audioProps}
          ></audio>
        )}
        <Control ref={reference}>
          {loading ? (
            <ContainerThumbnail>
              <Skeleton height={72} width={128} duration={1.2} />
            </ContainerThumbnail>
          ) : (
            <ProgressiveImage
              src={video?.image || ""}
              placeholder={`https://i.ytimg.com/vi/${video?.videoId}/default.jpg`}
            >
              {(src: string, loadingImage: boolean) => (
                <Thumbnail
                  style={{
                    filter: loadingImage ? "blur(5px)" : "",
                  }}
                  src={src}
                  alt={video?.title}
                />
              )}
            </ProgressiveImage>
          )}

          <ColumnControl>
            <Title>{loading ? <Skeleton /> : video?.title}</Title>
            <div
              style={{
                width: "90%",
                display: "flex",
                alignSelf: "center",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  alignSelf: "center",
                  fontSize: "14px",
                }}
              >
                {loading ? (
                  <Skeleton width={42} height={15} />
                ) : (
                  secondstoMinutes(progress)
                )}
              </p>
              <div
                style={{
                  width: "85%",
                  position: "relative",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "center",
                }}
              >
                {loading ? (
                  <ContainerControl>
                    <Skeleton width={26} height={26} />
                    <Skeleton width={26} height={26} />
                    <Skeleton width={26} height={26} />
                  </ContainerControl>
                ) : (
                  <ContainerControl>
                    <IconPlay onClick={previous}>
                      <MdSkipPrevious color={theme.pink} size={26} />
                    </IconPlay>
                    <ControlPause playing={playing} setPlaying={setPlayingState} audioElement={audioElement} />
                    <IconPlay onClick={next}>
                      <MdSkipNext color={theme.pink} size={26} />
                    </IconPlay>
                  </ContainerControl>
                )}
                {loading ? (
                  <Skeleton
                    height={8}
                    style={{
                      margin: "5px 0",
                    }}
                  />
                ) : (
                  <ProgressBar
                    type="range"
                    name="progress"
                    id="progress"
                    min="0"
                    max={duration}
                    step="1"
                    onChange={onSeekProgressUpdate}
                    value={progress}
                    style={{
                      background: `linear-gradient(90deg, ${theme.pink} ${
                        (progress * 100 + 5 * (duration / 100)) / duration
                      }%, ${theme.background} ${
                        (progress * 100 + 5 * (duration / 100)) / duration
                      }%)`,
                    }}
                  />
                )}
              </div>
              <p
                style={{
                  alignSelf: "center",
                  fontSize: "14px",
                }}
              >
                {loading ? (
                  <Skeleton width={42} height={15} />
                ) : (
                  secondstoMinutes(duration)
                )}
              </p>
            </div>
          </ColumnControl>

          {loading ? (
            <ContainerInformation>
              <div></div>
              <Skeleton width={26} height={26} />
            </ContainerInformation>
          ) : (
            <ContainerInformation>
              <VolumeContainer>
                <VolumeControl>
                  <InputVolume
                    ref={seekVolume}
                    min="0"
                    max="100"
                    step="1"
                    type="range"
                    name="volumeControl"
                    onChange={volumeUpdate}
                    value={volume}
                    style={{
                      background: `linear-gradient(93deg, ${theme.pink} ${volume}%, ${theme.background} ${volume}%)`,
                    }}
                  />
                  <VolumeIndication ref={volumeIndication}>
                    {Math.trunc(volume)}%
                  </VolumeIndication>
                </VolumeControl>
              </VolumeContainer>
              <ImVolumeHigh color={theme.purple} size={26} />
            </ContainerInformation>
          )}
          {!loading && <ControlSpeed audioElement={audioElement} />}
        </Control>
      </SkeletonTheme>
    </>
  );
};

export default Player;
