import React from "react";
import PropTypes from 'prop-types';
import UISelect from '../../UIComponents/UISelect';

const SortBy = React.memo((props) => {
    const {sort_by, onChangeFilters, options} = props;

    return (
        <UISelect
            id="sort_by"
            name="sort_by"
            value={sort_by}
            onChange={onChangeFilters}
            labelText="Сортировать по:"
        >
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </UISelect>
    )
});

SortBy.defaultProps = {
    options: [
        {label: 'Популярные по убыванию', value: 'popularity.desc'},
        {label: 'Популярные по возростанию', value: 'popularity.asc'},
        {label: 'Рейтинг по убыванию', value: 'vote_average.desc'},
        {label: 'Рейтинг по возростанию', value: 'vote_average.asc'}, 
    ]
};

SortBy.propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
}

export default SortBy;