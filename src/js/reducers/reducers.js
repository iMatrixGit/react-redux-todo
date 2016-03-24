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

export const toggleTab = (state = Immutable.List(), action) => {

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
                id: state.size > 0 ? state.last().get('id') + 1 : 1,
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

export const getItemsByFilter = (state = [], visibilityFilter = 'DEFAULT_FILTER') => {

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
            return state.update('items', (val) => toggleTab(val, action));

        case ADD_TAB:
            return state.update('items', (val) => addTab(val, action));

        case REMOVE_TAB:
            return state.update('items', (val) => removeTab(val, action));

        case SET_VISIBILITY_FILTER:
            return state.update('items', (val) => getItemsByFilter(val, action.visibilityFilter));

        case INVALIDATE_SUBREDDIT:
            return state.set('didInvalidate', true);

        case REQUEST_POSTS:
            return Immutable.Map({
                ...state,
                didInvalidate: true,
                isFetching: true
            });

        case RECEIVE_POSTS:
            return Immutable.Map({
                isFetching: false,
                didInvalidate: false,
                items: Immutable.List(action.items.map((item) => Immutable.Map(item)))
            });

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