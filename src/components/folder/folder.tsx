import React, { type FC, useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'

import styles from './folder.module.scss'
import { type movieCard } from '../../models/models'
import authenticationStore from '../../store/authenticationStore'
import MoviesGrid from '../moviesGrid/moviesGrid'

interface props {
  title: string
  id: string
}

const Folder: FC<props> = observer(({
  title,
  id
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [folderName] = useState(title)

  const [favoriteMovies, setFavoriteMovies] = useState<movieCard[]>([])
  useEffect(() => {
    setFavoriteMovies(Object.values(authenticationStore.favoriteMovies))
  }, [Object.values(authenticationStore.favoriteMovies)])

  const handleFolderClick = (): void => {
    setIsOpen(!isOpen)
  }
  return (
    <div className={styles.folderContainer}>
      <div className={styles.folder} onClick={handleFolderClick}>
        {isOpen ? '▼' : '►'} {folderName}
      </div>
      {isOpen && (
        <MoviesGrid movies={favoriteMovies}/>
      )}
    </div>
  )
})

export default Folder
