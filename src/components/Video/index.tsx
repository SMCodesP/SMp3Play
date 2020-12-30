import React, { useEffect, useState } from 'react'

import ProgressiveImage from 'react-progressive-graceful-image';

import { ImSearch } from 'react-icons/im'
import { FaRegPlayCircle } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Video } from '../../interfaces/Video'

import './style.css'

interface MenuItem {
	key: string;
	caption: string;
	onClick?(_event: React.MouseEvent<HTMLLIElement, MouseEvent>, {video, playSound, handleClose}: {
    	video: Video;
    	playSound(video: Video): void;
    	handleClose(): void;
    }): void;
    subMenuItems?: Array<MenuItem>;
}

const menuItems: MenuItem[] = [
  {
    key: "1",
    caption: "Play",
    onClick: (_, {video, playSound, handleClose}) => {
    	handleClose()
    	playSound(video)
    }
  },
  {
    key: "group-1",
    caption: "Add to playlist",
    subMenuItems: [
      {
        key: "4",
        caption: "#1 Mhrap Rap's",
        onClick: () => {}
      },
      {
        key: "5",
        caption: "#2 Vmz Rap's",
        onClick: () => {}
      },
      {
        key: "6",
        caption: "#3 7mz Rap's",
        onClick: () => {}
      }
    ]
  },
];

const VideoComponent = ({ video, playSound }: { video: Video, playSound(video: Video): void }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [optionsActive, setOptionsActive] = useState(false)

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function renderMenuItem(menuItem: MenuItem) {
		return !!(menuItem.subMenuItems && menuItem.subMenuItems.length) ? (
			<li
				key={menuItem.key}
				style={{
					display: 'flex',
				    flexDirection: 'column',
				    width: '100%',
				    justifyContent: 'center',
				    textAlign: 'center',
				    padding: '5px',
				    background: 'var(--primaryBackground)',
    				color: 'var(--fifthText)',
				    filter: 'brightness(90%)',
				}}
			>
				{menuItem.caption}
				<Paper>
              		<MenuList>
		                {menuItem.subMenuItems.map(subMenuItem => renderMenuItem(subMenuItem))}
              		</MenuList>
              	</Paper>
			</li>
		) : (
			<MenuItem
				key={menuItem.key}
				onClick={(e) => {
					if (menuItem.onClick) {
						menuItem.onClick(e, {
							video,
							playSound,
							handleClose
						})
					}
				}}
			>
				{menuItem.caption}
			</MenuItem>
		)
	}


	return (
		<div className="containerVideo" key={video.videoId}>
			<p className="titleVideo">{video.title}</p>
			<p style={{
				fontSize: 14,
				marginBottom: 15,
				marginTop: 5
			}}><strong>Views:</strong> {new Intl.NumberFormat('pt-BR', {
				maximumFractionDigits: 1,
				notation: "compact",
				compactDisplay: "short"
			}).format(video.views)}</p>
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
				/>
			)}
			</ProgressiveImage>
			<div style={{
				display: 'flex',
				marginTop: '15px',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<FaRegPlayCircle
					size={22}
					color="#ff79c6"
					className="iconUsage"
					onClick={() => {
						console.log('playing...')
						if (playSound !== undefined && video !== undefined) {
							playSound(video)
						}
					}}
				/>
				<p className="authorName">{video.author.name}</p>

				<IconButton
					aria-label="more"
					aria-controls="long-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreVertIcon style={{ color: "#ff79c6" }} />
				</IconButton>
			</div>
			<Menu
				id={`simple-menu-${video.videoId}`}
				keepMounted
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className="simple-menu"
			>
				{menuItems.map(menuItem => renderMenuItem(menuItem))}
			</Menu>
		</div>
	)
}

export default VideoComponent