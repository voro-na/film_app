import React, { type FC } from 'react'

import cn from 'classnames'

import styles from './film.module.scss'
import { type detailedFilmInfo } from '../../models/models'
import Like from '../like/like'
import PersonSlider from '../personSlider/personSlider'
import SimilarMovies from '../similarMovies/similarMovies'

interface FilmProps {
  film: detailedFilmInfo
  trailer: string
  directors: string[]
  actors: string[]
}

const Film: FC<FilmProps> = ({
  film,
  trailer,
  directors,
  actors
}) => {
  return <div className={styles.container}>
    <div className={styles.grid_container}>
      <section className={styles.description_container}>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>{film.nameRu}</h1>
          <Like nameRu={film.nameRu} posterUrlPreview={film.posterUrl} id={film.kinopoiskId}/>
        </div>

        <div className={styles.shortInfo}>
          <span className={styles.shortInfo_rating}>{film.ratingKinopoisk ?? film.ratingAwait}</span>
          <span>{film.year}</span>
          <span>{film.countries[0].country}</span>
        </div>

        <p className={styles.description}>{film.shortDescription ?? ''}</p>
        <div className={styles.info_block}>
          <span className={styles.description}>Режиссер: </span>
          {directors.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className={styles.info_block}>
          <span className={styles.description}>Актеры: </span>
          {actors.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}
        </div>

        <a className={cn('button', styles.button)} href={trailer} target="_blank" rel="noopener noreferrer">
          {(trailer !== undefined) ? 'Трейлер' : 'Трейлер недоступен'}</a>

        <h3 className={styles.title_blue}>Описание</h3>
        <p className={styles.description}>{film.description}</p>

      </section>
      <img src={film.posterUrl}
           alt="poster"
           className={styles.poster}
           width={450}
           height={670}/>
    </div>
    <SimilarMovies/>
    <PersonSlider/>
  </div>
}

export default Film
