import React, { PropTypes } from 'react';
import { TabHeading } from './TabHeading';
import { RemTabBtn } from './RemTabBtn';
import { pure } from 'recompose';

let Tab = ({
    id,
    title,
    content,
    active,
    toggleTab,
    removeTab
}) => {

    return (
        <div className="tab">
            <TabHeading title={title} onClick={() => toggleTab(id)} />
            <RemTabBtn onClick={() => removeTab(id)} />
                {content}
        </div>
    );
};

Tab.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
};

Tab.contextTypes = {
    store: PropTypes.object.isRequired
};

export default Tab = pure(Tab);