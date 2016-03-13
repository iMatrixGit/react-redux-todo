import React, { PropTypes } from 'react';

export const RemTabBtn = ({
    onClick
    }) => {
    return (
        <span className="btn-remove"
              onClick={onClick}>
            Remove
        </span>
    )
};

RemTabBtn.propTypes = {
    onClick: PropTypes.func.isRequired
};