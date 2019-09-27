import React, { Component } from 'react';
import { Navbar, Image, Nav, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaBell } from "react-icons/fa";
import "./header.css";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: "INICIO",
            notificaciones: this.mockNotificaciones()
        }
    }

    mockNotificaciones(){
        let notificaciones = [{
            titulo: "PRÉSTAMO PENDIENTE",
            contenido: "Gino Junchaya, Equipo de ping pong",
            detalle: "Prestado el 22/09/2019"
        },
        {
            titulo: "PRÉSTAMO PENDIENTE",
            contenido: "Iván Medina, Equipo de tereré",
            detalle: "Prestado el 24/09/2019"
        }];
        return notificaciones;
    }

    componentWillReceiveProps(nextProps) {
        this.handleUpdateCurrentPath(nextProps.mainPath);
    }

    render() {
        var logo = require("./scc.svg");
        let notificaciones = this.state.notificaciones;
        let notificacionesMostrar = [], cantidadNotificaciones = 0;
        if(notificaciones !== undefined && notificaciones.length > 0){
            cantidadNotificaciones = notificaciones.length;
            notificacionesMostrar = notificaciones.map( (i) => (
                <Dropdown.Item>
                    <p>
                        <strong>{i.titulo}</strong><br/>
                        {i.contenido}<br/>
                        {i.detalle}
                    </p>
                </Dropdown.Item>
            ));
        }
        return (
            <Navbar bg="dark" style={{ backgroundImage: "linear-gradient(to bottom right, #373737, black)" }}>
                <Nav className="mr-auto">
                    <Nav.Link style={{ color: "white" }} href="">
                        <Image src={logo} height={50} />
                    </Nav.Link>
                </Nav>
                <Form inline style={{ fontSize: "15px" }}>
                    <Nav.Link style={{ color: "white" }} href="#home">
                        <Dropdown alignRight>
                            <Dropdown.Toggle variant="success" className="notification-button">
                                <FaBell/>&nbsp;&nbsp;<strong>{cantidadNotificaciones}</strong>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {notificacionesMostrar}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Link>
                    <Nav.Link style={{ color: "white" }} href="#home">ACERCA DE</Nav.Link>
                    <Nav.Link style={{ color: "white" }} href="#home">SALIR</Nav.Link>
                </Form>
            </Navbar>
        );
    }
    handleUpdateCurrentPath(path) {
        let index = path.lastIndexOf("/");
        let newPath = path.substring(index + 1, path.length).toLocaleUpperCase();
        this.setState({ currentPath: newPath === "HOME" ? "INICIO" : newPath });
    }
}