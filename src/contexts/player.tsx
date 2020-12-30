import * as React from 'react';

const { ipcRenderer } = window.require("electron");

import Player from '../components/Player';

import { Video } from '../interfaces/Video';

export const PlayerContext = React.createContext<Partial<{
    playerSound: React.RefObject<HTMLAudioElement>;
    playSound(video: Video): void;
    playing: Video | null;
}>>({});

const PlayerProvider: React.FC = ({ children }) => {
    const [playing, setPlaying] = React.useState<Video | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    const audioElement = React.createRef<HTMLAudioElement>();
  
    function playSound(video: Video) {

        if (loading)
            return alert('Já tem uma música iniciada, por favor espere carregar para iniciar outra.')

        setLoading(true)
        ipcRenderer.send('video', video)

        ipcRenderer.on('videomp3preload', (_event, arg) => {
            setPlaying({
                ...video,
                src: 'media://' + arg.path,
            })
        })

        ipcRenderer.on('videomp3', () => {
            setLoading(false)
            ipcRenderer.send('notification', {
                title: 'Play new music!',
                body: `A música "${video.title}" está sendo tocada.`
            })
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
                src={playing?.src || ''}
                title={playing?.title || ''}
                id="playerAudio"
                video={playing}
                setPlaying={setPlaying}
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
