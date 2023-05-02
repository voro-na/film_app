import React from 'react'

import { Link } from 'react-router-dom'

import './authenticationPages.scss'
import Register from '../../components/loginRegister/register'

const RegisterPage = (): JSX.Element => {
  return <div className={'authentication-container'}>
    <Register/>
    <div>Уже зарегестрированы? <Link to={'/login'} className={'register_btn'}>Войти</Link></div>
  </div>
}

export default RegisterPage
