import React, { useEffect, useRef, useState } from 'react'

import { useLocation } from 'react-router-dom'

import api from '../../api/apiRequests'
import Film from '../../components/film/film'
import Loader from '../../components/loader/loader'
import { type detailedFilmInfo } from '../../models/models'
import filmStore from '../../store/filmStore'

const FilmPage = (): JSX.Element => {
  const { state } = useLocation()
  const [filmInfo, setFilmInfo] = useState<detailedFilmInfo>()
  const [loading, setIsLoading] = useState<boolean>(false)
  const trailerUrl = useRef('')
  const directors = useRef<string[]>([])
  const actors = useRef<string[]>([])

  const fetchData = async (): Promise<void> => {
    const res = await api.getFilmInfo(state)
    trailerUrl.current = await filmStore.fetchTrailer(state)
    await filmStore.fetchActors(state)
    await filmStore.fetchSimilarMovies(state)
    directors.current = filmStore.getDirectors()
    actors.current = filmStore.getActors()
    setFilmInfo(res?.data)
  }
  useEffect(() => {
    setIsLoading(true)
    try {
      void fetchData()
    } finally {
      setIsLoading(false)
    }
  }, [])

  return <>{loading
    ? <Loader/>
    : ((filmInfo != null) && <Film film={filmInfo}
                                   trailer={trailerUrl.current}
                                   directors={directors.current}
                                   actors={actors.current}/>)}</>
}

export default FilmPage
