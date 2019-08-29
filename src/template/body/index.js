import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Menu from '../menu-side';
import Container from '../container';

import './body.css';

export default class Body extends Component {
    constructor(props, context){
        super(props);
    }

    render(){
        return(
            <div style={{background: "#002764", height: "100%"}}>
                <Menu showSide={this.props.showMenu} pathMatch={this.props.pathMatch}/>
                <Container pathMatch={this.props.pathMatch} showSide={this.props.showMenu}/>
            </div>
        );
    }
}
