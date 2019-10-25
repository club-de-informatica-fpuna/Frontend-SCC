import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {validateField, validateNumber} from "../../../util/validators";
import {FaFileImage} from "react-icons/fa";

export default class ProductoEditar extends Component {

    constructor(props){
        super(props);
        this.state = {
            idProducto: undefined,
            denominacion: "",
            precio: 0,
            foto: undefined,
            estado: true,
            fileSpan: "Seleccione el archivo",
            validated: true
        };
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.producto !== undefined){
            this.setState({
                idProducto: nextProps.producto.idProducto,
                denominacion: nextProps.producto.denominacion,
                precio: nextProps.producto.precio,
                foto: nextProps.producto.foto,
                estado: nextProps.producto.estado
            });
        }
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDenominacion">
                            <Form.Label><b>Denominación</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.denominacion, 50, 3)}>Denominación inválida</span>
                            <Form.Control
                                className={validateField(this.state.denominacion, 50, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                placeholder="Ingrese la denominación"
                                value={this.state.denominacion}
                                autoComplete="off"
                                onChange={(e)=>{this.changeField(e, "denominacion")}}/>
                        </Form.Group>
                        <Form.Group controlId="formPrecio">
                            <Form.Label><b>Precio</b></Form.Label>
                            <span className="validation-field" hidden={validateNumber(this.state.precio, 99999999, 250)}>Precio inválido</span>                            
                            <Form.Control
                                className={validateNumber(this.state.precio, 99999999, 250) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="number"
                                placeholder="Ingrese el precio"
                                value={this.state.precio}
                                onChange={(e)=>{this.changeField(e, "precio")}}/>
                        </Form.Group>
                        <Form.Group controlId="formFotografia">
                            <Form.Label><b>Fotografía</b></Form.Label>
                            <Form.Control hidden type="file" id="file" onChange={(e)=>{this.changeFile(e)}}/>
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
            reader.readAsDataURL(file);
            reader.onload = function() {
                this.setState({
                    foto: window.btoa(reader.result),
                    fileSpan: file.name
                });
            }.bind(this);
        }
    }     

    validateAllFields(producto){
        if(validateField(producto.denominacion, 50, 3) &&
            validateNumber(producto.precio, 99999999, 250)){
            return true;
        }
        return false;
    }    

    handleSave(e){
        e.preventDefault();
        let producto = {
            idProducto: this.state.idProducto,
            denominacion: this.state.denominacion,
            estado: this.state.estado,
            foto: this.state.foto,
            precio: this.state.precio
        }
        if(this.validateAllFields(producto)){
            this.setState({validated: true}, this.props.update(e, producto));
        }
        else{
            this.setState({validated: false});
        }
    }

}