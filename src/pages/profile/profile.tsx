import React, { useState } from 'react'

import { Navigate } from 'react-router-dom'

import FavoriteMovies from '../../components/favoriteMovies/favoriteMovies'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

const Profile = (): JSX.Element => {
  authenticationStore.setUserFromLocalStore()
  const {
    isAuth,
    email
  } = useAuth()

  const [auth, setAuth] = useState(isAuth)
  const [favoriteMovies] = useState(authenticationStore.favoriteMovies)

  if (authenticationStore.favoriteMovies !== null && isAuth) {
    authenticationStore.getFavoriteMoviesFirebase()
  }
  const logOut = (): void => {
    authenticationStore.removeUser()
    authenticationStore.removeFavoriteMovies()
    localStorage.clear()
    setAuth(prevState => !prevState)
  }
  return auth
    ? (<div>
        <h1 className={'movies-page_title'}>Welcome {email}</h1>
        <FavoriteMovies favoriteMovies={favoriteMovies}/>
        <button onClick={logOut} className={'button'}>Выйти из профиля</button>
      </div>)
    : (
      <Navigate to="/login"/>)
}
export default Profile
