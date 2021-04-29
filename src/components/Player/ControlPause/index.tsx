import React, { useState, useEffect, memo } from "react";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

import { usePlayer } from "../../../contexts/player";

const ControlPause = ({
  audioElement,
}: {
  audioElement: React.RefObject<HTMLAudioElement>;
}) => {
  const [playing, setPlaying] = useState(true);

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
    <BsFillPauseFill
      color="#f1fa8c"
      size={26}
      onClick={pause}
      className="iconPlay"
    />
  ) : (
    <BsFillPlayFill
      color="#f1fa8c"
      size={26}
      onClick={play}
      className="iconPlay"
    />
  );
};

export default memo(ControlPause);
