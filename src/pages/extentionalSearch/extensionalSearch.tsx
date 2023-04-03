import React, { useEffect, useState } from 'react'

import './extensionalSearch.scss'
import { useNavigate } from 'react-router-dom'

import api from '../../api/apiRequests'
import { type county, type genre } from '../../models/models'

const filmType = [{
  id: 1,
  type: 'FILM'
}, {
  id: 2,
  type: 'TV_SERIES'
}, {
  id: 3,
  type: 'MINI_SERIES'
}]
let years = Array.from({ length: 100 }, (_, i) => i + 1925)
years = years.reverse()

const ExtensionalSearch = (): JSX.Element => {
  const [countries, setCountries] = useState<county[]>([])
  const [genres, setGenre] = useState<genre[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const getMovieId = async (): Promise<void> => {
      const res = await api.getMovieId()
      setCountries(res?.data?.countries)
      setGenre(res?.data?.genres)
    }
    getMovieId().catch(err => {
      console.log(err)
    })
  }, [])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {
      country: formData.get('country') as string,
      genre: formData.get('genre') as string,
      type: formData.get('type') as string,
      yearFrom: formData.get('yearFrom') as string,
      yearTo: formData.get('yearTo') as string,
      year: formData.get('year') as string,
      name: formData.get('name') as string,
      rateMin: formData.get('rateMin') as string,
      rateMax: formData.get('rateMax') as string
    }
    if (data.year !== '—') {
      data.yearTo = data.year
      data.yearFrom = data.year
    }
    const link = `v2.2/films?${((data?.country) !== '—') ? `countries=${data.country}` : ''}${
      ((data?.genre) !== '—') ? `&genres=${data.genre}` : ''}${
      ((data?.type) !== '—') ? `&type=${data.type}` : ''}&order=NUM_VOTE&ratingFrom=${
      ((data?.rateMin) !== '') ? data.rateMin : '0'}&ratingTo=${
      ((data?.rateMax) !== '') ? data.rateMax : '10'}&yearFrom=${
      data.yearFrom !== '—' ? data.yearFrom : 1000}&yearTo=${
      data.yearTo !== '—' ? data.yearTo : 3000}${
      ((data?.name) !== '') ? `&keyword=${data.name}` : ''}`
    console.log(link)
    navigate('/movies', { state: { link } })
  }

  return (<>
    <h1 className="title">Расширенный поиск</h1>
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="title">Искать фильм</h2>
      <label className="form__category" htmlFor="name">
        Название фильма
        <input type="text" name="name" className="form__input" placeholder="Введите название"/>
      </label>
      <label className="form__category" htmlFor="genre">
        Жанр
        <select id="genre" className="form__input" name="genre">
          <option value="—">—</option>
          {genres.map(item => <option value={item.id} key={item.id}>{item.genre}</option>)}
        </select>
      </label>
      <label className="form__category" htmlFor="country">
        Страна
        <select className="form__input" id="country" name="country">
          <option value="—">—</option>
          {countries.map(item => <option value={item.id} key={item.id}>{item.country}</option>)}
        </select>
      </label>
      <label className="form__category" htmlFor="type">
        Тип фильма
        <select name="type" id="type" className="form__input">
          <option value="—">—</option>
          {filmType.map(item => <option value={item.type} key={item.id}>{item.type}</option>)}
        </select>
      </label>
      Рейтинг
      <div className="form__row-section">
        <label className="form__category">
          от
          <input type="number" placeholder="0" name="rateMin" className="form__input"/>
        </label>
        <label className="form__category">
          до
          <input type="number" placeholder="10" name="rateMax" className="form__input"/>
        </label>
      </div>
      <label className="form__category" htmlFor="year">
        Год выпуска
        <input type="number" className="form__input" name="year"/>
      </label>
      Интервал
      <div className="form__row-section">
        <label className="form__category" htmlFor="year">
          с
          <select name="yearFrom" id="yearFrom" className="form__input">
            <option value="—">—</option>
            {years.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="form__category" htmlFor="year">
          по
          <select name="yearTo" id="yearTo" className="form__input">
            <option value="—">—</option>
            {years.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <input type="submit" value="ПОИСК" className="form__input"/>
    </form>
  </>)
}

export default ExtensionalSearch
