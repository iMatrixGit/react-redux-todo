import React, { PropTypes } from 'react';
import { InteractiveTab } from '../containers/containers';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

console.log(ReactCSSTransitionGroup);

export const TabList = ({
    tabs
    }) => {

    let items = tabs.map((tab, index) => (
        <InteractiveTab
            key={index}
            id={tab.get('id')}
            title={tab.get('title')}
            content={tab.get('content')}
            active={tab.get('active')}
        />
    ));

    return (

        <div className="tab-list">
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {items}
            </ReactCSSTransitionGroup>

        </div>
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