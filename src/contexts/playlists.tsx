import React, { useEffect, useState } from 'react';

import { Video } from '../interfaces/Video';
import { Playlist } from '../interfaces/Playlist';

import { usePlayer } from './player'

export const PlaylistsContext = React.createContext<Partial<{
	playlists: Array<Playlist>;
	addVideoInPlaylist(id: string, video: Video): void;
	createPlaylist(playlist: Playlist): void;
	next(): void;
	play(playlist: Playlist, start: number): void;
	setTitlePlaylist(id: string, newTitle: string): void;
	deletePlaylist(id: string): void;
	updatePlaylist(id: string, newPlaylist: Playlist): void;
	removeMusicPlaylist(id: string, index: number): void;
}>>({});

const PlaylistsProvider: React.FC = ({ children }) => {
	const [playlists, setPlaylists] = useState<Array<Playlist>>(JSON.parse(localStorage.getItem('playlists') || '[]'));
	const [playingPlaylist, setPlayingPlaylist] = useState<Playlist | null>(null);
	const [musicIndexPlaying, setMusicIndexPlaying] = useState<number | null>(null);

	const { playerSound, playing, playSound } = usePlayer()

	function deletePlaylist(id: string) {
		setPlaylists(playlists.filter((playlist) => playlist.id !== id))
	}

	function createPlaylist(playlist: Playlist) {
		setPlaylists([...playlists, playlist])
	}

	function updatePlaylist(id: string, newPlaylist: Playlist) {
		setPlaylists((state) => {
			return state.map((playlist) => {
				return playlist.id === id ? newPlaylist : playlist
			})
		})
	}

	function removeMusicPlaylist(id: string, index: number) {
		let playlist = playlists.find((playlist) => playlist.id === id)
		if (playlist && playlist.musics){
			playlist.musics.splice(index, 1)

			setPlaylists((state) => {
				return state.map((statePlaylist) => {
					return statePlaylist.id === id ? playlist || statePlaylist : statePlaylist
				})
			})
		}
	}

	function setTitlePlaylist(id: string, newTitle: string) {
		setPlaylists((state) => {
			return state.map((playlist) => {
				return playlist.id === id ? {
					...playlist,
					name: newTitle
				} : playlist
			})
		})
	}

	function addVideoInPlaylist(id: string, video: Video) {
		const playlist = playlists.find((playlist) => playlist.id === id)

		if (playlist){
			if (playlist.musics) {
				playlist.musics = [...playlist.musics, video]
			} else {
				playlist.musics = [video]
			}

			const playlistsUpdate = playlists.map((playlistMaping) => {
				return (playlistMaping.id === id) ? playlist : playlistMaping
			})

			setPlaylists(playlistsUpdate)
		}
	}

	function play(playlist: Playlist, index: number) {
		if (playlist.musics) {
			const videoStart = playlist.musics[index]
	
			if (playSound) {
				setPlayingPlaylist(playlist)
				setMusicIndexPlaying(index)
				playSound(videoStart)
			}
		}
	}

	function next() {
		if (playingPlaylist && playingPlaylist.musics && musicIndexPlaying !== null) {
			const musicPlay = playingPlaylist.musics[musicIndexPlaying + 1]

			if (!musicPlay) {
				setMusicIndexPlaying(null)
				setPlayingPlaylist(null)
				return;
			}
	
			if (playSound) {
				setMusicIndexPlaying(musicIndexPlaying + 1)
				playSound(musicPlay)
			}
		}
	}

	useEffect(() => {
		if (playerSound && playerSound.current) {
			playerSound.current.addEventListener('ended', next)
		}

		return () => {
			if (playerSound && playerSound.current) {
				playerSound.current.removeEventListener('ended', next)
			}
		}
	}, [playerSound])

	useEffect(() => {
		localStorage.setItem('playlists', JSON.stringify(playlists))
	}, [playlists])

	return (
		<PlaylistsContext.Provider value={{
			playlists,
			createPlaylist,
			addVideoInPlaylist,
			next,
			play,
			setTitlePlaylist,
			updatePlaylist,
			deletePlaylist,
			removeMusicPlaylist
		}}>
			{children}
		</PlaylistsContext.Provider>
	)
}


export function usePlaylists() {
	const context = React.useContext(PlaylistsContext)

	return context
}

export default PlaylistsProvider
