import React, { useCallback, useState } from 'react'

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
  const { isAuth } = useAuth()

  return (
    <div className={'header'}>
      <Link to={'/'} className={'logo'}>LOGO</Link>
      <Input/>
      <ul className={'header__list'}>
        {
          navigation.map((temp, index) => (
            <li key={index} className={'header__item'}>
              <Link className={'header__content'} to={temp.path} state={temp.type}>{temp.title}</Link>
            </li>
          ))
        }
        <Link className={'header__item header__content'} to={'/profile'}>{isAuth ? 'ПРОФИЛЬ' : 'ВХОД'}</Link>
      </ul>
    </div>
  )
}

export default React.memo(Header)
