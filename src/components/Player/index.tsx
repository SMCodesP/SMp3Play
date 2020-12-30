import React, { useState, useEffect, createRef } from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ImVolumeHigh, ImVolumeMedium, ImVolumeLow, ImVolumeMute2 } from "react-icons/im";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Video } from '../../interfaces/Video'
import './style.css'
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
	const seekVolume = createRef<HTMLInputElement>()
	const currentDuration = createRef<HTMLParagraphElement>()
	const volumeIndication = createRef<HTMLParagraphElement>()
	const totalDuration = createRef<HTMLParagraphElement>()

	useEffect(() => {
		setPlaying(true)
	}, [video])

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

	function volumeUpdateSeek() {
		if (seekVolume.current && volumeIndication.current) {
			localStorage.setItem('volume', String(Math.floor((elementAudio.current?.volume || 0) * 100)))
			volumeIndication.current.innerText = String(Math.floor((elementAudio.current?.volume || 0) * 100)) + "%"
			seekVolume.current.value = String((elementAudio.current?.volume || 0) * 100)
		}
	}
	function volumeUpdate() {
		if (seekVolume.current && elementAudio.current) {
			elementAudio.current.volume = Number(seekVolume.current.value) / 100
		}
	}

	useEffect(() => {
		if (elementAudio.current) {
			elementAudio.current.onvolumechange = () => volumeUpdateSeek()
		}
		if (seekVolume.current) {
			seekVolume.current.addEventListener('input', volumeUpdate)
			seekVolume.current.addEventListener('change', volumeUpdate)
		}

		return () => {
			if (seekVolume.current) {
				seekVolume.current?.removeEventListener('input', volumeUpdate)
				seekVolume.current?.removeEventListener('change', volumeUpdate)
			}
		}
	}, [seekVolume])

	function resetPlayer() {
		props.setPlaying(null)
		setPlaying(true)
	}

	useEffect(() => {
		if (elementAudio.current && seekAudio.current && seekVolume.current) {
			elementAudio.current.addEventListener('ended', resetPlayer)

			seekVolume.current.value = localStorage.getItem('volume') || '100'

			elementAudio.current.onloadeddata = () => {
				if (totalDuration.current) {
					totalDuration.current.innerText = secondstoMinutes(elementAudio.current?.duration || 0)
				}

				if (elementAudio.current)
					elementAudio.current.volume = Number(localStorage.getItem('volume') || '100') / 100

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
		<>
			<SkeletonTheme color="#282a36" highlightColor="#44475a">
				{!loading && <audio
					ref={elementAudio}
					autoPlay
					{...props}
				></audio>}
				<div className="control">
					{loading ? (
						<div style={{
							width: 128,
							height: 72
						}} className="thumbnail">
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
								className="thumbnail"
							/>
						)}
						</ProgressiveImage>
					)}

					<div className="columnControl">
						<p className="title">{loading ? <Skeleton /> : video.title}</p>
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
										className="iconPlay"
									/>
								) : (
									<BsFillPlayFill
										color="#f1fa8c"
										size={26}
										onClick={() => setPlaying((currentPlaying) => !currentPlaying)}
										className="iconPlay"
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
									className="progressBar"
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

					{loading ? (
						<div className="containerInformation">
							<div></div>
							<Skeleton
								width={26}
								height={26}
							/>
						</div>
					) : (
						<div className="containerInformation">
							<div className="volumeContainer">
								<div className="volumeControl">
									<input
										ref={seekVolume}
										min="0"
										max="100"
										step="1"
										type="range"
										name="volumeControl"
										className="inputVolume"
									/>
									<p ref={volumeIndication} className="volumeIndication">100%</p>
								</div>
							</div>
							<ImVolumeHigh
								color="#bd93f9"
								size={26}
								className="iconVolume"
							/>
						</div>
					)}
				</div>
			</SkeletonTheme>
		</>
	) : null

}

export default Player