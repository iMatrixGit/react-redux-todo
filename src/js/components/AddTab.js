import React, { PropTypes } from 'react';
import { pure } from 'recompose'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class AddTab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titleText: '',
            contentText: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleClick(e){
        const { addTab } = this.props;
        const {titleText, contentText} = this.state;

        addTab(titleText, contentText);

        this.setState({
            titleText: '',
            contentText: ''
        })
    }

    handleTitleChange(e){
        this.setState({
            titleText: e.target.value
        });
    }

    handleContentChange(e){
        this.setState({
            contentText: e.target.value
        });
    }

    render(){
        const { titleText, contentText } = this.state;

        return (
            <div className="add-tab-menu">
                <TextField
                    hintText="Enter tab title"
                    value={titleText}
                    onChange={this.handleTitleChange}
                />
                <TextField
                    hintText="Enter tab title"
                    value={contentText}
                    onChange={this.handleContentChange}
                />
                <RaisedButton
                    label="Add tab"
                    secondary={true}
                    onMouseUp={this.handleClick}
                />
            </div>
        )
    }
}

export default pure(AddTab);