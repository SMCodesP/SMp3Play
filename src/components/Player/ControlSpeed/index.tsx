import React, { useState, useEffect, createRef, memo } from "react";

import { ControlVelocity } from "../styles";

const ControlSpeed = ({
  audioElement,
}: {
  audioElement: React.RefObject<HTMLAudioElement>;
}) => {
  const [speed, setSpeed] = useState<number>(
    Number(localStorage.getItem("speed") || "1")
  );

  const speedIndication = createRef<HTMLParagraphElement>();

  function toggleSpeed() {
    setSpeed(speed === 2 ? 0.25 : speed + 0.25);
  }

  useEffect(() => {
    if (audioElement && audioElement.current) {
      audioElement.current.playbackRate = speed;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("speed", String(speed));
    if (audioElement && audioElement.current) {
      audioElement.current.playbackRate = speed;
    }
    if (speedIndication && speedIndication.current) {
      speedIndication.current.innerText = speed + "x";
    }
  }, [speed]);

  return (
    <ControlVelocity ref={speedIndication} onClick={toggleSpeed}>
      1.0x
    </ControlVelocity>
  );
};

export default memo(ControlSpeed);
