import React, { useEffect, useState } from 'react'

import cn from 'classnames'
import { Navigate } from 'react-router-dom'

import styles from './profile.module.scss'
import Folder from '../../components/folder/folder'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

const Profile = (): JSX.Element => {
  useEffect(() => {
    authenticationStore.setUserFromLocalStore()
    if (authenticationStore.favoriteMovies !== null && isAuth) {
      authenticationStore.getFavoriteMoviesFirebase()
    }
  }, [])

  const {
    isAuth,
    email
  } = useAuth()

  const [auth, setAuth] = useState(isAuth)

  const logOut = (): void => {
    authenticationStore.removeUser()
    authenticationStore.removeFavoriteMovies()
    localStorage.clear()
    setAuth(prevState => !prevState)
  }
  return auth
    ? (<div className={styles.container}>
      <h1 className={'movies-page_title'}>Welcome {email}</h1>
      <Folder title="Избранное" id="favorite-movies"/>
      <button onClick={logOut} className={cn('button', 'center_btn')}>Выйти из профиля</button>
    </div>)
    : (
      <Navigate to="/login"/>)
}
export default Profile
