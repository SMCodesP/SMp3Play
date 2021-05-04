import styled from "styled-components";
import { rgba, lighten } from "polished";

export const ContainerVideo = styled.div`
  break-inside: avoid;
  padding: 10px;
  background: ${({ theme }) => lighten(0.1, theme.background)};
  border-radius: 5px;
  margin: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  box-shadow: 0 0 5px ${({ theme }) => rgba(theme.purple, 0.25)};

  & img {
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.4s filter;
  }

  & svg {
    cursor: pointer;
    transition: 0.4s filter;
  }

  & svg:hover,
  & img:hover {
    filter: brightness(75%);
  }
`;

export const TitleVideo = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;

export const AuthorName = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.yellow};
`;
