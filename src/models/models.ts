export interface movie {
  countries: Array<{ country: string }>
  filmId: number
  filmLength: string
  genres: Array<{ genre: string }>
  nameEn: string
  nameRu: string
  posterUrl: string
  posterUrlPreview: string
  rating: string
  ratingChange: string | null
  ratingVoteCount: number
  year: string

}

export interface filterMovie {
  countries: Array<{ country: string }>
  genres: Array<{ genre: string }>
  nameEn: string
  nameRu: string
  posterUrl: string
  posterUrlPreview: string
  ratingVoteCount: number
  year: string
  imdbId: string
  kinopoiskId: number
  nameOriginal: string
  ratingImdb: number
  ratingKinopoisk: number
  type: string
}
export interface county {
  id: number
  country: string
}

export interface genre {
  id: number
  genre: string
}
export interface formData {
  name: string
  year: number
  genre: string
  country: string
  type: string
}
export type movies = movie[] | filterMovie[]
