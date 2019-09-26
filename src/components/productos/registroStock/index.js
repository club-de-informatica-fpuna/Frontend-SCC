import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {validateField, validateNumber, validateSelect, validateDate} from "../../../util/validators";

export default class StockRegistro extends Component {

    constructor(props){
        super(props);
        this.state = {
            productos: [],
            productoSelected: 0,
            cantidad: "",
            fecha: this.now(),
            validated: true
        };
    }

        now() {
        let date = new Date();
        let stringDate = date.getUTCFullYear() + "-" + this.checkDigits(date.getUTCMonth() + 1) + "-" + this.checkDigits(date.getUTCDate());
        let time = this.checkDigits(date.getHours()) + ":" + this.checkDigits(date.getUTCMinutes());
        return stringDate + "T" + time;
    }

    checkDigits(digit) {
        return digit < 10 ? ("0" + digit) : digit;
    }

    render() {

        let productos = this.props.productos;
        let productosOptions = <option key="-1" value="-1">No hay productos</option>;
        if(productos !== undefined && productos.length > 0){
            productosOptions = productos.map( (i)=> (
                <option key={i.idProducto} value={i.idProducto}>{i.denominacion}</option>
            ));
        }

        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDenominacion">
                            <Form.Label><b>Producto</b></Form.Label>
                            <span className="validation-field" hidden={validateSelect(this.state.productoSelected)}>Debe seleccionar un producto</span>
                            <Form.Control
                                className={validateSelect(this.state.productoSelected) ? "input-validate-field-success" : "input-validate-field-error"}
                                as="select"
                                value={this.state.productoSelected}
                                onChange={(e)=>{this.changeField(e, "productoSelected")}}>
                                <option key="0" value="0"> - SELECCIONE EL PRODUCTO - </option>
                                {productosOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPrecio">
                            <Form.Label><b>Cantidad</b></Form.Label>
                            <span className="validation-field" hidden={validateNumber(this.state.cantidad, 1000, 1)}>Cantidad inválida</span>
                            <Form.Control
                                className={validateNumber(this.state.cantidad, 1000, 1) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="number"
                                placeholder="Ingrese la cantidad"
                                value={this.state.cantidad}
                                onChange={(e)=>{this.changeField(e, "cantidad")}}/>
                        </Form.Group>
                        <Form.Group controlId="formCantidad">
                            <Form.Label><b>Fecha ingreso</b></Form.Label>
                            <span className="validation-field" hidden={validateDate(this.state.fecha)}>Fecha inválida</span>
                            <Form.Control
                                className={validateDate(this.state.fecha) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="datetime-local"
                                value={this.state.fecha}
                                onChange={(e)=>{this.changeField(e, "fecha")}}/>
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

    convertDate(date){
        if(date === undefined){ return null; }
        return date + ":00Z";
    }

    validateAllFields(stock){
        if(validateSelect(stock.idProducto) &&
            validateNumber(stock.cantidad, 1000, 1) &&
            validateDate(stock.fechaRegistro)){
            return true;
        }
        return false;
    }

    handleSave(e){
        e.preventDefault();
        let stock = {
            cantidad: this.state.cantidad,
            fechaRegistro: this.convertDate(this.state.fecha),
            idProducto: this.state.productoSelected
        }
        if(this.validateAllFields(stock)){
            this.setState({validated: true}, this.props.save(e, stock));
        }
        else{
            this.setState({validated: false});
        }
    }

}