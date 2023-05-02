import React, { type FC, useCallback } from 'react'

import authenticationStore from '../../store/authenticationStore'

interface propsType {
  nameRu: string
  posterUrlPreview: string
  id: number
}

const Like: FC<propsType> = ({
  nameRu,
  posterUrlPreview,
  id
}) => {
  const addToFavorite = useCallback(() => {
    authenticationStore.addFavoriteMovie(nameRu, posterUrlPreview, id)
  }, [nameRu, posterUrlPreview])
  return <i className="fa-solid fa-heart"
            onClick={addToFavorite}/>
}

export default Like
