import { ref, set, onValue, update, remove } from 'firebase/database'
import { makeAutoObservable } from 'mobx'

import { db } from '../firebase'
import { type movieCard, type user } from '../models/models'

type obj = Record<string, movieCard>

const initial: user = {
  email: null,
  token: null,
  id: null
}

class AuthenticationStore {
  name = 'user'
  initialState = initial

  favoriteMovies: obj = {}
  ratedMovies: obj = {}

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

  addMovie (movieTitle: string, movieUrl: string, id: number, rating: number, type: string): void {
    if (this.favoriteMovies[movieTitle] !== undefined) {
      this.removeMovie(movieTitle, id, type)
    } else {
      const movie = {
        nameRu: movieTitle,
        posterUrl: movieUrl,
        kinopoiskId: id,
        rating
      }
      if (type === 'favoriteMovies' && this.favoriteMovies[movieTitle] === undefined) {
        this.favoriteMovies[movieTitle] = movie
        this.addMovieFirebase(movie, type)
      }
      if (type === 'ratedMovies') {
        this.ratedMovies[movieTitle] = movie
        this.addMovieFirebase(movie, type)
      }
    }
  }

  removeMovie (movieTitle: string, id: number, type: string): void {
    if (type === 'favoriteMovies') {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.favoriteMovies[movieTitle]
      this.removeMovieFirebase(id, type)
    }
    if (type === 'ratedMovies') {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.ratedMovies[movieTitle]
      this.removeMovieFirebase(id, type)
    }
  }

  addMovieFirebase (movie: any, type: string): void {
    const title = 'm' + String(movie.kinopoiskId)
    if (type === 'favoriteMovies') {
      void update(ref(db, 'users/' + String(this.initialState.id) + '/favorite-movies'), {
        [title]: movie
      })
    }
    if (type === 'ratedMovies') {
      void update(ref(db, 'users/' + String(this.initialState.id) + '/rated-movies'), {
        [title]: movie
      })
    }
  }

  removeMovieFirebase (movie: number, type: string): void {
    const title = 'm' + String(movie)
    if (type === 'favoriteMovies') {
      void remove(ref(db, 'users/' + String(this.initialState.id) + '/favorite-movies/' + title))
    }
    if (type === 'ratedMovies') {
      void remove(ref(db, 'users/' + String(this.initialState.id) + '/rated-movies/' + title))
    }
  }

  getRating (title: string): number | undefined {
    return this.ratedMovies[title]?.rating
  }

  getFavoriteMoviesFirebase (): void {
    const favoriteMoviesRef = ref(db, 'users/' + String(this.initialState.id) + '/favorite-movies')
    const ratedMoviesRef = ref(db, 'users/' + String(this.initialState.id) + '/rated-movies')
    onValue(favoriteMoviesRef, (snapshot) => {
      const data = snapshot.val()
      for (const key in data) {
        this.favoriteMovies[data[key].nameRu] = data[key]
      }
    })
    onValue(ratedMoviesRef, (snapshot) => {
      const data = snapshot.val()
      for (const key in data) {
        this.ratedMovies[data[key].nameRu] = data[key]
      }
    })
  }
}

export default new AuthenticationStore()
