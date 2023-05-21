import React, { type FC } from 'react'

import styles from './moviesGrid.module.scss'
import { type movieCard, type movies } from '../../models/models'
import MovieCard from '../movieCard/movieCard'

interface props {
  movies: movies | movieCard[]
  folderId?: string
}

const MoviesGrid: FC<props> = ({
  movies,
  folderId
}) => {
  return (<>
    <div className={styles.container}>
      <div className={styles.moviesPage}>
        {movies?.map((item, index) => (
          <MovieCard nameRu={item.nameRu}
                     id={'filmId' in item ? item.filmId : item.kinopoiskId}
                     posterUrlPreview={item.posterUrl}
                     folderId={folderId ?? ''}
                     key={index}/>
        ))}
      </div>
    </div>
  </>)
}

export default MoviesGrid
