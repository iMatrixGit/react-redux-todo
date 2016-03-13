import React, { PropTypes } from 'react';

export const TabFilter = ({
    activeFilter,
    filters,
    onChange
    }) => {

    let select;

    return (
        <select ref={ node => select = node }
                className="form-input"
                value={activeFilter}
                onChange={() => onChange(select.value)}
        >
            {
                filters.map((filter, index) => (
                    <option value={filter} key={index}>
                        {filter}
                    </option>
                ))
            }
        </select>
    )
};

TabFilter.propTypes = {
    activeFilter: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};