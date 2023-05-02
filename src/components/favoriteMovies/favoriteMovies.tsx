import React, { useState, type FC } from 'react'

import { observer } from 'mobx-react-lite'

import authenticationStore from '../../store/authenticationStore'
import MovieCard from '../movie_card/movieCard'

const FavoriteMovies: FC = observer(() => {
  const [favoriteMovies] = useState(authenticationStore.favoriteMovies)
  return <>
    <h1 className={'movies-page_title'}>Избранное</h1>
    <div className={'movies-page'}>
      {Object.values(favoriteMovies).map((item, index) => (
        <MovieCard nameRu={item.movieTitle} posterUrlPreview={item.movieUrl} id={item.id} key={index}/>
      ))}
    </div>
  </>
})

export default FavoriteMovies
