import React, { useEffect, useState } from 'react'

import cn from 'classnames'
import { Navigate } from 'react-router-dom'

import FavoriteMovies from '../../components/favoriteMovies/favoriteMovies'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

const Profile = (): JSX.Element => {
  useEffect(() => {
    authenticationStore.setUserFromLocalStore()
  }, [])

  const {
    isAuth,
    email
  } = useAuth()

  const [auth, setAuth] = useState(isAuth)

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
    ? (<>
      <h1 className={'movies-page_title'}>Welcome {email}</h1>

      <FavoriteMovies/>
      <button onClick={logOut} className={cn('button', 'center_btn')}>Выйти из профиля</button>
    </>)
    : (
      <Navigate to="/login"/>)
}
export default Profile
