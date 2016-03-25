import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab } from '../components/Tab';
import { AddTab } from '../components/AddTab';
import { Select } from '../components/Select';
import { TabList } from '../components/TabList';
import { SearchInput } from '../components/SearchInput';
import {
    toggleTabAction,
    removeTabAction,
    changeFilterAction,
    selectSubredditAction,
    fetchPostsIfNeeded,
    searchPostAction
} from '../actions/actions';

import { getItemsByFilter, getItemsByFilterText } from '../reducers/reducers';

// Interactive tab container

const mapTabStateToProps = (state) => {
    return {
        tabs: state.posts.getIn([state.selectedSubreddit, 'items'])
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

// Search input container

const mapSearchStateToProps = (state) => {
    return {
        filterText: state.filterText
    }
};

const mapSearchDispatchToProps = (dispatch) => {
    return {
        onChange: (text) => dispatch(searchPostAction(text))
    }
};

export const SearchInputContainer = connect(
    mapSearchStateToProps,
    mapSearchDispatchToProps
)(SearchInput);

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