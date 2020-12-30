import React from 'react';
import ReactDom from 'react-dom'

import './styles/global.css'

import Routes from './routes'
import PlayerProvider from './contexts/player';
import Home from './pages/home'

const mainElement = document.createElement('div');
const title = document.createElement('h1');
title.innerText = "Teste"
mainElement.appendChild(title)
document.body.appendChild(mainElement);

if (document.fonts) {
  const fontFace = new FontFace("Roboto", "./fonts/Roboto-Regular.ttf");
  document.fonts.add(fontFace);
}

const App = () => {
  return (
    <>
      <PlayerProvider>
        <Routes />
      </PlayerProvider>
    </>
  )
}

ReactDom.render(<App />, mainElement);
