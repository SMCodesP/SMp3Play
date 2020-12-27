import React from 'react';
import ReactDom from 'react-dom'

import './styles/global.css'

const App = () => {
  return (
    <h1>
      Hello, world!
    </h1>
  )
}

ReactDom.render(<App />, document.getElementById('root'));
