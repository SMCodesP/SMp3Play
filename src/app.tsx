import React from 'react';
import ReactDom from 'react-dom'

import './styles/global.css'

import Routes from './routes'

import PlayerProvider from './contexts/player';

declare class FontFace {
  constructor(name: string, path: string);
};

if (document.fonts) {
  const fontFace = new FontFace("Roboto", "./fonts/Roboto-Regular.ttf");
  document.fonts.add(fontFace);
}

const App = () => {
  return (
    <PlayerProvider>
	      <Routes />
    </PlayerProvider>
  )
}

ReactDom.render(<App />, document.getElementById('root'));
