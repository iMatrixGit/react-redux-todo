import React, { PropTypes } from 'react';
import { pure } from 'recompose'

const AddTab = ({
    addTab
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
                addTab(inputTitle.value, inputContent.value);
                inputTitle.value = '';
                inputContent.value = '';
            }}>
                Add Tab
            </button>
        </div>
    )

};

export default pure(AddTab);