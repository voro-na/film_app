import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import api from '../../api/apiRequests'
import { type detailedFilmInfo } from '../../models/models'

const FilmPage = (): JSX.Element => {
  const { state } = useLocation()
  const [filmInfo, setFilmInfo] = useState<detailedFilmInfo>()

  const fetchData = async (): Promise<void> => {
    const res = await api.getFilmInfo(state)
    setFilmInfo(res?.data)
  }
  useEffect(() => {
    fetchData().catch(err => err)
  }, [])

  return <>{filmInfo?.nameRu}</>
}

export default FilmPage
