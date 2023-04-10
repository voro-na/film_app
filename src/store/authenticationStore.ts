import { ref, set, onValue, update } from 'firebase/database'
import { makeAutoObservable } from 'mobx'

import { db } from '../firebase'

interface user {
  email: string | null
  token: string | null
  id: string | null
}

interface movieCard {
  movieTitle: string
  movieUrl: string
}

type obj = Record<string, movieCard>

const initial: user = {
  email: null,
  token: null,
  id: null
}

class AuthenticationStore {
  name = 'user'
  initialState = initial
  // favoriteMovies: movieCard[] = []
  favoriteMovieCount = 0
  favoriteMovies: obj = {}

  constructor () {
    makeAutoObservable(this)
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

  addFavoriteMovie (movieTitle: string, movieUrl: string): void {
    const movie = {
      movieTitle,
      movieUrl
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
    const favoriteMoviesRef = ref(db, 'users/' + String(this.initialState.id))
    onValue(favoriteMoviesRef, (snapshot) => {
      const data = snapshot.val()
      this.favoriteMovies = data
      this.favoriteMovieCount = data.length()
    }
    )
  }
}

export default new AuthenticationStore()
