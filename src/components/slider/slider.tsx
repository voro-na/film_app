import React, { useEffect, useState, memo } from 'react'

import { observer } from 'mobx-react-lite'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import SliderItem from './sliderItem'
import api from '../../api/apiRequests'
import 'swiper/css'
import 'swiper/css/navigation'
import { type movie } from '../../models/models'
import filmStore from '../../store/filmStore'
import Loader from '../loader/loader'

const Slider = observer(() => {
  const [popularMovies, setPopularMovies] = useState<movie[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async (): Promise<void> => {
    const res = await api.getPopularMovie()
    setPopularMovies(res?.data?.films)
    filmStore.setFilms(res?.data?.films, 'POPULAR_FILMS')
  }

  useEffect(() => {
    setIsLoading(true)

    const filmsFromStore = filmStore.getFilms('POPULAR_FILMS')
    if ((filmsFromStore != null) && filmsFromStore.length > 0) {
      setPopularMovies(filmsFromStore)
      setIsLoading(false)
    } else {
      try {
        void fetchData()
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  return (
    <>
      <Swiper modules={[Navigation]}
              navigation={true}
              slidesPerView={1}>
        {isLoading
          ? <Loader/>
          : (<>
            {popularMovies?.map((item: movie) => (
              <SwiperSlide key={item.filmId}>
                <SliderItem item={item}/>
              </SwiperSlide>
            ))}
          </>)}
      </Swiper>
    </>
  )
})

export default memo(Slider)
