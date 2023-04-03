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

const Slider = observer(() => {
  const [popularMovies, setPopularMovies] = useState<movie[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getPopularMovies = async (): Promise<void> => {
      setIsLoading(true)

      const filmsFromStore = filmStore.getFilms('POPULAR_FILMS')
      if ((filmsFromStore != null) && filmsFromStore.length > 0) {
        setPopularMovies(filmsFromStore)
      } else {
        const res = await api.getPopularMovie()
        setPopularMovies(res?.data?.films)
        console.log('render slider')
        filmStore.setFilms(res?.data?.films, 'POPULAR_FILMS')
      }

      setIsLoading(false)
    }
    getPopularMovies().catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <Swiper modules={[Navigation]}
              navigation={true}
              slidesPerView={1}>
        {isLoading
          ? (
            <div>Loading ...</div>
            )
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
