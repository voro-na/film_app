import React from 'react'

import './sliderItem.scss'
import { type movie } from '../../models/models'
import Button from '../button/button'
// todo obj in props
const SliderItem = (props: { item: movie }): JSX.Element => {
  const movie: movie = props.item

  return <div className={'slider-film'} style={{
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.8) 100%),
            url(${movie.posterUrl})`
  }}>
    <div className={'slider-film__text-description'}>
      <div className={'slider-film__main-info'}>
        <div className={'slider-film__main-info_title'}>{movie.nameRu}</div>
        <div className={'slider-film__main-info_rating'}>{(movie.rating !== '') ? movie.rating : 'Нет оценок'}</div>
      </div>
      <table>
        <tbody>
        <tr className={'slider-film__addition-info'}>
          <td>Год производства</td>
          <td className={'slider-film__addition-info_text'}>{movie.year}</td>
        </tr>
        <tr className={'slider-film__addition-info'}>
          <td>Страна</td>
          <td className={'slider-film__addition-info_text_bold'}>
            {movie.countries.map((item, index) => (
              <div className={'slider-film__addition-info_text'} key={index}>{item.country}</div>
            ))}
          </td>
        </tr>
        <tr className={'slider-film__addition-info'}>
          <td>Жанр</td>
          <td className={'slider-film__addition-info_text_bold'}>
            {movie.genres.map((item, index) => (
              <div className={'slider-film__addition-info_text'} key={index}>{item.genre}</div>
            ))}
          </td>
        </tr>

        </tbody>
        <tfoot>
        <tr>
          <td>
            <Button text={'Подробнее о фильме'} link={`/film/${movie.filmId}`} type={String(movie.filmId)}/>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <img className={'slider-film_poster'} src={movie.posterUrl} alt={movie.nameRu}/>
  </div>
}

export default SliderItem
