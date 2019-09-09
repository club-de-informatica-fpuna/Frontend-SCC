import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaUserTie, FaRegAddressCard, FaCubes, FaDonate, FaTicketAlt } from "react-icons/fa";

export default class Menu extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroup className="side-nav" style={this.props.showSide ? { width: 0 } : {}}>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}`}>
                    <FaHome/>&nbsp;&nbsp;&nbsp;
                    <span>INICIO</span>
                </Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/alumnos`}>
                    <FaUserGraduate/>&nbsp;&nbsp;&nbsp;
                    <span>ALUMNOS</span>
                </Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/socios`}>
                    <FaUserTie/>&nbsp;&nbsp;&nbsp;           
                    <span>SOCIOS</span>
                </Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/prestamos`}>
                    <FaRegAddressCard/>&nbsp;&nbsp;&nbsp;
                    <span>PRÉSTAMOS</span>
                </Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/equipos`}>
                    <FaCubes/>&nbsp;&nbsp;&nbsp;
                    <span>EQUIPOS</span>
                </Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>
                    <FaCubes/>&nbsp;&nbsp;&nbsp;
                    <span>PRODUCTOS</span>
                </Link>                
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>
                    <FaTicketAlt/>&nbsp;&nbsp;&nbsp;
                    <span>VENTAS</span>
                </Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>
                    <FaDonate/>&nbsp;&nbsp;&nbsp;
                    <span>CAJA</span>
                </Link>
            </ListGroup>
        );
    }

}