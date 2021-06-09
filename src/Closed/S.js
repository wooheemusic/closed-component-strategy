import { Component } from 'react';

// Stateful but has children from parents
export default class S extends Component {
    constructor() {
        super();
        this.state = {
            closed: 1,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // if (e.currentTarget === e.target) {
            this.setState({ closed: this.state.closed + 1 });
        // }
    }

    render() {
        console.log('S: ', this.state.closed);
        return (<div onClick={this.handleClick}>
            Stateful but has children from parents {this.state.closed}
            {this.props.children}
        </div>);
    }
}