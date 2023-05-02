import { makeAutoObservable } from 'mobx'

import api from '../api/apiRequests'

interface actors {
  staffId: number
  nameRu: string
  nameEn: string
  description: string | null
  posterUrl: string
  professionText: string
  professionKey: string
}

interface filmType {
  actors: actors[]
}

class FilmStore {
  films = {
    popularFilms: [],
    bestFilms: [],
    bestSerials: [],
    awaitFilms: []
  }

  filmDetailes: filmType = {
    actors: []
  }

  constructor () {
    makeAutoObservable(this)
  }

  async fetchFilms (type: string, page = 1): Promise<void> {
    const res = await api.getMovies(type, page)
    this.setFilms(res?.data?.films ?? res?.data?.items, type)
  }

  async fetchPopularMovies (): Promise<void> {
    const res = await api.getPopularMovie()
    this.setFilms(res?.data?.films, 'POPULAR_FILMS')
  }

  async fetchTrailer (id: number): Promise<string> {
    const res = await api.getTrailer(id)
    return res?.data?.items[0]?.url
  }

  async fetchActors (id: number): Promise<void> {
    const res = await api.getActors(id)
    this.filmDetailes.actors = res?.data
  }

  // todo fix any
  setFilms (arr: any, type: string): void {
    switch (type) {
      case 'POPULAR_FILMS':
        this.films.popularFilms = arr
        break
      case 'TOP_SERIALS':
        this.films.bestSerials = arr
        break
      case 'TOP_250_BEST_FILMS':
        this.films.bestFilms = arr
        break
      case 'TOP_AWAIT_FILMS':
        this.films.awaitFilms = arr
        break
      default:
        break
    }
  }

  getFilms (type: string): any {
    switch (type) {
      case 'POPULAR_FILMS':
        return this.films.popularFilms
      case 'TOP_SERIALS':
        return this.films.bestSerials
      case 'TOP_250_BEST_FILMS':
        return this.films.bestFilms
      case 'TOP_AWAIT_FILMS':
        return this.films.awaitFilms
      default:
        break
    }
  }

  getDirectors (): string[] {
    return this.filmDetailes.actors.reduce((prev: any[], cur) => {
      if (cur.professionKey === 'DIRECTOR') {
        prev.push(cur.nameRu)
      }
      return prev
    }, [])
  }

  getActors (): string[] {
    return this.filmDetailes.actors.reduce((prev: any[], cur, index) => {
      if (cur.professionKey === 'ACTOR' && index <= 5) {
        prev.push(cur.nameRu)
      }
      return prev
    }, [])
  }

  getPersons (): actors[] {
    return this.filmDetailes.actors
  }
}

export default new FilmStore()
