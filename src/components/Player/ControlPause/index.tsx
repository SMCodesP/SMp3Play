import React, { useState, useEffect, memo, useContext } from 'react';

import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { ThemeContext } from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

import { usePlayer } from '../../../contexts/player';

import { IconPlay } from '../styles';

const ControlPause = ({
  audioElement,
}: {
  audioElement: React.RefObject<HTMLAudioElement>;
}) => {
  const [playing, setPlaying] = useState(true);

  const theme = useContext(ThemeContext);
  const { playerSound } = usePlayer();

  const pause = useDebouncedCallback(
    () => {
      playerSound!.current!.pause();
    },
    100,
    {
      maxWait: 100,
    },
  );

  const play = useDebouncedCallback(
    () => {
      playerSound!.current!.play();
    },
    100,
    {
      maxWait: 100,
    },
  );

  const onPlay = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  useEffect(() => {
    audioElement.current?.addEventListener('pause', onPause);
    audioElement.current?.addEventListener('play', onPlay);

    return () => {
      audioElement.current?.removeEventListener('pause', onPause);
      audioElement.current?.removeEventListener('play', onPlay);
    };
  }, [audioElement]);

  return playing ? (
    <IconPlay>
      <BsFillPauseFill color={theme.pink} size={28} onClick={pause} />
    </IconPlay>
  ) : (
    <IconPlay>
      <BsFillPlayFill color={theme.pink} size={28} onClick={play} />
    </IconPlay>
  );
};

export default memo(ControlPause);
