import React from 'react'

import './movieCard.scss'
import { type filterMovie, type movie } from '../../models/models'
import authenticationStore from '../../store/authenticationStore'

const MovieCard = ({ item }: { item: movie | filterMovie }): JSX.Element => {
  const addToFavorite = (item: string, posterUrl: string): void => {
    authenticationStore.addFavoriteMovie(item, posterUrl)
  }
  return <div className={'movie-card'}>
    <img className={'movie-card__image'} src={item.posterUrlPreview} alt="poster"/>
    <i className="fa-solid fa-heart" onClick={() => { addToFavorite(item.nameRu, item.posterUrl) }}/>
    <div className={'movie-card__title'}>{item.nameRu}</div>
  </div>
}

export default MovieCard
