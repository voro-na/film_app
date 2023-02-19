import React from "react";
import {
    Route,
    Routes,
} from "react-router-dom";
import Home from "./Home";
import Movies from "./movies";


const MainRoutes = () => {

    return <Routes>
        <Route path='*' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path = '/movies' element={<Movies/>}/>
    </Routes>

}

export default MainRoutes