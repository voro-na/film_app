import React, { type FC, useEffect, useState } from 'react'

import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import styles from './personSlider.module.scss'
import { useWindowDimensions } from '../../hooks/windowDimenstions'
import filmStore from '../../store/filmStore'

interface actors {
  staffId: number
  nameRu: string
  nameEn: string
  description: string | null
  posterUrl: string
  professionText: string
  professionKey: string
}
interface props {
  id: number
}
const PersonSlider: FC<props> = (props) => {
  const [persons, setPersons] = useState<actors[]>([])

  useEffect(() => {
    setPersons(filmStore.getPersons())
  }, [props.id])

  useWindowDimensions()
  let numberMovies
  if (window.innerWidth > 600) {
    numberMovies = (window.innerWidth - window.innerWidth % 200) / 200
  } else {
    numberMovies = 4
  }

  return <div className={styles.slider}>
    <h1 className={styles.title}>Актёры и создатели</h1>
    <Swiper modules={[Navigation]}
            navigation={true}
            slidesPerView={numberMovies}
            grabCursor={true}
            spaceBetween={10}>

      {persons?.map((item, index) => (
        <SwiperSlide key={index}>
            <img src={item.posterUrl}
                 alt="poster-person"
                 width={100}
                 height={160}
                 className={styles.photo}/>
          <div>
            {item.nameRu}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
}

export default PersonSlider
