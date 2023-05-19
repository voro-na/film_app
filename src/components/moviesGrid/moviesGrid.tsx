import React, { type FC } from 'react'

import { type movieCard, type movies } from '../../models/models'
import styles from '../../pages/movies/movies.module.scss'
import MovieCard from '../movieCard/movieCard'

interface props {
  movies: movies | movieCard[]
}
const MoviesGrid: FC<props> = (movies) => {
  return (<>
    <div className={styles.container}>
      <div className={styles.moviesPage}>
        {movies.movies?.map((item, index) => (
          <MovieCard nameRu={item.nameRu}
                     id={'filmId' in item ? item.filmId : item.kinopoiskId}
                     posterUrlPreview={item.posterUrl}
                     key={index}/>
        ))}
      </div>
    </div>
  </>)
}

export default MoviesGrid
