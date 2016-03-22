import React, { PropTypes } from 'react';
import { InteractiveTab } from '../containers/containers';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const TabList = ({
    tabs
    }) => {

    return (

        <ul className="tab-list">
            {
                tabs.map((tab, index) => (
                    <InteractiveTab
                        key={index}
                        id={tab.get('id')}
                        title={tab.get('title')}
                        content={tab.get('content')}
                        active={tab.get('active')}
                    />
                ))
            }
        </ul>
    )
};

TabList.propTypes = {
    tabs: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                active: PropTypes.bool.isRequired
            }).isRequired
    ).isRequired
};

TabList.contextTypes = {
    store: PropTypes.object.isRequired
};