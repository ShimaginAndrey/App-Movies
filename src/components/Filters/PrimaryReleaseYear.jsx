import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import UISelect from '../../UIComponents/UISelect';

const PrimaryReleaseYear = React.memo((props) => {
    const {primary_release_year, onChangeFilters} = props;

    const options = useMemo(() => {
        const arrayYear = [];
        for (let i = 2022; i >= 2000; i--) {
            arrayYear.push({label: `${i}`, value: `${i}`});
        }
        return arrayYear;
    },[]);

    return (
        <UISelect
            id="primary_release_year"
            name="primary_release_year"
            value={primary_release_year}
            onChange={onChangeFilters}
            labelText="Год релиза:"
        >
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </UISelect>
    )
});

// PrimaryReleaseYear.defaultProps = {
//     options: [
//         {label: '2018', value: '2018'},
//         {label: '2017', value: '2017'},
//         {label: '2016', value: '2016'},
//         {label: '2015', value: '2015'}
//     ]
// };

PrimaryReleaseYear.propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
}

export default PrimaryReleaseYear;