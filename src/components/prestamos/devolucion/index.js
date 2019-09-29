import React, { Component } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

export default class DevolucionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devolucion: this.now()
        }
    }

    now(){
        let date = new Date();
        let stringDate = date.getFullYear() + "-" + this.checkDigits(date.getMonth()+1) + "-" + this.checkDigits(date.getDate());
        let time = this.checkDigits(date.getHours()) + ":" + this.checkDigits(date.getUTCMinutes());
        return stringDate + "T" + time;
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }

    render() {

        let prestamo = this.props.prestamo;
        if(prestamo === undefined){ return (<></>); }

        return (
            <section>
                <Modal show={this.props.show} close={this.props.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmación de devolución</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>N° Documento</Form.Label>
                            <Form.Group as={Row} controlId="formDocumento">
                                <Col>
                                    <Form.Control disabled type="number" value={prestamo.alumno.ci} />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formNombres">
                                <Form.Label>Nombre y Apellido</Form.Label>
                                <Form.Control type="text" 
                                    value={prestamo.alumno.nombres + " " + prestamo.alumno.apellidos}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="formNombres">
                                <Form.Label>Equipo</Form.Label>
                                <Form.Control type="text" value={prestamo.equipo.descripcion} disabled/>
                            </Form.Group>                            
                            <Form.Group controlId="formTelefono">
                                <Form.Label>Fecha préstamo</Form.Label>
                                <Form.Control type="text" value={this.fromRFCToFormat(prestamo.fechaPrestamo)} disabled/>
                            </Form.Group>
                            <Form.Group controlId="formTelefono">
                                <Form.Label>Fecha devolución</Form.Label>
                                <Form.Control type="datetime-local" value={this.state.devolucion} onChange={(e)=>{this.changeField(e, "devolucion")}}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                        <Button variant="primary" onClick={this.handleSave.bind(this)}>Confirmar</Button>
                    </Modal.Footer>
                </Modal>
            </section>
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

    changeField(e, field) {
        e.preventDefault();
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    convertDate(date){
        if(date === undefined){ return null; }
        return date + ":00Z";
    }

    handleSave(e){
        e.preventDefault();
        let prestamo = this.props.prestamo;
        var obj = {
            ciAlumno: prestamo.alumno.ci,
            estado: true,
            fechaDevolucion: this.convertDate(this.state.devolucion),
            fechaPrestamo: prestamo.fechaPrestamo,
            idEquipo: prestamo.equipo.idEquipo,
            idPrestamo: prestamo.idPrestamo 
        }
        this.props.save(e, obj);        
    }

}