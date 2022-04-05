import React from "react";
import PropTypes from 'prop-types';

const UISelect = (props) => {
    const {id, name, value, onChange, labelText, children} = props;
    return (
        <div className="form-group mb-2">
            <label htmlFor={id}>{labelText}</label>
            <select 
                id={id}
                className="form-select"
                name={name}
                value={value} 
                onChange={onChange}
            >
            {children}
            </select>
        </div>
    )
};

UISelect.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default UISelect;