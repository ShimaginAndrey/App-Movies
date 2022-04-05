import React, { useState } from "react";

import Filters from '../../Filters/Filters';
import MoviesList from "../../Movies/MovieList";

const MoviesPage = () => {

    const [stateFilters, setFilters] = useState({
        sort_by: 'popularity.desc',
        primary_release_year: "2022",
        with_genres: [],
    });

    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState('');

    return (
        <div>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card w-100">
                            <div className="card-body">
                                <h3>Фильтры:</h3>
                                <Filters
                                    page={page}
                                    setPage={setPage}
                                    countPage={countPage}
                                    stateFilters={stateFilters} 
                                    setFilters={setFilters}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList 
                            page={page} 
                            setPage={setPage}
                            setCountPage={setCountPage}
                            stateFilters={stateFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoviesPage;