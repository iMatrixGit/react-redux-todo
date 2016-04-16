import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SearchInputContainer from './SearchInputContainer';
import {
    AddTab,
    SearchInput,
    SelectInput,
    Counter
} from '../components/index';
import {
    searchPostAction,
    fetchPostsIfNeeded,
    changeFilterAction,
    addTabIfValid } from '../actions/actions';

console.log(SelectInput);

let UserMenu = ({
        tabs,
        filterText,
        filters,
        visibilityFilter,
        subreddits,
        selectedSubreddit,
        fetchPostsIfNeeded,
        searchPostAction,
        changeFilterAction,
        addTabIfValid
    }) => {

    const count = tabs ? tabs.size : 0;

    return (
        <div>
            <AddTab addTab={addTabIfValid} />
            <SelectInput activeOption={visibilityFilter}
                         options={filters}
                         onChange={changeFilterAction}
            />
            <SelectInput
                activeOption={selectedSubreddit}
                options={subreddits}
                onChange={fetchPostsIfNeeded}
            />
            <SearchInputContainer filterText={filterText} onChange={searchPostAction} />
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={5500}
                transitionLeaveTimeout={5300}
                transitionAppear={true}
                transitionAppearTimeout={500}
            >
                <Counter count={count} />
            </ReactCSSTransitionGroup>
        </div>
    );
};

export default connect(
    state => ({
        tabs: state.posts.getIn([state.selectedSubreddit, 'items']),
        filterText: state.filterText,
        filters: state.filters,
        visibilityFilter: state.visibilityFilter,
        subreddits: state.subreddits,
        selectedSubreddit: state.selectedSubreddit
    }),

    dispatch => bindActionCreators({
        searchPostAction,
        fetchPostsIfNeeded,
        changeFilterAction,
        addTabIfValid
    }, dispatch)
)(UserMenu);
