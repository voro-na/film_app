import React from 'react'

import { Link } from 'react-router-dom'

import Login from '../../components/loginRegister/login'

const LoginPage = (): JSX.Element => {
  return <div>
    <Login/>
    <Link to={'/register'}>register</Link>
  </div>
}

export default LoginPage
