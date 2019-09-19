import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class CategoriaRegistrar extends Component {

    constructor(props){
        super(props);
        this.state = {
            descripcion: "",
            file: undefined
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
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.descripcion}
                                onChange={(e)=>{this.changeField(e, "descripcion")}}
                                placeholder="Ingrese la descripción"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Fotografía</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Ingrese la imagen"
                                onChange={(e) => {this.changeFile(e)}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                    <Button variant="primary" onClick={this.handleSave.bind(this)}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        );
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
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function() {
            this.setState({
                file: window.btoa(reader.result)
            });
        }.bind(this);
    }    

    handleSave(e){
        e.preventDefault();
        var obj = {
            denominacion: this.state.descripcion,
            logoRepresentante: this.state.file
        }
        if(true){ this.props.save(e, obj); }
    }

}