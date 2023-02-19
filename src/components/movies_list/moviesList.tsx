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

interface ChildComponentProps {
    type: string;
}

const MoviesList = ({type}: ChildComponentProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [moviesList, setMoviesList] = useState<moviesList>();
    //todo window info in another file
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }

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
    let numberMovies = (window.innerWidth - window.innerWidth % 300) / 300;

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