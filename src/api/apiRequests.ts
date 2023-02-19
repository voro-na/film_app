import FetchData from "./apiConfig";

const api = {
    getPopularMovie: () =>{
        return FetchData('films/top?type=TOP_100_POPULAR_FILMS&page=1')

    },
    getMovies: (type: string) =>{

        if (type ==='TOP_SERIALS')
            return FetchData(`//films?order=NUM_VOTE&type=TV_SERIES&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`)

        return FetchData(`films/top?type=${type}&page=1`);
    },
    getDetailedInfo : (id : number) =>{
        return FetchData(String(id));
    },
    getCoverImg: (id: number) =>{
        return FetchData(`films/${String(id)}/images?type=COVER&page=1`)
    }
}
export default api