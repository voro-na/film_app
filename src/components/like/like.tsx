import React, { type FC, useCallback, useState } from 'react'

import styles from './like.module.css'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

interface propsType {
  nameRu: string
  posterUrlPreview: string
  id: number
}

const Like: FC<propsType> = ({
  nameRu,
  posterUrlPreview,
  id
}) => {
  const {
    isAuth
  } = useAuth()

  const [auth] = useState(isAuth)
  const [showTooltip, setShowTooltip] = useState(false)
  const addToFavorite = useCallback(() => {
    if (auth) {
      authenticationStore.addMovie(nameRu, posterUrlPreview, id, 0, 'favoriteMovies')
    } else {
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
    }
  }, [nameRu, posterUrlPreview])

  return <><i className="fa-solid fa-heart"
              onClick={addToFavorite}/>
    {showTooltip && <div className={styles.tooltip}>Зарегистрируйтесь или войдите в профиль!</div>}
  </>
}

export default Like
