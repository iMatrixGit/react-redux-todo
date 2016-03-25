import React, { PropTypes } from 'react';
import {
    AddTabContainer,
    TabFilterContainer,
    InteractiveTabList,
    SubredditFilterContainer,
    SearchInputContainer
} from './containers';
import { fetchPostsIfNeeded } from '../actions/actions'

export class AppContainer extends React.Component {

    componentWillMount(){
        console.log("WillMount");
        const {store} = this.context;
        store.dispatch(fetchPostsIfNeeded('backend'));
    }

    componentDidMount(){
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){

        const {store} = this.context;
        let subreddit = store.getState().selectedSubreddit;
        let isFetching = store.getState().posts.get(subreddit).isFetching;
        let className = isFetching ? 'loader': '';

        return (
            <div className={className}>
                <AddTabContainer />
                <TabFilterContainer />
                <SubredditFilterContainer />
                <SearchInputContainer />
                <InteractiveTabList />
            </div>
        )
    }
}

AppContainer.contextTypes = {
    store: PropTypes.object.isRequired
};