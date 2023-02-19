import {useEffect, useState} from "react";
import api from "../api/apiRequests";
import {moviesList} from "../models/models";
import MovieCard from "../components/movie_card/movieCard";
import styles from './movies.module.scss'

const Movies = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [moviesList, setMoviesList] = useState<moviesList>();

    useEffect(() => {
        const getMovies = async () => {
            setIsLoading(true);

            const res = await api.getMovies('TOP_250_BEST_FILMS');
            setMoviesList(res?.data);
            console.log(res)
            setIsLoading(false);
        }
        getMovies();

    }, [])

    return (<>
        <h1 className={styles.title}>Movies</h1>
        <input/>
        <div className={styles.container}>
            {moviesList?.films.map((item) => (
                <MovieCard item={item} key={item.filmId}/>
            ))}
        </div>

    </>)
}

export default Movies