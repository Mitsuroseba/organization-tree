import React, { type ReactElement } from 'react'
import './App.scss'
import Tree from './components/Tree/Tree'

function App (): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Tree />
      </header>
    </div>
  )
}

export default App
