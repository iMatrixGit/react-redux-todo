import React, { PropTypes } from 'react';

export const Counter = ({
    count
}) => {

    return (
        <div className="counter-wrapper">
            <span className="counter">{count}</span>
        </div>
    )
};

Counter.propTypes = {
    count: PropTypes.number
};