import * as React from "react";

import { useDebouncedCallback } from "use-debounce";

import Player from "../components/Player";

import { Video } from "../interfaces/Video";
import isInteractiveElement from "../utils/isInteractiveElement";

import PlaylistsProvider from "./playlists";

const { ipcRenderer } = window.require("electron");

type PlayerType = Partial<{
  playerSound: React.RefObject<HTMLAudioElement>;
  playSound(video: Video): void;
  playing: Video | null;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export const PlayerContext = React.createContext<PlayerType>({});

const PlayerProvider: React.FC = ({ children }) => {
  const [playing, setPlaying] = React.useState<Video | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const audioElement = React.createRef<HTMLAudioElement>();
  const displayElement = React.createRef<HTMLDivElement>();

  const keywordPressed = (event: KeyboardEvent) => {
    const { keyCode } = event;

    if (!isInteractiveElement(event.target) && audioElement.current) {
      const keys: {
        [key: number]: any;
      } = {
        32: () =>
          audioElement.current?.paused
            ? audioElement.current.play()
            : audioElement.current?.pause(),
        40: () =>
          Number((audioElement.current!.volume - 0.05).toFixed(2)) >= 0
            ? (audioElement.current!.volume = Number(
                (audioElement.current!.volume - 0.05).toFixed(2)
              ))
            : "",
        38: () =>
          Number((audioElement.current!.volume + 0.05).toFixed(2)) <= 1
            ? (audioElement.current!.volume = Number(
                (audioElement.current!.volume + 0.05).toFixed(2)
              ))
            : "",
        76: () => (audioElement.current!.currentTime += 10),
        39: () => (audioElement.current!.currentTime += 5),
        37: () => (audioElement.current!.currentTime -= 5),
        74: () => (audioElement.current!.currentTime -= 10),
      };

      if (keys[keyCode]) {
        event.preventDefault();
        keys[keyCode]();
      }
    }
  };

  React.useEffect(() => {
    ipcRenderer.on(
      "videomp3",
      (
        _: any,
        arg: {
          path: string;
          video: Video;
        }
      ) => {
        setPlaying({
          ...arg.video,
          src: arg.path,
        });
        setLoading(false);
      }
    );
  }, []);

  React.useEffect(() => {
    if (playing) window.addEventListener("keydown", keywordPressed);
    return () => window.removeEventListener("keydown", keywordPressed);
  }, [audioElement]);

  function playSound(video: Video) {
    if (audioElement.current) {
      audioElement.current.pause();
    }

    if (loading)
      return alert(
        "Já tem uma música iniciada, por favor espere carregar para iniciar outra."
      );

    setLoading(true);
    ipcRenderer.send("video", video);
  }

  return (
    <PlayerContext.Provider
      value={{
        playSound,
        playerSound: audioElement,
        playing,
      }}
    >
      <PlaylistsProvider>
        {children}
        {(playing != null || loading) && (
          <Player
            reference={displayElement}
            audioProps={{
              id: "playerAudio",
              src: playing?.src || "",
              title: playing?.title || "",
            }}
            src={playing?.src || ""}
            id="playerAudio"
            title={playing?.title || ""}
            audioElement={audioElement}
            setLoading={setLoading}
            setPlaying={setPlaying}
            video={playing}
            loading={loading}
          />
        )}
      </PlaylistsProvider>
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const context = React.useContext(PlayerContext);

  return context;
}

export default PlayerProvider;
