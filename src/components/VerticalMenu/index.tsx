import React from "react";

import { FaHome } from "react-icons/fa";
import { ImSearch, ImFolderDownload } from "react-icons/im";
import { RiPlayListFill } from "react-icons/ri";

import "./style.css";

const VerticalMenu = () => {
  return (
    <div className="menu">
      <ul className="listItens">
        <a href="#/smp3/">
          <li className="itemList">
            <FaHome size={28} color="#ff79c6" />
          </li>
        </a>

        <hr className="separator" />

        <a href="#/smp3/search" className="itemDivision">
          <li>
            <ImSearch size={18} color="#f1fa8c" />
          </li>
        </a>
        <a href="#/smp3/playlists" className="itemDivision">
          <li>
            <RiPlayListFill size={18} color="#957FEF" />
          </li>
        </a>
      </ul>
    </div>
  );
};

export default VerticalMenu;
