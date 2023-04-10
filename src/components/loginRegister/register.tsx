import React from 'react'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import authenticationStore from '../../store/authenticationStore'
import AuthenticationForm from '../authenticationForm/authenticationForm'

const Register = (): JSX.Element => {
  const navigate = useNavigate()

  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authenticationStore.setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
          token: userCredential.user.refreshToken
        })
        authenticationStore.setUserFirebase()
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <AuthenticationForm title="Зарегистрироваться" handleClick={handleRegister} message={''}/>
  )
}

export default Register
