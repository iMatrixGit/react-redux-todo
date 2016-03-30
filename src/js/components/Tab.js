import React, { PropTypes } from 'react';
import { TabHeading } from './TabHeading';
import { RemTabBtn } from './RemTabBtn';
import shallowCompare from 'react-addons-shallow-compare';
import _ from 'underscore';

export class Tab extends React.Component {

    shouldComponentUpdate(nextProps){
        return !_.isEqual(this.props, nextProps);
    }

    render(){

        const { id, title, content, active, toggleTab, removeTab } = this.props;
        let tabContent = active ? <div className="tab-content">{content}</div> : '';

        return (
            <div className="tab">
                <TabHeading title={title} onClick={() => toggleTab(id)} />
                <RemTabBtn onClick={() => removeTab(id)} />
                {tabContent}
            </div>
        );
    }
}

Tab.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

Tab.contextTypes = {
    store: PropTypes.object.isRequired
};