import React from 'react'

import { Link } from 'react-router-dom'

import Register from '../../components/loginRegister/register'

const RegisterPage = (): JSX.Element => {
  return <div>
    <Register/>
    <Link to={'/loginRegister'}>Login</Link>
  </div>
}

export default RegisterPage
