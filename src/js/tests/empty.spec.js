import expect from 'expect';
import Immutable from 'Immutable'
import * as Reducers from '../reducers/reducers';

describe('reducers Posts', () => {

    it('toggleTab: Should return new state with changed active prop', () => {

        const stateBefore = [
                Immutable.Map({
                    id: 1,
                    title: "First Tab",
                    content: "The first tab content",
                    active: false
                }),
                Immutable.Map({
                    id: 2,
                    title: "Second Tab",
                    content: "The second tab content",
                    active: true
                })
            ];

        const stateAfter = [
                Immutable.Map({
                        id: 1,
                        title: "First Tab",
                        content: "The first tab content",
                        active: true
                    }),
                Immutable.Map({
                    id: 2,
                    title: "Second Tab",
                    content: "The second tab content",
                    active: false
                })
            ];

        const action = {
            type: 'TOGGLE_TAB',
            id: 1
        };

        expect(Reducers.toggleTab(stateBefore, action)).toEqual(stateAfter);
    });

    it('addTab: Should return state with added tab', () => {

        const stateBefore = Immutable.List(
            Immutable.Map({
                id: 1,
                title: "First Tab",
                content: "The first tab content",
                active: false
            }),
            Immutable.Map({
                id: 2,
                title: "Second Tab",
                content: "The second tab content",
                active: true
            })
        );

        const stateAfter = Immutable.List(
            Immutable.Map({
                id: 1,
                title: "First Tab",
                content: "The first tab content",
                active: false
            }),
            Immutable.Map({
                id: 2,
                title: "Second Tab",
                content: "The second tab content",
                active: true
            }),
            Immutable.Map({
                id: 3,
                title: "Third Tab",
                content: "The third tab content",
                active: false
            })
        );

        const action = {
            type: 'ADD_TAB',
            payload:{
                title: "Third Tab",
                content: "The third tab content"
            }
        };

        //expect(Reducers.addTab(stateBefore, action)).toEqual(stateAfter);

    });

    it('removeTab: Should return new state with removed tab', () => {

        const stateBefore = Immutable.List(
            Immutable.Map({
                id: 1,
                title: "First Tab",
                content: "The first tab content",
                active: false
            }),
            Immutable.Map({
                id: 2,
                title: "Second Tab",
                content: "The second tab content",
                active: true
            }),
            Immutable.Map({
                id: 3,
                title: "Third Tab",
                content: "The third tab content",
                active: false
            })
        );

        const stateAfter = Immutable.List(
            Immutable.Map({
                id: 1,
                title: "First Tab",
                content: "The first tab content",
                active: false
            }),
            Immutable.Map({
                id: 2,
                title: "Second Tab",
                content: "The second tab content",
                active: true
            })
        );

        const action = {
            type: 'REMOVE_TAB',
            payload: {
                id: 3
            }
        };

        expect(Reducers.removeTab(stateBefore, action).map((val) => val.toJS())).toEqual(stateAfter.map((val) => val.toJS()));

    });
});




