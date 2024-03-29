import React, { type FC, useEffect, useState } from 'react'

import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import styles from './../personSlider/personSlider.module.scss'
import { useWindowDimensions } from '../../hooks/windowDimenstions'
import filmStore from '../../store/filmStore'
import MovieCard from '../movieCard/movieCard'

interface similarMovies {
  filmId: number
  nameRu: string
  posterUrlPreview: string
}

interface props {
  id: number
}

const SimilarMovies: FC<props> = (props) => {
  const [movies, setMovies] = useState<similarMovies[]>([])

  useEffect(() => {
    setMovies(filmStore.getSimilarMovies())
  }, [props.id])

  useWindowDimensions()
  let numberMovies
  if (window.innerWidth > 600) {
    numberMovies = (window.innerWidth - window.innerWidth % 200) / 200
  } else {
    numberMovies = 4
  }

  return (movies.length > 0
    ? <div className={styles.slider}>
    <h1 className={styles.title}>Похожие фильмы</h1>
    <Swiper modules={[Navigation]}
            navigation={true}
            slidesPerView={numberMovies}
            grabCursor={true}
            spaceBetween={10}>

      {movies?.map((item, index) => (
        <SwiperSlide key={index}>
          <MovieCard nameRu={item.nameRu}
                     posterUrlPreview={item.posterUrlPreview}
                     id={item.filmId}/>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
    : <></>)
}

export default SimilarMovies
