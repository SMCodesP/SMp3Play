import { ImSearch } from "react-icons/im";
import { lighten } from "polished";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  justify-content: center;
`;

export const ContainerInput = styled.form`
  position: relative;
  padding: 0 0 0 0;
  margin: 20px auto;
  width: 300px;
  display: flex;
  flex-direction: column;

  & svg {
    cursor: pointer;
  }

  & hr {
    width: 0;
    border: 0;
    margin-left: 20px;
    height: 2px;
    align-self: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 2px 2px ${({ theme }) => theme.pink};
    top: -2px;
    position: relative;
    transition: width 0.5s;
  }

  & input:focus + .line {
    width: calc(100% - 20px);
  }
`;

export const Search = styled(ImSearch)`
  position: absolute;
  bottom: 12px;
  right: 10px;
`;

export const SearchInput = styled.input`
  height: 30px;
  margin: 0;
  border: 0;
  padding-right: 40px;
  font-weight: bold;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 100%;
  color: ${({ theme }) => theme.foreground};
  background: ${({ theme }) => theme.comment};
  border-radius: 0 20px;
  transition: filter 0.4s;

  &:focus {
    filter: brightness(135%);
  }
`;

export const ContainerPlaylists = styled.div`
  padding: 15px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
`;

export const PlaylistAdd = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border-top-right-radius: 25px;
  background: ${({ theme }) => lighten(0.1, theme.background)};
  box-shadow: 3px 3px 6px 0 ${({ theme }) => theme.comment};
  cursor: pointer;
  transition: 0.2s filter;

  &:hover {
    filter: brightness(75%);
  }
`;

export const ModalInputNewPlaylist = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputNewPlaylist = styled.input`
  background: ${({ theme }) => lighten(0.1, theme.background)};
  border: 0;
  width: 450px;
  box-shadow: 1px 1px 4px 0 ${({ theme }) => theme.comment};
  font-size: 20px;
  height: 30px;
  margin: 0;
  border: 0;
  font-weight: 400;
  padding: 30px 20px;
  color: ${({ theme }) => theme.foreground};
  border-radius: 5px;
  transition: filter 0.4s;

  &:focus {
    filter: brightness(135%);
  }
`;
