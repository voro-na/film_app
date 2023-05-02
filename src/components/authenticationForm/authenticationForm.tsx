import React, { useCallback, useState } from 'react'

import './authenticationForm.scss'

interface AuthenticationFormProps {
  title: string
  handleClick: any
  message: string
}

const AuthenticationForm = ({
  title,
  handleClick,
  message
}: AuthenticationFormProps): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <div className={'authentication-form'}>
    <h2 className={'title'}>{title}</h2>
    <h3>{message}</h3>

    <input type="email"
           value={email}
           placeholder="Введите email"
           className={'form_input-container '}
           onChange={(e) => {
             setEmail(e.target.value)
           }}/>
    <input type="password"
           value={password}
           placeholder="Введите пароль"
           className="form_input-container "
           onChange={(e) => {
             setPassword(e.target.value)
           }}/>
    <button
      onClick={useCallback(() => {
        handleClick(email, password)
      }, [email, password])}
      className={'register_btn'}>
      {title}
    </button>

  </div>
}

export default React.memo(AuthenticationForm)
