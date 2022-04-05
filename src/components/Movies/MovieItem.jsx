import React from "react";
import imgNone from '../../img/no-film.jpg';
import { Link } from "react-router-dom";

const MovieItem = (props) => {
    const {item} = props;
    const imagePath = item.backdrop_path || item.poster_path;

    return (
        <div className="card">
            <img 
            className="card-img-top card-img--height"
            src = {imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : imgNone}
            alt=""
            />
            <div className="card-body">
                <Link className="card-title" to={`/movie/${item.id}`}>{item.title}</Link>
                <div className="card-text">{item.vote_average}</div>
            </div>
        </div>  
    )
}

export default MovieItem;