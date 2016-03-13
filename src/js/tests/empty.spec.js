import expect from 'expect';
import { tabs, addTab, toggleTab } from '../reducers/reducers';

describe('reducers toggleTab', () => {

    it('Should return new state with changed active prop', () => {

        const stateBefore = [
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
                }
            ];

        const stateAfter = [
                {
                    id: 1,
                    title: "First Tab",
                    content: "The first tab content",
                    active: true
                },
                {
                    id: 2,
                    title: "Second Tab",
                    content: "The second tab content",
                    active: false
                }
            ];

        const action = {
            type: 'TOGGLE_TAB',
            id: 1
        };

        expect(toggleTab(stateBefore, action)).toEqual(stateAfter);
    });
});

describe('reducers addTab', () => {

    it('Should return state with added tab', () => {

        const stateBefore = [
            {
                id: 1,
                title: "First Tab",
                content: "The first tab content",
                active: true
            },
            {
                id: 2,
                title: "Second Tab",
                content: "The second tab content",
                active: false
            }
        ];

        const stateAfter = [
            {
                id: 1,
                title: "First Tab",
                content: "The first tab content",
                active: true
            },
            {
                id: 2,
                title: "Second Tab",
                content: "The second tab content",
                active: false
            },
            {
                id: 3,
                title: "Third Tab",
                content: "The third tab content",
                active: false
            }

        ];

        const action = {
            type: 'ADD_TAB',
            payload:{
                title: "Third Tab",
                content: "The third tab content"
            }
        };

        expect(addTab(stateBefore, action)).toEqual(stateAfter);

    });
});

describe('reducers tabs', () => {

    describe('ADD_TAB', () => {

        it('Should return updated tabs list with added tab', () => {

            const stateBefore = {};

            const stateAfter = {

                tabs: [
                    {
                        id: 1,
                        title: "The first tab",
                        content: "The first tab content",
                        active: false
                    }
                ]
            };

            const action = {
                type: 'ADD_TAB',
                payload: {
                    title: "The first tab",
                    content: "The first tab content"
                }
            };

            expect(tabs(stateBefore, action)).toEqual(stateAfter);
        });
    });

    describe('TOGGLE_TAB', () => {

        it('Should return updated tabs list', () => {

            const stateBefore = {
                tabs:[
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
                    }
                ]
            };

            const stateAfter = {
                tabs:[
                    {
                        id: 1,
                        title: "First Tab",
                        content: "The first tab content",
                        active: true
                    },
                    {
                        id: 2,
                        title: "Second Tab",
                        content: "The second tab content",
                        active: false
                    }
                ]
            };

            const action = {
                type: 'TOGGLE_TAB',
                id: 1
            };

            expect(tabs(stateBefore, action)).toEqual(stateAfter);
        });
    });



});




