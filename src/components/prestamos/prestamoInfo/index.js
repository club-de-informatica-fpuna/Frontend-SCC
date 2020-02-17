import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";

export default class PrestamoInfo extends Component {

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
                    <Image className="representative-image" src={prestamo.equipo.foto ? (prestamo.equipo.foto) : logo} width="150" thumbnail />
                    </p>
                    <section className="modal-info-fields">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{textAlign: "right"}}><strong>NOMBRES Y APELLIDOS: </strong>&nbsp;</td>
                                    <td>{prestamo.alumno.nombres + " " + prestamo.alumno.apellidos}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "right"}}><strong>N° DOCUMENTO: </strong>&nbsp;</td>
                                    <td>{prestamo.alumno.ci}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "right"}}><strong>CARRERA: </strong>&nbsp;</td>
                                    <td>{prestamo.alumno.idCarrera.denominacion}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "right"}}><strong>EQUIPO PRESTADO: </strong>&nbsp;</td>
                                    <td>{prestamo.equipo.descripcion}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "right"}}><strong>FECHA PRÉSTAMO: </strong>&nbsp;</td>
                                    <td>{this.fromRFCToFormat(prestamo.fechaPrestamo)}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "right"}}><strong>FECHA DEVOLUCIÓN: </strong>&nbsp;</td>
                                    <td>{prestamo.fechaDevolucion == undefined ? "NO DEVUELTO" : this.fromRFCToFormat(prestamo.fechaDevolucion)}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "right"}}><strong>ESTADO: </strong>&nbsp;</td>
                                    <td>{prestamo.fechaDevolucion == undefined ? "PENDIENTE" : "DEVUELTO"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
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