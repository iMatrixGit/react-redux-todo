import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tab from '../components/Tab';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toggleTabAction, removeTabAction } from '../actions/actions';
import { getItemsByFilterText, getItemsByFilter } from '../reducers/reducers';
import Collapse from 'react-collapse';

export const TabList = ({
    tabs,
    toggleTabAction,
    removeTabAction,
    }) => {

    let items = tabs.map((tab, index) => {

        let active = tab.get('active');
        let tabContent = <Collapse isOpened={active} springConfig={{stiffness: 210}}>
                            <div className="tab-content">{tab.get('content')}</div>
                        </Collapse>;

        return (
            <Tab
                key={index}
                id={tab.get('id')}
                title={tab.get('title')}
                content={tabContent}
                active={active}
                toggleTab={toggleTabAction}
                removeTab={removeTabAction}
            />
        );
    });


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


export default connect(
    state => ({
        tabs: getItemsByFilterText(
            getItemsByFilter(
                state.posts.getIn([state.selectedSubreddit, 'items']),
                state.visibilityFilter),
            state.filterText
        )
    }),

    dispatch => bindActionCreators({
        toggleTabAction,
        removeTabAction
    }, dispatch)
)(TabList);

