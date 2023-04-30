import React from 'react'

import './movieCard.scss'

import { Link } from 'react-router-dom'

import { type filterMovie, type movie } from '../../models/models'
import authenticationStore from '../../store/authenticationStore'

const MovieCard = ({ item }: { item: movie | filterMovie }): JSX.Element => {
  const addToFavorite = (item: string, posterUrl: string): void => {
    authenticationStore.addFavoriteMovie(item, posterUrl)
  }
  const id = 'filmId' in item ? item.filmId : item.kinopoiskId
  return <div className={'movie-card'}>
    <Link to={`/film/${id}`} state={id}>
      <img className={'movie-card__image'} src={item.posterUrlPreview} alt="poster" width={270} height={407}/>
    </Link>
    <i className="fa-solid fa-heart" onClick={() => { addToFavorite(item.nameRu, item.posterUrlPreview) }}/>
    <Link to={`/film/${id}`} state={id}>
      <div className={'movie-card__title'}>{item.nameRu}</div>
    </Link>

  </div>
}

export default MovieCard
