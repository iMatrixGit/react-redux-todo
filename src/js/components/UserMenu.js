import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    AddTabContainer,
    TabFilterContainer,
    SubredditFilterContainer,
    SearchContainer,
    CounterContainer,
} from '../containers/index';

let UserMenu = () => {

    return (
        <div>
            <AddTabContainer />
            <TabFilterContainer />
            <SubredditFilterContainer />
            <SearchContainer />
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

export default connect()(UserMenu);
