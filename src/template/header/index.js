import React, { Component } from 'react';
import { Navbar, Image, Nav, Form, Dropdown } from 'react-bootstrap';
import { FaBell } from "react-icons/fa";
import axios from "axios";
import "./header.css";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: "INICIO",
            notificaciones: []
        }
    }

    componentWillMount(){
        this.getNotifications();        
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
/*             Notification.requestPermission().then(function(result) {
                for(var i = 0; i < notificaciones.length; i++){
                    var options = {
                        body: notificaciones[i].contenido,
                        icon: undefined
                    }
                    var notification = new Notification(notificaciones[i].titulo, options);
                }
            });     */        
            notificacionesMostrar = notificaciones.map( (i) => (
                <Dropdown.Item className="notification-item">
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
                        <Dropdown alignRight onClick={(e) => {this.getNotifications()}}>
                            <Dropdown.Toggle variant="success" className="notification-button">
                                <FaBell/>&nbsp;&nbsp;<strong>{cantidadNotificaciones}</strong>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification-item-group">
                                {notificacionesMostrar}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Link>
                </Form>
            </Navbar>
        );
    }

    getNotifications(){
        axios.get(process.env.REACT_APP_API_URL + "/notificaciones")
        .then(res => {
            this.setState({ notificaciones: res.data });
        })
        .catch(error => {
            this.setState({ notificaciones: [] });
        });
    }


    handleUpdateCurrentPath(path) {
        let index = path.lastIndexOf("/");
        let newPath = path.substring(index + 1, path.length).toLocaleUpperCase();
        this.setState({ currentPath: newPath === "HOME" ? "INICIO" : newPath });
    }

}