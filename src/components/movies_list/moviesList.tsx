import React, { useEffect, useState } from 'react'

import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import api from '../../api/apiRequests'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useWindowDimensions } from '../../hooks/windowDimenstions'
import { type movie, type filterMovie } from '../../models/models'
import filmStore from '../../store/filmStore'
import MovieCard from '../movie_card/movieCard'

interface ChildComponentProps {
  type: string
}

const MoviesList = ({ type }: ChildComponentProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [moviesList, setMoviesList] = useState<movie[]>()

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      setIsLoading(true)

      const filmsFromStore = filmStore.getFilms(type)
      if ((filmsFromStore != null) && filmsFromStore.length > 0) {
        setMoviesList(filmsFromStore)
      } else {
        const res = await api.getMovies(type, 1)
        setMoviesList(res?.data?.films ?? res?.data?.items)
        console.log('renderMovieList')
        filmStore.setFilms(res?.data?.films ?? res?.data?.items, type)
      }

      setIsLoading(false)
    }
    getMovies().catch(err => { console.log(err) })
  }, [])

  useWindowDimensions()
  let numberMovies
  if (window.innerWidth > 600) {
    numberMovies = (window.innerWidth - window.innerWidth % 300) / 300
  } else {
    numberMovies = (window.innerWidth - window.innerWidth % 180) / 180
  }

  return (<>
    <Swiper modules={[Navigation]}
            navigation={true}
            slidesPerView={numberMovies}
            grabCursor={true}
            spaceBetween={10}>

      {isLoading
        ? (
          <div>Loading ...</div>
          )
        : (<>
          {moviesList?.map((item: movie | filterMovie, index) => (
            <SwiperSlide key={index}>
              <MovieCard item={item}/>
            </SwiperSlide>
          ))}
        </>)}
    </Swiper>
  </>)
}

export default MoviesList
