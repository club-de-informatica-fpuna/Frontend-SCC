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
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}`}>INICIO</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/alumnos`}>ALUMNOS</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/socios`}>SOCIOS</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/prestamos`}>PRÉSTAMOS</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>EQUIPOS</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>VENTAS</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>CAJA</Link>
            </ListGroup>
        );
    }

}