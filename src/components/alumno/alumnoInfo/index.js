import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";

export default class AlumnoInfo extends Component {

    constructor(props){
        super(props);
    }

    render() {
        var logo = require("./user.png");
        var alumno = this.props.alumno;
        if(alumno === undefined){ return (<></>) }
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title><b>{alumno.nombres.toUpperCase() + " " + alumno.apellidos.toUpperCase()}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: "center"}}>
                        <Image className="representative-image" src={logo} width="150" roundedCircle />
                    </p>
                    <section className="modal-info-fields">
                        <p><strong>NOMBRES: </strong>{alumno.nombres}</p>
                        <p><strong>APELLIDOS: </strong>{alumno.apellidos}</p>
                        <p><strong>N° DOCUMENTO: </strong>{alumno.ci}</p>
                        <p><strong>TELÉFONO o CELULAR: </strong>{alumno.telefono}</p>
                        <p><strong>CORREO ELECTRÓNICO: </strong>{alumno.email}</p> 
                        <p><strong>CARRERA: </strong>{alumno.idCarrera.denominacion}</p>
                        <p><strong>ASOCIADO: </strong>{alumno.asociado ? "SÍ" : "NO"}</p>                                        
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}