import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import { SearchInput } from '../components/SearchInput';

class SearchInputContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: false
        };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus(e){
        console.log(e);
        this.setState({
            active: true
        });
    }

    onBlur(){
        this.setState({
            active: false
        });
    }

    render(){

        const { filterText, onChange } = this.props;
        let classList = this.state.active ? 'active': null;

        return (
            <SearchInput
                filterText={filterText}
                onChange={onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                classList={classList}
            />
        );
    }
}

export default pure(SearchInputContainer);