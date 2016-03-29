import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Select } from '../components/Select';
import {changeFilterAction} from '../actions/actions';

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

export default connect(
    mapTabFilterStateToProps,
    mapTabFilterDispatchToProps
)(Select);