import {ThemeProvider} from 'styled-components'

import { GlobalStyle } from './styles/GlobalStyle'
import themes from './themes'

export function App() {
  return (
    <ThemeProvider theme={themes.dark}>
      <GlobalStyle />
    </ThemeProvider>
  )
}