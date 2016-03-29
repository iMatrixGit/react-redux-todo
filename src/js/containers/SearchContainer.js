import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SearchInput } from '../components/SearchInput';
import { searchPostAction } from '../actions/actions';

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

export default connect(
    mapSearchStateToProps,
    mapSearchDispatchToProps
)(SearchInput);
