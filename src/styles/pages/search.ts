import styled from "styled-components";
import { ImSearch } from "react-icons/im";
import { rgba, lighten } from "polished";

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

export const SearchIcon = styled(ImSearch)`
  position: absolute;
  bottom: 10px;
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

export const ContainerVideos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  padding: 10px;
  grid-gap: 10px;
`;
