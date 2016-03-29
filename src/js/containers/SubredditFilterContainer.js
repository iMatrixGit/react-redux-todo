import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Select } from '../components/Select';
import { fetchPostsIfNeeded } from '../actions/actions';

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

export default connect(
    mapSelSubredditStateToProps,
    mapSelSubredditDispatchToProps
)(Select);