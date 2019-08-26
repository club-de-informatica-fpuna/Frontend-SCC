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

    componentWillMount(){}
    
    render() {
        return(
            <div>
                <Header sidebarFunction={this.handleSidebar.bind(this)} />
                <Body showMenu={this.state.showSideBar} />
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