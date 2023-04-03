import React from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import authenticationStore from '../../store/authenticationStore'
import AuthenticationForm from '../authenticationForm/authenticationForm'

const Login = (): JSX.Element => {
  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authenticationStore.setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
          token: userCredential.user.refreshToken
        })
      })
      .catch((error) => {
        // const errorCode = error.code
        // const errorMessage = error.message
        console.log(error)
      })
  }

  return (
    <AuthenticationForm title="login" handleClick={handleLogin}/>
  )
}

export default Login
