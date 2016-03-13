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

                if (tab.active || tab.id === action.id) {

                    return Object.assign({}, tab, {
                        active: !tab.active
                    });

                } else {

                    return tab;
                }
            });

        default:

            return state;
    }
};

export const addTab = (state = [], action) => {

    switch (action.type) {
        case ADD_TAB:
            return state.concat({
                id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
                title: action.payload.title,
                content: action.payload.content,
                active: false

            });
        default:
            return state;
    }
};

export const removeTab = (state = [], action) => {

    switch (action.type) {
        case REMOVE_TAB:
            return state.filter((item) => item.id != action.payload.id)
    }
};

export const getItemsByFilter = (state = [], visibilityFilter = 'DEFAULT_FILTER') => {

    switch (visibilityFilter){

        case SHOW_ALL:
            return state.slice();

        case SHOW_ACTIVE:
            return state.filter((tab) => tab.active);

        case SHOW_INACTIVE:
            return state.filter((tab) => !tab.active);

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


export const tabs = (state = {}, action) => {

    switch(action.type){

        case TOGGLE_TAB:
            return {
                    ...state.posts,
                    items:  toggleTab(state.items, action)
                };

        case ADD_TAB:
            return {
                    ...state.posts,
                    items: addTab(state.items, action)
                };

        case REMOVE_TAB:
            return {
                    ...state.posts,
                    items: removeTab(state.items, action)
                };


        case SET_VISIBILITY_FILTER:
            return {
                ...state.posts,
                items: getItemsByFilter(state.items, action.visibilityFilter)
            };
        case INVALIDATE_SUBREDDIT:
            return {
                ...state.posts,
                didInvalidate: true
            };
        case REQUEST_POSTS:
            return {
                ...state.posts,
                didInvalidate: true,
                isFetching: true
            };
        case RECEIVE_POSTS:
            return {
                isFetching: false,
                didInvalidate: false,
                items: action.items
            };

        default:
            return state;
    }
};

export const tabsApp = (state = {}, action) => {

    return {
        selectedSubreddit: state.selectedSubreddit,
        filters: state.filters,
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        posts: tabs(state.posts, action)
    }
};