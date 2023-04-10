import React from 'react'

import { observer } from 'mobx-react-lite'

interface movieCard {
  movieTitle: string
  movieUrl: string
}

type obj = Record<string, movieCard>

const FavoriteMovies = observer(({ favoriteMovies }: { favoriteMovies: obj }): JSX.Element => {
  return <>
    <h1 className={'movies-page_title'}>Избранное</h1>
    <div className={'movies-page'}>
      {Object.values(favoriteMovies).map((item, index) => (

        <div className={'movie-card'} key={index}>
          <img className={'movie-card__image'} src={item.movieUrl} alt="poster"/>
          <div className={'movie-card__title'}>{item.movieTitle}</div>
        </div>
      ))}
    </div>
  </>
})

export default FavoriteMovies
