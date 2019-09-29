import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";

export default class RFIDReader extends Component {
    
    render() {
        let loading = require("./loadingRFID.gif");
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Esperando lectura de tarjeta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={loading} thumbnail />
                </Modal.Body>
            </Modal>
        );
    }

}