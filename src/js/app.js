import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { mainReducer } from './reducers/reducers';
import { logger } from './actions/actions';
import Perf from 'react-addons-perf';
import {
    createStore ,
    combineReducers,
    applyMiddleware,
    compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { VisibilityFilters } from './constants/constants';
import { AppContainer } from './containers/AppContainer';

let filters = Object.keys(VisibilityFilters);

let initialState = {
    selectedSubreddit: 'backend',
    visibilityFilter: 'SHOW_ALL',
    filters: Immutable.List(filters),
    subreddits: Immutable.List([
        'frontend',
        'backend'
    ]),
    posts: {
        frontend: {
            isFetching: false,
            didInvalidate: false,
            items: Immutable.List()
        },
        backend: {
            isFetching: false,
            didInvalidate: false,
            items: Immutable.List()
        }
    }
};

function configureStore(initialState, reducer, ...middlewares) {

    return createStore(reducer, initialState, compose(applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f)
    );
}

// App

const store = configureStore(initialState, mainReducer, logger, thunk);

Perf.start();

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);

Perf.stop();
Perf.printInclusive();
Perf.printWasted();
