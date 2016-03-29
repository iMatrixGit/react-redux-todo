import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Counter } from '../components/Counter';

// Counter
const mapCounterStateToProps = (state) => {
    return {
        count: state.posts.getIn([state.selectedSubreddit, 'items']) ? state.posts.getIn([state.selectedSubreddit, 'items']).size : 0
    }
};

export default connect(
    mapCounterStateToProps
)(Counter);