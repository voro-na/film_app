import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import './header.scss'
import authenticationStore from '../../store/authenticationStore'
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

const Header: React.FC = observer(() => {
  const auth = authenticationStore.initialState.email
  const [isAuth, setAuth] = useState(auth)

  useEffect(() => {
    authenticationStore.setUserFromLocalStore()
    setAuth(auth)
  }, [auth])

  return (
    <div className={'header'}>
      <Link to={'/'} className={'logo'}>
        <div className={'logo-item'} >КИНО</div>
      <div className={'logo-item'}>плёнка</div>
      </Link>
      <Input/>
      <ul className={'header__list'}>
        {
          navigation.map((temp, index) => (
            <li key={index} className={'header__item'}>
              <Link className={'header__content'} to={temp.path} state={temp.type}>{temp.title}</Link>
            </li>
          ))
        }
        <Link className={'header__item header__content'} to={'/profile'}>{(isAuth != null) ? 'ПРОФИЛЬ' : 'ВХОД'}</Link>
      </ul>
    </div>
  )
})

export default Header
