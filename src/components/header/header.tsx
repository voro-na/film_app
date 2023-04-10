import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import './header.scss'
import useAuth from '../../hooks/useAuth'
import Input from '../input/input'

const navigation = [
  {
    title: 'ГЛАВНАЯ',
    path: '/'
  },
  {
    title: 'ФИЛЬМЫ',
    path: '/movies',
    type: 'TOP_250_BEST_FILMS'
  }
]

const Header: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const navigate = useNavigate()
  const {
    isAuth
  } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent): void => {
    e.preventDefault()
    const link = `v2.2/films?order=NUM_VOTE&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${input}&page=1`
    if (input !== '') {
      navigate('/movies', { state: { link } })
      setInput('')
    }
  }
  return (
    <div className={'header'}>
      <Link to={'/'}>LOGO</Link>
      <ul className={'header__list'}>
        {
          navigation.map((temp, index) => (
            <li key={index} className={'header__item'}>
              <Link className={'header__content'} to={temp.path} state={temp.type}>{temp.title}</Link>
            </li>
          ))
        }
        <Input handleSubmit={handleSubmit} input={input} setInput={setInput}/>
        <Link className={'header__item'} to={'/profile'}>{isAuth ? 'ПРОФИЛЬ' : 'ВХОД'}</Link>
      </ul>
    </div>
  )
}

export default Header
