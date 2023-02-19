import {movie} from "../../models/models";
import React, {useState} from "react";
import styles from "./sliderItem.module.scss";
import Button from "../button/button";

const SliderItem = (props: { item: movie }) => {

    const movie: movie = props.item;

    //const [detailedInfo, setDetailedInfo] = useState<any>();


    // useEffect(() =>{
    //     const getDetailedIngo = async (id: number) =>{
    //         const res = await api.getDetailedInfo(id);
    //
    //         setDetailedInfo(res?.data);
    //     }
    //     getDetailedIngo(movie.filmId);
    // }, [movie])

    //const detailedInfo = getDateiledIngo(movie.filmId);
    // if (props?.active){
    //     api.getDetailedInfo(movie.filmId).then(res => setDetailedInfo(res))
    // }

    //console.log(detailedInfo);
    return <div className={styles.container} style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.8) 100%),
            url(${movie.posterUrl})`
    }}>
        <div className={styles.text_container}>
            <div className={styles.main_info}>
                <div className={styles.title}>{movie.nameRu}</div>
                <div className={styles.rating}>{movie.rating ? movie.rating : 'Нет оценок'}</div>
            </div>
            <table>
                <tbody>
                <tr className={styles.list_info}>
                    <td>Год производства</td>
                    <td className={styles.list_info_data}>{movie.year}</td>
                </tr>
                <tr className={styles.list_info}>
                    <td>Страна</td>
                    <td className={styles.list_info_bold}>
                        {movie.countries.map((item, index) => (
                            <div className={styles.list_info_data} key={index}>{item.country}</div>
                        ))}
                    </td>
                </tr>
                <tr className={styles.list_info}>
                    <td>Жанр</td>
                    <td className={styles.list_info_bold}>
                        {movie.genres.map((item, index) => (
                            <div className={styles.list_info_data} key={index}>{item.genre}</div>
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>
            <Button text={'Подробнее о фильме'}/>
        </div>
        <img className={styles.poster} src={movie.posterUrl} alt={movie.nameRu}/>
    </div>
}

export default SliderItem