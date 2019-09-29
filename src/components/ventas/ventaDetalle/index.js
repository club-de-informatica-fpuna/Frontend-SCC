import React, { Component } from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default class VentaDetalle extends Component {

    render() {
        var venta = this.props.venta;
        if(venta === undefined){ return (<></>); }
        let detalle = venta.detalle;
        let itemsMostrar = <div></div>;
        if(detalle !== undefined && detalle.length > 0){
            if (detalle === undefined) { return (<></>) }
            itemsMostrar = detalle.map((i) => (
                <tr>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.id}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.producto.denominacion}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{this.formatoMoneda(i.precio) + " GS."}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.cantidad}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{this.formatoMoneda(i.subtotal) + " GS."}</td>
                </tr>
            ));
        }
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title><b>Detalles de la venta</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section>
                        <Table hover responsive style={{ fontSize: "12px", marginTop: "10px" }}>
                            <thead style={{ background: "#343a40", color: "white" }}>
                                <tr>
                                    <th style={{ textAlign: "center" }}>ID</th>
                                    <th style={{ textAlign: "center" }}>CONCEPTO</th>
                                    <th style={{ textAlign: "center" }}>PRECIO</th>
                                    <th style={{ textAlign: "center" }}>CANTIDAD</th>
                                    <th style={{ textAlign: "center" }}>SUBTOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsMostrar}
                            </tbody>
                        </Table>
                        <section style={{float: "right", fontSize: "20px"}}>
                            <b>TOTAL: </b>
                            {this.formatoMoneda(venta.importeTotal) + " GS."}</section>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    formatoMoneda(number){
        return new Intl.NumberFormat('de-DE').format(number);
    }

}