import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {validateField} from "../../../util/validators";

export default class NuevaCarrera extends Component {

    constructor(props){
        super(props);
        this.state = {
            nombre: "",
            validated: true
        };
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva carrera</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNombres">
                            <Form.Label><b>Nombre de la carrera</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.nombre, 100, 3)}>Nombre inválido</span>
                            <Form.Control
                                className={validateField(this.state.nombre, 100, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                placeholder="Ingrese el nombre de la carrera"
                                value={this.state.nombre}
                                autoComplete="off"
                                onChange={(e)=>{this.changeField(e, "nombre")}}/>
                        </Form.Group>               
                    </Form>
                    <span className="validation-field" hidden={this.state.validated} style={{textAlign: "center", fontWeight: "bold"}}>Por favor, revise los campos marcados.</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                    <Button variant="primary" onClick={this.handleSaveCarrera.bind(this)}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleSaveCarrera(e){
        e.preventDefault();
        let carrera = { denominacion: this.state.nombre }
        if(this.validateAllFields(carrera)){
            this.setState({validated: true}, this.props.save(e, carrera));
        }
        else{
            this.setState({validated: false});
        }
    }

    validateAllFields(carrera){
        if(validateField(carrera.denominacion, 100, 3)){
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