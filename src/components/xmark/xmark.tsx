import React, { type FC, useCallback, useState } from 'react'

import styles from './../like/like.module.css'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

interface propsType {
  nameRu: string
  posterUrlPreview: string
  id: number
  folderId: string
}

const Xmark: FC<propsType> = ({
  nameRu,
  posterUrlPreview,
  id,
  folderId
}) => {
  const {
    isAuth
  } = useAuth()

  const [auth] = useState(isAuth)
  const [showTooltip, setShowTooltip] = useState(false)

  const removeMovie = useCallback(() => {
    if (auth) {
      if (folderId === 'favoriteMovies') {
        authenticationStore.removeMovie(nameRu, id, folderId)
      } else {
        authenticationStore.removeMovieFromCollection(nameRu, id, folderId)
      }
    } else {
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
    }
  }, [nameRu, posterUrlPreview])

  return <><i className="fa-solid fa-xmark"
              onClick={removeMovie}/>
    {showTooltip && <div className={styles.tooltip}>Зарегистрируйтесь или войдите в профиль!</div>}
  </>
}

export default Xmark
