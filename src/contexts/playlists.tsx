import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

import { Video } from '../interfaces/Video';
import { Playlist } from '../interfaces/Playlist';

import { usePlayer } from './player';

interface PlaylistsProps {
  playlists: Playlist[];
  addVideoInPlaylist(id: string, video: Video): void;
  createPlaylist(playlist: Playlist): void;
  next(): void;
  previous(): void;
  play(playlist: Playlist, start: number): void;
  setTitlePlaylist(id: string, newTitle: string): void;
  deletePlaylist(id: string): void;
  updatePlaylist(id: string, newPlaylist: Playlist): void;
  removeMusicPlaylist(id: string, index: number): void;
  stop(): void;
  toggleRepeating(): void;
  toggleRandomly(): void;
  isRepeating: boolean;
  isRandomly: boolean;
  musicIndexPlaying: number | null;
  playingPlaylist: Playlist | null;
}

export const PlaylistsContext = React.createContext<PlaylistsProps>(
  {} as PlaylistsProps,
);

const PlaylistsProvider: React.FC = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(
    JSON.parse(localStorage.getItem('playlists') || '[]'),
  );
  const [playingPlaylist, setPlayingPlaylist] = useState<Playlist | null>(null);
  const [musicIndexPlaying, setMusicIndexPlaying] =
    useState<number | null>(null);
  const [songsRemaining, setSongsRemaining] = useState<number[]>([]);
  const [isRepeating, setIsRepeating] = useState<boolean>(
    localStorage.getItem('repeating') == 'true' || false,
  );
  const [isRandomly, setIsRandomly] = useState<boolean>(
    localStorage.getItem('randomly') == 'true' || false,
  );

  const { playerSound, playSound, playing, setPlaying } = usePlayer();

  function deletePlaylist(id: string) {
    setPlaylists(playlists.filter((playlist) => playlist.id !== id));
  }

  function createPlaylist(playlist: Playlist) {
    setPlaylists([...playlists, playlist]);
  }

  function updatePlaylist(id: string, newPlaylist: Playlist) {
    setPlaylists((state) => {
      return state.map((playlist) => {
        return playlist.id === id ? newPlaylist : playlist;
      });
    });
  }

  function removeMusicPlaylist(id: string, index: number) {
    const playlist = playlists.find(
      (playlistFinding) => playlistFinding.id === id,
    );
    if (playlist && playlist.musics) {
      playlist.musics.splice(index, 1);

      setPlaylists((state) => {
        return state.map((statePlaylist) => {
          return statePlaylist.id === id
            ? playlist || statePlaylist
            : statePlaylist;
        });
      });
    }
  }

  function setTitlePlaylist(id: string, newTitle: string) {
    setPlaylists((state) => {
      return state.map((playlist) => {
        return playlist.id === id
          ? {
              ...playlist,
              name: newTitle,
            }
          : playlist;
      });
    });
  }

  function addVideoInPlaylist(
    id: string,
    video: Video,
    options?: {
      force?: boolean;
    },
  ) {
    const playlist = playlists.find(
      (playlistFinding) => playlistFinding.id === id,
    );

    if (playlist) {
      if (playlist.musics) {
        if (
          (!options || !options.force) &&
          playlist.musics.some((song) => song.videoId === video.videoId)
        ) {
          Swal.fire({
            title: 'Confirme!',
            text: 'Na playlist seleciona já contém a música, você tem certeza que quer adiciona-la novamente?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Adicionar',
            preConfirm: () => {
              addVideoInPlaylist(id, video, {
                force: true,
              });
            },
          });
          return;
        }
        playlist.musics = [...playlist.musics, video];
      } else {
        playlist.musics = [video];
      }

      const playlistsUpdate = playlists.map((playlistMaping) =>
        playlistMaping.id === id ? playlist : playlistMaping,
      );

      setPlaylists(playlistsUpdate);
    }
  }

  function play(playlist: Playlist, index: number) {
    if (playlist.musics) {
      const videoStart = playlist.musics[index];

      if (playSound) {
        setPlayingPlaylist(playlist);
        setMusicIndexPlaying(index);
        playSound(videoStart);
        if (isRandomly) {
          setSongsRemaining(
            playlist.musics.map((_, id) => id).filter((id) => index !== id),
          );
        }
      }
    }
  }

  function stop() {
    if (playingPlaylist && playingPlaylist.musics) {
      setMusicIndexPlaying(null);
      setPlayingPlaylist(null);
    }
  }

  function previous() {
    if (
      playingPlaylist &&
      playingPlaylist.musics &&
      musicIndexPlaying !== null
    ) {
      const musicPlay = playingPlaylist.musics[musicIndexPlaying - 1];

      if (musicPlay && playSound) {
        setMusicIndexPlaying(musicIndexPlaying - 1);
        playSound(musicPlay);
      }
    }
  }

  function next() {
    if (
      playingPlaylist &&
      playingPlaylist.musics &&
      musicIndexPlaying !== null
    ) {
      const indexPlay = isRandomly
        ? songsRemaining[Math.floor(Math.random() * songsRemaining.length)]
        : musicIndexPlaying + 1;
      console.log(indexPlay);

      if (indexPlay === undefined || !playingPlaylist.musics[indexPlay]) {
        if (isRepeating) {
          play(playingPlaylist, 0);
          return;
        }
        setMusicIndexPlaying(null);
        setPlayingPlaylist(null);
        if (setPlaying) {
          setPlaying(null);
        }
        return;
      }

      const musicPlay = playingPlaylist.musics[indexPlay];

      if (playSound) {
        if (isRandomly) {
          setSongsRemaining((state) => state.filter((id) => id !== indexPlay));
        }
        setMusicIndexPlaying(indexPlay);
        playSound(musicPlay);
      }
    } else if (isRepeating && playing && playSound) {
      playSound(playing);
    } else {
      if (setPlaying) {
        setPlaying(null);
      }
    }
  }

  function toggleRepeating() {
    setIsRepeating((state) => !state);
  }

  function toggleRandomly() {
    setIsRandomly((state) => !state);
  }

  useEffect(() => {
    if (playerSound && playerSound.current) {
      playerSound.current.addEventListener('ended', next);
    }

    return () => {
      if (playerSound && playerSound.current) {
        playerSound.current.removeEventListener('ended', next);
      }
    };
  }, [playerSound]);

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('repeating', String(isRepeating));
  }, [isRepeating]);

  useEffect(() => {
    localStorage.setItem('randomly', String(isRandomly));
  }, [isRandomly]);

  useEffect(() => {
    if (isRepeating && playingPlaylist) {
      if (songsRemaining.length === 0) {
        setSongsRemaining(
          playingPlaylist
            .musics!.map((_, id) => id)
            .filter((id) => id !== musicIndexPlaying),
        );
      }
    }
  }, [songsRemaining, isRandomly]);

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        createPlaylist,
        addVideoInPlaylist,
        musicIndexPlaying,
        playingPlaylist,
        next,
        previous,
        play,
        stop,
        setTitlePlaylist,
        updatePlaylist,
        deletePlaylist,
        removeMusicPlaylist,
        isRepeating,
        isRandomly,
        toggleRepeating,
        toggleRandomly,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export function usePlaylists(): PlaylistsProps {
  const context = React.useContext(PlaylistsContext);

  return context;
}

export default PlaylistsProvider;
