import React from 'react'

import { HashRouter } from 'react-router-dom'

import Footer from './components/footer/footer'
import Header from './components/header/header'
import MainRoutes from './pages/Routes'
import './styles/main.scss'

function App (): JSX.Element {
  return (
    <HashRouter>
      <Header/>
      <MainRoutes/>
      <Footer/>

    </HashRouter>
  )
}

export default App
