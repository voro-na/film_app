import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import './movies.scss'
import api from '../../api/apiRequests'
import { ButtonLoad } from '../../components/button/button'
import Input from '../../components/input/input'
import MovieCard from '../../components/movie_card/movieCard'
import { type movies } from '../../models/models'
import filmStore from '../../store/filmStore'

// todo movies / tvserials button fix
// todo load page from login page

const Movies = (): JSX.Element => {
  const [, setIsLoading] = useState<boolean>(false)
  const [moviesList, setMoviesList] = useState<movies>([])
  const [page, setPage] = useState<number>(1)
  const [input, setInput] = useState<string>('')

  const { state } = useLocation()

  const type = typeof state === 'string' ? state : 'EXTENSIONAL_SEARCH'
  const deleteNoPosterMovies = (arr: any[]): movies => {
    return arr.filter((item: { rating: string }) => item.rating !== 'null')
  }
  useEffect(() => {
    console.log('rerender movies')
    const getMovies = async (): Promise<void> => {
      setIsLoading(true)
      const filmsFromStore = filmStore.getFilms(type)
      if ((filmsFromStore != null) && filmsFromStore.length > 0) {
        setMoviesList(filmsFromStore)
      } else {
        const res = await api.getMovies(type, 1)
        setMoviesList(res?.data?.films ?? res?.data?.items)
        setMoviesList(deleteNoPosterMovies(moviesList))

        filmStore.setFilms(res?.data?.films ?? res?.data?.items, type)
      }
      setIsLoading(false)
    }
    const getMoviesByLink = async (): Promise<void> => {
      setIsLoading(true)
      setPage(1)
      const res = await api.getMovieByFilters(state.link, page)
      setMoviesList(res?.data?.items)
      setIsLoading(false)
    }
    if (type === 'EXTENSIONAL_SEARCH') {
      getMoviesByLink().catch(err => {
        console.log(err)
      })
    } else {
      getMovies().catch(err => {
        console.log(err)
      })
    }
  }, [state])

  const loadMore = async (): Promise<void> => {
    let res
    if (type === 'EXTENSIONAL_SEARCH') {
      res = await api.getMovieByFilters(state.link, page + 1)
    } else {
      res = await api.getMovies(state, page + 1)
    }
    // const res = await api.getMovies(state, page + 1)
    const newRes = res?.data?.films ?? res?.data?.items
    setMoviesList([...moviesList, ...newRes])
    setPage(page + 1)
  }
  const searchKeyWords = async (keyWord: string): Promise<void> => {
    const res = await api.getMovieByKeyword(keyWord)
    const newRes = res?.data?.films ?? res?.data?.items
    setMoviesList(deleteNoPosterMovies(newRes))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent): void => {
    e.preventDefault()
    if (input !== '') {
      void searchKeyWords(input)
      setInput('')
    }
  }

  return (<>
    <h1 className={'movies-page_title'}>ФИЛЬМЫ</h1>
    <Input handleSubmit={handleSubmit} input={input} setInput={setInput}/>

    <div className={'movies-page'}>
      {moviesList?.map((item, index) => (
        <MovieCard item={item} key={index}/>
      ))}
    </div>
    {moviesList.length >= 20 ? <ButtonLoad text={'Показать больше'} onClick={loadMore}/> : <></>}
  </>)
}

export default Movies
