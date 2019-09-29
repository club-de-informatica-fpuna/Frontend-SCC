import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {validateField, validateNumber, validateEmail, validateSelect} from "../../../util/validators";

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
                            <Form.Label><b>Nombres</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.nombres, 15, 3)}>Nombre inválido</span>
                            <Form.Control
                                className={validateField(this.state.nombres, 15, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                placeholder="Ingrese sus nombres"
                                value={this.state.nombres}
                                autoComplete="off"
                                onChange={(e)=>{this.changeField(e, "nombres")}}/>
                        </Form.Group>
                        <Form.Group controlId="formApellidos">
                            <Form.Label><b>Apellidos</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.apellidos, 15, 3)}>Apellido inválido</span>                            
                            <Form.Control
                                className={validateField(this.state.apellidos, 15, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                placeholder="Ingrese sus apellidos"
                                autoComplete="off"
                                value={this.state.apellidos}
                                onChange={(e)=>{this.changeField(e, "apellidos")}}/>
                        </Form.Group>
                        <Form.Group controlId="formDocumento">
                            <Form.Label><b>N° Documento</b></Form.Label>
                            <span className="validation-field" hidden={validateNumber(this.state.documento, 99999999, 99999)}>N° de documento inválido</span>
                            <Form.Control
                                className={validateNumber(this.state.documento, 99999999, 99999) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="number"
                                placeholder="Ingrese su número de documento"
                                autoComplete="off"
                                value={this.state.documento}
                                onChange={(e)=>{this.changeField(e, "documento")}}/>
                        </Form.Group>
                        <Form.Group controlId="formTelefono">
                            <Form.Label><b>N° Teléfono o Celular</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.telefono, 20, 7)}>N° de celular inválido</span>                            
                            <Form.Control
                                className={validateField(this.state.telefono, 20, 7) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                placeholder="N° de Teléfono o Celular"
                                autoComplete="off"
                                value={this.state.telefono}
                                onChange={(e)=>{this.changeField(e, "telefono")}}/>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label><b>Correo electrónico</b></Form.Label>
                            <span className="validation-field" hidden={validateEmail(this.state.email)}>Email inválido</span>
                            <Form.Control
                                className={validateEmail(this.state.email) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="email"
                                placeholder="Ingrese su email"
                                autoComplete="off"
                                value={this.state.email}
                                onChange={(e)=>{this.changeField(e, "email")}}/>
                        </Form.Group>
                        <Form.Group controlId="formCarrera">
                            <Form.Label><b>Carrera</b></Form.Label>
                            <span className="validation-field" hidden={validateSelect(this.state.carreraSelected)}>Debes seleccionar una carrera</span>                            
                            <Form.Control
                                className={validateSelect(this.state.carreraSelected) ? "input-validate-field-success" : "input-validate-field-error"}
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
        if(validateField(alumno.nombres, 15, 3) && 
            validateField(alumno.apellidos, 15, 3) &&
            validateNumber(alumno.ci, 99999999, 99999) &&
            validateField(alumno.telefono, 20, 7) &&
            validateEmail(alumno.email) &&
            validateSelect(alumno.idCarrera)){
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

}