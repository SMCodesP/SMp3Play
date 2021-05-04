import { lighten } from "polished";
import styled from "styled-components";

export const ContainerPlaylistInformation = styled.div`
  margin: 15px;
  display: flex;
`;

export const ThumbnailPlaylistInformation = styled.div`
  width: 350px;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 5px;
  column-gap: 2px;
  background: ${({ theme }) => lighten(0.1, theme.background)};
  box-shadow: 3px 3px 6px 0 ${({ theme }) => theme.comment};
  border-radius: 5px;

  & img {
    width: 100%;
    border-radius: 5px;
    filter: brightness(75%);
    border: 1px solid ${({ theme }) => theme.comment};
  }
`;

export const ContainerInformationMusic = styled.div`
  margin: 0 10px;
`;

export const InformationList = styled.ul`
  list-style: none;

  & li {
    margin-left: 5px;
  }
`;

export const InputTitle = styled.input`
  width: 100%;
  background: ${({ theme }) => lighten(0.1, theme.background)};
  border: 0;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.foreground};
  font-size: 26px;
  font-weight: bold;
`;
