import React from 'react'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import authenticationStore from '../../store/authenticationStore'
import AuthenticationForm from '../authenticationForm/authenticationForm'

const Register = (): JSX.Element => {
  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authenticationStore.setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
          token: userCredential.user.refreshToken
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <AuthenticationForm title="register" handleClick={handleRegister}/>
  )
}

export default Register
