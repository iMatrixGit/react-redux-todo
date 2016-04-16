import React, { PropTypes } from 'react';
import { pure } from 'recompose';

const SearchInput = ({
    filterText,
    onChange,
    classList,
    onFocus,
    onBlur
    }) => {

    let input;

    return (
        <input
            ref={ node => input = node}
            type="text"
            value={filterText}
            placeholder="Search post"
            className={'form-input search-input ' + classList }
            onChange={() => onChange(input.value)}
            onFocus={(e) => onFocus(e)}
            onBlur={(e) => onBlur(e)}
        />
    );
};

SearchInput.propTypes = {
    filterText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default pure(SearchInput);
