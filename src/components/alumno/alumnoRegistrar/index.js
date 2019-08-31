import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class AlumnoRegistrar extends Component {

    constructor(props){
        super(props);
        this.state = {
            carreras: [],
            nombres: "",
            apellidos: "",
            documento: "",
            carreraSelected: 0,
            telefono: "",
            email: ""
        };
    }

    render() {

        let optionsCarreras = <option disabled={true}> - No hay carreras - </option>
        let carreras = this.props.carreras;
        if(carreras != undefined && carreras.length > 0){
            optionsCarreras = carreras.map((i) => (
              <option key={i.idCarrera} value={i.idCarrera}>{i.denominacion}</option>
            ));
        }

        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo alumno</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNombres">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese sus nombres"
                                value={this.state.nombres}
                                onChange={(e)=>{this.changeField(e, "nombres")}}/>
                        </Form.Group>
                        <Form.Group controlId="formApellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese sus apellidos"
                                value={this.state.apellidos}
                                onChange={(e)=>{this.changeField(e, "apellidos")}}/>
                        </Form.Group>
                        <Form.Group controlId="formDocumento">
                            <Form.Label>N° Documento</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese su documento"
                                value={this.state.documento}
                                onChange={(e)=>{this.changeField(e, "documento")}}/>
                        </Form.Group>
                        <Form.Group controlId="formTelefono">
                            <Form.Label>N° Teléfono o Celular</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="N° de Teléfono o Celular"
                                value={this.state.telefono}
                                onChange={(e)=>{this.changeField(e, "telefono")}}/>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese su email"
                                value={this.state.email}
                                onChange={(e)=>{this.changeField(e, "email")}}/>
                        </Form.Group>
                        <Form.Group controlId="formCarrera">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Control
                                as="select"
                                value={this.state.carreraSelected}
                                onChange={(e)=>{this.changeField(e, "carreraSelected")}}>
                                <option value={0} disabled>Seleccione una carrera</option>
                                {optionsCarreras}
                            </Form.Control>
                        </Form.Group>                        
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                    <Button variant="primary" onClick={this.handleSaveAlumno.bind(this)}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleSaveAlumno(e){
        e.preventDefault();
        let alumno = {
            apellidos: this.state.apellidos,
            ci: this.state.documento,
            email: this.state.email,
            idCarrera: parseInt(this.state.carreraSelected),
            nombres: this.state.nombres,
            telefono: this.state.telefono
        }
        if(true){ // validar
            this.props.save(e, alumno);
        }
    }

    changeField(e, field){
        e.preventDefault();
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

}