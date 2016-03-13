import React, { PropTypes } from 'react';
import { InteractiveTab } from '../containers/containers';

export const TabList = ({
    tabs
    }) => {

    return (

        <ul className="tab-list">
            {
                tabs.map((tab, index) => (
                    <InteractiveTab key={index} {...tab}/>
                ))
            }
        </ul>
    )
};

TabList.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onTabClick: PropTypes.func.isRequired
};

TabList.contextTypes = {
    store: PropTypes.object.isRequired
};