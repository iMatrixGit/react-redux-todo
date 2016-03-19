import React, { PropTypes } from 'react';
import {
    AddTabContainer,
    TabFilterContainer,
    InteractiveTabList,
    SubredditFilterContainer
} from './containers';

import { fetchPosts } from '../actions/actions'

export class AppContainer extends React.Component {

    componentWillMount(){
        console.log("WillMount");
        const {store} = this.context;
        store.dispatch(fetchPosts('backend'));
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

        return (
            <div>
                <AddTabContainer />
                <TabFilterContainer />
                <SubredditFilterContainer />
                <InteractiveTabList />
            </div>
        )
    }
}

AppContainer.contextTypes = {
    store: PropTypes.object.isRequired
};