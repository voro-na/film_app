import { makeAutoObservable } from 'mobx'

class FilmStore {
  films = {
    popularFilms: [],
    bestFilms: [],
    bestSerials: [],
    awaitFilms: []
  }

  constructor () {
    makeAutoObservable(this)
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
}

export default new FilmStore()
