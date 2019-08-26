import React, {Component} from 'react';
import Menu from '../menu-side';
import Container from '../container';

import './body.css';

export default class Body extends Component {
    constructor(props, context){
        super(props);
    }

    render(){
        return(
            <div>
                <Menu showSide = {this.props.showMenu}/>
                <Container showSide = {this.props.showMenu}/>
            </div>
        );
    }
}
