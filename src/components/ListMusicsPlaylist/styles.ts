import { FaRegPlayCircle } from 'react-icons/fa';
import { lighten, opacify } from 'polished';
import styled from 'styled-components';

export const ListMusics = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const MusicItemPlaylist = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 15px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => opacify(0.1, lighten(0.2, theme.background))},
    ${({ theme }) => lighten(0.1, theme.background)} 65%
  );
  border-radius: 5px;
  cursor: move !important;
  transition: filter 0.2s, box-shadow 0.2s;

  &:active {
    filter: brightness(75%);
    box-shadow: 0 0 5px ${({ theme }) => theme.comment};
  }

  & p {
    display: flex;
    align-items: center;
  }
`;

export const PlayPlaylistMusic = styled(FaRegPlayCircle)`
  cursor: pointer;
  transition: 0.2s filter;

  &:hover {
    filter: brightness(75%);
  }
`;
