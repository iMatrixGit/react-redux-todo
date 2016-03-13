import React, { PropTypes } from 'react';
import { addTabIfValid } from '../actions/actions'

export const AddTab = ({
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