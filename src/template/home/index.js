import React, {Component} from 'react';

import Header from '../header'
import Body from '../body'

import './home.css'

export default class Home extends Component {

    constructor(props, context){
        super(props);
        this.state = {
            showSideBar:true
        };
    }

    render() {

        return(
            <div style={{height: "100%"}}>
                <Header sidebarFunction={this.handleSidebar.bind(this)} mainPath={this.props.currentPath}/>
                <Body showMenu={this.state.showSideBar} pathMatch={this.props.pathMatch} history={this.props.history}/>
            </div>
        );
    }

    handleSidebar(e){
        e.preventDefault();
        this.setState({
            showSideBar: !this.state.showSideBar
        });
    }
}