import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab } from '../components/Tab';
import { AddTab } from '../components/AddTab';
import { Select } from '../components/Select';
import { TabList } from '../components/TabList';
import {
    toggleTabAction,
    removeTabAction,
    changeFilterAction,
    selectSubredditAction,
    fetchPostsIfNeeded
} from '../actions/actions';

import { getItemsByFilter } from '../reducers/reducers';

// Interactive tab container

const mapTabStateToProps = (state) => {
    return {
        tabs: state.posts[state.selectedSubreddit].items
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
        activeOption: state.visibilityFilter,
        options: state.filters
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
)(Select);

// Interactive tab container
const mapStateToProps = (state) => {

    return {
        tabs: getItemsByFilter(state.posts[state.selectedSubreddit].items, state.visibilityFilter)
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

// Select subreddit container

const mapSelSubredditStateToProps = (state) => {
    return {
        activeOption: state.selectedSubreddit,
        options: state.subreddits
    }
};

const mapSelSubredditDispatchToProps = (dispatch) => {
    return {
        onChange: (subreddit) => dispatch(fetchPostsIfNeeded(subreddit))
    }
};

export const SubredditFilterContainer = connect(
    mapSelSubredditStateToProps,
    mapSelSubredditDispatchToProps
)(Select);