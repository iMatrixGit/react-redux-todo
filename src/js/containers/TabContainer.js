import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab } from '../components/Tab';
import { toggleTabAction, removeTabAction } from '../actions/actions';

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

export default connect(
    mapTabStateToProps,
    mapTabDispatchToProps
)(Tab);