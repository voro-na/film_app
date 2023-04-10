import React, { useState } from 'react'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import authenticationStore from '../../store/authenticationStore'
import AuthenticationForm from '../authenticationForm/authenticationForm'

const Register = (): JSX.Element => {
  const navigate = useNavigate()
  const [loginErr, setLoginErr] = useState('')
  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authenticationStore.setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
          token: userCredential.user.refreshToken
        })
        localStorage.setItem('logged', JSON.stringify(authenticationStore.initialState))
        authenticationStore.setUserFirebase()
        navigate('/')
      })
      .catch(() => {
        setLoginErr('Ошибка регистрации!')
      })
  }
  return (
    <AuthenticationForm title="Зарегистрироваться" handleClick={handleRegister} message={loginErr}/>
  )
}

export default Register
