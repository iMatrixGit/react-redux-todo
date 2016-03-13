import React, { PropTypes } from 'react';

export const TabHeading = ({
    title,
    onClick
    }) => {

    return (
        <a href="#"
           className="tab-heading"
           onClick={(e) => {
               e.preventDefault();
               onClick();
                }}>
            {title}
        </a>
    )
};

TabHeading.propTypes = {
    title: PropTypes.string.isRequired
};