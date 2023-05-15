import React, { useCallback, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import './movies.scss'
import api from '../../api/apiRequests'
import { ButtonLoad } from '../../components/button/button'
import Input from '../../components/input/input'
import Loader from '../../components/loader/loader'
import MovieCard from '../../components/movieCard/movieCard'
import { type movies } from '../../models/models'
import filmStore from '../../store/filmStore'

// todo load page from login page

const Movies = (): JSX.Element => {
  const [, setIsLoading] = useState<boolean>(false)
  const [moviesList, setMoviesList] = useState<movies>([])
  const [page, setPage] = useState<number>(1)

  const { state } = useLocation()

  const type = typeof state === 'string' ? state : 'EXTENSIONAL_SEARCH'

  const deleteNoPosterMovies = (arr: any[]): movies => {
    return arr.filter((item: { rating: string }) => item.rating !== 'null')
  }

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      setIsLoading(true)
      const filmsFromStore = filmStore.getFilms(type)
      if ((filmsFromStore != null) && filmsFromStore.length > 0) {
        setMoviesList(filmsFromStore)
      } else {
        await filmStore.fetchFilms(type, 1)
        setMoviesList(deleteNoPosterMovies(filmStore.getFilms(type)))
        // const res = await api.getMovies(type, 1)
        // setMoviesList(res?.data?.films ?? res?.data?.items)
        // setMoviesList(deleteNoPosterMovies(moviesList))
        //
        // filmStore.setFilms(res?.data?.films ?? res?.data?.items, type)
      }
      setIsLoading(false)
    }
    const getMoviesByLink = async (): Promise<void> => {
      setPage(1)
      const res = await api.getMovieByFilters(state.link, page)
      setMoviesList(res?.data?.items)
    }
    setIsLoading(true)
    if (type === 'EXTENSIONAL_SEARCH') {
      // getMoviesByLink().catch(err => err)
      try {
        void getMoviesByLink()
      } finally {
        setIsLoading(false)
      }
    } else {
      try {
        void getMovies()
      } finally {
        setIsLoading(false)
      }
      // getMovies().catch(err => err)
    }
  }, [state])

  const loadMore = useCallback(async (): Promise<void> => {
    let res
    if (type === 'EXTENSIONAL_SEARCH') {
      res = await api.getMovieByFilters(state.link, page + 1)
    } else {
      res = await api.getMovies(state, page + 1)
    }

    const newRes = res?.data?.films ?? res?.data?.items
    setMoviesList([...moviesList, ...newRes])
    setPage(page + 1)
  }, [moviesList])

  return (<>
    <h1 className={'movies-page_title'}>ФИЛЬМЫ</h1>
    <Input/>
    {moviesList.length !== 0
      ? <>
        <div className={'movies-page'}>
          {moviesList?.map((item, index) => (
            <MovieCard nameRu={item.nameRu}
                       id={'filmId' in item ? item.filmId : item.kinopoiskId}
                       posterUrlPreview={item.posterUrlPreview}
                       key={index}/>
          ))}
        </div>
        {moviesList.length >= 20 ? <ButtonLoad text={'Показать больше'} onClick={loadMore}/> : <></>}
      </>
      : <Loader/>
    }

  </>)
}

export default Movies
