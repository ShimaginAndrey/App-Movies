import React from "react";
import propTypes from "prop-types";

import MovieItem from './MovieItem';
import {withSubscriptionMovies} from './HOC/withSubscriptionMovies';

const MovieList = (props) => {
    const {stateMovies} = props;
    return (
        <div className="row">
            { stateMovies.map(movie => {
                return (
                    <div key={movie.id} className="col-6 mb-4">
                        <MovieItem item={movie}/>
                    </div>
                    )
                })
            }
        </div>
    )
};

MovieList.propTypes = {
    stateMovies: propTypes.array.isRequired
}

export default withSubscriptionMovies(MovieList);