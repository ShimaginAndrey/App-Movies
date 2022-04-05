import React, { useEffect, useState } from "react";
import {RequestApi} from '../../../api/api';

export const withSubscriptionMovies = (Component) => {
    return (props) => {
        const [stateMovies, setMovies] = useState([]);
        const {stateFilters: {sort_by, primary_release_year, with_genres}, page, setCountPage } = props;
    
        const queryStringParams = {
            language: "ru-RU",
            sort_by,
            page,
            primary_release_year,
        };  
    
        useEffect(() => {
            // TODO: ADD CATCH
            if (with_genres.length > 0) queryStringParams.with_genres = with_genres.join(",");
    
            RequestApi.get("/discover/movie", { 
                params:queryStringParams
            })
            .then(data => {
                setMovies(data.results);
                setCountPage(data.total_pages);
            })
            .catch(error => console.error(error));
        }, [props.stateFilters, page]);
    
        return (
            <Component stateMovies={stateMovies}/>
        )
    }
};