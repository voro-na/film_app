import React from 'react'

import { Link } from 'react-router-dom'

import './authenticationPages.scss'
import Login from '../../components/loginRegister/login'

const LoginPage = (): JSX.Element => {
  return <div className={'authentication-container'}>
    <Login/>
    <span> Еще не зарегистрированы?</span>
    <Link to={'/register'} className={'register_btn'}>Зарегистрироваться</Link>
  </div>
}

export default LoginPage
