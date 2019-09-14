import React, {Component} from 'react';
import {Navbar, Nav, Form} from 'react-bootstrap';

export default class Header extends Component {
    constructor(props, context){
        super(props);
        this.state ={
            currentPath: "INICIO"
        }
    }

    componentWillReceiveProps(nextProps){
        this.handleUpdateCurrentPath(nextProps.mainPath);
    }

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link style={{color: "white"}} href="">{this.state.currentPath}</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav.Link style={{color: "white"}} href="#home">CONFIGURACIÓN</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#home">ACERCA DE</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="#home">SALIR</Nav.Link>
                </Form>
            </Navbar>
        );
    }
    handleUpdateCurrentPath(path){
        let index = path.lastIndexOf("/");
        let newPath = path.substring(index + 1, path.length).toLocaleUpperCase();
        this.setState({currentPath: newPath === "HOME" ? "INICIO" : newPath});
    }
}