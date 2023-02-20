import React, {useEffect, useState} from "react";
import api from "../../api/apiRequests";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper";
import "swiper/css";
// для модулей навигации и пагинации
import "swiper/css/navigation";
import "swiper/css/pagination";
import {moviesList, movie} from "../../models/models";
import SliderItem from "./sliderItem";
//todo refactor import

const Slider = () => {
    const [popularMovies, setPopularMovies] = useState<moviesList>();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        const getPopularMovies = async () => {
            setIsLoading(true);

            const res = await api.getPopularMovie();
            setPopularMovies(res?.data);
            setIsLoading(false);
        }
        getPopularMovies();

    }, [])


    const fetch = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(popularMovies)
    }

    return (
        <>
            {/*<button onClick={e => fetch(e)}>data</button>*/}
            <Swiper modules={[Navigation, Pagination]}
                    navigation={true}
                    // pagination={{clickable: true}}
                    slidesPerView={1}>
                {isLoading ? (
                        <div>Loading ...</div>
                    ) :
                    (<>
                        {popularMovies?.films.map((item: movie) => (
                            <SwiperSlide key={item.filmId}>
                                <SliderItem item={item}/>
                            </SwiperSlide>
                        ))}
                    </>)}
            </Swiper>
        </>
    )
}

export default Slider