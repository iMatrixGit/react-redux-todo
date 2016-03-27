import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    AddTabContainer,
    TabFilterContainer,
    InteractiveTabList,
    SubredditFilterContainer,
    SearchInputContainer,
    CounterContainer
} from '../containers/containers';

export const UserMenu = () => {

    return (
        <div>
            <AddTabContainer />
            <TabFilterContainer />
            <SubredditFilterContainer />
            <SearchInputContainer />
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={5500}
                transitionLeaveTimeout={5300}
                transitionAppear={true}
                transitionAppearTimeout={500}
            >
                <CounterContainer />
            </ReactCSSTransitionGroup>
        </div>
    );
};
