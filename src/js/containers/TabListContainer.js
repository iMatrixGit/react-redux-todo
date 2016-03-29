import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TabList } from '../components/TabList';
import { toggleTabAction } from '../actions/actions';
import { getItemsByFilter, getItemsByFilterText } from '../reducers/reducers';

const mapStateToProps = (state) => {

    return {
        tabs: getItemsByFilterText(
            getItemsByFilter(
                state.posts.getIn([state.selectedSubreddit, 'items']),
                state.visibilityFilter),
            state.filterText
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTabClick: (id) => {
            dispatch(toggleTabAction(id))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabList);