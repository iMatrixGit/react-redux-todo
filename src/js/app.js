import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { tabsApp } from './reducers/reducers'
import { logger } from './actions/actions';
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
    selectedSubreddit: 'frontend',
    visibilityFilter: 'SHOW_ALL',
    filters: [
        ...filters
    ],
    posts: {
        isFetching: false,
        didInvalidate: false,
        items: [
            {
                id: 1,
                title: "First Tab",
                content: "The first tab content",
                active: false
            },
            {
                id: 2,
                title: "Second Tab",
                content: "The second tab content",
                active: true
            },
            {
                id: 3,
                title: "Third Tab",
                content: "The third tab content",
                active: false
            }
        ]

    }
};

function configureStore(initialState, reducer, ...middlewares) {

    return createStore(reducer, initialState, compose(applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f)
    );
}

// App

const store = configureStore(initialState, tabsApp, logger, thunk);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);
