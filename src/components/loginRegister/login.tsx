import React, { useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import authenticationStore from '../../store/authenticationStore'
import AuthenticationForm from '../authenticationForm/authenticationForm'

const Login = (): JSX.Element => {
  const [loginErr, setLoginErr] = useState('')
  const navigate = useNavigate()

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authenticationStore.setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
          token: userCredential.user.refreshToken
        })
        localStorage.setItem('logged', JSON.stringify(authenticationStore.initialState))
        authenticationStore.getFavoriteMoviesFirebase()
        navigate('/')
      })
      .catch(() => {
        setLoginErr('Неправильный логин или пароль!')
      })
  }

  return (
    <AuthenticationForm title="Вход" handleClick={handleLogin} message={loginErr}/>
  )
}

export default Login
