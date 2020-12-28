import React from 'react'

import { FaHome } from 'react-icons/fa'
import { ImSearch, ImFolderDownload } from 'react-icons/im'
import { RiPlayListFill } from 'react-icons/ri'

import { Link } from 'react-router-dom'

import styles from './style.module.css'

const VerticalMenu = () => {
	return (
		<div className={styles.menu}>

			<ul className={styles.listItens}>
				<Link to="/">
					<li className={styles.itemList}>
						<FaHome
							size={28}
							color="#ff79c6"
						/>
					</li>
				</Link>

				<hr className={styles.separator} />

				<Link to="/search">
					<li className={styles.itemDivision}>
						<ImSearch
							size={18}
							color="#f1fa8c"
						/>
					</li>
				</Link>
				<li className={styles.itemDivision}>
					<ImFolderDownload
						size={18}
						color="#6272a4"
					/>
				</li>
				<li className={styles.itemDivision}>
					<RiPlayListFill
						size={18}
						color="#957FEF"
					/>
				</li>
			</ul>

		</div>
	)
}

export default VerticalMenu
