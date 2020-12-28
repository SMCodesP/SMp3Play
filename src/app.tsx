import React from 'react';
import ReactDom from 'react-dom'

import './styles/global.css'

import Routes from './routes'

const App = () => {
  return (
    <Routes />
  )
}

ReactDom.render(<App />, document.getElementById('root'));
