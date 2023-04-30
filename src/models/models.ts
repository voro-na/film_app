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
export interface detailedFilmInfo {
  kinopoiskId: number
  nameRu: string
  nameEn: string
  posterUrl: string
  coverUrl: string
  reviewsCount: number
  ratingGoodReview: number
  ratingKinopoisk: number | null
  ratingKinopoiskVoteCount: number
  ratingImdb: number
  ratingAwait?: number
  year: number
  filmLength: number
  slogan: string
  description: string
  shortDescription: string

  ratingMpaa: string
  ratingAgeLimits: string
  countries: Array<{ country: string }>
  genres: Array<{ genre: string }>

}
export type movies = movie[] | filterMovie[]
