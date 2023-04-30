import React from 'react'
import { type FC } from 'react'

import styles from './film.module.scss'
import { type detailedFilmInfo } from '../../models/models'
import Like from '../like/like'

interface FilmProps {
  film: detailedFilmInfo
}

const Film: FC<FilmProps> = ({ film }) => {
  return <div className={styles.container}>
    <section className={styles.description_container}>
      <div className={styles.mainInfo}>
        <h1 className={styles.title}>{film.nameRu}</h1>
        <Like nameRu={film.nameRu} posterUrlPreview={film.posterUrl}/>
      </div>
      <div className={styles.shortInfo}>
        <span className={styles.shortInfo_rating}>{film.ratingKinopoisk ?? film.ratingAwait}</span>
        <span>{film.year}</span>
        <span>{film.countries[0].country}</span>
      </div>
      <p>{film.shortDescription ?? film.description}</p>

    </section>
    <img src={film.posterUrl}
         alt="poster"
         className={styles.poster}/>
  </div>
}

export default Film
