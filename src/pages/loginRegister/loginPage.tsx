import React from 'react'

import { Link } from 'react-router-dom'

import './authenticationPages.scss'
import Login from '../../components/loginRegister/login'

const LoginPage = (): JSX.Element => {
  return <div className={'authentication-container'}>
    <Login/>
    <div> Еще не зарегестрированы?<Link to={'/register'} className={'button'}>Зарегистрироваться</Link></div>
  </div>
}

export default LoginPage
