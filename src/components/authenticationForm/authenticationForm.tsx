import React, { useState } from 'react'

interface AuthenticationFormProps {
  title: string
  handleClick: any
}

const AuthenticationForm = ({
  title,
  handleClick
}: AuthenticationFormProps): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return <div>
    <h2>AuthenticationForm</h2>
    <input type="email"
           value={email}
           placeholder="Input email"
           onChange={(e) => {
             setEmail(e.target.value)
           }}/>
    <input type="password"
           value={password}
           placeholder="Input password"
           onChange={(e) => {
             setPassword(e.target.value)
           }}/>
    <button onClick={() => handleClick(email, password)}>{title}</button>
  </div>
}

export default AuthenticationForm
