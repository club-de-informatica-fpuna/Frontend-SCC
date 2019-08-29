import React, {Component} from 'react';
import {Navbar, Nav, Form} from 'react-bootstrap';

export default class Header extends Component {
    constructor(props, context){
        super(props);
    }
    
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="cursor-style" onClick={this.props.sidebarFunction}>&#9776;</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link style={{color: "white"}} href="/home">INICIO</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav.Link style={{color: "white"}} href="#home">CONFIGURACIÓN</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#home">ACERCA DE</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#home">SALIR</Nav.Link>
                </Form>
            </Navbar>
        );
    }
}