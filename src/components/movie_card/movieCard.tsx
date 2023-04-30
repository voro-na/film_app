import React from 'react'

import './movieCard.scss'

import { Link } from 'react-router-dom'

import { type filterMovie, type movie } from '../../models/models'
import Like from '../like/like'

const MovieCard = ({ item }: { item: movie | filterMovie }): JSX.Element => {
  const id = 'filmId' in item ? item.filmId : item.kinopoiskId

  return <div className={'movie-card'}>
    <Link to={`/film/${id}`} state={id}>
      <img className={'movie-card__image'} src={item.posterUrlPreview} alt="poster" width={270} height={407}/>
    </Link>
    <Like nameRu={item.nameRu} posterUrlPreview={item.posterUrlPreview}/>
    <Link to={`/film/${id}`} state={id}>
      <div className={'movie-card__title'}>{item.nameRu}</div>
    </Link>

  </div>
}

export default MovieCard
