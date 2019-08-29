import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { TiArrowForward } from "react-icons/ti";

export default class Inicio extends Component {

    render() {
        var pendients = require("./pendients.svg");
        var faltantes = require("./faltantes.svg");
        var equipos = require("./equipos.svg");        
        return (
            <section className="col-md-12">
                <Card className="col-md-3" style={{ display: "inline-block", padding: "0" }}>
                    <Card.Header style={{ textAlign: "center" }}>PRÉSTAMOS PENDIENTES</Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" src={pendients} />
                    </Card.Body>
                    <Card.Footer>
                        <Card.Link href="/home/prestamos">
                            <TiArrowForward /> Acceder
                        </Card.Link>
                    </Card.Footer>
                </Card>
                <Card className="col-md-3" style={{ display: "inline-block", padding: "0", marginLeft: "10px" }}>
                    <Card.Header style={{ textAlign: "center" }}>PRODUCTOS FALTANTES</Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" src={faltantes} />
                    </Card.Body>
                    <Card.Footer>
                        <Card.Link href="/home/prestamos">
                            <TiArrowForward /> Acceder
                        </Card.Link>
                    </Card.Footer>
                </Card>
                <Card className="col-md-3" style={{ display: "inline-block", padding: "0", marginLeft: "10px" }}>
                    <Card.Header style={{ textAlign: "center" }}>EQUIPOS DISPONIBLES</Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" src={equipos} />
                    </Card.Body>
                    <Card.Footer>
                        <Card.Link href="/home/equipos">
                            <TiArrowForward /> Acceder
                        </Card.Link>
                    </Card.Footer>
                </Card>                
            </section>
        );
    }
}