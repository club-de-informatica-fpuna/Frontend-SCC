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
                    <Nav.Link href="#home">Inicio</Nav.Link>
                    <Nav.Link href="#features">Otros</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav.Link href="#home">Configuracion</Nav.Link>
                    <Nav.Link href="#home">Acerca de</Nav.Link>
                    <Nav.Link href="#home">Salir</Nav.Link>
                </Form>
            </Navbar>
        );
    }
}