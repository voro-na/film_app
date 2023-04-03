import React from 'react'

import './home.scss'
import Button from '../../components/button/button'
import MoviesList from '../../components/movies_list/moviesList'
import Slider from '../../components/slider/slider'

const types = [
  {
    type: 'TOP_250_BEST_FILMS',
    text: 'Лучшие фильмы'
  },
  {
    type: 'TOP_AWAIT_FILMS',
    text: 'Ожидаемые премьеры'
  },
  {
    type: 'TOP_SERIALS',
    text: 'Лучшие сериалы'
  }
]

const Home: React.FC = () => {
  return (<div className={'home-page'}>
      <h1 className={'collection-title'}>Популярные фильмы</h1>
      <Slider/>
      {
        types.map((temp, index) => (
          <div className={'movies-collection'} key={index}>
            <div className={'movies-collection_header'}>
              <h1 className={'collection-title'}>{temp.text}</h1>
              <Button text={'Больше фильмов'} link={'/movies'} type={temp.type}/>
            </div>
            <MoviesList type={temp.type}/>
          </div>
        ))
      }

    </div>
  )
}

export default Home
