import React, { Component } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import {validateField, validateNumber, validateDate, validateList, validateSelect} from "../../../util/validators";
import axios from "axios";

export default class VentaRegistro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clienteNombre: "CLIENTE OCASIONAL",
            clienteDocumento: "1111111-1",
            fecha: this.now(),
            items: [],
            importeTotal: 0,
            productos: [],            
            itemProductoSelected: 0,
            itemProductoConcepto: "",
            itemPrecio: 0,
            itemCantidad: 1,
            itemSubtotal: 0,
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

    componentWillMount() {
        this.getProductos();
    }

    render() {
        var items = this.state.items;
        var productos = this.state.productos;
        let itemsmostrar = <div></div>;
        var productosMostrar = <option disabled>No hay productos</option>
        if (items !== undefined && items.length > 0) {
            itemsmostrar = items.map((i) => (
                <tr>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.concepto}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.precio}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                        <input
                            disabled
                            type="number"
                            defaultValue={i.cantidad}
                            min="1"
                            max="100"
                            style={{
                                width: "5em",
                                margin: "0px!important",
                                padding: "5px",
                                borderRadius: "7px",
                                border: "1px solid silver",
                                textAlign: "center"
                            }}
                        />
                    </td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.subtotal}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                        <Button  size="sm" variant="danger" onClick={(e)=>{this.deleteFromDetails(e, i)}}>
                            <FaTrash/>
                        </Button>
                    </td>
                </tr>
            ));
        }
        if(productos !== undefined && productos.length > 0){
            productosMostrar = productos.map( (i) => (
                <option key={i.idProducto} value={JSON.stringify(i)}>{i.denominacion}</option>
            ));
        }
        return (
            <Modal show={this.props.show} size="lg" onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formNombreCliente">
                            <Col md={4}>
                                <Form.Label style={{ marginBottom: 0 }}><b>Nombre del cliente</b></Form.Label>
                                <span className="validation-field" hidden={validateField(this.state.clienteNombre, 100, 3)}>Nombre inválido</span>
                                <Form.Control
                                    className={validateField(this.state.clienteNombre, 100, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                    type="text"
                                    value={this.state.clienteNombre}
                                    autoComplete="off"
                                    onChange={(e) => { this.changeField(e, "clienteNombre") }}
                                    placeholder="Ingrese el nombre del cliente"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label style={{ marginBottom: 0 }}><b>N° Documento</b></Form.Label>
                                <span className="validation-field" hidden={validateField(this.state.clienteDocumento, 15, 6)}>N° documento inválido</span>
                                <Form.Control
                                    className={validateField(this.state.clienteDocumento, 15, 6) ? "input-validate-field-success" : "input-validate-field-error"}
                                    autoComplete="off"
                                    type="text"
                                    value={this.state.clienteDocumento}
                                    onChange={(e) => { this.changeField(e, "clienteDocumento") }}
                                    placeholder="Ingrese el número de documento"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label style={{ marginBottom: 0 }}><b>Fecha</b></Form.Label>
                                <span className="validation-field" hidden={validateDate(this.state.fecha)}>Fecha inválida</span>
                                <Form.Control
                                    className={validateDate(this.state.fecha) ? "input-validate-field-success" : "input-validate-field-error"}
                                    type="datetime-local"
                                    value={this.state.fecha}
                                    onChange={(e) => { this.changeField(e, "fecha") }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md={12}>
                                <Form.Label style={{ marginBottom: 0 }}><b>Producto</b></Form.Label>
                                <span className="validation-field" hidden={validateSelect(this.state.itemProductoSelected)}>Debes seleccionar un producto</span>
                                <Form.Control
                                    className={validateSelect(this.state.itemProductoSelected) ? "input-validate-field-success" : "input-validate-field-error"}
                                    as="select"
                                    value={this.state.itemProductoSelected} onChange={this.changeProducto.bind(this)}>
                                    <option key="0" value="0" disabled>- SELECCIONE -</option>
                                    {productosMostrar}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label style={{ marginBottom: 0 }}><b>Precio</b></Form.Label>                            
                                <Form.Control
                                    disabled
                                    placeholder="Precio del producto"
                                    type="number"
                                    style={{textAlign: "right"}}
                                    value={this.state.itemPrecio}/>
                            </Col>
                            <Col>
                                <Form.Label style={{ marginBottom: 0 }}><b>Cantidad</b></Form.Label>
                                <span className="validation-field" hidden={validateNumber(this.state.itemCantidad, 100, 1)}>Cantidad inválida</span>
                                <Form.Control
                                    type="number"
                                    className={validateNumber(this.state.itemCantidad, 100, 1) ? "input-validate-field-success" : "input-validate-field-error"}
                                    style={{textAlign: "right"}}
                                    onChange={this.changeCurrentItemCantidad.bind(this)}
                                    value={this.state.itemCantidad}/>
                            </Col>
                            <Col>
                                <Form.Label style={{ marginBottom: 0 }}><b>Subtotal</b></Form.Label>                            
                                <Form.Control
                                    type="number"
                                    style={{textAlign: "right"}}
                                    disabled value={this.state.itemSubtotal}/>
                            </Col>
                            <Button
                                disabled={this.state.itemProductoSelected === 0 ? true : false}
                                style={{marginRight: "15px"}}
                                onClick={this.addToItems.bind(this)}>Agregar</Button>
                        </Form.Group>
                    </Form>
                    <span className="validation-field" hidden={validateList(this.state.items)}>Debes agregar por lo menos un producto</span>
                    <Table hover responsive style={{ fontSize: "12px", marginTop: "10px" }}>
                        <thead style={{ background: "#343a40", color: "white" }}>
                            <tr>
                                <th style={{ textAlign: "center" }}>CONCEPTO</th>
                                <th style={{ textAlign: "center" }}>PRECIO</th>
                                <th style={{ textAlign: "center" }}>CANTIDAD</th>
                                <th style={{ textAlign: "center" }}>SUBTOTAL</th>
                                <th style={{ textAlign: "center" }}>ACCIONES</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {itemsmostrar}
                        </tbody>
                    </Table>
                    <section style={{float: "right"}}>
                        <b>TOTAL: </b>{this.state.importeTotal}
                    </section>
                    <br></br>
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

    changeCurrentItemCantidad(e){
        e.preventDefault();
        this.setState({
            itemCantidad: parseInt(e.target.value),
            itemSubtotal: this.state.itemPrecio * e.target.value
        });
    }

    deleteFromDetails(e, obj){
        e.preventDefault();
        var items = this.state.items;
        console.log(items);        
        items = items.filter(item => item.idProducto !== obj.idProducto);
        console.log(items);
        this.setState({
            items: items,
            importeTotal: this.state.importeTotal - obj.subtotal
        });
    }

    addToItems(e){
        e.preventDefault();
        var selectedProduct = JSON.parse(this.state.itemProductoSelected);
        var obj = {
            cantidad: this.state.itemCantidad,
            idProducto: selectedProduct.idProducto,
            concepto: this.state.itemProductoConcepto,
            precio: this.state.itemPrecio,
            subtotal: this.state.itemSubtotal
        }
        if(this.validateAddItem(obj)){
            let items = this.state.items;
            items.push(obj);
            this.setState({
                itemCantidad: 1,
                itemProductoSelected: 0,
                itemPrecio: 0,
                itemSubtotal: 0,
                importeTotal: this.state.importeTotal + this.state.itemSubtotal,
                items: items,
                validated: true
            });
        }
        else { this.setState({validated: false}); }
    }

    changeProducto(e){
        e.preventDefault();
        let item = JSON.parse(e.target.value);
        console.log(item);
        this.setState({
            itemProductoSelected: JSON.stringify(item),
            itemProductoConcepto: item.denominacion,
            itemPrecio: item.precio,
            itemSubtotal: item.precio * this.state.itemCantidad
        });
    }

    getProductos() {
        axios.get(process.env.REACT_APP_API_URL + "/productos")
        .then(res => {
            this.setState({ productos: res.data });
        })
        .catch(error => {
            console.log(error);
        });
    }

    convertDate(date){
        if(date === undefined){ return null; }
        return date + ":00Z";
    }

    validateAllFields(sale){
        if(validateField(sale.clienteNombre, 100, 3) &&
            validateField(sale.clienteDocumento, 15, 6) &&
            validateDate(sale.fecha) &&
            validateList(sale.detalle)){
            return true;
        }
        return false;
    }
    
    validateAddItem(item){
        if(validateSelect(item.idProducto) &&
            validateNumber(item.cantidad, 100, 1)){
            return true;
        }
        return false;
    }     

    handleSave(e){
        e.preventDefault();
        var obj = {
            clienteDocumento: this.state.clienteDocumento,
            clienteNombre: this.state.clienteNombre,
            detalle: this.transformToEntity(this.state.items),
            fecha: this.convertDate(this.state.fecha),
            importeTotal: this.state.importeTotal
        };
        if(this.validateAllFields(obj)){
            this.setState({validated: true}, this.props.save(e, obj));
        }
        else{
            this.setState({validated: false});
        }
    }

    transformToEntity(details){
        var entities = [];
        for(var i = 0; i < details.length; i++){
            var entity = {
                cantidad: parseInt(details[i].cantidad),
                idProducto: parseInt(details[i].idProducto),
                precio: parseInt(details[i].precio),
                subtotal: parseInt(details[i].subtotal)
            }
            entities.push(entity);
        }
        return entities;
    }

}