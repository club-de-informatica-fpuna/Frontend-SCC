import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";

export default class PrestamoInfo extends Component {

    constructor(props){
        super(props);
    }

    render() {
        var logo = require("./equip.png");
        var prestamo = this.props.prestamo;
        if(prestamo === undefined){ return (<></>) }
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title><b>{"Préstamo ID: " + prestamo.idPrestamo}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: "center"}}>
                        <Image src={logo} width="150" roundedCircle />
                    </p>
                    <p><strong>NOMBRES Y APELLIDOS: </strong>{prestamo.alumno.nombres + " " + prestamo.alumno.apellidos}</p>
                    <p><strong>N° DOCUMENTO: </strong>{prestamo.alumno.ci}</p>
                    <p><strong>CARRERA: </strong>{prestamo.alumno.idCarrera.denominacion}</p>
                    <p><strong>EQUIPO PRESTADO: </strong>{prestamo.equipo.descripcion}</p>
                    <p><strong>FECHA PRÉSTAMO: </strong>{this.fromRFCToFormat(prestamo.fechaPrestamo)}</p>
                    <p><strong>FECHA DEVOLUCIÓN: </strong>{prestamo.fechaDevolucion === undefined ? "NO DEVUELTO" : this.fromRFCToFormat(prestamo.fechaDevolucion)}</p>
                    <p><strong>ESTADO: </strong>{prestamo.fechaDevolucion === undefined ? "PENDIENTE" : "DEVUELTO"}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    fromRFCToFormat(date){
        if(date === undefined){ return ""; }
        let fecha = new Date(date);
        return this.checkDigits(fecha.getUTCDate()) + "/" +
            this.checkDigits((fecha.getUTCMonth() + 1)) +
            "/" + fecha.getUTCFullYear() + " " +
            this.checkDigits(fecha.getUTCHours()) +
            ":" + this.checkDigits(fecha.getUTCMinutes()) +
            ":" + this.checkDigits(fecha.getUTCSeconds());
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }        

}