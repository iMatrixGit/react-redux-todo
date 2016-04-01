import React, { PropTypes } from 'react';
import { pure } from 'recompose';

const RemTabBtn = ({
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

export default pure(RemTabBtn);