import React from 'react'

import { HashRouter } from 'react-router-dom'

import Header from './components/header/header'
import MainRoutes from './pages/Routes'
import './styles/main.scss'

function App (): JSX.Element {
  return (
    <HashRouter>
      <Header/>
      <MainRoutes/>

    </HashRouter>
  )
}

export default App
