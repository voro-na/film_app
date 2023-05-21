import React, { useCallback, useEffect, useState } from 'react'

import cn from 'classnames'
import { Navigate } from 'react-router-dom'

import styles from './profile.module.scss'
import Folder from '../../components/folder/folder'
import useAuth from '../../hooks/useAuth'
import authenticationStore from '../../store/authenticationStore'

interface foldersType {
  title: string
  id: string
}

const Profile = (): JSX.Element => {
  const {
    isAuth,
    email
  } = useAuth()

  const [auth, setAuth] = useState(isAuth)
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState<string>('')
  const [folders, setFolders] = useState<foldersType[]>([])
  const [collections, setCollections] = useState<any>({})
  useEffect(() => {
    authenticationStore.setUserFromLocalStore()
    if (authenticationStore.favoriteMovies !== null && isAuth) {
      authenticationStore.getFavoriteMoviesFirebase()
    }
    authenticationStore.getCollectionsFirebase()
    authenticationStore.getCollectionsItemsFirebase()
    setFolders(Object.values(authenticationStore.foldersName))
    setCollections(authenticationStore.folders)
  }, [])

  useEffect(() => {
    setFolders(Object.values(authenticationStore.foldersName))
  }, [Object.keys(authenticationStore.foldersName).length])

  const logOut = useCallback((): void => {
    authenticationStore.removeUser()
    authenticationStore.removeFavoriteMovies()
    localStorage.clear()
    setAuth(prevState => !prevState)
  }, [])

  const handleFolderClick = useCallback((): void => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const addNewFolder = useCallback((): void => {
    if (input !== '') {
      authenticationStore.addFolder(input)
    }
    setInput('')
  }, [input])

  return auth
    ? (<div className={styles.container}>
      <h1 className={'movies-page_title'}>Welcome {email}</h1>
      <div className={styles.newFolder_block}>
        <button onClick={handleFolderClick} className={styles.folder}>Создать новую коллекцию фильмов</button>
        {isOpen && (
          <>
            <input type="text"
                   placeholder="Название коллекции"
                   className={styles.input}
                   value={input}
                   onChange={e => {
                     setInput(e.target.value)
                   }}/>
            <button className={styles.folder} onClick={addNewFolder}>Добавить</button>
          </>

        )}
      </div>
      <Folder title="Избранное" id="favoriteMovies"/>
      {folders.map((temp) => (
        <Folder title={temp.title} id={temp.id} key={temp.id} collection={collections[`${temp.id}`]}/>))}
      <button onClick={logOut} className={cn('button', 'center_btn')}>Выйти из профиля</button>
    </div>)
    : (
      <Navigate to="/login"/>)
}
export default Profile
