import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaUserTie, FaRegAddressCard, FaCubes, FaDonate, FaTicketAlt } from "react-icons/fa";
import "./menu.css";

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var current = this.props.history.location.pathname;
        return (
            <Nav variant="pills" style={{justifyContent: "center", padding: "10px"}}>
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home" ? " path-selected" : "")} to={`${this.props.pathMatch}`}>
                        <FaHome />&nbsp;&nbsp;&nbsp;
                        <span>INICIO</span>
                    </Link>
                </Nav.Item>&nbsp;&nbsp;&nbsp;
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home/alumnos" ? " path-selected" : "")} to={`${this.props.pathMatch}/alumnos`}>
                        <FaUserGraduate />&nbsp;&nbsp;&nbsp;
                       <span>ALUMNOS</span>
                    </Link>
                </Nav.Item>&nbsp;&nbsp;&nbsp;
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home/socios" ? " path-selected" : "")} to={`${this.props.pathMatch}/socios`}>
                        <FaUserTie />&nbsp;&nbsp;&nbsp;
                        <span>SOCIOS</span>
                    </Link>
                </Nav.Item>&nbsp;&nbsp;&nbsp;
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home/prestamos" ? " path-selected" : "")} to={`${this.props.pathMatch}/prestamos`}>
                        <FaRegAddressCard />&nbsp;&nbsp;&nbsp;
                        <span>PRÉSTAMOS</span>
                    </Link>
                </Nav.Item>&nbsp;&nbsp;&nbsp;
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home/equipos" ? " path-selected" : "")} to={`${this.props.pathMatch}/equipos`}>
                        <FaCubes />&nbsp;&nbsp;&nbsp;
                        <span>EQUIPOS</span>
                    </Link>
                </Nav.Item>&nbsp;&nbsp;&nbsp;
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home/productos" ? " path-selected" : "")} to={`${this.props.pathMatch}/productos`}>
                        <FaCubes />&nbsp;&nbsp;&nbsp;
                        <span>PRODUCTOS</span>
                    </Link>
                </Nav.Item>&nbsp;&nbsp;&nbsp;
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home/ventas" ? " path-selected" : "")} to={`${this.props.pathMatch}/ventas`}>
                        <FaTicketAlt />&nbsp;&nbsp;&nbsp;
                        <span>VENTAS</span>
                    </Link>
                </Nav.Item>&nbsp;&nbsp;&nbsp;
                <Nav.Item style={{marginTop: "10px"}}>
                    <Link className={"list-group-item list-group-item-action list-group-item-light path-normal" + (current === "/home/caja" ? " path-selected" : "")} to={"/"}>
                        <FaDonate />&nbsp;&nbsp;&nbsp;
                        <span>CAJA</span>
                    </Link>
                </Nav.Item>                
            </Nav>
        );
    }

}