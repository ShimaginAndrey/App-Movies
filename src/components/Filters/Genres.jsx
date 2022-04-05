import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { RequestApi } from "../../api/api";

const Genres = React.memo((props) => {
    const [stateGenresList, setGenresList] = useState([]);
    const {with_genres, onChangeFilters} = props;

    useEffect(() => {
        RequestApi.get('/genre/movie/list', {
            params:{language: "ru-RU"}
        })
            .then(data => setGenresList(data.genres))
            .catch(error => console.log(error))
    }, []);

    const onChangeGenres = (event) => {
        onChangeFilters({
            target: {
                name: 'with_genres',
                value:  event.target.checked 
                ? [...with_genres, event.target.value] 
                :  with_genres.filter(genre => genre !== event.target.value)
            }
        });
    };

    const onResetGenres = () => {
        onChangeFilters({
            target: {
                name: "with_genres",
                value: []
            }
        });
    };

    return (
        <React.Fragment>
            <div>
            <button 
                type="button" 
                className="btn btn-outline-primary mb-2"
                onClick={onResetGenres}
            >
                Показать все жанры
            </button>
            </div>
            {stateGenresList.map(genre => (
                <div key={genre.id} className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="with_genres"
                        value={genre.id}
                        id={`genre${genre.id}`}
                        onChange={onChangeGenres}
                        checked= {with_genres.includes(String(genre.id))}
                    />
                    <label className="form-check-label" htmlFor={`genre${genre.id}`}>
                        {genre.name}
                    </label>
                </div>
            ))}
        </React.Fragment>
    )
});

Genres.propTypes = {
    with_genres: PropTypes.array.isRequired,
    onChangeFilters: PropTypes.func.isRequired
}

export default Genres;