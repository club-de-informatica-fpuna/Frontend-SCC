import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    
    constructor(props, context) {
        super(props);
    }

    render() {
        return (
            <ListGroup className="side-nav" style={this.props.showSide ? { "width": 0 } : {}}>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Inicio</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/alumnos`}>Alumnos</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/home/socio"}>Socios</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Prestamos</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Equipos</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Ventas</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Caja</Link>
            </ListGroup>
        );
    }

}