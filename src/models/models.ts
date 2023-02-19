export interface movie {
    countries: Array<{country: string}>,
    filmId: number,
    filmLength: string,
    genres: Array<{genre: string}>,
    nameEn: string,
    nameRu: string,
    posterUrl: string,
    posterUrlPreview: string,
    rating: string,
    ratingChange: string | null,
    ratingVoteCount: number,
    year: string

}
export interface filterMovie{
    countries: Array<{country: string}>,
    genres: Array<{genre: string}>,
    nameEn: string,
    nameRu: string,
    posterUrl: string,
    posterUrlPreview: string,
    ratingVoteCount: number,
    year: string,
    imdbId:string,
    kinopoiskId: number,
    nameOriginal: string,
    ratingImdb: number,
    ratingKinopoisk: number,
    type: string
}
export interface filterMovieList{
    items: Array<filterMovie>,
    totalPages: number,
    total: number

}
export interface moviesList extends movie{
    pagesCount: number,
    films: Array<movie>
}
