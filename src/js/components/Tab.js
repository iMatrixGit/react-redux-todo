import React, { PropTypes } from 'react';
import { TabHeading } from './TabHeading';
import { RemTabBtn } from './RemTabBtn';

export const Tab = ({
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