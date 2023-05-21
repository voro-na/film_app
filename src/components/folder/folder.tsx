import React, { type FC, useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'

import styles from './folder.module.scss'
import { type movieCard } from '../../models/models'
import authenticationStore from '../../store/authenticationStore'
import MoviesGrid from '../moviesGrid/moviesGrid'

interface props {
  title: string
  id: string
  collection?: any
}

const Folder: FC<props> = observer(({
  title,
  id,
  collection
}) => {
  const [isOpen, setIsOpen] = useState(id === 'favoriteMovies')
  const [folderName] = useState(title)
  const [favoriteMovies, setFavoriteMovies] = useState<movieCard[]>([])
  const [collections, setCollections] = useState<any>([])
  useEffect(() => {
    setFavoriteMovies(Object.values(authenticationStore.favoriteMovies))
  }, [Object.keys(authenticationStore.favoriteMovies).length])
  useEffect(() => {
    if (collection !== undefined) {
      setCollections(Object.values(collection))
    }
  }, [typeof collection === 'object' && Object.keys(collection).length])

  const handleFolderClick = (): void => {
    setIsOpen(!isOpen)
  }
  const handleDeleteClick = (): void => {
    authenticationStore.removeCollectionFirebase(id)
  }
  return (
    <div className={styles.folderContainer}>
      <div className={styles.folder} >
        <div onClick={handleFolderClick}>{isOpen ? '▼' : '►'} {folderName}</div>
        {id !== 'favoriteMovies' && <i className="fa-solid fa-xmark" onClick={handleDeleteClick}></i>}
      </div>
      {isOpen && (
        <MoviesGrid movies={id === 'favoriteMovies' ? favoriteMovies : collections} folderId={id}/>
      )}
    </div>
  )
})

export default Folder
