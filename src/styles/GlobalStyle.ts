import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Rubik', Arial, Helvetica, sans-serif;
    font-size: 16px;
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.foreground};
  }
`
