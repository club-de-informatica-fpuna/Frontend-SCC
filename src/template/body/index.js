import React, {Component} from 'react';
import MenuSide from '../menu-side';
import Container from '../container';

import './body.css';

export default class Body extends Component {

    render(){
        return(
            <div style={{background: "white", height: "100%"}}>
                <MenuSide showSide={this.props.showMenu} pathMatch={this.props.pathMatch} history={this.props.history}/>
                <Container pathMatch={this.props.pathMatch} showSide={this.props.showMenu}/>
            </div>
        );
    }
}
