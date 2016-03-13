import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { TabHeading } from './components/TabHeading';
import {
    tabsApp,
    getItemsByFilter
} from './reducers/reducers'
import {
    addTabAction,
    addTabIfValid,
    removeTabAction,
    changeFilterAction,
    logger,
    fetchPosts,
    toggleTabAction } from './actions/actions'
import { createStore , combineReducers, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import expect from 'expect'
import { VisibilityFilters } from './constants/constants'

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

// Components



const RemTabBtn = ({
    onClick
    }) => {
    return (
        <span className="btn-remove"
              onClick={onClick}>
            Remove 123
        </span>
    )
};

const Tab = ({
    id,
    title,
    content,
    active,
    handleTabOpen,
    handleRemoveTab
    }) => {

    let tabContent = active ? <div className="tab-content">{content}</div> : '';

    return (
        <div className="tab">
            <TabHeading title={title} onClick={() => handleTabOpen(id)} />
            <RemTabBtn onClick={() => handleRemoveTab(id)} />
            {tabContent}
        </div>
    );
};

Tab.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

const mapTabStateToProps = (state) => {
    return {
        tabs: state.posts.items
    }
};

const mapTabDispatchToProps = (dispatch) => {

    return {
        handleTabOpen: (id) => dispatch(toggleTabAction(id)),
        handleRemoveTab: (id) => dispatch(removeTabAction(id))
    }
};

const InteractiveTab = connect(
    mapTabStateToProps,
    mapTabDispatchToProps
)(Tab);



let AddTab = ({
    dispatch
    }) => {

    let inputTitle, inputContent;

    return (

        <div className="add-tab-menu">
            <label htmlFor="tab_title">Tab title:</label>
            <input type="text"
                   id="tab_title"
                   className="form-input"
                   placeholder="Enter tab title"
                   ref={ node => inputTitle = node }
            />
            <label htmlFor="tab_content">Tab content:</label>
            <input type="text"
                   id="tab_content"
                   className="form-input"
                   placeholder="Enter tab content"
                   ref={ node => inputContent = node }
            />
            <button
                type="button"
                className="form-submit"
                onClick={() => {
                dispatch(addTabIfValid(inputTitle.value, inputContent.value));
                inputTitle.value = '';
                inputContent.value = '';
            }}>
                Add Tab
            </button>
        </div>
    )

};

AddTab = connect()(AddTab);

const TabFilter = ({
    activeFilter,
    filters,
    onChange
    }) => {

    let select;

    return (
        <select ref={ node => select = node }
                className="form-input"
                value={activeFilter}
                onChange={() => onChange(select.value)}
        >
            {
                filters.map((filter, index) => (
                    <option value={filter} key={index}>
                        {filter}
                    </option>
                ))
            }
        </select>
    )
};

const mapTabFilterStateToProps = (state) => {
    return {
        filters: state.filters,
        activeFilter: state.visibilityFilter
    }
};

const mapTabFilterDispatchToProps = (dispatch) => {
    return {
        onChange: (val) => dispatch(changeFilterAction(val))
    }
};

const TabFilterContainer = connect(
    mapTabFilterStateToProps,
    mapTabFilterDispatchToProps
)(TabFilter);

const TabList = ({
    tabs
    }) => {

    return (

        <ul className="tab-list">
            {
                tabs.map((tab, index) => (
                    <InteractiveTab key={index} {...tab}/>
                ))
            }
        </ul>
    )
};

TabList.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onTabClick: PropTypes.func.isRequired
};

TabList.contextTypes = {
    store: PropTypes.object.isRequired
};

const store = configureStore(initialState, tabsApp, logger, thunk);

const mapStateToProps = (state) => {

    return {
        tabs: getItemsByFilter(state.posts.items, state.visibilityFilter)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTabClick: (id) => {
            dispatch(toggleTabAction(id))
        }
    }
};

const InteractiveTabList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabList);

class Accordion extends React.Component {

    componentWillMount(){
        console.log("WillMount");
        const {store} = this.context;
        store.dispatch(fetchPosts('frontend'));
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
                <AddTab />
                <TabFilterContainer />
                <InteractiveTabList />
            </div>
        )
    }
}

Accordion.contextTypes = {
    store: PropTypes.object.isRequired
};

ReactDOM.render(
    <Provider store={store}>
        <Accordion />
    </Provider>,
    document.getElementById('app')
);
