import React, {useEffect, useState} from "react";
import api from "../../api/apiRequests";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation} from "swiper";
import "swiper/css";
// для модулей навигации и пагинации
import "swiper/css/navigation";
import "swiper/css/pagination";
import {movie, moviesList, filterMovie,filterMovieList} from "../../models/models";

import MovieCard from "../movie_card/movieCard";
import {useWindowDimensions} from "../../functions/windowDimenstions";

interface ChildComponentProps {
    type: string;
}

const MoviesList = ({type}: ChildComponentProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [moviesList, setMoviesList] = useState<moviesList>();

    useEffect(() => {
        const getMovies = async () => {
            setIsLoading(true);

            const res = await api.getMovies(type);
            setMoviesList(res?.data);
            console.log(res)
            setIsLoading(false);
        }
        getMovies();

    }, [])

    useWindowDimensions();
    let numberMovies;
    if (window.innerWidth > 600)
        numberMovies = (window.innerWidth - window.innerWidth % 300) / 300;
    else
        numberMovies = (window.innerWidth - window.innerWidth % 200) / 200;

    return (<>
        <Swiper modules={[Navigation]}
                navigation={true}
                slidesPerView={numberMovies}
                grabCursor={true}
                spaceBetween={10}>

            {isLoading ? (
                    <div>Loading ...</div>
                ) :
                (<>
                    {moviesList?.films.map((item: movie) => (
                        <SwiperSlide key={item.filmId}>
                            <MovieCard item={item}/>
                        </SwiperSlide>
                    ))}
                </>)}
        </Swiper>
    </>)
}

export default MoviesList