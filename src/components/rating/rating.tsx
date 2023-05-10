import React, { useState, type FC, useEffect } from 'react'

import styles from './rating.module.css'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

interface propsType {
  nameRu: string
  posterUrlPreview: string
  id: number
}

const Rating: FC<propsType> = ({
  nameRu,
  posterUrlPreview,
  id
}) => {
  const [rating, setRating] = useState(0)
  const {
    isAuth
  } = useAuth()

  const [auth] = useState(isAuth)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const initialRating = authenticationStore.getRating(nameRu)
    setRating(initialRating ?? 0)
  }, [])

  const handleRatingChange = (value: number): void => {
    if (auth) {
      setRating(value)
      authenticationStore.addMovie(nameRu, posterUrlPreview, id, value, 'ratedMovies')
    } else {
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
    }
  }
  return (
    <div>
      <h2>Оцените фильм</h2>
      <div className={styles.ratingContainer}>
        {[...Array(10)].map((_, index) => {
          const ratingValue = index + 1
          return (
            <label key={ratingValue} className={ratingValue <= rating ? 'active' : ''}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onChange={() => {
                  handleRatingChange(ratingValue)
                }}
              />
              {ratingValue}
            </label>
          )
        })}
      </div>
      <p>Ваша оценка: {rating === 0 ? 'отсутствует' : rating}</p>
      {showTooltip && <div className={styles.tooltip}>Зарегистрируйтесь или войдите в профиль!</div>}
    </div>
  )
}

export default Rating
