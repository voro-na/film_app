import React from 'react'

import { Link } from 'react-router-dom'

import './button.scss'

interface buttonProps {
  text: string
  link: string
  type: string
}

interface buttonLoadProps {
  text: string
  onClick: any
}

const Button: React.FC<buttonProps> = ({
  text,
  link,
  type
}) => {
  return <Link to={link} className={'button'} state={type}>{text}</Link>
}

export const ButtonLoad: React.FC<buttonLoadProps> = ({
  text,
  onClick
}) => {
  return <button className={'button'} onClick={() => onClick()}>{text}</button>
}

export default Button
