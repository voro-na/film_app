import React, { type FC, useCallback, useState } from 'react'

import styles from './likeCollection.module.scss'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

interface propsType {
  nameRu: string
  posterUrlPreview: string
  filmId: number
}

interface foldersType {
  title: string
  id: string
}

const LikeCollection: FC<propsType> = ({
  nameRu,
  posterUrlPreview,
  filmId
}) => {
  const {
    isAuth
  } = useAuth()

  const [auth] = useState(isAuth)
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [folders, setFolders] = useState<foldersType[]>([])
  const addToFavorite = useCallback((id: string) => {
    if (auth) {
      const movie = {
        nameRu,
        posterUrl: posterUrlPreview,
        id: filmId
      }
      authenticationStore.addMovieToCollectionFirebase(movie, id)
      setIsOpen(false)
    } else {
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
    }
  }, [nameRu, posterUrlPreview])

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
    if (auth) {
      setFolders(Object.values(authenticationStore.foldersName))
    } else {
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
    }
  }, [isOpen])

  return <div className={styles.container}>
    <i className="fa-solid fa-plus" onClick={handleClick}/>
    {isOpen && isAuth && <div className={styles.list}>
      {folders.map(item => (<div key={item.id}
                                 onClick={() => {
                                   addToFavorite(item.id)
                                 }}
                                 className={styles.listItem}>{item.title}</div>))
      }</div>}
    {showTooltip && <div className={styles.tooltip}>Зарегистрируйтесь или войдите в профиль!</div>}
  </div>
}

export default LikeCollection
