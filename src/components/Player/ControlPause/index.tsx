import React, { useState, useEffect, memo, useContext } from "react";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ThemeContext } from "styled-components";
import { useDebouncedCallback } from "use-debounce";

import { usePlayer } from "../../../contexts/player";

import { IconPlay } from "../styles";

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
      setPlaying(false);
    },
    100,
    {
      maxWait: 100,
    }
  );

  const play = useDebouncedCallback(
    () => {
      setPlaying(true);
    },
    100,
    {
      maxWait: 100,
    }
  );

  useEffect(() => {
    audioElement.current?.addEventListener("pause", pause);
    audioElement.current?.addEventListener("play", play);

    return () => {
      audioElement.current?.removeEventListener("pause", pause);
      audioElement.current?.removeEventListener("play", play);
    };
  }, [audioElement]);

  useEffect(() => {
    if (playerSound && playerSound.current) {
      playing ? playerSound.current.play() : playerSound.current.pause();
    }
  }, [playing]);

  return playing ? (
    <IconPlay>
      <BsFillPauseFill color={theme.pink} size={26} onClick={pause} />
    </IconPlay>
  ) : (
    <IconPlay>
      <BsFillPlayFill color={theme.pink} size={26} onClick={play} />
    </IconPlay>
  );
};

export default memo(ControlPause);
