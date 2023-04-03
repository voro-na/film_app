import React, { type Dispatch, type SetStateAction } from 'react'

import { Link } from 'react-router-dom'
import './input.scss'

interface props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => void
  input: string
  setInput: Dispatch<SetStateAction<string>>
}

const Input = ({
  handleSubmit,
  input,
  setInput
}: props): JSX.Element => {
  return (<form className={'form'} onSubmit={e => {
    handleSubmit(e)
  }}>
    <div className="form_input-container">
      <input type="text" value={input} className="form_input" placeholder="Введите название фильма" onChange={e => {
        setInput(e.target.value)
      }}/>
      <Link to={'/search'}><i className="fa-solid fa-bars icons"></i></Link>
      <i className="fa-solid fa-magnifying-glass icons" onClick={e => {
        handleSubmit(e)
      }}></i>
    </div>
  </form>)
}

export default Input
