import React, { useState } from 'react'

import { Navigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

const Profile = (): JSX.Element => {
  const {
    isAuth,
    email
  } = useAuth()
  const [auth, setAuth] = useState(isAuth)
  // const [favoriteMovies] = useState(authenticationStore.favoriteMovies)
  const logOut = (): void => {
    authenticationStore.removeUser()
    setAuth(prevState => !prevState)
  }
  return auth
    ? (<div>
        <h1>Welcome {email}</h1>
        <button onClick={logOut} className={'button'}>Выйти из профиля</button>
        {/* {favoriteMovies.map((item, index) => ( */}
        {/*   <div key={index}>{item.movieTitle}</div> */}
        {/* ))} */}
      </div>
      )
    : (
      <Navigate to="/login"/>
      )
}
export default Profile
