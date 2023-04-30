import FetchData from './apiConfig'

const api = {
  getPopularMovie: async () => {
    return await FetchData('v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1')
  },
  getMovies: async (type: string, page: number) => {
    if (type === 'TOP_SERIALS') {
      return await FetchData(`v2.2/films?order=NUM_VOTE&type=TV_SERIES&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`)
    }
    if (type.length > 20) {
      return await FetchData(type)
    }
    return await FetchData(`v2.2/films/top?type=${type}&page=${page}`)
  },
  getMovieByKeyword: async (keyWord: string) => {
    return await FetchData(`v2.1/films/search-by-keyword?keyword=${keyWord}&page=1`)
  },
  getMovieId: async () => {
    return await FetchData('v2.2/films/filters')
  },
  getFilmInfo: async (id: number) => {
    return await FetchData(`v2.2/films/${id}`)
  },
  getMovieByFilters: async (link: string, page: number) => {
    return await FetchData(`${link}&page=${page}`)
  }

}
export default api
