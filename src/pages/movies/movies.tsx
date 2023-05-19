import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useLocation } from 'react-router-dom'

import styles from './movies.module.scss'
import api from '../../api/apiRequests'
import { ButtonLoad } from '../../components/button/button'
import Loader from '../../components/loader/loader'
import MoviesGrid from '../../components/moviesGrid/moviesGrid'
import { type movies } from '../../models/models'
import filmStore from '../../store/filmStore'

const Movies = (): JSX.Element => {
  const [, setIsLoading] = useState<boolean>(false)
  const [moviesList, setMoviesList] = useState<movies>([])
  const [page, setPage] = useState<number>(1)

  const { state } = useLocation()
  const title = useRef<string>()

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
      title.current = `Результаты поиска по запросу: "${String(state.title)}"`
      try {
        void getMoviesByLink()
      } finally {
        setIsLoading(false)
      }
    } else {
      title.current = 'ФИЛЬМЫ'
      try {
        void getMovies()
      } finally {
        setIsLoading(false)
      }
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
    <h1 className={styles.moviesPage_title}>{title.current}</h1>

    {moviesList.length !== 0
      ? <div>
      < MoviesGrid movies={moviesList}/>
      { moviesList.length >= 20 ? <ButtonLoad text={'Показать больше'} onClick={loadMore}/> : <></> }
      </div>
      : <Loader/>
    }

  </>)
}

export default Movies
