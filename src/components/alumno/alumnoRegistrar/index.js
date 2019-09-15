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
            email: "",
            validated: true
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
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo alumno</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNombres">
                            <Form.Label>Nombres</Form.Label>
                            <span className="validation-field" hidden={this.validateField(this.state.nombres, 15, 3)}>Nombre inválido</span>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese sus nombres"
                                value={this.state.nombres}
                                autoComplete="off"
                                onChange={(e)=>{this.changeField(e, "nombres")}}/>
                        </Form.Group>
                        <Form.Group controlId="formApellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <span className="validation-field" hidden={this.validateField(this.state.apellidos, 15, 3)}>Apellido inválido</span>                            
                            <Form.Control
                                type="text"
                                placeholder="Ingrese sus apellidos"
                                autoComplete="off"
                                value={this.state.apellidos}
                                onChange={(e)=>{this.changeField(e, "apellidos")}}/>
                        </Form.Group>
                        <Form.Group controlId="formDocumento">
                            <Form.Label>N° Documento</Form.Label>
                            <span className="validation-field" hidden={this.validateNumber(this.state.documento, 99999999, 99999)}>N° de documento inválida</span>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese su documento"
                                autoComplete="off"
                                value={this.state.documento}
                                onChange={(e)=>{this.changeField(e, "documento")}}/>
                        </Form.Group>
                        <Form.Group controlId="formTelefono">
                            <Form.Label>N° Teléfono o Celular</Form.Label>
                            <span className="validation-field" hidden={this.validateField(this.state.telefono, 20, 7)}>N° de celular inválido</span>                            
                            <Form.Control
                                type="text"
                                placeholder="N° de Teléfono o Celular"
                                autoComplete="off"
                                value={this.state.telefono}
                                onChange={(e)=>{this.changeField(e, "telefono")}}/>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <span className="validation-field" hidden={this.validateEmail(this.state.email)}>Email inválido</span>                            
                            <Form.Control
                                type="email"
                                placeholder="Ingrese su email"
                                autoComplete="off"
                                value={this.state.email}
                                onChange={(e)=>{this.changeField(e, "email")}}/>
                        </Form.Group>
                        <Form.Group controlId="formCarrera">
                            <Form.Label>Carrera</Form.Label>
                            <span className="validation-field" hidden={this.validateSelect(this.state.carreraSelected)}>Debes seleccionar una carrera</span>                            
                            <Form.Control
                                as="select"
                                value={this.state.carreraSelected}
                                onChange={(e)=>{this.changeField(e, "carreraSelected")}}>
                                <option value={0} disabled>Seleccione una carrera</option>
                                {optionsCarreras}
                            </Form.Control>
                        </Form.Group>                        
                    </Form>
                    <span className="validation-field" hidden={this.state.validated} style={{textAlign: "center", fontWeight: "bold"}}>Por favor, revise los campos marcados.</span>
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
        if(this.validateAllFields(alumno)){
            this.setState({validated: true}, this.props.save(e, alumno));
        }
        else{
            this.setState({validated: false});
        }
    }

    validateAllFields(alumno){
        if(this.validateField(alumno.nombres, 15, 3) && 
            this.validateField(alumno.apellidos, 15, 3) &&
            this.validateNumber(alumno.ci, 99999999, 99999) &&
            this.validateField(alumno.telefono, 20, 7) &&
            this.validateEmail(alumno.email) &&
            this.validateSelect(alumno.idCarrera)){
            return true;
        }
        return false;
    }

    changeField(e, field){
        e.preventDefault();
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    validateField(value, max, min){       
        if(value === undefined){  return false; } // undefined
        if (value && value.trim().length === 0) { return false; } // vacio        
        if(value.length >= min && value.length <= max) { return true; } // min y max
        return false;
    }

    validateNumber(value, max, min){       
        if(value === undefined){  return false; } // undefined
        if (value && value.trim().length === 0) { return false; } // vacio        
        if(value >= min && value <= max) { return true; } // min y max
        return false;
    }    

    validateEmail(value){
        if(value === undefined){  return false; } // undefined
        if (value && value.trim().length === 0) { return false; } // vacio
        var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(value)) { return true; }
        return false;
    }

    validateSelect(value){
        if(value === 0){ return false; }
        return true;
    }    

}