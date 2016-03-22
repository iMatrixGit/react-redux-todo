import Immutable from 'immutable';
import {
    ADD_TAB,
    REMOVE_TAB,
    TOGGLE_TAB,
    SET_VISIBILITY_FILTER,
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    VisibilityFilters
} from '../constants/constants'

const {
    SHOW_ALL,
    SHOW_ACTIVE,
    SHOW_INACTIVE
    } = VisibilityFilters;


// Reducers

export const toggleTab = (state = [], action) => {

    switch(action.type){

        case TOGGLE_TAB:

            return state.map((tab) => {

                if (tab.get('active') || tab.get('id') === action.id) {

                    return tab.update('active', (val) => !val);

                } else {

                    return tab;
                }
            });

        default:

            return state;
    }
};

export const addTab = (state = Immutable.List(), action) => {

    switch (action.type) {
        case ADD_TAB:
            return state.push(Immutable.Map({
                id: state.size > 0 ? state.get(state.size - 1).get('id') + 1 : 1,
                title: action.payload.title,
                content: action.payload.content,
                active: false

            }));
        default:
            return state;
    }
};

export const removeTab = (state = [], action) => {

    switch (action.type) {
        case REMOVE_TAB:
            return state.filter((item) => item.get('id') != action.payload.id)
    }
};

export const getItemsByFilter = (state = Immutable.List(), visibilityFilter = 'DEFAULT_FILTER') => {

    switch (visibilityFilter){

        case SHOW_ALL:
            return state.slice();

        case SHOW_ACTIVE:
            return state.filter((tab) => tab.get('active'));

        case SHOW_INACTIVE:
            return state.filter((tab) => !tab.get('active'));

        default:
            return state;
    }
};

export const visibilityFilter = (state = SHOW_ALL, action) => {

    switch (action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export const selectedSubredit = (state = 'reactjs', action) => {

    switch (action.type){

        case SELECT_SUBREDDIT:
            return action.subreddit;

        default:
            return state;
    }
};


export const posts = (state = {}, action) => {

    switch(action.type){

        case TOGGLE_TAB:
            return {
                    ...state,
                    items:  toggleTab(state.items, action)
                };

        case ADD_TAB:
            return {
                    ...state,
                    items: addTab(state.items, action)
                };

        case REMOVE_TAB:
            return {
                    ...state,
                    items: removeTab(state.items, action)
                };

        case SET_VISIBILITY_FILTER:
            return {
                ...state,
                items: getItemsByFilter(state.items, action.visibilityFilter)
            };

        case INVALIDATE_SUBREDDIT:
            return {
                ...state,
                didInvalidate: true
            };

        case REQUEST_POSTS:
            return {
                ...state,
                didInvalidate: true,
                isFetching: true
            };

        case RECEIVE_POSTS:
            return {
                isFetching: false,
                didInvalidate: false,
                items: Immutable.List(action.items.map((item) => Immutable.Map(item)))
            };

        default:
            return state;
    }
};

export const mainReducer = (state = {}, action) => {

    return {
        ...state,
        selectedSubreddit: selectedSubredit(state.selectedSubreddit, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        posts: {
            ...state.posts,
            [state.selectedSubreddit]: posts(state.posts[state.selectedSubreddit], action)
        }
    };
};