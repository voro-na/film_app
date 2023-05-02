import React, { type FC } from 'react'

import './movieCard.scss'

import { Link } from 'react-router-dom'

import Like from '../like/like'

interface propsType {
  nameRu: string
  posterUrlPreview: string
  id: number
}

const MovieCard: FC<propsType> = ({
  nameRu,
  posterUrlPreview,
  id
}) => {
  return <div className={'movie-card'}>
    <Link to={`/film/${id}`} state={id}>
      <img className={'movie-card__image'} src={posterUrlPreview} alt="poster" width={270} height={407}/>
    </Link>
    <Like nameRu={nameRu} posterUrlPreview={posterUrlPreview} id={id}/>
    <Link to={`/film/${id}`} state={id}>
      <div className={'movie-card__title'}>{nameRu}</div>
    </Link>

  </div>
}

export default MovieCard
