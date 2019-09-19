import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class ProductoRegistro extends Component {

    constructor(props){
        super(props);
        this.state = {
            denominacion: "",
            precio: "",
            cantidad: "",
            foto: undefined
        };
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDenominacion">
                            <Form.Label><b>Denominación</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la denominación"
                                value={this.state.denominacion}
                                autoComplete="off"
                                onChange={(e)=>{this.changeField(e, "denominacion")}}/>
                        </Form.Group>
                        <Form.Group controlId="formPrecio">
                            <Form.Label><b>Precio</b></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el precio"
                                value={this.state.precio}
                                onChange={(e)=>{this.changeField(e, "precio")}}/>
                        </Form.Group>
                        <Form.Group controlId="formCantidad">
                            <Form.Label><b>Cantidad inicial</b></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese la cantidad"
                                value={this.state.cantidad}
                                onChange={(e)=>{this.changeField(e, "cantidad")}}/>
                        </Form.Group>
                        <Form.Group controlId="formFotografia">
                            <Form.Label><b>Fotografía</b></Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e)=>{this.changeFile(e)}}/>
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
                foto: window.btoa(reader.result)
            });
        }.bind(this);
    }

    handleSave(e){
        e.preventDefault();
        let producto = {
            denominacion: this.state.denominacion,
            estado: true,
            foto: this.state.foto,
            precio: this.state.precio
        }
        if(true){
            this.props.save(e, producto);
        }
    }

}