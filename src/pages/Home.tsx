import Slider from "../components/slider/slider";
import React from "react";
import styles from './home.module.scss'
import MoviesList from "../components/movies_list/moviesList";
import Button from "../components/button/button";

const Home: React.FC = () => {
    return (<div className={styles.container}>
            <h1 className={styles.title}>Популярные фильмы</h1>
            <Slider/>
            <div className={styles.movie_collection}>
                <div className={styles.list_header}>
                    <h1 className={styles.title}>Лучшие фильмы</h1>
                    <Button text={'Больше фильмов'} link = {'/movies'}/>
                </div>
                <MoviesList type="TOP_250_BEST_FILMS"/>
            </div>
            <div className={styles.movie_collection}>
                <div className={styles.list_header}>
                    <h1 className={styles.title}>Ожидаемые премьеры</h1>
                    <Button text={'Больше фильмов'} link = {'/'}/>
                </div>
                <MoviesList type="TOP_AWAIT_FILMS"/>
            </div>
            <div className={styles.movie_collection}>
                <div className={styles.list_header}>
                    <h1 className={styles.title}>Лучшие сериалы</h1>
                    <Button text={'Больше инф.'} link = {'/'}/>
                </div>
                {/*<MoviesList type="TOP_SERIALS"/>*/}
            </div>
        </div>
    )
}

export default Home