import React, { useState, useEffect } from "react";
import {AppContext} from '../../context/context';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";

import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import Header from "../Header/Header";

import { RequestApi } from "../../api/api";
import { LocalStorage } from '../../utils/LocalStorage';

import { useDispatch, useSelector } from "react-redux";
import {updateAuthAction, toLogOutAction} from '../../redux/auth/auth.actions';

const App = () => {
    const authInfo = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const session_id = LocalStorage.getItem('session_id');
        if (session_id) {
            RequestApi.get('/account', {
                params: {session_id}
            })
            .then(user =>  updateAuth(user, session_id))
            .catch(error => console.error(error))
        }
    }, []);

    const updateAuth = (user, session_id) => {
        dispatch(updateAuthAction({
            user,
            session_id
        }));
    };

    const LogOut = () => {
        dispatch(toLogOutAction());
    };

    return (
        <BrowserRouter>
            <AppContext.Provider value={{
                updateAuth,
                LogOut
            }}>
                <div>
                    <Header authInfo={authInfo}/>
                    <Routes>
                        <Route path="/" element={<MoviesPage/>}/>
                        <Route path="/movie/:id" element={<MoviePage/>}/>
                    </Routes>
                </div>
            </AppContext.Provider>
        </BrowserRouter>
    )
}

export default App;