import React, { PropTypes } from 'react';
import { pure } from 'recompose';

const Counter = ({
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

export default pure(Counter);
