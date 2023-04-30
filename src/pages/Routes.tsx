import React from 'react'

import { Route, Routes } from 'react-router-dom'

import ExtensionalSearch from './extentionalSearch/extensionalSearch'
import FilmPage from './film/filmPage'
import Home from './home/Home'
import LoginPage from './loginRegister/loginPage'
import RegisterPage from './loginRegister/registerPage'
import Movies from './movies/movies'
import Profile from './profile/profile'

const MainRoutes = (): JSX.Element => {
  return <Routes>
    <Route path="*" element={<Home/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/movies" element={<Movies/>}/>
    <Route path="/search" element={<ExtensionalSearch/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/film/:id" element={<FilmPage/>}/>
  </Routes>
}

export default MainRoutes
