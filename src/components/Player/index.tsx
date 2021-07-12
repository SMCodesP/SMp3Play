import React, { createRef, useState, useContext, useEffect } from 'react';

import ProgressiveImage from 'react-progressive-graceful-image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
  ImVolumeMute2,
} from 'react-icons/im';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { FiRepeat } from 'react-icons/fi';
import { BiShuffle } from 'react-icons/bi';

import { ThemeContext } from 'styled-components';

import { Video } from '../../interfaces/Video';
import secondstoMinutes from '../../utils/secondsToMinutes';

import ControlPause from './ControlPause';
import ControlSpeed from './ControlSpeed';
import { usePlaylists } from '../../contexts/playlists';

import {
  Control,
  ContainerThumbnail,
  Thumbnail,
  ColumnControl,
  TitleContainer,
  Title,
  ProgressBar,
  ContainerInformation,
  VolumeContainer,
  VolumeControl,
  VolumeIndication,
  InputVolume,
  IconPlay,
  ContainerControl,
} from './styles';

const { ipcRenderer } = window.require('electron');

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
  const [volume, setVolume] = useState(
    Number(localStorage.getItem('volume') || '100'),
  );
  const [mute, setMute] = useState(false);

  const seekVolume = createRef<HTMLInputElement>();
  const volumeIndication = createRef<HTMLParagraphElement>();

  const {
    toggleRepeating,
    toggleRandomly,
    isRandomly,
    isRepeating,
    next,
    previous,
  } = usePlaylists();

  useEffect(() => {
    if (audioElement.current) {
      (audioElement.current as any).handleMute = handleMute;
      (audioElement.current as any).next = next;
      (audioElement.current as any).previous = previous;
    }
  }, [audioElement]);

  function volumeUpdate(e: any) {
    if (audioElement.current) {
      audioElement.current.volume = e.target.value / 100;
      setVolume(e.target.value);
      localStorage.setItem('volume', String(e.target.value));
    }
  }

  const onAudioProgessUpdate = (e: any) => {
    setProgress(e.target.currentTime);
  };

  const onSeekProgressUpdate = (e: any) => {
    if (audioElement.current) {
      setProgress(e.target.value);
      audioElement.current.currentTime = e.target.value;
    }
  };

  // function resetPlayer() {
  //   if (
  //     playingPlaylist &&
  //     playingPlaylist.musics &&
  //     musicIndexPlaying !== null &&
  //     musicIndexPlaying !== undefined &&
  //     playingPlaylist.musics[musicIndexPlaying + 1]
  //   ) {
  //     setPlaying(null);
  //   } else {
  //     setPlaying(null);
  //   }
  // }

  const startAudio = () => {
    ipcRenderer.send('notification', {
      title: 'Tocando uma nova música!',
      body: `A música "${video?.title}" está sendo tocada.`,
    });

    setDuration(audioElement.current?.duration || 0);
    setProgress(0);

    if (audioElement.current)
      audioElement.current.volume =
        Number(localStorage.getItem('volume') || '100') / 100;
  };

  const handleMute = () => setMute((oldState) => !oldState);

  const IconVolume = mute
    ? ImVolumeMute2
    : volume >= 66
    ? ImVolumeHigh
    : volume >= 33
    ? ImVolumeMedium
    : volume > 0
    ? ImVolumeLow
    : ImVolumeMute;

  return (
    <>
      <SkeletonTheme color={theme.background} highlightColor={theme.comment}>
        {!loading && (
          <audio
            ref={audioElement}
            onLoadedData={startAudio}
            muted={mute}
            onTimeUpdate={onAudioProgessUpdate}
            // onEnded={resetPlayer}
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
              src={video?.image || ''}
              placeholder={`https://i.ytimg.com/vi/${video?.videoId}/default.jpg`}
            >
              {(src: string, loadingImage: boolean) => (
                <Thumbnail
                  style={{
                    filter: loadingImage ? 'blur(5px)' : '',
                  }}
                  src={src}
                  alt={video?.title}
                />
              )}
            </ProgressiveImage>
          )}

          <ColumnControl>
            <TitleContainer>
              <Title>{loading ? <Skeleton /> : video?.title}</Title>
            </TitleContainer>
            <div
              style={{
                width: '90%',
                display: 'flex',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p
                style={{
                  alignSelf: 'center',
                  fontSize: '14px',
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
                  width: '85%',
                  position: 'relative',
                  borderRadius: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
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
                    <IconPlay onClick={toggleRepeating} actived={isRepeating}>
                      <FiRepeat color={theme.pink} size={20} />
                    </IconPlay>
                    <IconPlay onClick={previous}>
                      <MdSkipPrevious color={theme.pink} size={28} />
                    </IconPlay>
                    <ControlPause audioElement={audioElement} />
                    <IconPlay onClick={next}>
                      <MdSkipNext color={theme.pink} size={28} />
                    </IconPlay>
                    <IconPlay onClick={toggleRandomly} actived={isRandomly}>
                      <BiShuffle color={theme.pink} size={24} />
                    </IconPlay>
                  </ContainerControl>
                )}
                {loading ? (
                  <Skeleton
                    height={8}
                    style={{
                      margin: '5px 0',
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
                  alignSelf: 'center',
                  fontSize: '14px',
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
              <IconVolume onClick={handleMute} color={theme.purple} size={26} />
            </ContainerInformation>
          )}
          {!loading && <ControlSpeed audioElement={audioElement} />}
        </Control>
      </SkeletonTheme>
    </>
  );
};

export default Player;
