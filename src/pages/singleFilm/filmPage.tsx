import React, { useEffect, useRef, useState } from 'react'

import { useParams } from 'react-router-dom'

import api from '../../api/apiRequests'
import Film from '../../components/film/film'
import Loader from '../../components/loader/loader'
import { type detailedFilmInfo } from '../../models/models'
import filmStore from '../../store/filmStore'

const FilmPage = (): JSX.Element => {
  const { id } = useParams()
  const filmId = Number(id)

  const [filmInfo, setFilmInfo] = useState<detailedFilmInfo>()
  const [loading, setIsLoading] = useState<boolean>(false)
  const trailerUrl = useRef('')
  const directors = useRef<string[]>([])
  const actors = useRef<string[]>([])

  const fetchData = async (): Promise<void> => {
    const res = await api.getFilmInfo(filmId)
    trailerUrl.current = await filmStore.fetchTrailer(filmId)
    await filmStore.fetchActors(filmId)
    await filmStore.fetchSimilarMovies(filmId)
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
  }, [filmId])

  return <>{loading
    ? <Loader/>
    : ((filmInfo != null) && <Film film={filmInfo}
                                   trailer={trailerUrl.current}
                                   directors={directors.current}
                                   actors={actors.current}/>)}</>
}

export default FilmPage
