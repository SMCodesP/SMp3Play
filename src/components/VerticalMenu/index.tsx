import React from 'react'

import { FaHome } from 'react-icons/fa'
import { ImSearch, ImFolderDownload } from 'react-icons/im'
import { RiPlayListFill } from 'react-icons/ri'

// import { a } from 'react-router-dom'

import './style.css'

const VerticalMenu = () => {
	return (
		<div className="menu">

			<ul className="listItens">
				<a href="#/smp3/">
					<li className="itemList">
						<FaHome
							size={28}
							color="#ff79c6"
						/>
					</li>
				</a>

				<hr className="separator" />

				<a href="#/smp3/search">
					<li className="itemDivision">
						<ImSearch
							size={18}
							color="#f1fa8c"
						/>
					</li>
				</a>
				<a href="#/smp3/playlists">
					<li className="itemDivision">
						<RiPlayListFill
							size={18}
							color="#957FEF"
						/>
					</li>
				</a>
				<li className="itemDivision">
					<ImFolderDownload
						size={18}
						color="#6272a4"
					/>
				</li>
			</ul>

		</div>
	)
}

export default VerticalMenu
