import { darken, lighten } from "polished";
import styled from "styled-components";

export const Menu = styled.div`
  width: 72px;
  min-height: 100vh;
  background: ${({ theme }) => lighten(0.15, theme.background)};
  padding-top: 15px;
`;

export const ListItens = styled.ul`
  width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  gap: 10px;
`;

export const Link = styled.a<{
  actived: boolean;
}>`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::before {
    content: " ";
    width: 3px;
    height: 30px;
    background: ${({ theme }) => theme.purple};
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    position: absolute;
    left: ${({ actived }) => (actived ? "0" : "-3")}px;
    transition: left 0.2s;
  }

  &:hover::before {
    left: 0;
  }
`;

export const ItemList = styled.li`
  background: ${({ theme }) => theme.background};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.4s filter, 0.4s border-radius;

  &:hover {
    filter: brightness(60%);
    border-radius: 35%;
  }
`;

export const Separator = styled.hr`
  border: 1px solid ${({ theme }) => darken(0.15, theme.purple)};
  width: 32px;
  height: 1px;
  margin: 5px;
`;
