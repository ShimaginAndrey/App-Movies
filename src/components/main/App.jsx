import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";

import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import Header from "../Header/Header";

import { LocalStorage } from '../../utils/LocalStorage';

import { useDispatch, useSelector } from "react-redux";
import {getAuthAction} from '../../redux/auth/auth.actions';

const App = () => {
    const authInfo = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const session_id = LocalStorage.getItem('session_id');
        if (session_id) dispatch(getAuthAction(session_id));
    }, []);


    return (
        <BrowserRouter>
                <div>
                    <Header authInfo={authInfo}/>
                    <Routes>
                        <Route path="/" element={<MoviesPage/>}/>
                        <Route path="/movie/:id" element={<MoviePage/>}/>
                    </Routes>
                </div>
        </BrowserRouter>
    )
}

export default App;