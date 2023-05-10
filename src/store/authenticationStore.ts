import { ref, set, onValue, update } from 'firebase/database'
import { makeAutoObservable } from 'mobx'

import { db } from '../firebase'
import {movieCard, user} from "../models/models";

type obj = Record<string, movieCard>

const initial: user = {
  email: null,
  token: null,
  id: null
}

class AuthenticationStore {
  name = 'user'
  initialState = initial
  favoriteMovieCount = 0
  favoriteMovies: obj = {}

  constructor () {
    makeAutoObservable(this)
  }

  setUserFromLocalStore (): void {
    const jsonStr = localStorage.getItem('logged')
    if (jsonStr != null) {
      const loggedUser = JSON.parse(jsonStr)
      this.initialState.email = loggedUser.email
      this.initialState.id = loggedUser.id
      this.initialState.token = loggedUser.token
    }
  }

  setUser (action: user): void {
    this.initialState.email = action.email
    this.initialState.token = action.token
    this.initialState.id = action.id
  }

  setUserFirebase (): void {
    void set(ref(db, 'users/' + String(this.initialState.id)), {
      username: this.name,
      email: this.initialState.email
    })
  }

  removeUser (): void {
    this.initialState.email = null
    this.initialState.token = null
    this.initialState.id = null
  }

  removeFavoriteMovies (): void {
    this.favoriteMovies = {}
  }

  addFavoriteMovie (movieTitle: string, movieUrl: string, id: number): void {
    const movie = {
      movieTitle,
      movieUrl,
      id
    }
    if (this.favoriteMovies[movieTitle] === undefined) {
      this.favoriteMovies[movieTitle] = (movie)
      this.addFavoriteMovieFirebase(movie)
    }
  }

  addFavoriteMovieFirebase (movie: any): void {
    const title = 'm' + String(this.favoriteMovieCount++)
    void update(ref(db, 'users/' + String(this.initialState.id) + '/favorite-movies'), {
      [title]: movie
    })
  }

  getFavoriteMoviesFirebase (): void {
    const favoriteMoviesRef = ref(db, 'users/' + String(this.initialState.id) + '/favorite-movies')
    onValue(favoriteMoviesRef, (snapshot) => {
      const data = snapshot.val()
      this.favoriteMovieCount = Object.keys(data).length
      for (const key in data) {
        this.favoriteMovies[data[key].movieTitle] = data[key]
      }
    })
  }
}

export default new AuthenticationStore()
