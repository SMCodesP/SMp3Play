import { darken } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    user-select: none;
  }

  body,
  html {
    width: 100%;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.foreground};
  }

  textarea:focus,
  input:focus {
    outline: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.foreground};
  }

  :-ms-input-placeholder {
    color: ${({ theme }) => theme.foreground};
  }

  ::-ms-input-placeholder {
    color: ${({ theme }) => theme.foreground};
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.pink};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.currentLine};
    border-radius: 5px;
    transition: background .4s;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => darken(theme.currentLine, 0.4)};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.foreground};
  }

  .swal2-popup {
    background: ${({ theme }) => theme.background} !important;
  }

  .swal2-popup * {
    color: ${({ theme }) => theme.foreground} !important;
  }

  .MuiPaper-root {
    background: ${({ theme }) => theme.background} !important;
    box-shadow: 0 0 3px ${({ theme }) => theme.comment} !important;
    color: ${({ theme }) => theme.purple} !important;
  }

  .cancel .MuiMenuItem-root {
    background: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.red} !important;
  }
`;
