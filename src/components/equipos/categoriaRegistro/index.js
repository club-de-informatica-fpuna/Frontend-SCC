import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {validateField} from "../../../util/validators";
import {FaFileImage} from "react-icons/fa";

export default class CategoriaRegistrar extends Component {

    constructor(props){
        super(props);
        this.state = {
            descripcion: "",
            file: undefined,
            fileSpan: "Seleccione el archivo",
            validated: true
        };
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label><b>Descripción</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.descripcion, 50, 3)}>Descripción inválida</span>
                            <Form.Control
                                className={validateField(this.state.descripcion, 50, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                value={this.state.descripcion}
                                onChange={(e)=>{this.changeField(e, "descripcion")}}
                                placeholder="Ingrese la descripción"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label><b>Fotografía</b></Form.Label>
                            <Form.Control hidden id="file" type="file" onChange={(e) => {this.changeFile(e)}}/>
                            <Form.Label className="input-file-field" for="file">
                                <FaFileImage/>&nbsp;&nbsp;
                                <span>{this.state.fileSpan}</span>
                            </Form.Label>
                        </Form.Group>
                    </Form>
                    <span className="validation-field" hidden={this.state.validated} style={{textAlign: "center", fontWeight: "bold"}}>Por favor, revise los campos marcados.</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                    <Button variant="primary" onClick={this.handleSave.bind(this)}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    validateAllFields(categoria){
        if(validateField(categoria.denominacion, 50, 3)){
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

    changeFile(e){
        e.preventDefault();
        var file = e.target.files[0];
        if(file !== undefined){
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function() {
                this.setState({
                    file: window.btoa(reader.result),
                    fileSpan: file.name
                });
            }.bind(this);
        }
    }    

    handleSave(e){
        e.preventDefault();
        var obj = {
            denominacion: this.state.descripcion,
            logoRepresentante: this.state.file
        }
        if(this.validateAllFields(obj)){
            this.setState({validated: true}, this.props.save(e, obj));
        }
        else{
            this.setState({validated: false});
        }
    }

}