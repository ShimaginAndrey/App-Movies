import React, { useCallback } from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from './PrimaryReleaseYear';
import Genres from "./Genres";
import Pagination from './Pagination';

const Filters = (props) => {
    const {stateFilters: {sort_by, primary_release_year, with_genres}, setFilters } = props;
    const {page, setPage, countPage} = props;

    const onChangeFilters = useCallback( (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setFilters(
            {...props.stateFilters,
            [name]: value });
        setPage(1);
    }, []);

    return (
        <form className="mb-3">
            <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters}/>
            <PrimaryReleaseYear primary_release_year={primary_release_year} onChangeFilters={onChangeFilters}/>
            <Genres with_genres={with_genres} onChangeFilters={onChangeFilters} />
            <Pagination
                page={page}
                setPage={setPage}
                countPage={countPage}
            />
        </form>
    )
}

export default Filters;