import fetch from 'isomorphic-fetch'
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
} from '../constants/constants';

// Actions creators

export const addTabAction = (title, content) => {

    return {
        type: ADD_TAB,
        payload: {
            title,
            content
        }
    };
};

export const removeTabAction = (id) => {
    return {
        type: REMOVE_TAB,
        payload: {id}
    }
};

export const toggleTabAction = (id) => {
    return {
        type: TOGGLE_TAB,
        id
    }
};

export const changeFilterAction = (filter) => {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
};

export const selectSubredditAction = (subreddit) => {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
};

export const invalidateSubredditAction = (subreddit) => {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
};

export const requestPostsAction = (subreddit) => {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
};

export const receivePostsAction = (subreddit, posts) => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        items: posts.items,
        receivedAt: Date.now()
    }
};

// Middleware

export const addTabIfValid =  (title, content) => {

    return (dispatch, getState) => {

        if (title && content){
            return dispatch(addTabAction(title, content))
        } else {
            console.log("Title or content missing!");
        }
    }
};

export const fetchPosts = (subreddit) => {

    return dispatch => {

        dispatch(requestPostsAction(subreddit));

        return fetch('../../../data.json').then((response) =>
            response.json()
        ).then((json) => {
            dispatch(receivePostsAction(subreddit, json[subreddit]))
        })
    }
};

export const logger = store => next => action => {

    console.log("dispatching:", action);
    let result = next(action);
    console.log("next state:", store.getState());
    console.groupEnd(action.type);
    return result;

};

