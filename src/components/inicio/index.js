import React, { Component } from 'react';
import { Card, Image } from "react-bootstrap";
import { TiArrowForward } from "react-icons/ti";
import "./inicio.css";

export default class Inicio extends Component {

    render() {
        var pendients = require("./pendients.png");
        var faltantes = require("./faltantes.jpg");
        var equipos = require("./equipos.png");
        return (
            <section className="col-md-12" style={{textAlign: "center"}}>
                <a href="/home/prestamos/pendientes">
                    <Card className="col-md-3 card-shortcuts">
                        <Card.Header className="card-header-shortcuts">PRÉSTAMOS PENDIENTES</Card.Header>
                        <Card.Body style={{textAlign: "center", cursor: "pointer"}}>
                            <Image height="200" src={pendients} />
                        </Card.Body>
                        <Card.Footer className="card-footer-shortcuts">
                            <Card.Link href="/home/prestamos">
                                <TiArrowForward /> Acceder
                            </Card.Link>
                        </Card.Footer>
                    </Card>
                </a>
                <a href="/home/productos/faltantes">
                    <Card className="col-md-3 card-shortcuts" style={{ marginLeft: "10px" }}>
                        <Card.Header className="card-header-shortcuts">PRODUCTOS FALTANTES</Card.Header>
                        <Card.Body style={{textAlign: "center", cursor: "pointer"}}>
                            <Image height="200" src={faltantes} />
                        </Card.Body>
                        <Card.Footer className="card-footer-shortcuts">
                            <Card.Link href="/home/productos/faltantes">
                                <TiArrowForward /> Acceder
                            </Card.Link>
                        </Card.Footer>
                    </Card>
                </a>
                <a href="/home/equipos/disponibles">
                    <Card className="col-md-3 card-shortcuts" style={{ marginLeft: "10px" }}>
                        <Card.Header className="card-header-shortcuts">EQUIPOS DISPONIBLES</Card.Header>
                        <Card.Body style={{textAlign: "center", cursor: "pointer"}}>
                            <Image height="200" src={equipos} />
                        </Card.Body>
                        <Card.Footer className="card-footer-shortcuts">
                            <Card.Link href="/home/equipos">
                                <TiArrowForward /> Acceder
                            </Card.Link>
                        </Card.Footer>
                    </Card>                
                </a>
            </section>
        );
    }
}