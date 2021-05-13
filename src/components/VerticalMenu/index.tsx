import React, { useContext, memo } from 'react';

import { FaHome } from 'react-icons/fa';
import { ImSearch, ImFolderDownload } from 'react-icons/im';
import { RiPlayListFill } from 'react-icons/ri';
import { ThemeContext } from 'styled-components';

import { Menu, Link, ListItens, ItemList, Separator } from './styles';

const VerticalMenu: React.FC<{
  selected: string;
}> = ({ selected }) => {
  const theme = useContext(ThemeContext);

  console.log('selected: ' + selected);

  return (
    <Menu>
      <ListItens>
        <Link href="#/smp3/" actived={selected === 'home'}>
          <ItemList>
            <FaHome size={26} color={theme.pink} />
          </ItemList>
        </Link>

        <Separator />

        <Link href="#/smp3/search" actived={selected === 'search'}>
          <ItemList>
            <ImSearch size={20} color={theme.yellow} />
          </ItemList>
        </Link>
        <Link href="#/smp3/playlists" actived={selected === 'playlists'}>
          <ItemList>
            <RiPlayListFill size={20} color={theme.purple} />
          </ItemList>
        </Link>
      </ListItens>
    </Menu>
  );
};

export default memo(VerticalMenu);
