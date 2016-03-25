import React, { PropTypes } from 'react';

export const SearchInput = ({
    filterText,
    onChange
    }) => {

    let input;

    return (
        <input
            ref={ node => input = node}
            type="text"
            value={filterText}
            placeholder="Search post"
            className="form-input"
            onChange={() => onChange(input.value)}
        />
    );
};

SearchInput.propTypes = {
    filterText: PropTypes.string,
    onChange: PropTypes.func
};
