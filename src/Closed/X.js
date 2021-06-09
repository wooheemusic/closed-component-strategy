import { Component } from 'react';
import P from './P';
import C from './C';

// Stateful and renders own children
export default class X extends Component {
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
        console.log('X: ', this.state.closed);
        return (<div onClick={this.handleClick} >
            Stateful and renders own children {this.state.closed}
            <P name="mother3" ><P name="baby3" /></P>
            <C name="mother4"><P name="baby4" /></C>
            <P name="person3" />
            <C name="person4" />
        </div>);
    }
}