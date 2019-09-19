import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";

export default class ProductoInfo extends Component {

    constructor(props){
        super(props);
    }

    render() {
        var logo = require("./producto.png");
        var producto = this.props.producto;
        if(producto === undefined){ return (<></>) }
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title><b>{producto.denominacion}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: "center"}}>
                        <Image className="representative-image" src={ producto.foto != undefined ? ("data:image/png;base64," + producto.foto) : logo} width="150" thumbnail />
                    </p>
                    <section className="modal-info-fields">
                        <p><strong>DENOMINACION: </strong>{producto.denominacion}</p>
                        <p><strong>PRECIO: </strong>{producto.precio + " GS."}</p>
                        <p><strong>CANTIDAD: </strong>{producto.cantidad}</p>
                        <p><strong>ESTADO: </strong>{producto.cantidad > 0 ? "DISPONIBLE" : "AGOTADO"}</p>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }       

}