import styled from "styled-components";
import { lighten } from "polished";

export const PlaylistContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  border-top-right-radius: 25px;
  background: ${({ theme }) => lighten(0.1, theme.background)};
  box-shadow: 3px 3px 3px 0 ${({ theme }) => theme.comment};
  transition: 0.2s filter;
  cursor: pointer;

  &:hover {
    filter: brightness(75%);
  }
`;

export const PlaylistTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
`;

export const ThumbnailPlaylist = styled.div`
  height: fit-content;
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 5px;
  grid-gap: 2px;

  & img {
    width: 100%;
    height: 106px;
    border-radius: 5px;
    filter: brightness(75%);
    border: 1px solid ${({ theme }) => theme.comment};
  }
`;
