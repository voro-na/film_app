import React, { type FC } from 'react'

import './movieCard.scss'

import { Link } from 'react-router-dom'

import Like from '../like/like'
import LikeCollection from '../likeCollection/likeCollection'
import Xmark from '../xmark/xmark'

interface propsType {
  nameRu: string
  posterUrlPreview: string
  id: number
  folderId?: string
}

const MovieCard: FC<propsType> = ({
  nameRu,
  posterUrlPreview,
  id,
  folderId
}) => {
  return <div className={'movie-card'}>
    <Link to={`/film/${id}`} state={id}>
      <img className={'movie-card__image'} src={posterUrlPreview} alt="poster" width={270} height={407}/>
    </Link>
    <div className={'icons'}>
      <Like nameRu={nameRu} posterUrlPreview={posterUrlPreview} id={id}/>
      <LikeCollection nameRu={nameRu} posterUrlPreview={posterUrlPreview} filmId={id}/>
      {folderId !== undefined && folderId?.length > 0 && <Xmark nameRu={nameRu} posterUrlPreview={posterUrlPreview} id={id} folderId={folderId}/>}
    </div>

    <Link to={`/film/${id}`} state={id}>
      <div className={'movie-card__title'}>{nameRu}</div>
    </Link>

  </div>
}

export default MovieCard
