import React, { useState, useEffect, createRef } from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ImVolumeHigh, ImVolumeMedium, ImVolumeLow, ImVolumeMute2 } from "react-icons/im";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Video } from '../../interfaces/Video'
import styles from './style.module.css'
import secondstoMinutes from '../../utils/secondsToMinutes';

const Player = ({
    video,
    loading,
    ...props
}: {
    video: Video | null;
    src: string;
    title: string;
    id: string;
    loading: boolean;
}) => {

    const [playing, setPlaying] = useState(true)

    const elementAudio = createRef<HTMLAudioElement>()
    const seekAudio = createRef<HTMLInputElement>()
    const currentDuration = createRef<HTMLParagraphElement>()
    const totalDuration = createRef<HTMLParagraphElement>()

    function setSeek(value: number) {
        if (elementAudio && elementAudio.current) {
            elementAudio.current.currentTime = value
        }
    }

    function timeUpdate() {
        setSeek(Number(seekAudio.current?.value) / 100)
    }
    
    function timeUpdateProgress() {
        if (currentDuration.current)
            currentDuration.current.innerText = secondstoMinutes(elementAudio.current?.currentTime || 0)
        if (seekAudio.current) {
            console.log(Math.floor(elementAudio.current?.duration || 0) / 100)
            seekAudio.current.value = String(Math.floor(elementAudio.current?.currentTime || 0) * 100)
        }
    }

    useEffect(() => {
        if (elementAudio.current) {
            elementAudio.current.ontimeupdate = () => timeUpdateProgress()
        }
        if (seekAudio.current) {
            seekAudio.current.addEventListener('input', timeUpdate)
            seekAudio.current.addEventListener('change', timeUpdate)
        }

        return () => {
            if (seekAudio.current) {
                seekAudio.current?.removeEventListener('input', timeUpdate)
                seekAudio.current?.removeEventListener('change', timeUpdate)
            }
        }
    }, [seekAudio])

    function resetPlayer() {
        console.log('terminou')
        props.setPlaying(null)
    }

    useEffect(() => {
        if (elementAudio.current && seekAudio.current) {
            elementAudio.current.addEventListener('ended', resetPlayer)

            elementAudio.current.onloadeddata = () => {
                if (totalDuration.current) {
                    console.log(elementAudio.current)
                    totalDuration.current.innerText = secondstoMinutes(elementAudio.current?.duration || 0)
                }

                if (seekAudio.current) {
                    seekAudio.current.value = '0'
                    seekAudio.current.step = '0'
                    seekAudio.current.max = String(Math.floor(elementAudio.current?.duration || 0) * 100) || '1'
                }
            }
        }

        return () => {
            elementAudio.current?.removeEventListener('ended', resetPlayer)
        }
    }, [elementAudio])

    useEffect(() => {
        playing ? elementAudio.current?.play() : elementAudio.current?.pause()
    }, [playing])

    return (video !== null) ? (
        <SkeletonTheme color="#282a36" highlightColor="#44475a">
            {!loading && <audio
                ref={elementAudio}
                autoPlay
                {...props}
            ></audio>}
            <div className={styles.control}>
                {loading ? (
                    <div style={{
                        width: 128,
                        height: 72
                    }} className={styles.thumbnail}>
                        <Skeleton
                            height={72}
                            width={128}
                            duration={1.2}
                        />
                    </div>
                ) : (
                    <ProgressiveImage
                        src={video.image}
                        placeholder={`https://i.ytimg.com/vi/${video.videoId}/default.jpg`}
                    >
                    {(src: string, loading: boolean) => (
                        <img
                            style={{
                                filter: loading ? 'blur(5px)' : ''
                            }}
                            src={src}
                            alt={video.title}
                            className={styles.thumbnail}
                        />
                    )}
                    </ProgressiveImage>
                )}

                <div className={styles.columnControl}>
                    <p className={styles.title}>{loading ? <Skeleton /> : video.title}</p>
                    <div style={{
                        width: '90%',
                        display: 'flex',
                        alignSelf: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <p ref={currentDuration} style={{
                            alignSelf: 'center',
                            fontSize: '14px'
                        }}>{loading ? <Skeleton
                            width={42}
                            height={15}
                        /> : '00:00'}</p>
                        <div style={{
                            width: '85%',
                            position: 'relative',
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center'
                        }}>
                            {loading ? (
                                <span style={{
                                    alignSelf: 'center'
                                }}>
                                    <Skeleton
                                        width={26}
                                        height={26}
                                    />
                                </span>
                            ) : playing ? (
                                <BsFillPauseFill
                                    color="#f1fa8c"
                                    size={26}
                                    onClick={() => setPlaying((currentPlaying) => !currentPlaying)}
                                    className={styles.iconPlay}
                                />
                            ) : (
                                <BsFillPlayFill
                                    color="#f1fa8c"
                                    size={26}
                                    onClick={() => setPlaying((currentPlaying) => !currentPlaying)}
                                    className={styles.iconPlay}
                                />
                            )}
                            {loading ? <Skeleton
                                height={8}
                                style={{
                                    margin: '5px 0'
                                }}
                            /> : <input
                                ref={seekAudio}
                                type="range"
                                name="progress"
                                id="progress"
                                min="0"
                                max={elementAudio.current?.duration}
                                step="1"
                                className={styles.progressBar}
                            />}
                        </div>
                        <p ref={totalDuration} style={{
                            alignSelf: 'center',
                            fontSize: '14px'
                        }}>{loading ? <Skeleton
                            width={42}
                            height={15}
                        /> : '00:00'}</p>
                    </div>
                </div>

                <div className={styles.containerInformation}>
                    {loading ? (
                        <Skeleton
                            width={26}
                            height={26}
                        />
                    ) : <ImVolumeHigh
                        color="#bd93f9"
                        size={26}
                        className={styles.iconVolume}
                    />}
                </div>
            </div>
        </SkeletonTheme>
    ) : null

}

export default Player