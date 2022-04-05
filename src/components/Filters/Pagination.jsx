import React from "react";

const Pagination = (props) => {
    const {page, setPage, countPage} = props;

    return (
        <nav className="d-flex align-items-center">
            <ul className="pagination mb-0 mr-3">
                <li className={ `page-item ${page === 1 ? 'disabled' : ''}`}>
                    <span className="page-link cursor-pointer" onClick={() => setPage( prevPage => prevPage-1)}>
                    Назад
                    </span>
                </li>
                <li className={ `page-item ${page === countPage ? 'disabled' : ''}`}>
                    <span className="page-link cursor-pointer" onClick={() =>  setPage( prevPage => prevPage+1)}>
                    Вперед
                    </span>
                </li>
            </ul>
            <span>{page} of {countPage}</span>
        </nav>
    )
};

export default Pagination;