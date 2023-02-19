import {movie} from "../../models/models";
import styles from "./movieCard.module.scss";
import React from "react";

const MovieCard = ({item}: {item: movie}) =>{
    return <div className={styles.container}>
        <img className={styles.img} src={item.posterUrlPreview}/>
        <div className={styles.title}>{item.nameRu}</div>
    </div>
}

export default MovieCard