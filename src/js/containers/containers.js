import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab } from '../components/Tab';
import { AddTab } from '../components/AddTab';
import { TabFilter } from '../components/TabFilter';
import { TabList } from '../components/TabList';
import {
    toggleTabAction,
    removeTabAction,
    changeFilterAction } from '../actions/actions';

import { getItemsByFilter } from '../reducers/reducers';

// Interactive tab container

const mapTabStateToProps = (state) => {
    return {
        tabs: state.posts.items
    }
};

const mapTabDispatchToProps = (dispatch) => {

    return {
        handleTabOpen: (id) => dispatch(toggleTabAction(id)),
        handleRemoveTab: (id) => dispatch(removeTabAction(id))
    }
};

export const InteractiveTab = connect(
    mapTabStateToProps,
    mapTabDispatchToProps
)(Tab);


// Add tab container
export const AddTabContainer = connect()(AddTab);

// Tab filter container

const mapTabFilterStateToProps = (state) => {
    return {
        filters: state.filters,
        activeFilter: state.visibilityFilter
    }
};

const mapTabFilterDispatchToProps = (dispatch) => {
    return {
        onChange: (val) => dispatch(changeFilterAction(val))
    }
};

export const TabFilterContainer = connect(
    mapTabFilterStateToProps,
    mapTabFilterDispatchToProps
)(TabFilter);

// Interactive tab container
const mapStateToProps = (state) => {

    return {
        tabs: getItemsByFilter(state.posts.items, state.visibilityFilter)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTabClick: (id) => {
            dispatch(toggleTabAction(id))
        }
    }
};

export const InteractiveTabList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabList);