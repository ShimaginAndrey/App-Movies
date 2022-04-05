import React, { useEffect,useState } from "react";
import {useParams } from "react-router-dom";
import { RequestApi } from "../../../api/api";
import { isEmptyObject } from "../../../utils/isEmpty";
import imgNone from '../../../img/no-film.jpg';

const MoviePage = (props) => {
    const [movie, setDataMovie] = useState({});
    const params = useParams();

    useEffect(() => {
        
        RequestApi.get(`/movie/${params.id}`)
        .then(data => setDataMovie(data))

    }, []);

    const imagePath = movie.backdrop_path || movie.poster_path;

    return (
        <div>
           <div className="container mt-5">
               { isEmptyObject(movie) ?
                <div className="row">
                   <div className="col">
                       <img className="img-movie" src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : imgNone} alt="" />
                   </div>
                   <div className="col fs-2 fw-bolder">{movie.title}
                       <div className="fs-5 fw-light"> ({movie.release_date})
                       {movie.genres?.map((item, index) => 
                            <span key={item.id}>{ (index ? "," : "") + item.name}</span>
                        )}
                       </div>
                       <h3 className="mt-3">Review</h3>
                       <p className="fs-3 fw-light">{movie.overview}</p>
                   </div>
                </div> 
                : 
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
               }
           </div>
        </div>
    )
}

export default MoviePage;