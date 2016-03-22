import React, { PropTypes } from 'react';
import Immutable from 'immutable';

export const Select = ({
    activeOption,
    options,
    onChange
    }) => {

    let select;

    return (
        <select ref={ node => select = node }
                className="form-input"
                value={activeOption}
                onChange={() => onChange(select.value)}
        >
            {
                options.map((filter, index) => (
                    <option value={filter} key={index}>
                        {filter}
                    </option>
                ))
            }
        </select>
    )
};

Select.propTypes = {
    activeOption: PropTypes.string.isRequired,
    options: PropTypes.instanceOf(Immutable.List),
    onChange: PropTypes.func.isRequired
};