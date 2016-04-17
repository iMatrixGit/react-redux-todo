import React, { PropTypes } from 'react';
import { pure } from 'recompose';

class Counter extends React.Component {
    componentWillReceiveProps(nextProps){
        this.refs.counter.classList.add('active');
        setTimeout(() => this.refs.counter.classList.remove('active'), 200);
    }
    render(){
        const { count } = this.props;

        return (
            <div className="counter-wrapper">
                <span ref="counter" className="counter">{count}</span>
            </div>
        )
    }
}

Counter.propTypes = {
    count: PropTypes.number
};

export default pure(Counter);
