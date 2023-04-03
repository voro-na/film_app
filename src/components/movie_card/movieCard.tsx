import React from 'react'

import './movieCard.scss'
import { type filterMovie, type movie } from '../../models/models'

const MovieCard = ({ item }: { item: movie | filterMovie }): JSX.Element => {
  return <div className={'movie-card'}>
    <img className={'movie-card__image'} src={item.posterUrlPreview} alt="poster"/>
    <div className={'movie-card__title'}>{item.nameRu}</div>
  </div>
}

export default MovieCard
