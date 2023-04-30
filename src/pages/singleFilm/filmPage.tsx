import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import api from '../../api/apiRequests'
import Film from '../../components/film/film'
import Loader from '../../components/loader/loader'
import { type detailedFilmInfo } from '../../models/models'

const FilmPage = (): JSX.Element => {
  const { state } = useLocation()
  const [filmInfo, setFilmInfo] = useState<detailedFilmInfo>()
  const [loading, setIsLoading] = useState<boolean>(false)

  const fetchData = async (): Promise<void> => {
    const res = await api.getFilmInfo(state)
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
    : ((filmInfo != null) && <Film film = {filmInfo}/>)}</>
}

export default FilmPage
