import * as React from 'react';

const { ipcRenderer } = window.require("electron");

import Player from '../components/Player';

import { Video } from '../interfaces/Video';
import isInteractiveElement from '../utils/isInteractiveElement';

export const PlayerContext = React.createContext<Partial<{
	playerSound: React.RefObject<HTMLAudioElement>;
	playSound(video: Video): void;
	playing: Video | null;
}>>({});

const PlayerProvider: React.FC = ({ children }) => {
	const [playing, setPlaying] = React.useState<Video | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	const audioElement = React.createRef<HTMLAudioElement>();
	const displayElement = React.createRef<HTMLDivElement>();

	function keywordPressed(event: KeyboardEvent) {
		const { keyCode } = event

		if (!isInteractiveElement(event.target) && audioElement.current) {
			if ((keyCode === 32 || keyCode === 75)) {
				event.preventDefault()
				audioElement.current?.paused ? audioElement.current.play() : audioElement.current?.pause()
			}

			if (keyCode === 40) {
				event.preventDefault()
				if (Number((audioElement.current.volume - 0.05).toFixed(2)) < 0)
					return;
				audioElement.current.volume = Number((audioElement.current.volume - 0.05).toFixed(2))
			}

			if (keyCode === 38) {
				event.preventDefault()
				if (Number((audioElement.current.volume + 0.05).toFixed(2)) > 1)
					return;
				audioElement.current.volume = Number((audioElement.current.volume + 0.05).toFixed(2))
			}

			if (keyCode === 76) {
				event.preventDefault()
				audioElement.current.currentTime += 10
			}

			if (keyCode === 39) {
				event.preventDefault()
				audioElement.current.currentTime += 5
			}

			if (keyCode === 37) {
				event.preventDefault()
				audioElement.current.currentTime -= 5
			}

			if (keyCode === 74) {
				event.preventDefault()
				audioElement.current.currentTime -= 10
			}
		}
	}

	React.useEffect(() => {

		if (playing) {
			window.addEventListener('keydown', keywordPressed)
		}
		
		return () => {
			window.removeEventListener('keydown', keywordPressed)
		}

	}, [audioElement])
  
	function playSound(video: Video) {

		if (audioElement.current) {
			audioElement.current.pause()
		}

		if (loading)
			return alert('Já tem uma música iniciada, por favor espere carregar para iniciar outra.')

		setLoading(true)
		ipcRenderer.send('video', video)

		ipcRenderer.on('videomp3preload', (_: any, arg: {
			path: string;
			video: Video;
		}) => {
			setPlaying({
				...video,
				src: 'media://' + arg.path,
			})
		})

		ipcRenderer.on('videomp3', () => {
			setLoading(false)
		})
	}

	return (
		<PlayerContext.Provider value={{
			playSound,
			playerSound: audioElement,
			playing,
		}}>
			{children}

			<Player
				reference={displayElement}
				audioProps={{
					id: "playerAudio",
					src: playing?.src || '',
					title: playing?.title || '',
				}}
				src={playing?.src || ''}
				id="playerAudio"
				title={playing?.title || ''}
				audioElement={audioElement}
				video={playing}
				setplaying={setPlaying}
				loading={loading}
			/>
		</PlayerContext.Provider>
	)
}


export function usePlayer() {
	const context = React.useContext(PlayerContext)

	return context
}

export default PlayerProvider
