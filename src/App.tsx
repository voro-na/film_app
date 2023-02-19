import React from 'react';
import {FetchData} from './api/apiConfig'
import {BrowserRouter, Route} from "react-router-dom";

import MainRoutes from "./pages/Routes";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import './styles/main.scss'


function App() {
  return (
    <BrowserRouter>
            <Header/>
            <MainRoutes/>
            <Footer/>

    </BrowserRouter>
  );
}

export default App;
